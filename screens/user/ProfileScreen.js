import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";

import Ionicons from "@expo/vector-icons/Ionicons";

function ProfileScreen(props) {
  const { user } = props;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput value={user.email} editable={false} style={styles.email} />
        <View style={styles.formInput}>
          <TextInput
            editable={false}
            value={user.name}
            style={styles.un}
            placeholder="Your username"
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              props.navigation.navigate("Update", { type: "username" })
            }
          >
            <Text style={styles.btnText}>Change Username</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formInput}>
          <TextInput
            editable={false}
            value={
              user.phoneNumber === 0
                ? "Please enter your number"
                : user.phoneNumber.toString()
            }
            style={styles.un}
          />
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Change Number</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formInput2}>
          <TextInput
            editable={false}
            value={user.address}
            placeholder="Please enter your address"
            style={styles.un}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              props.navigation.navigate("Update", { type: "address" })
            }
          >
            <Text style={styles.btnText}>Change Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export const profileScreenContent = (props) => {
  return {
    title: "Profile",
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          props.navigation.navigate("Home", { modal: false });
        }}
      >
        <Ionicons name="home" color="#DA9816" size={22} />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
        <Ionicons name="menu" size={26} color="#DA9816" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height / 1.2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  email: {
    width: "90%",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 8,
    color: "grey",
  },
  formInput: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
    height: 45,
  },
  formInput2: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
    height: 100,
  },
  un: {
    height: "100%",
    width: "65%",
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingLeft: 8,
    color: "grey",
  },
  btn: {
    height: "100%",
    width: "32%",
    backgroundColor: "#DA9816",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    elevation: 4,
  },
  btnText: {
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {})(ProfileScreen);
