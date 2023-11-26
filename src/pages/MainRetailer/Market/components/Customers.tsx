import { Box, Typography } from '@mui/material';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActionPanel from '../../../../components/organisms/Panels/ActionPanel';

interface InventoryCustomersInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const Customers = ({ handleSetTitle, handleSetActionButtons }: InventoryCustomersInterface) => {
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.customers);
    }, []);

    useEffect(() => {
        handleSetActionButtons([]);
    }, []);

    return (
        <Box className="App">
            {/* {<Loader />} */}
            {<EmptyPage />}

            <Box></Box>
        </Box>
    );
};

export default Customers;
