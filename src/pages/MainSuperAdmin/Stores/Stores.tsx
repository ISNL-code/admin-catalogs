import { useStoresApi } from 'api/useStoresApi';
import { useEffect, useState } from 'react';
import { StoreInterface } from 'types';
import StoresCards from 'components/organisms/Lists/StoresCards';
import { Box } from '@mui/material';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';

const Stores = () => {
    const [stores, setStores] = useState<StoreInterface[] | null>(null);
    const {
        data: storesDataRes,
        isFetching,
        isFetched,
        refetch: updateStoreDataRes,
    } = useStoresApi().useGetAllStores();

    useEffect(() => {
        if (!storesDataRes) return;
        setStores(storesDataRes.data.data);
    }, [storesDataRes]);

    return (
        <>
            {isFetching && <Loader />}
            {!stores?.length && !isFetching && isFetched && <EmptyPage />}

            <Box py={1}>
                <StoresCards data={stores} updateStoreDataRes={updateStoreDataRes} />
            </Box>
        </>
    );
};

export default Stores;
