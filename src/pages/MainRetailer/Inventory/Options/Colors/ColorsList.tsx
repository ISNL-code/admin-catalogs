import { Box } from '@mui/material';
import { useOptionsApi } from 'api/useOptionsApi';
import { useVariationsApi } from 'api/useVariationsApi';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import ColorsCards from 'components/organisms/Lists/ColorsCards';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { OptionsVariationInterface, RetailerContextInterface } from 'types';

interface InventoryColorsInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const ColorsList = ({ handleSetTitle, handleSetActionButtons }: InventoryColorsInterface) => {
    const navigate = useNavigate();
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    const { storeCode } = useParams();
    const [dataList, setDataList] = useState<OptionsVariationInterface[] | any>(null);
    const { mutateAsync: deleteValue, isLoading: loadDeleteValue } = useOptionsApi().useDeleteValue();
    const { mutateAsync: deleteVariation, isLoading: loadDeleteVariation } = useVariationsApi().useDeleteVariation();

    const {
        data: dataRes,
        isFetching,
        isFetched,
    } = useVariationsApi().useGetListOfVariations({ storeCode, lang: storeData?.defaultLanguage });

    useEffect(() => {
        if (!dataRes || isFetching) return;

        setDataList(
            dataRes.data.items.map(el => {
                return { ...el.optionValue, colorId: el.optionValue.id, variationId: el.id };
            })
        ); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataRes, storeData?.defaultLanguage]);

    useEffect(() => {
        handleSetTitle(string?.colors);
        handleSetActionButtons([
            {
                name: 'create',
                disabled: false,
                action: () => {
                    navigate(`/store-inventory/${storeCode}/options/colors/create`);
                },
            },
        ]); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box mt={1}>
            {(isFetching || loadDeleteValue || loadDeleteVariation) && <Loader />}
            {!dataList?.length && !isFetching && isFetched && <EmptyPage />}

            <Box>
                <ColorsCards
                    data={dataList}
                    deleteVariation={deleteVariation}
                    deleteColor={deleteValue}
                    setDataList={setDataList}
                />
            </Box>
        </Box>
    );
};

export default ColorsList;
