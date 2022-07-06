import { CREATE, DELETE, UPDATE, FETCH_ALL, FETCH_BY_SEARCH } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(page);
        console.log("data1: ", data);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        // console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        // console.log("post-1: ", post);
        // console.log("hihi");
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        // const response = await api.deletePost(id);
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost (id);
        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}