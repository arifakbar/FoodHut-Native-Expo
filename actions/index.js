import { ADD_TO_CART, LOGGED_IN_USER, LOGOUT, COUPON_APPLIED } from './types';

export const loggedInUser = (idTokenResult, res) => {
    return {
        type: LOGGED_IN_USER,
        payload: {
            token: idTokenResult.token,
            name: res.data.data.name,
            email: res.data.data.email,
            role: res.data.data.role,
            phoneNumber: res.data.data.phoneNumber,
            address: res.data.data.address,
            _id: res.data.data._id,
        }
    }
}

export const logoutUser = () => {
    firebase.auth().signOut();
    return {
        type: LOGOUT,
        payload: null,
    };
};

export const addToCartAction = (unique) => {
    return {
        type: ADD_TO_CART,
        payload: unique
    }
}

export const couponAppliedAction = (status) => {
    return {
        type: COUPON_APPLIED,
        payload: status
    }
}