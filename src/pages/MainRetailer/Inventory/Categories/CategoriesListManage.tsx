import { Box, IconButton, Typography } from '@mui/material';
import { useProductCategoriesApi } from 'api/useProductCategoriesApi';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { CategoryInterface, RetailerContextInterface } from 'types';
import Categories from './components/Categories';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import CategoryForm from './components/CategoryForm';
import { useFormik } from 'formik';
import categoryFormValidations from 'helpers/Validations/categoryFormValidations';
import toast from 'react-hot-toast';
interface InventoryCategoriesInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const INIT_CATEGORY_VAL = {
    id: null,
    parent: {
        id: 0,
        code: 'root',
    },
    store: '',
    visible: true,
    code: '',
    sortOrder: 1,
    selectedLanguage: '',
    descriptions: [],
};

const CategoriesListManage = ({ handleSetTitle, handleSetActionButtons }: InventoryCategoriesInterface) => {
    const { xxs, slx, ls, sx } = useDevice();
    const { storeCode } = useParams();
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    const [categories, setCategories] = useState<CategoryInterface | any>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [mode, setMode] = useState<'edit' | 'view'>('view');

    const {
        data: categoriesListRes,
        isFetching: loadCategoriesList,
        refetch: updateCategoryList,
    } = useProductCategoriesApi().useGetAllProductsCategories({ storeCode, lang: storeData?.defaultLanguage });

    const { mutateAsync: createCategory, isLoading: loadAddCategory } =
        useProductCategoriesApi().useAddCategoryToShop();
    const { mutateAsync: updateCategory, isLoading: loadUpdateCategory } =
        useProductCategoriesApi().useUpdateCategoryToShop();
    const { mutateAsync: deleteCategory, isLoading: loadDeleteCategory } =
        useProductCategoriesApi().useDeleteCategoryToShop();
    const { refetch: checkUnique } = useProductCategoriesApi().useCheckCategoryUnique({
        code: selectedCategory?.code,
        storeCode,
    });

    const { refetch: getCategoryDataRes } = useProductCategoriesApi().useGetShopCategoryBuId({
        storeCode,
        categoryId: selectedCategory?.id,
    });

    const handleSetInitValues = () => {
        setSelectedCategory({
            ...INIT_CATEGORY_VAL,
            descriptions: storeData?.supportedLanguages.map(({ code }) => {
                return {
                    language: code,
                    name: '',
                    description: '',
                    friendlyUrl: '',
                    keyWords: '',
                    highlights: '',
                    metaDescription: '',
                    title: '',
                };
            }),
        });
    };

    const formik = useFormik({
        initialValues: selectedCategory,
        validationSchema: categoryFormValidations,
        onSubmit: (values, { resetForm }) => {
            if (selectedCategory?.id) {
                updateCategory({
                    storeCode,
                    data: values,
                })
                    .then(() => {
                        toast.success(string?.updated);
                        setMode('view');
                        updateCategoryList();
                        resetForm();
                        handleSetInitValues();
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err.message);
                    });
            } else
                checkUnique()
                    .then(res => {
                        if ((res as any).data.data.exists) {
                            toast.error(string?.category_with_this_code_is_registered);
                            return;
                        }
                        return res;
                    })
                    .then(res => {
                        if (res) {
                            createCategory({ storeCode, data: values })
                                .then(() => {
                                    toast.success(string?.created);
                                    setMode('view');
                                    updateCategoryList();
                                    resetForm();
                                    setSelectedCategory({
                                        ...INIT_CATEGORY_VAL,
                                        descriptions: storeData?.supportedLanguages.map(({ code }) => {
                                            return {
                                                language: code,
                                                name: '',
                                                description: '',
                                                friendlyUrl: '',
                                                keyWords: '',
                                                highlights: '',
                                                metaDescription: '',
                                                title: '',
                                            };
                                        }),
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    toast.error(err.message);
                                });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err.message);
                    });
        },
    });

    useEffect(() => {
        if (!selectedCategory?.id) return;
        getCategoryDataRes()
            .then(res => {
                const category = res?.data?.data as any;

                setSelectedCategory({
                    id: category.id,
                    parent: category.parent,
                    store: category.store,
                    visible: category.visible,
                    code: category.code,
                    sortOrder: category.sortOrder,
                    selectedLanguage: '',
                    descriptions: category.descriptions,
                });

                setMode('edit');
            })
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory?.id]);

    useEffect(() => {
        formik.setValues(selectedCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    useEffect(() => {
        if (!categoriesListRes || loadCategoriesList) return;

        setCategories(categoriesListRes.data.categories.sort((a, b) => a.sortOrder - b.sortOrder));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesListRes]);

    useEffect(() => {
        handleSetInitValues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeData]);

    useEffect(() => {
        handleSetTitle(string?.categories);
        handleSetActionButtons([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            {loadCategoriesList && <Loader />}

            {(loadAddCategory || loadUpdateCategory || loadDeleteCategory) && <Loader />}
            <Grid xs={12} container sx={{ gap: 1 }}>
                <Grid
                    xs={slx ? 12 : sx ? 6.8 : ls ? 6.1 : 3.95}
                    p={2}
                    mt={1}
                    sx={{
                        height: 'auto',
                        border: '1px solid #ccc',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        mb={1}
                        sx={{
                            p: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            pl: 2,
                            border: '1px solid #ccc',
                            width: '100%',
                            maxWidth: xxs ? 215 : 300,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, #ccc 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
                        }}
                    >
                        <Typography variant="h4">{string?.add_category}</Typography>
                        <Box>
                            <IconButton
                                disabled={!storeData?.mainStoreSettings?.categories}
                                size="small"
                                onClick={() => {
                                    setMode('edit');
                                    handleSetInitValues();
                                }}
                            >
                                <AddIcon color="action" />
                            </IconButton>
                        </Box>
                    </Box>
                    {categories?.map(category => {
                        return (
                            <Categories
                                key={category.id}
                                category={category}
                                setMode={setMode}
                                setSelectedCategory={setSelectedCategory}
                                deleteCategory={deleteCategory}
                                updateCategoryList={updateCategoryList}
                                selectedCategory={selectedCategory}
                                handleSetInitValues={handleSetInitValues}
                            />
                        );
                    })}
                </Grid>
                <Grid
                    xs={slx ? 12 : sx ? 5 : ls ? 5.7 : 7.95}
                    p={2}
                    mt={1}
                    sx={{
                        height: 'auto',
                        border: '1px solid #ccc',
                    }}
                >
                    {mode === 'edit' ? (
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                formik.handleSubmit();
                            }}
                        >
                            <CategoryForm
                                data={selectedCategory}
                                selectedCategory={selectedCategory}
                                formik={formik}
                                setSelectedCategory={setSelectedCategory}
                                setMode={setMode}
                                handleSetInitValues={handleSetInitValues}
                            />
                        </form>
                    ) : (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h3">
                                {storeData?.mainStoreSettings?.categories
                                    ? string?.choose_or_create_a_category
                                    : string?.option_not_available}
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default CategoriesListManage;
