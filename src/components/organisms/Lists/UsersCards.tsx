import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Box, IconButton, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DeleteModal from 'components/organisms/Modals/DeleteModal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { UserListInterface } from 'types';

interface UsersCardsInterface {
    data: UserListInterface[];
    updateUsersListData;
    deleteUser;
    canEdit?: boolean;
}

const UsersCards = ({ data, updateUsersListData, deleteUser, canEdit }: UsersCardsInterface) => {
    const { string }: any = useOutletContext();
    const navigate = useNavigate();
    const { xs, sx, ls } = useDevice();
    const [openModal, setOpenModal] = useState(false);
    const [selectedStoreCode, setSelectedStoreCode] = useState<string>('');
    const [selectedUserId, setSelectedUserId] = useState<string | number>('');

    const getWidth = () => {
        if (xs) return 12; //475
        if (sx) return 6; //900
        if (ls) return 6; //1240
        return 3;
    };

    if (!data) <></>;

    return (
        <>
            {openModal && (
                <DeleteModal
                    close={() => setOpenModal(false)}
                    string={string}
                    text={string?.do_you_want_to_delete_user}
                    action={() =>
                        deleteUser({ storeCode: selectedStoreCode, userId: selectedUserId })
                            .then(res => {
                                if (res.status === 200) toast.success(string?.deleted);
                                updateUsersListData();
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
                            })
                    }
                />
            )}
            <Grid container xs={12} spacing={1} sx={{ m: 0 }}>
                {data?.map(item => (
                    <Grid key={item.id} xs={getWidth()}>
                        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#f3f3f378' }}>
                            <Box
                                p={1}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        {string?.first_name}:
                                    </Typography>
                                    <Typography variant="h5">{item.firstName}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        {string?.last_name}:
                                    </Typography>
                                    <Typography variant="h5">{item.lastName}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        {string?.email}:
                                    </Typography>
                                    <Typography variant="h5">{item.userName}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        {string?.phone_number}:
                                    </Typography>
                                    <Typography variant="h5">{item.contacts?.phone || '---'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        Viber:
                                    </Typography>
                                    <Typography variant="h5">{item.contacts?.viber || '---'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        WhatsApp:
                                    </Typography>
                                    <Typography variant="h5">{item.contacts?.whatsapp || '---'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        Telegram:
                                    </Typography>
                                    <Typography variant="h5">{item.contacts?.telegram || '---'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        {string?.manager}:
                                    </Typography>
                                    <Typography variant="h5">
                                        {item.options?.manager ? string?.yes : string?.no}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                    <Typography sx={{ width: '30%' }} variant="body1">
                                        {string?.language}:
                                    </Typography>
                                    <Typography variant="h5">
                                        <Typography variant="h5">
                                            {item?.defaultLanguage?.toUpperCase() || '---'}
                                        </Typography>
                                    </Typography>
                                </Box>
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
                                        backgroundColor: item.active ? '#e6ffdf' : '#ffdfdf',
                                        '&:hover': { backgroundColor: item.active ? '#e6ffdf' : '#ffdfdf' },
                                    }}
                                    size="small"
                                    onClick={() => {}}
                                    disabled={!canEdit}
                                >
                                    <PowerSettingsNewIcon fontSize="small" color={item.active ? 'success' : 'error'} />
                                </IconButton>
                                {canEdit && (
                                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'space-between' }}>
                                        <IconButton
                                            sx={{ border: '1px solid #ccc' }}
                                            size="small"
                                            onClick={() =>
                                                navigate(`/admin/store/manage/${item.merchant}/users/edit/${item.id}`)
                                            }
                                        >
                                            <ModeEditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            sx={{ border: '1px solid #ccc' }}
                                            size="small"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setSelectedStoreCode(item.merchant);
                                                setSelectedUserId(item.id);
                                            }}
                                        >
                                            <DeleteForeverIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default UsersCards;
