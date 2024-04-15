import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import firebase from "firebase/compat/app";
import { LOGOUT } from "../actions/types";

const selectedUser = state => state.user;

function DrawerContent(props) {
    const user = useSelector(selectedUser);
    // console.log(user);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            firebase.auth().signOut();
            dispatch({ type: LOGOUT, payload: { user: {} } });
            props.navigation.navigate("Home", { modal: false, type: "login" });
        } catch (err) {
            console.log(err);
        }
    }
    return (<SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
    >
        <TouchableOpacity style={styles.imgWrapper} onPress={() => props.navigation.navigate("Home")}>
            <Image source={require('../assets/images/Logo.png')} style={styles.img} resizeMode="contain" />
        </TouchableOpacity>
        <DrawerContentScrollView>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        {user && user.token && <TouchableOpacity style={styles.btn} onPress={handleLogout}>
            <Text style={styles.text}>LOGOUT</Text>
        </TouchableOpacity>}
    </SafeAreaView>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgrey"
    },
    imgWrapper: {
        height: 56,
        backgroundColor: "#DA9816",
        overflow: "hidden",
    },
    img: {
        height: "100%",
        width: "100%",
    },
    btn: {
        height: 40,
        backgroundColor: "#DA9816",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "white",
        fontSize: 18
    }
})


export default DrawerContent;