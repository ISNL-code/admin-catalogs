import { Box } from '@mui/material';
import ActionIconButton from 'components/atoms/Buttons/ActionIconButton';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { useOutletContext } from 'react-router-dom';

const ActionPanel = ({ button }) => {
    const { string }: any = useOutletContext();

    const isShown = title => button.find(({ name }) => name === title)?.name;
    const disabled = title => button.find(({ name }) => name === title)?.disabled;
    const action = title => button.find(({ name }) => name === title)?.action();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            {isShown('cancel') && (
                <ActionIconButton
                    color="warning"
                    title={string?.back}
                    icon={props => <FastRewindIcon {...props} />}
                    action={() => action('cancel')}
                    active={!disabled('cancel')}
                    disabled={disabled('cancel')}
                />
            )}
            {isShown('save') && (
                <ActionIconButton
                    color="success"
                    title={string?.save}
                    icon={props => <SaveIcon {...props} />}
                    action={() => action('save')}
                    active={!disabled('save')}
                    disabled={disabled('save')}
                />
            )}
            {isShown('create') && (
                <ActionIconButton
                    color="primary"
                    title={string?.create}
                    icon={props => <AddCircleOutlineIcon {...props} />}
                    action={() => action('create')}
                    active={!disabled('create')}
                    disabled={disabled('create')}
                />
            )}
        </Box>
    );
};

export default ActionPanel;
