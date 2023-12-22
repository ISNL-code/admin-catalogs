import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { OptionsValueInterface, ProductAttrOptionsInterface } from 'types';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import toast from 'react-hot-toast';

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
    const { productId, storeCode } = useParams();
    const { string }: any = useOutletContext();
    return (
        <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
            <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="h3">{string?.promo}:</Typography>
                <Typography>({string?.click_to_choose})</Typography>
            </Grid>
            <Grid xs={12}>
                <Box my={2} sx={{ display: 'flex', gap: 1, width: '100%', overflow: 'auto' }}>
                    {optionsData?.map(el => {
                        const selected = productOptions.find(opt => opt.optionValue.code === el.code);
                        return (
                            <Box
                                key={el.id}
                                onClick={() => {
                                    if (selected) {
                                        deleteProductAttribute({ productId, attrId: selected?.id })
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
                                                    code: 'SIZE',
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
                                <PromoTags key={el.id} size={30} value={el.code} selected={!!selected} />
                            </Box>
                        );
                    })}
                </Box>
            </Grid>
        </Grid>
    );
};

export default PromoForm;
