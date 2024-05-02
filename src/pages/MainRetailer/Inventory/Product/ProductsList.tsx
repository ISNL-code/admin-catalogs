import { Box } from '@mui/material';
import { useProductsApi } from 'api/useProductsApi';
import LoadMoreButton from 'components/atoms/Buttons/LoadMoreButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import SearchInput from 'components/molecules/Inputs/SearchInput';
import ProductsCards from 'components/organisms/Lists/ProductsCards';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { ProductInterface, RetailerContextInterface } from 'types';
import { useIsMount } from 'hooks/useIsMount';
import toast from 'react-hot-toast';

interface InventoryProductsInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const ProductsList = ({ handleSetTitle, handleSetActionButtons }: InventoryProductsInterface) => {
    const mount = useIsMount();
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const [page, setPage] = useState<number>(0);
    const [productsList, setProductsList] = useState<ProductInterface[] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sku, setSku] = useState('');
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    const countPerPage = 25;

    const { mutateAsync: deleteProduct } = useProductsApi().useDeleteProduct();
    const { mutateAsync: switchProduct } = useProductsApi().useSwitchProduct();

    const {
        data: productsRes,
        isFetching,
        refetch: updateProductsRes,
        isFetched,
    } = useProductsApi().useGetProductsList({ storeCode, page, countPerPage, lang: storeData?.defaultLanguage });

    const {
        data: productsBySkuRes,
        refetch: updateFindBySku,
        isFetching: loadMatched,
    } = useProductsApi().useGetProductBySku({ sku, storeCode, page, countPerPage, lang: storeData?.defaultLanguage });

    useEffect(() => {
        if (productsBySkuRes && sku) {
            setTotalCount(productsBySkuRes?.data.recordsTotal);
            setTotalPages(productsBySkuRes?.data.totalPages);
            if (page)
                return setProductsList([
                    ...(productsList as ProductInterface[]),
                    ...(productsBySkuRes?.data.products as ProductInterface[]),
                ]);
            setProductsList(productsBySkuRes?.data.products as ProductInterface[]);
            return;
        }

        if (!productsRes || isFetching) return;
        setTotalCount(productsRes?.data.recordsTotal);
        setTotalPages(productsRes?.data.totalPages);
        if (page)
            return setProductsList([
                ...(productsList as ProductInterface[]),
                ...(productsRes?.data.products as ProductInterface[]),
            ]);
        setProductsList(productsRes?.data.products as ProductInterface[]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsRes, productsBySkuRes]);

    useEffect(() => {
        if (mount) return;
        if (sku) {
            updateFindBySku();
        } else updateProductsRes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sku]);

    const handleSetPage = val => {
        setPage(prev => prev + val);
    };

    useEffect(() => {
        handleSetTitle(string?.products);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleSetActionButtons([
            {
                name: 'create',
                disabled: false,
                action: () => {
                    const maxProducts = storeData.dataBaseStoreSettings.products;
                    if ((productsList?.length as number) >= maxProducts)
                        return toast.error(string?.your_limit + ' ' + maxProducts + ' ' + string?.items);
                    navigate(`/store-inventory/${storeCode}/products/create`);
                },
            },
        ]); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeCode, storeData, productsList]);

    return (
        <Box>
            {(isFetching || loadMatched) && <Loader />}
            {!productsList?.length && !isFetching && isFetched && <EmptyPage />}
            <Box mt={-1} mb={0.5}>
                <SearchInput setValue={setSku} setPage={setPage} />
            </Box>
            <Box>
                <ProductsCards
                    data={productsList}
                    deleteProduct={deleteProduct}
                    switchProduct={switchProduct}
                    setProductsList={setProductsList}
                    setTotalCount={setTotalCount}
                />
            </Box>
            <LoadMoreButton
                setCurrentPage={handleSetPage}
                totalCount={totalCount}
                loadProducts={isFetching}
                productsList={productsList}
                page={page}
                totalPages={totalPages}
                countPerPage={countPerPage}
            />
        </Box>
    );
};

export default ProductsList;
