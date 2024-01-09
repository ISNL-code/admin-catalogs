import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { OptionsValueInterface, ProductAttrOptionsInterface } from 'types';
import SizesIndicatorButton from 'components/atoms/SizesIndicatorButton/SizesIndicatorButton';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';

interface SizeFormInterface {
    optionsData: OptionsValueInterface[];
    productOptions: ProductAttrOptionsInterface[];
    addProductAttribute;
    deleteProductAttribute;
    refreshProductOptions;
}

const SizesForm = ({
    optionsData,
    productOptions,
    addProductAttribute,
    deleteProductAttribute,
    refreshProductOptions,
}: SizeFormInterface) => {
    const navigate = useNavigate();
    const { productId, storeCode } = useParams();
    const { string }: any = useOutletContext();

    return (
        <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
            <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="h3">{string?.sizes}:</Typography>
                <Typography>({string?.click_to_choose})</Typography>
                <Button
                    variant="contained"
                    sx={{ borderRadius: '50%', minWidth: 28, height: 28, p: 0 }}
                    onClick={() => navigate(`/store-inventory/${storeCode}/options/sizes/create`)}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ display: 'flex', gap: 1, width: '100%', overflow: 'auto' }}>
                    {optionsData?.map(el => {
                        const selected = productOptions?.find(opt => opt.optionValue.code === el.code);
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
                                                    code: `SIZE`,
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
                                <SizesIndicatorButton size={36} label={el.code} selected={!!selected} />
                            </Box>
                        );
                    })}
                </Box>
            </Grid>
        </Grid>
    );
};

export default SizesForm;
