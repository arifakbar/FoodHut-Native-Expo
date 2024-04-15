import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import { updateAddress, updateUsername } from "../../functions/auth";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { loggedInUser } from "../../actions/index";
import Loading from "../../components/Loading";

function UpdateScreen(props) {
  const { type } = props.route.params;
  const { user } = props;

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const update = async () => {
    try {
      // if (info.length < 3) {
      //     return alert("Please enter atleast 3 letters.")
      // }
      setLoading(true);
      if (type === "username") {
        // await updateUsername(info, user.token);
        const res = await updateUsername(info, user.token);
        await props.loggedInUser(user, res);
        setLoading(false);
        props.navigation.goBack();
      }
      if (type === "address") {
        // await updateAddress(info, user.token);
        const res = await updateAddress(info, user.token);
        await props.loggedInUser(user, res);
        setLoading(false);
        props.navigation.goBack();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.conatiner}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Text style={styles.title}>Update {type}</Text>
          <TextInput
            value={info}
            placeholder={`Enter new ${type}`}
            onChangeText={(e) => setInfo(e)}
            style={styles.input}
          />
          <TouchableOpacity style={styles.btn} onPress={update}>
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export const UpdateScreenContent = (props) => {
  return {
    title: "Update",
  };
};

const styles = StyleSheet.create({
  conatiner: {
    minHeight: Dimensions.get("window").height / 1.2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  title: {
    textTransform: "uppercase",
    fontSize: 25,
    fontWeight: "500",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 8,
  },
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#DA9816",
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
});

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { loggedInUser })(UpdateScreen);
