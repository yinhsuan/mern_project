import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';

import { GoogleOAuthProvider } from '@moeindana/google-oauth';
// import { GoogleLogin } from '@moeindana/google-oauth';


const Auth = () => {
    const classes = useStyles();
    // const isSignup = true;
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const dispatch = useDispatch();

    const handleSubmit = () => {

    };
    const handleChange = () => {

    };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };
    const googleSuccess = async (res) => {
        console.log(res);
        const result = res?.profileObj; // cannot get property profileObj of undefined
        const token = res?.tokenId;
        // const result = res?.profileObj; // cannot get property profileObj of undefined
        // const token = res?.credential;

        try {
            dispatch({ type: 'AUTH', data: {result, token} });
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try again later");
    };
    
    

    return (
        <GoogleOAuthProvider clientId="25334139749-7io54rusi1lvrjuf1d1h4fds30c01ghu.apps.googleusercontent.com">
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            { isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            { isSignup ? 'Sign Up' : 'Sign In' }
                        </Button>
                        {/* <GoogleLogin
                            // render={(renderProps) => (
                            //     <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            //         Google Sign In
                            //         </Button>
                            // )}
                            // className={classes.googleButton}
                            // width='100%'
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                        /> */}
                        <GoogleLogin 
                            clientId="620661887004-66gh28q2v682kc05gaut9fk39le67407.apps.googleusercontent.com"
                            // clientId="25334139749-7io54rusi1lvrjuf1d1h4fds30c01ghu.apps.googleusercontent.com"
                            // clientId="564033717568-bun2r1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                    Google Sign In
                                </Button>
                            )}
                            // buttonText="Google Sign In"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid className={classes.switchButton} container justifyContent="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </GoogleOAuthProvider>
    );
};

export default Auth;