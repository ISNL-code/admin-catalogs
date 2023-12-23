import { Box } from '@mui/material';
import { useProductCategoriesApi } from 'api/useProductCategoriesApi';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { CategoryInterface } from 'types';
import Categories from './components/Categories';

interface InventoryCategoriesInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const CategoriesList = ({ handleSetTitle, handleSetActionButtons }: InventoryCategoriesInterface) => {
    const { storeCode } = useParams();
    const { string }: any = useOutletContext();
    const [categories, setCategories] = useState<CategoryInterface | any>([]);

    const {
        data: categoriesListRes,
        isFetching: loadCategoriesList,
        isFetched,
    } = useProductCategoriesApi().useGetAllProductsCategories({ storeCode });

    useEffect(() => {
        if (!categoriesListRes) return;

        setCategories(categoriesListRes.data.categories);
    }, [categoriesListRes]);

    useEffect(() => {
        handleSetTitle(string?.categories);
        handleSetActionButtons([]);
    }, []);

    return (
        <Box>
            {loadCategoriesList && <Loader />}
            {!categories?.length && !loadCategoriesList && isFetched && <EmptyPage />}

            <Box
                mt={1}
                sx={{
                    height: 'auto',
                    border: '1px solid #ccc',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                {categories?.map(category => {
                    return <Categories key={category.id} category={category} />;
                })}
            </Box>
        </Box>
    );
};

export default CategoriesList;
