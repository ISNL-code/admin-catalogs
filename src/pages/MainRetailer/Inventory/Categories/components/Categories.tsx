import { Box, IconButton, Typography } from '@mui/material';
import { useProductCategoriesApi } from 'api/useProductCategoriesApi';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { CategoryInterface } from 'types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Categories = ({ category }) => {
    const [expand, setExpand] = useState(false);

    return (
        <Box p={1} sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                        pl: 2,
                        border: '1px solid #ccc',
                        width: '100%',
                        maxWidth: 300,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, #a3cbff 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
                    }}
                >
                    <Typography variant="h4">{category.description.name}</Typography>
                    <IconButton>
                        <HighlightOffIcon color="action" />
                    </IconButton>
                </Box>
                <IconButton onClick={() => setExpand(!expand)}>
                    <ExpandMoreIcon color="action" />
                </IconButton>
            </Box>

            <Box
                sx={{
                    height: expand ? 50 * category.children.length + 8 : 0,
                    transition: 'height 250ms cubic-bezier(1, 0.7, 0.2, 1)',
                }}
            >
                {category.children.map(children => {
                    return (
                        <Box key={children.id} sx={{ opacity: expand ? 1 : 0 }}>
                            <Box
                                ml={6}
                                my={expand ? 1 : 0}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    border: '1px solid #ccc',
                                    width: '100%',
                                    maxWidth: 300,
                                    gap: 1,
                                    pl: 2,
                                    borderRadius: 4,
                                    background: `linear-gradient(135deg, #7aac75 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
                                }}
                            >
                                <Typography variant="h4">{children.description.name}</Typography>
                                <IconButton>
                                    <HighlightOffIcon color="action" />
                                </IconButton>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Categories;
