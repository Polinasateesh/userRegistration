import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, TextField, Grid, CircularProgress, InputAdornment } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import logo from './assets/pngwing.com.png'


const defaultValues = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    showPassword: false,

};

const Register = () => {
    const [value, setValue] = useState(defaultValues);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const userName=window.localStorage.getItem('userName')

    useEffect(()=>{
        const userName=window.localStorage.getItem('userName')
        if(userName){
            navigate('/login')
        }
    },[])
   

    const handleClose = () => {
        setValue(defaultValues)
    };
    // Handle input on change
    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setValue({ ...value, [inputName]: inputValue });

    };

    const handleClickShowPassword = () => {
        setValue({ ...value, showPassword: !value.showPassword })
    }

    // Handle form submission
    const handleSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        try {
            const newValues = {
                firstName: value.firstName,
                lastName: value.lastName,
                userName: value.userName,
                password: value.password,
            }
            let response = await axios.post('http://localhost:5000/register', newValues);
            if (response.data && response.data.message) {
                
                    window.localStorage.setItem('userName',value.userName)
                    // Showing success toast 
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600,
                        onClose: () => {
                            setTimeout(() => {
                                setIsLoading(false);
                                setValue(defaultValues);
                                
                                navigate('/Login');
                            }, 1500);
                        }
                    });
                }else {
                    // Showing error toast
                    toast.error(response.error, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600,
                        onClose: () => {
                            setIsLoading(false);
                        }
                    });
                }
              
        } catch (error) {
            // Showing error toast
    
            toast.error('userName already exits', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 500,
                onClose: () => {
                    setIsLoading(false);
                }
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <Card className='card-container'>
                
                <p className='card-heading'> ➡️ Register Form</p>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='firstName'
                                label='First Name'
                                type='text'
                                value={value.firstName}
                                onChange={handleChange}
                                fullWidth
                                required
                                size="small"
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='lastName'
                                label='Last Name'
                                type='text'
                                size="small"
                                value={value.lastName}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='userName'
                                label='User Name'
                                required
                                size="small"
                                value={value.userName}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined'
                                InputProps={{
                                    startAdornment: (
                                        <EmailIcon
                                            style={{
                                                color: 'gray',
                                                marginLeft: '-10px',
                                                position: 'relative',
                                                padding: '2px',
                                            }}
                                        />
                                    ),
                                }}
                               

                            />

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='password'
                                label='Password'
                                type={value.showPassword ?'text':'password'}
                                required
                                size="small"
                                value={value.password}
                                onChange={handleChange}
                                fullWidth
                                variant='outlined'
                                InputProps={{
                                    startAdornment: (
                                        <LockIcon
                                            style={{
                                                color: 'gray',
                                                marginLeft: '-10px',
                                                position: 'relative',
                                                padding: '2px',
                                            }}
                                        />
                                    ),
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                            }}
                                        >
                                            {' '}
                                            <IconButton
                                                onClick={
                                                    handleClickShowPassword
                                                }

                                            >
                                                {' '}
                                                {value.showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>{' '}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                    </Grid>
                    <div className='button-container'>
                        <Button variant='outlined' color='warning' onClick={handleClose} startIcon={
                            <CloseIcon style={{ fontSize: '16px' }} />
                        }>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={isLoading}
                            startIcon={
                                <SendIcon style={{ fontSize: '16px' }} />
                            }
                            style={{ marginLeft: '15px' }}
                        >
                            {isLoading ? <CircularProgress size={24} /> :  'Register'}
                        </Button>
                    </div>
                </form>
                
            </Card>
        </>
    );
};

export default Register;
