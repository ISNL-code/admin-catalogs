import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

interface SearchInputInterface {
    setValue;
    setPage;
}

const SearchInput = ({ setValue, setPage }: SearchInputInterface) => {
    const [inputValue, setInputValue] = useState('');
    const { string }: any = useOutletContext();
    return (
        <Box sx={{ display: 'flex' }}>
            <TextField
                size="small"
                onChange={e => {
                    if (!e.target.value) {
                        setValue('');
                        setPage(0);
                    }
                    setInputValue(e.target.value);
                }}
                onKeyDown={(e: any) => {
                    if (e.code === 'Enter') {
                        setPage(0);
                        setValue(inputValue);
                    }
                }}
                value={inputValue}
                margin="dense"
                id="name"
                placeholder={string?.search_by_sku}
                variant="outlined"
                sx={{
                    '.MuiInputBase-root': { p: 0 },
                    '.MuiInputBase-input': {
                        px: 1,
                        borderRight: '1px solid #ccc',
                        borderLeft: '1px solid #ccc',
                        borderRadius: 'none',
                    },
                    width: '100%',
                    maxWidth: 500,
                    ml: 'auto',
                }}
                InputProps={{
                    startAdornment: (
                        <Button
                            onClick={() => {
                                setValue(_ => inputValue);
                            }}
                            variant="contained"
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                px: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                boxShadow: '0 0 0 0',
                                border: 'none',
                                minWidth: 45,
                            }}
                        >
                            <SearchIcon />
                        </Button>
                    ),
                    endAdornment: (
                        <Button
                            onClick={() => {
                                setInputValue('');
                                setValue(_ => '');
                            }}
                            variant="contained"
                            color="inherit"
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                px: 0,
                                borderTopLeftRadius: 0,
                                borderBottomRLeftRadius: 0,
                                boxShadow: '0 0 0 0',
                                border: 'none',
                                minWidth: 45,
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchInput;
