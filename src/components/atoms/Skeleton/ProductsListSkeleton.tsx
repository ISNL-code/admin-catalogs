import { Box, Skeleton as SkeletonBase } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';

const ProductsListSkeleton = ({ width = '100%' }: { width?: string | number }) => {
    const { sx } = useDevice();

    return (
        <Box sx={{ width: width }}>
            <Grid container xs={12}>
                {[...Array(25)].map((_, idx) => (
                    <Grid key={idx} xs={12}>
                        <SkeletonBase
                            sx={{ opacity: 0.5, mb: sx ? 2 : 0.25 }}
                            variant="rounded"
                            width={'100%'}
                            height={sx ? 100 : 50}
                            animation="wave"
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductsListSkeleton;
