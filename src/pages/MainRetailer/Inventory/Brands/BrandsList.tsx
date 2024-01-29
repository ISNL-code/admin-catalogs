import { Box } from '@mui/material';
import { useBrandsApi } from 'api/useBrandsApi';
import LoadMoreButton from 'components/atoms/Buttons/LoadMoreButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import BrandsCards from 'components/organisms/Lists/BrandsCards';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { BrandsInterface } from 'types';

interface InventoryBrandsInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const BrandsList = ({ handleSetTitle, handleSetActionButtons }: InventoryBrandsInterface) => {
    const mount = useIsMount();
    const navigate = useNavigate();
    const { string }: any = useOutletContext();
    const { storeCode } = useParams();
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [brandsList, setBrandsList] = useState<BrandsInterface[] | null>(null);
    const [page, setPage] = useState<number>(0);
    const countPerPage = 25;

    const { mutateAsync: deleteBrand } = useBrandsApi().useDeleteBrand();

    const {
        data: brandsRes,
        isFetching,
        refetch: updateBrandsRes,
        isFetched,
    } = useBrandsApi().useGetBrandsList({ storeCode, page, countPerPage });

    useEffect(() => {
        if (!brandsRes || isFetching) return;
        setTotalCount(brandsRes?.data.recordsTotal);
        setTotalPages(brandsRes?.data.totalPages);
        if (page)
            return setBrandsList([
                ...(brandsRes as BrandsInterface[]),
                ...(brandsRes?.data.manufacturers as BrandsInterface[]),
            ]);
        setBrandsList(brandsRes?.data.manufacturers as BrandsInterface[]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandsRes]);

    useEffect(() => {
        if (mount) return;
        updateBrandsRes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleSetPage = val => {
        setPage(prev => prev + val);
    };

    useEffect(() => {
        handleSetTitle(string?.brands);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleSetActionButtons([
            {
                name: 'create',
                disabled: false,
                action: () => {
                    navigate(`/store-inventory/${storeCode}/brands/create`);
                },
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            {isFetching && <Loader />}
            {!brandsList?.length && !isFetching && isFetched && <EmptyPage />}

            <Box>
                <BrandsCards
                    data={brandsList}
                    deleteBrand={deleteBrand}
                    setBrandsList={setBrandsList}
                    setTotalCount={setTotalCount}
                />
            </Box>
            <LoadMoreButton
                setCurrentPage={handleSetPage}
                totalCount={totalCount}
                loadProducts={isFetching}
                productsList={brandsList}
                page={page}
                totalPages={totalPages}
                countPerPage={countPerPage}
            />
        </Box>
    );
};

export default BrandsList;
