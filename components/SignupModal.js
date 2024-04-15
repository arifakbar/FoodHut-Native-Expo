import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "../firebase/firebase";
import { createOrUpdateUser } from "../functions/auth";
import Loading from "./Loading";

export default function SignupModal(props) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      let user = auth.currentUser;
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      alert("Signed up Successfully.");
      setEmail("");
      props.navigation.navigate("Home", { modal: false, type: "login" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setVisible(props.visible);
  }, [visible, props.visible]);

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.form}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text style={styles.title}>Register</Text>
            <TextInput
              placeholder="Enter your Email Address"
              style={styles.input}
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
            <TextInput
              placeholder="Enter your Password"
              style={styles.input}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <View style={styles.btnWrapper}>
              <TouchableOpacity style={styles.btn1} onPress={handleSubmit}>
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn2}
                onPress={() =>
                  props.navigation.navigate("Home", {
                    modal: false,
                    type: "login",
                  })
                }
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.link}
              onPress={() => {
                props.navigation.setParams({ modal: true, type: "login" });
              }}
            >
              <Text style={styles.linkText}>
                Already have an account? Login.
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    top: 250,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 320,
    maxWidth: 320,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 15,
    position: "relative",
  },
  title: {
    color: "#DA9816",
    textTransform: "uppercase",
    fontWeight: "semibold",
    fontSize: 30,
    marginBottom: 20,
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
    marginTop: 30,
  },
  btn1: {
    width: "45%",
    padding: 10,
    backgroundColor: "skyblue",
  },
  btn2: {
    width: "45%",
    padding: 10,
    backgroundColor: "red",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    width: "80%",
  },
  linkText: {
    color: "red",
    fontSize: 14,
  },
});
