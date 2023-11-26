import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'components/atoms/Media/Image';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useStoresApi } from 'api/useStoresApi';
import Loader from 'components/atoms/Loader/Loader';
import DeleteModal from 'components/organisms/Modals/DeleteModal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { StoreInterface } from 'types';

interface StoresCardsInterface {
    data: StoreInterface[] | null;
    updateStoreDataRes;
    updateAdminStoreAccess;
}

const StoresCards = ({ data, updateStoreDataRes, updateAdminStoreAccess }: StoresCardsInterface) => {
    const { string }: any = useOutletContext();
    const navigate = useNavigate();
    const { xs, sx, ls } = useDevice();
    const [openModal, setOpenModal] = useState(false);
    const [selectedStoreCode, setSelectedStoreCode] = useState<string>('');

    const { mutateAsync: deleteStore, isLoading } = useStoresApi().useDeleteStore();

    const getWidth = () => {
        if (xs) return 12; //475
        if (sx) return 6; //900
        if (ls) return 4; //1240
        return 2;
    };

    return (
        <>
            {isLoading && <Loader />}
            {openModal && (
                <DeleteModal
                    close={() => setOpenModal(false)}
                    string={string}
                    text={string?.do_you_want_to_delete_store}
                    action={() =>
                        deleteStore({ storeCode: selectedStoreCode })
                            .then(res => {
                                if (res.status === 200) toast.success(string?.deleted);
                                updateStoreDataRes();
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
                            })
                    }
                />
            )}
            <Grid container m={0} xs={12} spacing={1}>
                <Grid xs={getWidth()}>
                    <Box
                        p={1}
                        onClick={() => {
                            navigate('/admin/store/create');
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#1976d2',
                            height: '100%',
                            borderRadius: 2,
                            cursor: 'pointer',
                        }}
                    >
                        <Box
                            mr={1}
                            sx={{
                                width: '25px',
                                height: '25px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid #fff',
                                borderRadius: '50%',
                            }}
                        >
                            <Typography variant="h5" sx={{ color: 'white' }}>
                                +
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ color: 'white' }}>
                            {string?.create_new_store}
                        </Typography>
                    </Box>
                </Grid>
                {data?.map(item => (
                    <Grid key={item.id} xs={getWidth()}>
                        <Box sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
                            <Box
                                onClick={() => {
                                    navigate(`/store-manager/${item.code}/main`);
                                }}
                                py={1}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                }}
                            >
                                <Box sx={{ width: '25%' }}>
                                    <Image width={1} height={1} imgUrl={item?.logo?.path as any} />
                                </Box>
                                <Typography variant="h3">{item.name}</Typography>
                            </Box>
                            <Box
                                p={1}
                                sx={{
                                    borderTop: '1px solid #ccc',
                                    display: 'flex',
                                    gap: 0.5,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <IconButton
                                    sx={{
                                        border: '1px solid #ccc',
                                        backgroundColor: '#e6ffdf',
                                        '&:hover': { backgroundColor: '#e6ffdf' },
                                    }}
                                    size="small"
                                    onClick={() => {}}
                                >
                                    <PowerSettingsNewIcon fontSize="small" color="success" />
                                </IconButton>
                                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'space-between' }}>
                                    <IconButton
                                        sx={{ border: '1px solid #ccc' }}
                                        size="small"
                                        onClick={() => navigate(`store/manage/${item.code}/main`)}
                                    >
                                        <ModeEditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        sx={{ border: '1px solid #ccc' }}
                                        size="small"
                                        onClick={() => {
                                            setOpenModal(true);
                                            setSelectedStoreCode(item.code);
                                        }}
                                    >
                                        <DeleteForeverIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default StoresCards;
