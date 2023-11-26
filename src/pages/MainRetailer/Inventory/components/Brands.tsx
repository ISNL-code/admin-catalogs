import { Box, Typography } from '@mui/material';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActionPanel from '../../../../components/organisms/Panels/ActionPanel';

interface InventoryBrandsInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const Brands = ({ handleSetTitle, handleSetActionButtons }: InventoryBrandsInterface) => {
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.brands);
    }, []);

    useEffect(() => {
        handleSetActionButtons([
            {
                name: 'create',
                disabled: true,
                action: () => {
                    // navigate(`/`);
                },
            },
        ]);
    }, []);

    return (
        <Box className="App">
            {/* {<Loader />} */}
            {<EmptyPage />}

            <Box></Box>
        </Box>
    );
};

export default Brands;
