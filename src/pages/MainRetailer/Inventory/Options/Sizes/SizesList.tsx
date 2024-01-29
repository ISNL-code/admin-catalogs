import { Box } from '@mui/material';
import { useOptionsApi } from 'api/useOptionsApi';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import SizesCards from 'components/organisms/Lists/SizesCards';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { OptionsValueInterface } from 'types';

interface InventorySizesInterface {
    handleSetTitle;
    handleSetActionButtons;
}

const SizesList = ({ handleSetTitle, handleSetActionButtons }: InventorySizesInterface) => {
    const navigate = useNavigate();
    const { string, storeData }: any = useOutletContext();
    const { storeCode } = useParams();
    const [dataList, setDataList] = useState<OptionsValueInterface[] | any>(null);

    const { mutateAsync: deleteValue } = useOptionsApi().useDeleteValue();

    const {
        data: dataRes,
        isFetching,
        isFetched,
    } = useOptionsApi().useGetValuesList({ storeCode, page: 0, countPerPage: 500 });

    useEffect(() => {
        if (!dataRes || isFetching) return;
        setDataList(
            dataRes.data.optionValues
                .filter(el => el.descriptions.some(el => el.description === `SIZE`))
                .sort((a, b) => {
                    var regex = /[\d|,|.|e|E|]+/g;
                    return a.code.match(regex) - b.code.match(regex);
                })
        ); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataRes]);

    useEffect(() => {
        handleSetTitle(string?.sizes);
        handleSetActionButtons([
            {
                name: 'create',
                disabled: !storeData?.mainStoreSettings?.sizes,
                action: () => {
                    navigate(`/store-inventory/${storeCode}/options/sizes/create`);
                },
            },
        ]); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeData]);

    return (
        <Box mt={1}>
            {isFetching && <Loader />}
            {!dataList?.length && !isFetching && isFetched && <EmptyPage />}

            <Box>
                <SizesCards data={dataList} deleteItem={deleteValue} setDataList={setDataList} />
            </Box>
        </Box>
    );
};

export default SizesList;
