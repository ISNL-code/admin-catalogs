import Logout from 'components/organisms/Modals/Logout';

interface ModalsInterface {
    string;
    setAuth;
    openModalType;
    setOpenModalType;
}

const ModalsSelector = ({ string, setAuth, openModalType, setOpenModalType }: ModalsInterface) => {
    return (
        <>
            {openModalType === 'logout' && (
                <Logout setAuth={setAuth} string={string} close={() => setOpenModalType(null)} />
            )}
        </>
    );
};

export default ModalsSelector;
