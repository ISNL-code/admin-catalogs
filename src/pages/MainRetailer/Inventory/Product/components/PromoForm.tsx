import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { OptionsValueInterface, ProductAttrOptionsInterface, RetailerContextInterface } from 'types';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
interface PromoFormInterface {
    optionsData: OptionsValueInterface[];
    productOptions: ProductAttrOptionsInterface[];
    addProductAttribute;
    deleteProductAttribute;
    refreshProductOptions;
}

const PromoForm = ({
    optionsData,
    productOptions,
    addProductAttribute,
    deleteProductAttribute,
    refreshProductOptions,
}: PromoFormInterface) => {
    const navigate = useNavigate();
    const { productId, storeCode } = useParams();
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    return (
        <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
            <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="h3">{string?.promo}:</Typography>
                {storeData?.additionalStoreSettings?.promo ? (
                    <Typography>({string?.click_to_choose})</Typography>
                ) : (
                    <Typography>({string?.option_not_available})</Typography>
                )}
                <Button
                    variant="contained"
                    sx={{ borderRadius: '50%', minWidth: 28, height: 28, p: 0 }}
                    onClick={() => navigate(`/store-inventory/${storeCode}/options/promos/create`)}
                    disabled={!storeData?.additionalStoreSettings?.promo}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ display: 'flex', gap: 1, width: '100%', overflow: 'auto' }}>
                    {optionsData?.map(el => {
                        const selected = productOptions.find(opt => opt.optionValue.code === el.code);
                        return (
                            <Box
                                my={2}
                                key={el.id}
                                onClick={() => {
                                    if (selected) {
                                        deleteProductAttribute({ productId, attrId: selected?.id, storeCode })
                                            .then(_ => {
                                                refreshProductOptions();
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                toast.error(err.message);
                                            });
                                    } else {
                                        addProductAttribute({
                                            productId,
                                            storeCode,
                                            data: {
                                                option: {
                                                    code: `PROMO`,
                                                },
                                                optionValue: {
                                                    code: el.code,
                                                },
                                            },
                                        })
                                            .then(_res => {
                                                refreshProductOptions();
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                toast.error(err.message);
                                            });
                                    }
                                }}
                            >
                                <PromoTags
                                    key={el.id}
                                    size={30}
                                    selected={!!selected}
                                    value={el.name || el.code}
                                    code={el.code}
                                />
                            </Box>
                        );
                    })}
                </Box>
            </Grid>
        </Grid>
    );
};

export default PromoForm;
