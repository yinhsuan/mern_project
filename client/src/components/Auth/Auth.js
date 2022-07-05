import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signin, signup } from '../../actions/auth';

import { GoogleOAuthProvider } from '@moeindana/google-oauth';
import { GoogleLogin, useGoogleLogin } from '@moeindana/google-oauth';
// import MyCustomButton from './MyCustomButton';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    // const isSignup = true;
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent refresh when submit
        // sign up
        if (isSignup) {
            // navigate('/');
            dispatch(signup(formData, navigate));
        } 
        // sign in
        else {
            // navigate('/');
            dispatch(signin(formData, navigate));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };
    const googleSuccess = async (res) => {
        // console.log(res);
        // const result = res?.profileObj; // cannot get property profileObj of undefined
        // const token = res?.tokenId;
        const token = res?.credential;
        const email = res?.email;
        const family_name = res?.family_name;
        const given_name = res?.given_name;
        const googleId = res?.sub;
        const imageUrl = res?.picture;
        const name = res?.name;

        try {
            dispatch({ type: 'AUTH', data: {token, email, family_name, given_name, googleId, imageUrl, name} });
            navigate('/'); 
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error) => {
        console.log(error);
        // console.log("Google Sign In was unsuccessful. Try again later");
        alert("Google Sign In was unsuccessful. Try again later");
    };
    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => console.log(tokenResponse),
    //   });
    
    

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
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            { isSignup ? 'Sign Up' : 'Sign In' }
                        </Button>
                        {/* <MyCustomButton onClick={() => login()}>
                            Sign in with Google
                        </MyCustomButton>; */}
                        <GoogleLogin
                            // render={(renderProps) => (
                            //     <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            //         Google Sign In
                            //         </Button>
                            // )}
                            // className={classes.googleButton}
                            // width='100%'
                            // style={{width: "388px"}}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                        />
                        {/* <GoogleLogin 
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
                        /> */}
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