import { Box, Typography } from '@mui/material';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ActionPanel from '../../../../components/organisms/Panels/ActionPanel';

interface InventoryCategoriesInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const CategoriesList = ({ handleSetTitle, handleSetActionButtons }: InventoryCategoriesInterface) => {
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.categories);
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
        <Box>
            {/* {<Loader />} */}
            {<EmptyPage />}

            <Box></Box>
        </Box>
    );
};

export default CategoriesList;
