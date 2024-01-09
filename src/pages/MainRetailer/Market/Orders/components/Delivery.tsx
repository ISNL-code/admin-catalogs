import { TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { useOutletContext } from 'react-router-dom';

const Delivery = ({ userFormData }) => {
    const { sx } = useDevice();
    const { string }: any = useOutletContext();

    return (
        <Grid
            p={1}
            container
            xs={12}
            sx={{
                border: '1px solid #ccc',
                borderRadius: sx ? 2 : 0,
                alignItems: 'center',
            }}
        >
            <Grid p={1} container xs={sx ? 12 : 6} spacing={2}>
                <Grid xs={12}>
                    <Typography variant="h3">{string?.customer}</Typography>
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData?.billing?.firstName || ''}
                        size="small"
                        label={string?.first_name}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData?.billing?.lastName || ''}
                        size="small"
                        label={string?.last_name}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData?.billing?.phone || ''}
                        size="small"
                        label={string?.phone_number}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData.emailAddress || ''}
                        size="small"
                        label={string?.email}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData.billing.company || ''}
                        size="small"
                        label={string?.company}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid p={1} container xs={sx ? 12 : 6} spacing={2}>
                <Grid xs={12}>
                    <Typography variant="h3">{string?.delivery}</Typography>
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData.delivery.firstName || ''}
                        size="small"
                        label={string?.first_name}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData.delivery.lastName || ''}
                        size="small"
                        label={string?.last_name}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData.delivery.phone || ''}
                        size="small"
                        label={string?.phone_number}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData.delivery.city || ''}
                        size="small"
                        label={string?.city}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={userFormData.delivery.address || ''}
                        size="small"
                        label={string?.delivery_address}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Delivery;
