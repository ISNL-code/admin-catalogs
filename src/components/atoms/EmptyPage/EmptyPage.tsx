import { Box, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const EmptyPage = ({ isShown = true }) => {
    const { string }: any = useOutletContext();

    if (isShown)
        return (
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    position: 'fixed',
                    width: '100vw',
                    display: 'flex',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    gap: 1,
                    pointerEvents: 'none',
                }}
            >
                <SearchIcon sx={{ fontSize: 100 }} />
                <Typography variant="h3">{string?.nothing_was_found}</Typography>
            </Box>
        );
    return null;
};

export default EmptyPage;
