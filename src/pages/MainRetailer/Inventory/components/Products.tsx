import { Box, Typography } from '@mui/material';
import { useProductsApi } from 'api/useProductsApi';
import LoadMoreButton from 'components/atoms/Buttons/LoadMoreButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import ProductsCards from 'components/organisms/Lists/ProductsCards';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { ProductListInterface } from 'types';
import ProductsActionPanel from '../../../../components/organisms/Panels/ProductsActionPanel';

interface InventoryProductsInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const Products = ({ handleSetTitle, handleSetActionButtons }: InventoryProductsInterface) => {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const [page, setPage] = useState<number>(0);
    const [productsList, setProductsList] = useState<ProductListInterface[] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { string }: any = useOutletContext();
    const countPerPage = 25;

    const { mutateAsync: deleteProduct } = useProductsApi().useDeleteProduct();
    const { mutateAsync: switchProduct } = useProductsApi().useSwitchProduct();

    const {
        data: productsRes,
        isFetching,
        refetch: updateProductsRes,
        isFetched,
    } = useProductsApi().useGetProductsList({ storeCode, page, countPerPage });

    useEffect(() => {
        if (!productsRes || isFetching) return;
        setTotalCount(productsRes?.data.recordsTotal);
        setTotalPages(productsRes?.data.totalPages);
        if (page)
            return setProductsList([
                ...(productsList as ProductListInterface[]),
                ...(productsRes?.data.products as ProductListInterface[]),
            ]);
        setProductsList(productsRes?.data.products as ProductListInterface[]);
    }, [productsRes]);

    useEffect(() => {
        updateProductsRes();
    }, [page]);

    const handleSetPage = val => {
        setPage(prev => prev + val);
    };

    useEffect(() => {
        handleSetTitle(string?.products);
    }, []);

    useEffect(() => {
        handleSetActionButtons([
            {
                name: 'create',
                disabled: false,
                action: () => {
                    navigate(`/store-inventory/${storeCode}/products/create`);
                },
            },
        ]);
    }, [storeCode]);

    return (
        <Box className="App">
            {isFetching && <Loader />}
            {!productsList?.length && !isFetching && isFetched && <EmptyPage />}

            <Box>
                <ProductsCards
                    data={productsList}
                    updateProductsListData={() => updateProductsRes()}
                    deleteProduct={deleteProduct}
                    switchProduct={switchProduct}
                />
            </Box>
            <LoadMoreButton
                setCurrentPage={handleSetPage}
                totalCount={totalCount}
                loadProducts={isFetching}
                productsList={productsList}
                page={page}
                totalPages={totalPages}
            />
        </Box>
    );
};

export default Products;
