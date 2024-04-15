import { NavigationContainer } from "@react-navigation/native";
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { MainNavigator } from "./MainNavigator";
import { auth } from "../firebase/firebase";
import { currentUser } from "../functions/auth";
import { loggedInUser, addToCartAction } from "../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppNavigator = (props) => {
    useEffect(() => {
        const timerId = setTimeout(() => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idTokenResult = await user.getIdTokenResult();
                    const res = await currentUser(idTokenResult.token);
                    await props.loggedInUser(idTokenResult, res);
                }
            });
        }, 3000);
        return () => clearTimeout(timerId);
    }, []);


    //Get Cart data on first render.

    const loadCart = async () => {
        try {
            let cart = [];
            const data = await AsyncStorage.getItem("cart");
            if (data) {
                cart = JSON.parse(data);
                props.addToCartAction(cart);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadCart();
    }, []);

    return <NavigationContainer>
        <MainNavigator />
    </NavigationContainer>
}

export default connect(null, ({ loggedInUser, addToCartAction }))(AppNavigator);