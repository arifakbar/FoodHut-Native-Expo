import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import { loggedInUser } from "../actions";
import { auth } from "../firebase/firebase";
import { createOrUpdateUser } from "../functions/auth";
import Loading from "./Loading";

const LoginModal = (props) => {
  const [visible, setVisible] = useState(false);
  // const [username, setUsername] = useState("0126CS181030@oriental.ac.in");
  // const [password, setPassword] = useState("newpassword");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await auth.signInWithEmailAndPassword(username, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      await props.loggedInUser(idTokenResult, res);
      setLoading(false);
      props.navigation.navigate("Home", { modal: false });
    } catch (err) {
      setLoading(false);
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
            <Text style={styles.title}>Login</Text>
            <TextInput
              placeholder="Enter your username here..."
              style={styles.input}
              value={username}
              onChangeText={(e) => setUsername(e)}
            />
            <TextInput
              placeholder="Enter your password here..."
              style={styles.input}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <View style={styles.btnWrapper}>
              <TouchableOpacity style={styles.btn1} onPress={handleLogin}>
                <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn2}
                onPress={() =>
                  props.navigation.navigate("Home", { modal: false })
                }
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.link}
              onPress={() => {
                props.navigation.setParams({ modal: true, type: "signup" });
              }}
            >
              <Text style={styles.linkText}>No account, yet? Register.</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
};

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
    marginTop: 20,
  },
  btn1: {
    width: "45%",
    padding: 10,
    backgroundColor: "skyblue",
    elevation: 4,
  },
  btn2: {
    width: "45%",
    padding: 10,
    backgroundColor: "red",
    elevation: 4,
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

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { loggedInUser })(LoginModal);
