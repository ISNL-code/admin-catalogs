import { Box, Typography } from '@mui/material';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActionPanel from '../../../../components/organisms/Panels/ActionPanel';

interface InventoryOrdersInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const Orders = ({ handleSetTitle, handleSetActionButtons }: InventoryOrdersInterface) => {
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.orders);
    }, []);

    useEffect(() => {
        handleSetActionButtons([]);
    }, []);

    return (
        <Box>
            {/* {<Loader />} */}
            {<EmptyPage />}

            <Box></Box>
        </Box>
    );
};

export default Orders;
