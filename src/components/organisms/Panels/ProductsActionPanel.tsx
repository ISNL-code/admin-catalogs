import { Box } from '@mui/material';
import ActionIconButton from 'components/atoms/Buttons/ActionIconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { useOutletContext } from 'react-router-dom';

const ProductsActionPanel = ({ button }) => {
    const { string }: any = useOutletContext();

    const isShown = title => button.find(({ name }) => name === title)?.name;
    const disabled = title => button.find(({ name }) => name === title)?.disabled;
    const action = title => button.find(({ name }) => name === title)?.action();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            {isShown('find') && (
                <ActionIconButton
                    color="default"
                    title={string?.find}
                    icon={props => <SearchIcon {...props} />}
                    action={() => action('find')}
                    active={!disabled('find')}
                    disabled={disabled('find')}
                />
            )}
            {isShown('create') && (
                <ActionIconButton
                    color="success"
                    title={string?.create}
                    icon={props => <AddCircleOutlineIcon  {...props} />}
                    action={() => action('create')}
                    active={!disabled('create')}
                    disabled={disabled('create')}
                />
            )}
        </Box>
    );
};

export default ProductsActionPanel;
