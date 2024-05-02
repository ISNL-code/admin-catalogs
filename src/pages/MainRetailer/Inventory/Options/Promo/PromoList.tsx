import { Box } from '@mui/material';
import { useOptionsApi } from 'api/useOptionsApi';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import PromoCards from 'components/organisms/Lists/PromoCards';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { OptionsValueInterface, RetailerContextInterface } from 'types';

interface InventoryColorsInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const PromoList = ({ handleSetTitle, handleSetActionButtons }: InventoryColorsInterface) => {
    const navigate = useNavigate();
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    const { storeCode } = useParams();
    const [dataList, setDataList] = useState<OptionsValueInterface[] | any>(null);

    const { mutateAsync: deleteValue } = useOptionsApi().useDeleteValue();

    const {
        data: dataRes,
        isFetching,
        isFetched,
    } = useOptionsApi().useGetValuesList({ storeCode, page: 0, countPerPage: 500, lang: storeData?.defaultLanguage });

    useEffect(() => {
        if (!dataRes || isFetching) return;
        setDataList(dataRes.data.optionValues.filter(el => el.descriptions.some(el => el.description === `PROMO`)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataRes, isFetching]);

    useEffect(() => {
        handleSetTitle(string?.colors);
        handleSetActionButtons([
            {
                name: 'create',
                disabled: !storeData?.additionalStoreSettings?.promo,
                action: () => {
                    navigate(`/store-inventory/${storeCode}/options/promos/create`);
                },
            },
        ]); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeData]);

    return (
        <Box mt={1}>
            {isFetching && <Loader />}
            {!dataList?.length && !isFetching && isFetched && <EmptyPage />}

            <Box>
                <PromoCards data={dataList} deleteItem={deleteValue} setDataList={setDataList} />
            </Box>
        </Box>
    );
};

export default PromoList;
