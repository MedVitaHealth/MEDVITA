import * as React from 'react';
import { useState, useContext } from 'react';
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { useForm } from "../../shared/components/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input'
import Modal from '../../shared/components/UIElements/Modal';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import './Auth.css';


const defaultTheme = createTheme();

export default function SignInSide() {
    const auth = useContext(AuthContext);

    const initialLoginState={
        email: {    
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    };
    const initialSignupState={
        name: {
            value: "",
            isValid: false
        },
        ...initialLoginState,
    };

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [initialFormState, setInitialFormState] = useState(initialLoginState)
    const [formState, inputHandler] = useForm(initialFormState, false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    
    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode); // switch mode
        isLoginMode ? setInitialFormState(initialLoginState) : setInitialFormState(initialSignupState) // set initial form state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        if(isLoginMode) {
            try {
                const responseData = await sendRequest(
                    "https://medvita-auth-api.onrender.com/api/auth/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                )
                console.log(responseData);

                auth.login(responseData.userId, responseData.token);
            }
            catch(err) {
                console.log(err);
            }
        }
        else {
            try {
                const responseData = await sendRequest(
                    "https://medvita-auth-api.onrender.com/api/auth/signup",
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                )
                auth.login(responseData.userId, responseData.token);
            }
            catch(err) {
                console.log(err);
            }
        }
    };  


  return (
    <ThemeProvider theme={defaultTheme}>
      {error && <Modal icon="error" title="Error" text={error} onClear={clearError} />}
      {isLoading && 
        <LoadingSpinner 
          asOverlay 
          text={isLoginMode?'Logging You In, please wait...':'Registering You, this may take a while...'} 
        />}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7.5}
          sx={{
            backgroundImage: isLoginMode? 'url(https://cdn.dribbble.com/users/2200056/screenshots/11415019/media/e59d2e1588af14e09632b0f88eeedef1.jpg)': 'url(https://cdn.dribbble.com/users/2200056/screenshots/11415019/media/e59d2e1588af14e09632b0f88eeedef1.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={4.5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar className={isLoading && 'button-hidden'} sx={{ m: 1, bgcolor:'secondary.main'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            {isLoginMode ? "Log In" : "Sign Up"}
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
                {!isLoginMode &&
                    <Input 
                    element="input" 
                    id="name"
                    type="name" 
                    label="Name" 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText="Please enter a name."
                    onInput={inputHandler}
                />}
                <Input 
                    element="input" 
                    id="email"
                    type="email" 
                    label="E-Mail" 
                    validators={[VALIDATOR_EMAIL()]} 
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password, at least 6 characters."
                    onInput={inputHandler}
                />
              <Button
                className={isLoading?"button-hidden":""}
                color="primary"
                disabled={!formState.isValid || isLoading} 
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoginMode ? "LOGIN" : "SIGNUP"}
              </Button>
              <Grid container>
                <Grid item>
                  <a className='to-signup' onClick={switchModeHandler}>
                    {isLoginMode?"Don't have an account? Sign Up":"Already have an account? Log In"}
                  </a>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}