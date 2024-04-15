import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const selectedUser = state => state.user;

function UserDrawerContent(props) {
    const user = useSelector(selectedUser);
    // console.log(user);

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


export default UserDrawerContent;