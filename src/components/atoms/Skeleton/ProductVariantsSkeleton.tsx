import { Box, Skeleton as SkeletonBase } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';

const ProductVariantsSkeleton = ({ width = '100%' }: { width?: string | number }) => {
    const { sx } = useDevice();

    return (
        <Box sx={{ width: width }}>
            <Grid container xs={12}>
                {[...Array(5)].map((_, idx) => (
                    <Grid key={idx} xs={12}>
                        <SkeletonBase
                            sx={{ opacity: 0.5, mb: sx ? 2 : 1 }}
                            variant="rounded"
                            width={'100%'}
                            height={250}
                            animation="wave"
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductVariantsSkeleton;
