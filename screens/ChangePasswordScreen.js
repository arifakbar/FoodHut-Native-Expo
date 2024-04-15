import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { auth } from '../firebase/firebase';
import Loading from '../components/Loading';
import { TextInput } from "react-native";

function ChangePasswordScreen(props) {
    const [pwd, setPwd] = useState("");
    const [loading, setLoading] = useState(false);

    const change = async () => {
        try {
            if (!pwd) {
                return alert("Password is required!");
            }
            if (pwd.length < 6) {
                return alert("password must be 6 characters long.");
            }
            setLoading(true);
            await auth.currentUser.updatePassword(pwd);
            alert("Password changed successfully.");
            setLoading(false);
            setPwd("");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <View style={styles.conatiner}>
            {loading ? <Loading /> :
                <View style={styles.content}>
                    <TextInput placeholder="Enter new password" value={pwd} onChangeText={e => setPwd(e)} style={styles.input} />
                    <TouchableOpacity style={styles.btn} onPress={change}>
                        <Text style={{ color: "white" }}>Reset</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export const ChangePasswordScreenContent = props => {
    return {
        title: "Change Password",
        headerRight: () => <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { props.navigation.navigate("Home", { modal: false }) }}>
            <Ionicons name="home" color="#DA9816" size={22} />
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
    },
    content: {
        minHeight: Dimensions.get("window").height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        width: "90%",
        padding: 10,
        borderWidth: 1,
        borderColor: "lightgrey"
    },
    btn: {
        marginVertical: 20,
        backgroundColor: "#DA9816",
        paddingVertical: 15,
        paddingHorizontal: 35,
        elevation: 4,
        borderRadius: 15
    }
});

export default ChangePasswordScreen;