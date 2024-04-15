import { ADD_TO_CART } from "../actions/types";

import AsyncStorage from "@react-native-async-storage/async-storage";

let initialState = [];

_retrieveData = async () => {
    try {
        const data = await AsyncStorage.getItem("cart");
        // console.log("D: ", data);
        if (data) {
            initialState = JSON.parse(data);
        } else {
            initialState = [];
        }
    } catch (err) {
        console.log(err);
    }
}

_retrieveData();

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return action.payload;
        default:
            return state;
    }
}