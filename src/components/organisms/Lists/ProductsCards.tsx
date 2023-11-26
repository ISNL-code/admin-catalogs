import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Box, IconButton, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import DeleteModal from 'components/organisms/Modals/DeleteModal';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { ProductListInterface } from 'types';
import ProductsListSkeleton from 'components/atoms/Skeleton/ProductsListSkeleton';

interface ProductsCardsInterface {
    data: ProductListInterface[] | null;
    updateProductsListData;
    deleteProduct;
    switchProduct;
}

const ProductsCards = ({ data, updateProductsListData, deleteProduct, switchProduct }: ProductsCardsInterface) => {
    const { storeCode } = useParams();
    const { string }: any = useOutletContext();
    const { sx } = useDevice();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | number>('');

    if (!data) return <ProductsListSkeleton />;

    return (
        <>
            {openModal && (
                <DeleteModal
                    close={() => setOpenModal(false)}
                    string={string}
                    text={string?.do_you_want_to_delete_product}
                    action={() =>
                        deleteProduct({ storeCode, id: selectedProductId })
                            .then(res => {
                                if (res.status === 200) toast.success(string?.deleted);
                                updateProductsListData();
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
                    <Grid xs={3} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.description}:
                        </Typography>
                    </Grid>
                    <Grid xs={7} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2 }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.vendor_code}:
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
                        <Grid xs={sx ? 12 : 3} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2, flexWrap: 'wrap' }}>
                            {sx && (
                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                    {string?.description}:
                                </Typography>
                            )}
                            <Typography variant="h5">{item.description?.name}</Typography>
                        </Grid>
                        <Grid xs={sx ? 12 : 7} sx={{ p: 1, display: 'flex', gap: sx ? 0.5 : 2 }}>
                            {sx && (
                                <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                    {string?.vendor_code}:
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {item.variants?.map((el, idx) => (
                                    <Fragment key={el.id}>
                                        <Typography variant="h5">{el.sku}</Typography>
                                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                            {item.variants.length - idx === 1 ? '' : '/'}
                                        </Typography>
                                    </Fragment>
                                ))}
                            </Box>
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
                                    sx={{
                                        mr: sx ? 'auto' : '',
                                        border: '1px solid #ccc',
                                        backgroundColor: item.available ? '#e6ffdf' : '#ffdfdf',
                                        '&:hover': { backgroundColor: item.available ? '#e6ffdf' : '#ffdfdf' },
                                    }}
                                    size="small"
                                    onClick={() => {
                                        switchProduct({
                                            id: item.id,
                                            complete: !item.available,
                                        }).then(() => updateProductsListData());
                                    }}
                                >
                                    <PowerSettingsNewIcon
                                        fontSize="small"
                                        color={item.available ? 'success' : 'error'}
                                    />
                                </IconButton>
                                <IconButton
                                    sx={{ border: '1px solid #ccc' }}
                                    size="small"
                                    onClick={() => {
                                        navigate(`/store-inventory/${storeCode}/products/${item.id}/main`);
                                    }}
                                >
                                    <ModeEditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    sx={{ border: '1px solid #ccc' }}
                                    size="small"
                                    onClick={() => {
                                        setOpenModal(true);
                                        setSelectedProductId(item.id);
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

export default ProductsCards;
