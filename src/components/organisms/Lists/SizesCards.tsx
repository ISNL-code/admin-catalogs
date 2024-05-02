import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Box, IconButton, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import DeleteModal from 'components/organisms/Modals/DeleteModal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { OptionsValueInterface, RetailerContextInterface } from 'types';
import SizesIndicatorButton from 'components/atoms/SizesIndicatorButton/SizesIndicatorButton';

interface CardsInterface {
    data: OptionsValueInterface[] | null;
    deleteItem;
    setDataList;
}

const SizesCards = ({ data, deleteItem, setDataList }: CardsInterface) => {
    const { storeCode } = useParams();
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    const { sx } = useDevice();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<null | number>(null);

    if (!data) return <></>;

    return (
        <>
            {openModal && (
                <DeleteModal
                    close={() => setOpenModal(false)}
                    string={string}
                    text={string?.do_you_want_to_delete_size}
                    action={() =>
                        deleteItem({ id: selectedItemId, storeCode })
                            .then(res => {
                                if (res.status === 200) toast.success(string?.deleted);
                                setDataList(prev => prev.filter(el => el.id !== selectedItemId));
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(string?.attached_to_the_product_deletion_is_not_possible);
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
                    <Grid xs={1} sx={{ ml: 'auto', p: 1, borderTop: sx ? '1px solid #ccc' : '' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            ID
                        </Typography>
                    </Grid>
                    <Grid xs={2} sx={{ ml: 'auto', p: 1, borderTop: sx ? '1px solid #ccc' : '' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.label}:
                        </Typography>
                    </Grid>
                    <Grid xs={3.5} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.code}:
                        </Typography>
                    </Grid>
                    <Grid xs={3.5} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.name} {storeData?.defaultLanguage.toUpperCase()}
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
                        <Grid xs={sx ? 12 : 1} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                            {sx && (
                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                    ID:
                                </Typography>
                            )}
                            <Typography variant="h5">{item.id}</Typography>
                        </Grid>
                        <Grid xs={sx ? 12 : 2} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                            <SizesIndicatorButton label={item.code} size={sx ? 24 : 32} disabled />
                        </Grid>
                        <Grid xs={sx ? 12 : 3.5} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                            {sx && (
                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                    {string?.code}:
                                </Typography>
                            )}
                            <Typography variant="h5">{item.code}</Typography>
                        </Grid>
                        <Grid xs={sx ? 12 : 3.5} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                            {sx && (
                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                    {string?.name} {storeData?.defaultLanguage.toUpperCase()}
                                </Typography>
                            )}
                            <Typography variant="h5">
                                {item.descriptions.find(el => el.language === storeData?.defaultLanguage)?.name}
                            </Typography>
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
                                        navigate(`/store-inventory/${storeCode}/options/sizes/${item?.id}/edit`);
                                    }}
                                >
                                    <ModeEditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    sx={{ border: '1px solid #ccc' }}
                                    size="small"
                                    onClick={() => {
                                        setOpenModal(true);
                                        setSelectedItemId(item?.id);
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

export default SizesCards;
