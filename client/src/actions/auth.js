import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // sign in the user
        // console.log("heleeeee");
        const { data } = api.signIn(formData);
        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // sign up the user
        console.log("helo 1");
        const { data } = api.signUp(formData);
        console.log("helo 2");
        dispatch({ type: AUTH, data });
        console.log("helo 3");

        navigate('/');
        console.log("helo 4");
    } catch (error) {
        console.log(error);
    }
}