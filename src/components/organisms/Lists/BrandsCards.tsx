import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Box, IconButton, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import DeleteModal from 'components/organisms/Modals/DeleteModal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BrandsInterface } from 'types';
import ProductsListSkeleton from 'components/atoms/Skeleton/ProductsListSkeleton';

interface BrandsCardsInterface {
    data: BrandsInterface[] | null;
    deleteBrand;
    setBrandsList;
    setTotalCount;
}

const BrandsCards = ({ data, setTotalCount, deleteBrand, setBrandsList }: BrandsCardsInterface) => {
    const { storeCode } = useParams();
    const { string }: any = useOutletContext();
    const { sx } = useDevice();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedBrandId, setSelectedBrandId] = useState<null | number>(null);

    if (!data) return <ProductsListSkeleton />;

    return (
        <>
            {openModal && (
                <DeleteModal
                    close={() => setOpenModal(false)}
                    string={string}
                    text={string?.do_you_want_to_delete_brand}
                    action={() =>
                        deleteBrand({ id: selectedBrandId })
                            .then(res => {
                                if (res.status === 200) toast.success(string?.deleted);
                                setBrandsList(prev => prev.filter(el => el.id !== selectedBrandId));
                                setTotalCount(prev => prev - 1);
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
                            })
                    }
                />
            )}
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
                    <Grid xs={2} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            ID
                        </Typography>
                    </Grid>
                    <Grid xs={4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.code}
                        </Typography>
                    </Grid>
                    <Grid xs={4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.name} UA
                        </Typography>
                    </Grid>

                    <Grid xs={2} sx={{ ml: 'auto', p: 1, borderTop: sx ? '1px solid #ccc' : '' }}></Grid>
                </Grid>
            )}
            <Grid container xs={12}>
                {data?.map((item, idx) => (
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
                        <Grid xs={sx ? 12 : 2} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                            {sx && (
                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                    ID:
                                </Typography>
                            )}
                            <Typography variant="h5">{item.id}</Typography>
                        </Grid>
                        <Grid xs={sx ? 12 : 4} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                            {sx && (
                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                    {string?.id}:
                                </Typography>
                            )}
                            <Typography variant="h5">{item.code}</Typography>
                        </Grid>
                        <Grid xs={sx ? 12 : 4} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                            {sx && (
                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                    {string?.name} UA:
                                </Typography>
                            )}
                            <Typography variant="h5">{item.description.name}</Typography>
                        </Grid>

                        <Grid xs={sx ? 12 : 2} sx={{ ml: 'auto', p: 1, borderTop: sx ? '1px solid #ccc' : '' }}>
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
                                        navigate(`/store-inventory/${storeCode}/brands/${item.id}/edit`);
                                    }}
                                >
                                    <ModeEditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    sx={{ border: '1px solid #ccc' }}
                                    size="small"
                                    onClick={() => {
                                        setOpenModal(true);
                                        setSelectedBrandId(item?.id);
                                    }}
                                >
                                    <DeleteForeverIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default BrandsCards;
