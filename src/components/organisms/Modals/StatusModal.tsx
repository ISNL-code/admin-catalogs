import { TextField } from '@mui/material';
import ModalWindow from 'components/molecules/ModalWindow/ModalWindow';
import { useState } from 'react';

export default function StatusModal({ string, close, action }) {
    const [value, setValue] = useState('');
    return (
        <>
            <ModalWindow
                type={'warning'}
                title={string?.change_status}
                text={''}
                actionTitle={string?.change}
                secondaryTitle={string?.cancel}
                secondaryAction={() => close()}
                closeAction={() => close()}
                primaryAction={() => {
                    action(value);
                    close();
                }}
            >
                <TextField
                    variant="standard"
                    size="small"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    fullWidth
                    sx={{ my: 2 }}
                    placeholder={string?.leave_the_comment}
                />
            </ModalWindow>
        </>
    );
}
