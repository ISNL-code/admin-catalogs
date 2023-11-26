import { Box, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import Loader from 'components/atoms/Loader/Loader';
import ProductsManageTabsPanel from 'components/organisms/Panels/ProductsManageTabsPanel';
import { useEffect } from 'react';

const ProductModels = ({ handleSetTitle }) => {
    const navigate = useNavigate();
    const { storeCode, productId } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.models);
    }, []);

    return (
        <>
            {false && <Loader />}

            <Grid mt={1} container xs={12} sx={{ gap: 2, border: '1px solid #ccc', p: 2 }}></Grid>
        </>
    );
};

export default ProductModels;
