import ModalWindow from 'components/molecules/ModalWindow/ModalWindow';

export default function DeleteModal({ string, close, text, action }) {
    return (
        <>
            <ModalWindow
                type={'warning'}
                title={string?.remove}
                text={text}
                actionTitle={string?.delete}
                secondaryTitle={string?.cancel}
                secondaryAction={() => close()}
                closeAction={() => close()}
                primaryAction={() => {
                    action();
                    close();
                }}
            >
                <></>
            </ModalWindow>
        </>
    );
}
