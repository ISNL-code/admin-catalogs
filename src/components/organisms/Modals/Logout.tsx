import ModalWindow from 'components/molecules/ModalWindow/ModalWindow';
import { ACCESS_TOKEN_KEY } from 'constants/constants';

export default function Logout({ setAuth, string, close }) {
    return (
        <>
            <ModalWindow
                type={'warning'}
                title={string?.logout}
                text={string?.do_want_to_logout}
                actionTitle={string?.logout}
                secondaryTitle={string?.cancel}
                secondaryAction={() => close()}
                closeAction={() => close()}
                primaryAction={() => {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    setAuth(false);
                    close();
                }}
            >
                <></>
            </ModalWindow>
        </>
    );
}
