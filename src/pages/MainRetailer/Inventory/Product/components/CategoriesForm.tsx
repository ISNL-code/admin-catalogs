import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import { useProductCategoriesApi } from 'api/useProductCategoriesApi';
import AddIcon from '@mui/icons-material/Add';
import { RetailerContextInterface } from 'types';

const CategoriesForm = () => {
    const navigate = useNavigate();
    const { productId, storeCode } = useParams();
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    const [value, setValue] = useState([]);
    const [categories, setCategories] = useState([]);

    const { data: categoryRes } = useProductCategoriesApi().useGetAllProductsCategories({
        storeCode,
        lang: storeData?.defaultLanguage,
    });
    const { data: selectedCategoriesRes } = useProductCategoriesApi().useGetSelectedCategories({
        productId,
        storeCode,
    });
    const { mutateAsync: addCategory } = useProductCategoriesApi().useAddCategoryToProduct();
    const { mutateAsync: deleteCategory } = useProductCategoriesApi().useDeleteCategoryToProduct();

    useEffect(() => {
        if (!selectedCategoriesRes) return;
        const dataMap = data => {
            return data?.map(item => {
                return item.id;
            });
        };
        setValue(dataMap(selectedCategoriesRes.data.categories));
    }, [selectedCategoriesRes]);

    useEffect(() => {
        if (!categoryRes) return;

        const dataMap = data => {
            return data?.map(item => {
                return {
                    title: item.description.name,
                    value: item.id,
                    key: item.id,
                    children: item.children.length ? dataMap(item.children) : [],
                };
            });
        };

        setCategories(dataMap(categoryRes.data.categories));
    }, [categoryRes]);

    return (
        <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
            <Grid xs={12} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="h3">{string?.categories}:</Typography>
                {!storeData?.mainStoreSettings?.categories && <Typography>({string?.option_not_available})</Typography>}
                <Button
                    disabled={!storeData?.mainStoreSettings?.categories}
                    variant="contained"
                    sx={{ borderRadius: '50%', minWidth: 28, height: 28, p: 0 }}
                    onClick={() => navigate(`/store-inventory/${storeCode}/categories`)}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Grid>
            <Grid xs={12} my={2}>
                <TreeSelect
                    disabled={!storeData?.mainStoreSettings?.categories}
                    size="large"
                    treeCheckable
                    treeCheckStrictly
                    treeData={categories}
                    value={value}
                    onChange={(newValue, _nameValue, action) => {
                        if (action.checked) {
                            addCategory({ productId, categoryId: action.triggerValue, storeCode });
                        } else {
                            deleteCategory({ productId, categoryId: action.triggerValue, storeCode });
                        }
                        setValue(newValue);
                    }}
                    placeholder="Please select"
                    style={{
                        width: '100%',
                    }}
                    treeLine
                    popupMatchSelectWidth
                    showSearch={false}
                />
            </Grid>
        </Grid>
    );
};

export default CategoriesForm;
