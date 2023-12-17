import { Box, Button, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from '../Loader/Loader';

const LoadMoreButton = ({ setCurrentPage, totalCount, loadProducts, productsList, page, totalPages, countPerPage }) => {
    const { string }: any = useOutletContext();
    const { sx } = useDevice();
    const ref = useRef(null);

    return (
        <>
            {loadProducts && <Loader position="fixed" />}
            {countPerPage < totalCount && (
                <Box
                    ref={ref}
                    mt={sx ? 0 : 1}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Typography sx={{ color: 'grey' }}>
                        {productsList?.length} {string?.out_of} {totalCount} {string?.items}
                    </Typography>

                    <Button
                        sx={{
                            px: 3,
                            py: 1,
                            width: 250,
                            color: loadProducts ? '#ccc' : '',
                            borderColor: loadProducts ? '#ccc' : '',
                            cursor: loadProducts ? 'default' : 'pointer',
                            '&:hover': {
                                color: loadProducts ? '#ccc' : '',
                                borderColor: loadProducts ? '#ccc' : '',
                            },
                            fontSize: '14px',
                            borderRadius: 16,
                            textTransform: 'capitalize',
                        }}
                        variant="contained"
                        onClick={() => setCurrentPage(1)}
                        color="primary"
                        disabled={!productsList?.length || totalPages === page + 1}
                    >
                        {loadProducts ? string?.loading + '...' : string?.load_more}
                    </Button>
                </Box>
            )}
        </>
    );
};

export default LoadMoreButton;
