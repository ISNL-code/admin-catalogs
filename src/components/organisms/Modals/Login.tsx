import { InputAdornment, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUserApi } from 'api/useUserApi';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ACCESS_TOKEN_KEY } from 'constants/constants';
import Loader from 'components/atoms/Loader/Loader';
import ModalWindow from 'components/molecules/ModalWindow/ModalWindow';
import { useNavigate } from 'react-router-dom';

export default function Login({ string, setAuth, auth }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { mutateAsync: loginAdmin, isLoading } = useUserApi().useLogin();

    return (
        <>
            {!auth && (
                <>
                    <>{isLoading && <Loader />}</>
                    <ModalWindow
                        title={string?.welcome_to_Sales_Nest_to_get_started_login}
                        actionTitle={string?.login}
                        primaryAction={() => {
                            setValidate(true);
                            if (!/\S+@\S+\.\S+/.test(username) || !username.length || password.length < 8) return;
                            loginAdmin({ username: username.trim(), password })
                                .then(res => {
                                    if (res.data.token) {
                                        localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(res.data.token));
                                        setAuth(true);
                                    }
                                })
                                .catch(() => {
                                    setError(true);
                                });
                        }}
                        secondaryAction={() => navigate('/privacy-policy')}
                        secondaryTitle="Privacy Policy"
                        withClose={false}
                    >
                        {error && (
                            <Box mt={1} sx={{ width: '100%', textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ color: 'red' }}>
                                    {string?.wrong_login_or_password}!
                                </Typography>
                            </Box>
                        )}

                        <TextField
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            onChange={e => {
                                setUsername(e.target.value);
                            }}
                            value={username}
                            margin="dense"
                            id="name"
                            label={string?.email}
                            fullWidth
                            variant="outlined"
                            sx={{
                                '& label': {
                                    color: '#898B9B',
                                },
                            }}
                            error={validate && (!/\S+@\S+\.\S+/.test(username) || !username.length)}
                            helperText={
                                validate &&
                                (username.length < 1
                                    ? string?.enter_email
                                    : !/\S+@\S+\.\S+/.test(username)
                                    ? string?.enter_valid_email
                                    : '')
                            }
                        />
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            margin="dense"
                            id={'password'}
                            label={string?.password}
                            fullWidth
                            type={passwordVisible ? 'text' : 'password'}
                            variant="outlined"
                            sx={{
                                '& label': {
                                    color: '#898B9B',
                                },
                            }}
                            error={validate && password.length < 8}
                            helperText={
                                validate &&
                                (password.length < 1
                                    ? string?.enter_password
                                    : password.length < 8
                                    ? string?.password_length_min_8_symbols
                                    : '')
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        position="end"
                                    >
                                        {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </ModalWindow>
                </>
            )}
        </>
    );
}
