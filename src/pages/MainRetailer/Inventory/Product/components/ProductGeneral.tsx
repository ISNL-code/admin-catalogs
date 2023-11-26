import { Box, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import Loader from 'components/atoms/Loader/Loader';
import ProductsManageTabsPanel from 'components/organisms/Panels/ProductsManageTabsPanel';
import { useEffect } from 'react';

const ProductGeneral = ({ handleSetTitle }: { handleSetTitle? }) => {
    const navigate = useNavigate();
    const { storeCode, productId } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();

    useEffect(() => {
        if (!productId) return;
        handleSetTitle(string?.edit);
    }, []);

    return (
        <>
            {false && <Loader />}

            {!productId && (
                <Box
                    py={1}
                    sx={{
                        width: '100%',
                        borderBottom: '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography variant="h3">{string?.create}</Typography>
                    </Box>
                </Box>
            )}
            <Grid mt={1} container xs={12} sx={{ gap: 2, border: '1px solid #ccc', p: 2 }}></Grid>
        </>
    );
};

export default ProductGeneral;
