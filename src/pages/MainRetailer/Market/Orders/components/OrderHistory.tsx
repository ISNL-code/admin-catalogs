import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { useGetStatusParams } from 'hooks/useGetStatusParams';

const OrderHistory = ({ orderHistory }) => {
    const { handleGetStatusParams } = useGetStatusParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();

    return (
        <Grid
            p={2}
            container
            xs={12}
            sx={{
                border: '1px solid #ccc',
                borderRadius: sx ? 2 : 0,
                alignItems: 'center',
            }}
        >
            <Grid xs={12} p={1}>
                <Typography variant="h3">{string?.order_history}</Typography>
            </Grid>
            {orderHistory?.map(item => {
                const status = handleGetStatusParams(item?.orderStatus, string);
                return (
                    <Grid key={item.id} container xs={12} p={1} mt={1}>
                        <Grid xs="auto" sx={{ minWidth: '100px' }}>
                            <Typography sx={{ color: status?.color }}>{status?.name}</Typography>
                        </Grid>
                        <Grid xs="auto">
                            <Typography sx={{ width: '100px' }}>
                                {new Date(item?.date).toLocaleDateString('en-GB')}
                            </Typography>
                        </Grid>
                        {item.comments && (
                            <Grid p={2} mt={1} xs={12} sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
                                <Typography variant="h4">{item.comments}</Typography>
                            </Grid>
                        )}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default OrderHistory;
