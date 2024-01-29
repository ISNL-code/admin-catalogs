import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Box, IconButton, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { CustomerInterface } from 'types';

interface CustomersCardsInterface {
    data: CustomerInterface[];
}

const CustomersCards = ({ data }: CustomersCardsInterface) => {
    const { storeCode } = useParams();
    const { string }: any = useOutletContext();
    const { sx } = useDevice();
    const navigate = useNavigate();

    if (!data) return <></>;

    return (
        <>
            {!sx && (
                <Grid
                    container
                    xs={12}
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: sx ? 2 : 0,
                        backgroundColor: '#f3f3f378',
                        alignItems: 'center',
                        px: sx ? 0 : 2,
                    }}
                >
                    <Grid xs={1} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            ID
                        </Typography>
                    </Grid>
                    <Grid xs={3} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography>{string?.full_name}</Typography>
                    </Grid>
                    <Grid xs={3} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography>{string?.phone_number}</Typography>
                    </Grid>
                    <Grid xs={3} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography>{string?.email}</Typography>
                    </Grid>

                    <Grid xs={1} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography>{string?.country}</Typography>
                    </Grid>

                    <Grid xs={1} sx={{ ml: 'auto', p: 1, borderTop: sx ? '1px solid #ccc' : '' }}></Grid>
                </Grid>
            )}
            <Grid container xs={12}>
                {data?.map((item, idx) => {
                    return (
                        <Grid
                            container
                            key={item.id}
                            xs={12}
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: sx ? 2 : 0,
                                backgroundColor: idx % 2 === 0 ? '#fff' : '#f3f3f378',
                                alignItems: 'center',
                                px: sx ? 0 : 2,
                            }}
                            mb={sx ? 2 : 0}
                        >
                            <Grid xs={sx ? 12 : 1} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {sx && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        ID:
                                    </Typography>
                                )}
                                <Typography variant="h5">{item.id}</Typography>
                            </Grid>
                            <Grid xs={sx ? 12 : 3} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {sx && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.full_name}:
                                    </Typography>
                                )}
                                <Typography variant="h5">
                                    {item.billing.firstName} {item.billing.lastName}
                                </Typography>
                            </Grid>
                            <Grid xs={sx ? 12 : 3} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {sx && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.phone_number}:
                                    </Typography>
                                )}
                                <Typography variant="h5">{item.billing.phone}</Typography>
                            </Grid>
                            <Grid xs={sx ? 12 : 3} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {sx && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.email}:
                                    </Typography>
                                )}
                                <Typography variant="h5">{item.emailAddress}</Typography>
                            </Grid>
                            <Grid xs={sx ? 12 : 1} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {sx && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.country}:
                                    </Typography>
                                )}
                                <Typography variant="h5">{item.billing.country}</Typography>
                            </Grid>

                            <Grid xs={sx ? 12 : 1} sx={{ ml: 'auto', p: 1, borderTop: sx ? '1px solid #ccc' : '' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton
                                        sx={{ border: '1px solid #ccc' }}
                                        size="small"
                                        onClick={() => {
                                            navigate(`/store-market/${storeCode}/orders)`);
                                        }}
                                        disabled
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default CustomersCards;
