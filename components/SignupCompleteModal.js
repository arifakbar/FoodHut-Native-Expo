import { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from '../firebase/firebase';
import { createOrUpdateUser } from "../functions/auth";

export default function SignupCompleteModal(props) {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!password) {
            toast.error("Password is required!");
            return;
        }
        if (password.length < 6) {
            alert("Password must be atleast 6 characters long!"); //firebase default
            return;
        }
        // setLoading(true);
        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            if (result.user.emailVerified) {
                window.localStorage.removeItem("emailForRegistration");
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                const res = await createOrUpdateUser(idTokenResult.token);
                await props.loggedInUser(idTokenResult, res);
                // setLoading(false);
                alert("Registered successfully.");
                props.navigation.navigate("Home", { modal: false, type: "login" });
                // history.push("/");
            }
        } catch (err) {
            console.log(err);
            // setLoading(false);
        }
    };

    const setUserEmail = async () => {
        // setEmail("dsm7566@gmail.com");
        try {
            const value = await AsyncStorage.getItem('emailForRegistration')
            if (value !== null) {
                setEmail(value);
            }
        } catch (err) {
            setEmail("dsm7566@gmail.com");
            console.log(err);
        }
    }

    useEffect(() => {
        setVisible(props.visible);
        setUserEmail();
    }, [visible, props.visible]);



    return (
        <Modal visible={visible} transparent={true} >
            <View style={styles.form}>
                <Text style={styles.title}>SET PASSWORD</Text>
                <TextInput style={styles.input} value={email} editable={false} />
                <TextInput placeholder='Enter your password here...' style={styles.input} value={password} onChangeText={(e) => setPassword(e)} />
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.btn1} onPress={handleSubmit} >
                        <Text style={styles.text}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={() => props.navigation.navigate("Home", { modal: false, type: "login" })} >
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        top: 250,
        left: 20,
        justifyContent: "center",
        alignItems: "center",
        maxHeight: 350,
        maxWidth: 350,
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 15,
        position: 'relative'
    },
    title: {
        color: "#DA9816",
        textTransform: "uppercase",
        fontWeight: "semibold",
        fontSize: 30,
        marginBottom: 20
    },
    input: {
        width: "80%",
        borderBottomColor: "#DA9816",
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 10,
    },
    btnWrapper: {
        display: "flex",
        flexDirection: "row",
        width: "70%",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 30
    },
    btn1: {
        width: "45%",
        padding: 10,
        backgroundColor: "skyblue"
    },
    btn2: {
        width: "45%",
        padding: 10,
        backgroundColor: "red"
    },
    text: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    link: {
        marginTop: 15,
        width: "80%"
    },
    linkText: {
        color: "red",
        fontSize: 14
    }
})