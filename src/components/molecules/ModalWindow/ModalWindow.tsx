import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWindowInterface {
    children;
    type?: string;
    primaryAction: () => void;
    title?: string;
    text?: string;
    actionTitle: any;
    secondaryTitle?: string;
    secondaryAction?: () => void;
    closeAction?: () => void;
    withClose?: boolean;
}

const ModalWindow = ({
    children,
    type = '',
    primaryAction,
    title,
    text = '',
    actionTitle,
    secondaryTitle = '',
    secondaryAction = () => {},
    closeAction = () => {},
    withClose = true,
}: ModalWindowInterface) => {
    const headerColor = () => {
        if (type === 'warning') return 'linear-gradient(to right , #ed6c02 40%, #f08c52 65%, #ffb388);';
        if (type === 'error') return 'linear-gradient(to right , #ed2502 40%, #f07252 65%, #ffa088);';
        if (type === 'success') return 'linear-gradient(to right , green 40%, #30a72c 65%, #07c500);';
        return 'linear-gradient(to right , #1976d2 40%, #5ea1e4 65%, #5daeff);';
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                position: 'fixed',
                zIndex: 2000,
                left: 0,
                top: 0,
                backgroundColor: 'rgba(131, 131, 131, 0.863)',
            }}
            onClick={e => {
                e.stopPropagation();
                closeAction();
            }}
        >
            <Box
                onClick={e => {
                    e.stopPropagation();
                    closeAction();
                }}
                pb={4}
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    minHeight: `calc(100vh - 200px)`,
                    display: 'flex',
                    alignItems: 'center',
                    px: 3,
                }}
            >
                <Box
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    sx={{
                        backgroundColor: '#fff',
                        width: '100%',
                        maxWidth: 500,
                        minHeight: 140,
                        borderRadius: 4,
                        overflow: 'hidden',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        px={1}
                        sx={{
                            width: '100%',
                            height: 34,
                            background: headerColor(),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        {withClose && (
                            <IconButton
                                sx={{
                                    p: 0.25,
                                    border: '1px solid #ccc',
                                    background: '#fff',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                    },
                                }}
                                onClick={() => {
                                    closeAction();
                                }}
                                size="small"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                    {(text || title) && (
                        <Box p={1.5} px={2} sx={{ flexGrow: 1 }}>
                            {title && (
                                <Typography mb={2} variant="h3">
                                    {title}
                                </Typography>
                            )}
                            {text && (
                                <Typography variant="h4" sx={{ mb: 4 }}>
                                    {text}
                                </Typography>
                            )}
                            {children}
                        </Box>
                    )}
                    <Box px={2} pb={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        {secondaryTitle && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    secondaryAction();
                                }}
                            >
                                {secondaryTitle}
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            onClick={() => {
                                primaryAction();
                            }}
                        >
                            {actionTitle}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ModalWindow;
