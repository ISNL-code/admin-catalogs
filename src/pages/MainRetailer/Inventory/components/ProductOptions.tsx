import { Box, Typography } from '@mui/material';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActionPanel from '../../../../components/organisms/Panels/ActionPanel';

interface InventoryProductOptionsInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const ProductOptions = ({ handleSetTitle, handleSetActionButtons }: InventoryProductOptionsInterface) => {
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.options);
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

export default ProductOptions;
