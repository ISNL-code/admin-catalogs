import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import { useProductCategoriesApi } from 'api/useProductCategoriesApi';

const CategoriesForm = () => {
    const { productId, storeCode } = useParams();
    const { string }: any = useOutletContext();
    const [value, setValue] = useState([]);
    const [categories, setCategories] = useState([]);

    const { data: categoryRes, refetch: updateCategories } = useProductCategoriesApi().useGetAllProductsCategories({
        storeCode,
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
            </Grid>
            <Grid xs={12} my={2}>
                <TreeSelect
                    size="large"
                    treeCheckable
                    treeCheckStrictly
                    treeData={categories}
                    value={value}
                    onChange={(newValue, _nameValue, action) => {
                        if (action.checked) {
                            addCategory({ productId, categoryId: action.triggerValue });
                        } else {
                            deleteCategory({ productId, categoryId: action.triggerValue });
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
