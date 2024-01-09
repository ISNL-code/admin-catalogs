import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import { useDevice } from 'hooks/useDevice';
import toast from 'react-hot-toast';
import { RetailerContextInterface } from 'types';
import DeleteModal from 'components/organisms/Modals/DeleteModal';

const Categories = ({
    category,
    setSelectedCategory,
    deleteCategory,
    updateCategoryList,
    selectedCategory,
    setMode,
    handleSetInitValues,
}) => {
    const { storeCode } = useParams();
    const { xxs } = useDevice();
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    const [expand, setExpand] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            {openModal && (
                <DeleteModal
                    close={() => setOpenModal(false)}
                    string={string}
                    text={string?.do_you_want_to_delete_category}
                    action={() => {
                        if (!expand) return;
                        deleteCategory({ storeCode, categoryId: selectedId })
                            .then(_ => toast.success(string?.deleted))
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
                            })
                            .finally(_ => updateCategoryList());
                    }}
                />
            )}
            <Box mb={expand ? 0 : 1} sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                    <Box
                        sx={{
                            p: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            pl: 2,
                            border: '1px solid #ccc',
                            width: '100%',
                            maxWidth: xxs ? 215 : 300,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, #a3cbff 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
                        }}
                    >
                        <Typography variant="h4">{category.description.name}</Typography>
                        <Box>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    setSelectedCategory(category);
                                }}
                                disabled={selectedCategory?.id === category?.id}
                            >
                                <EditIcon color={selectedCategory?.id === category?.id ? 'disabled' : 'action'} />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    setOpenModal(true);
                                    setSelectedId(category.id);
                                }}
                                disabled={selectedCategory?.id === category?.id}
                            >
                                <DeleteForeverIcon
                                    color={selectedCategory?.id === category?.id ? 'disabled' : 'action'}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <IconButton onClick={() => setExpand(!expand)}>
                        {expand ? <ExpandLessIcon color="action" /> : <ExpandMoreIcon color="action" />}
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        height: expand ? 44 * category.children.length + 44 : 0,
                        transition: 'height 250ms cubic-bezier(1, 0.7, 0.2, 1)',
                    }}
                >
                    <Box
                        sx={{
                            opacity: expand ? 1 : 0,
                            transition: 'opacity 200ms cubic-bezier(1, 0.7, 0.2, 1)',
                            position: 'relative',
                        }}
                    >
                        <Box sx={{ position: 'absolute', borderLeft: '1px solid #ccc', height: '44px', ml: 3 }}>
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    border: '1px solid #ccc',
                                    backgroundColor: '#ccc',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    left: -6,
                                    top: 14,
                                }}
                            ></Box>
                        </Box>
                        <Box
                            ml={6}
                            my={expand ? 1 : 0}
                            sx={{
                                height: 36,
                                p: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid #ccc',
                                width: '100%',
                                maxWidth: xxs ? 215 : 300,
                                pl: 2,
                                borderRadius: 2,
                                background: `linear-gradient(135deg, #ccc 75%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
                            }}
                        >
                            <Typography variant="h4">{string?.add_category}</Typography>
                            <IconButton
                                disabled={!storeData?.mainStoreSettings?.categories}
                                size="small"
                                onClick={() => {
                                    setMode('edit');
                                    handleSetInitValues();
                                    setSelectedCategory(prev => {
                                        return { ...prev, parent: { id: category.id, code: category.code } };
                                    });
                                }}
                                sx={{ cursor: expand ? 'pointer' : 'default' }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {category.children.map(children => {
                        return (
                            <Box
                                key={children.id}
                                sx={{
                                    opacity: expand ? 1 : 0,
                                    transition: 'opacity 200ms cubic-bezier(1, 0.7, 0.2, 1)',
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        borderLeft: '1px solid #ccc',
                                        height: '44px',
                                        ml: 3,
                                        bottom: 0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            border: '1px solid #ccc',
                                            backgroundColor: '#ccc',
                                            borderRadius: '50%',
                                            position: 'absolute',
                                            left: -6,
                                            top: 20,
                                        }}
                                    ></Box>
                                </Box>
                                <Box
                                    ml={6}
                                    my={expand ? 1 : 0}
                                    sx={{
                                        p: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        border: '1px solid #ccc',
                                        width: '100%',
                                        maxWidth: xxs ? 215 : 300,
                                        pl: 2,
                                        borderRadius: 2,
                                        background: `linear-gradient(135deg, #7aac75 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
                                    }}
                                >
                                    <Typography variant="h4">{children.description.name}</Typography>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                if (!expand) return;
                                                setSelectedCategory(children);
                                            }}
                                            disabled={selectedCategory?.id === children?.id}
                                            sx={{ cursor: expand ? 'pointer' : 'default' }}
                                        >
                                            <EditIcon
                                                color={selectedCategory?.id === children?.id ? 'disabled' : 'action'}
                                            />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setSelectedId(children.id);
                                            }}
                                            disabled={selectedCategory?.id === children?.id}
                                            sx={{ cursor: expand ? 'pointer' : 'default' }}
                                        >
                                            <DeleteForeverIcon color="action" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </>
    );
};

export default Categories;
