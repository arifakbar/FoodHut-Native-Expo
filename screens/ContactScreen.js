import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { connect } from "react-redux";

import { createContact } from "../functions/contact";
import Loading from "../components/Loading";

function ContactScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = props;

  const addContact = async () => {
    if (!user || !user.token) {
      return alert("Please login to send your query!");
    }
    try {
      setLoading(true);
      const res = await createContact(
        user.token,
        name,
        email,
        subject,
        message
      );
      console.log(res.data.data);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setLoading(false);
    } catch (err) {
      console.log(false);
      console.log(err);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/contact.jpg")}
      style={styles.img}
      imageStyle={{}}
    >
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.conatiner}>
          <View style={styles.info}>
            <View style={styles.content}>
              <Text style={styles.title}>ADDRESS</Text>
              <Text style={styles.text}>
                <Ionicons name="location" color="#DA9816" size={15} />
                &nbsp; 28 Seventh Avenue, New York, 10014
              </Text>
              <Text style={styles.text}>
                <Ionicons name="call" color="#DA9816" size={15} />
                &nbsp; 000 123 4567
              </Text>
              <Text style={styles.text}>
                <Ionicons name="mail" color="#DA9816" size={15} />
                &nbsp; abcd123@gmail.com
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>WORKING HOURS</Text>
              <Text style={styles.time}>9:00 AM to 9:00 PM in Weekdays</Text>
              <Text style={styles.time}>1:00 PM to 8:00 PM in Weekends</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>CONNECT WITH US</Text>
              <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
                <Ionicons name="logo-facebook" color="#DA9816" size={25} />
                <Ionicons name="logo-twitter" color="#DA9816" size={25} />
                <Ionicons name="logo-instagram" color="#DA9816" size={25} />
              </View>
            </View>
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={name}
              onChangeText={(e) => setName(e)}
            />
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
            <TextInput
              placeholder="Subject"
              style={styles.input}
              value={subject}
              onChangeText={(e) => setSubject(e)}
            />
            <TextInput
              placeholder="Message"
              style={styles.input2}
              value={message}
              onChangeText={(e) => setMessage(e)}
            />
            <TouchableOpacity style={styles.btn} onPress={() => addContact()}>
              <Text style={styles.btnText}>SEND MESSAGE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  info: {
    width: "100%",
    padding: 10,
    display: "flex",
  },
  content: {
    marginTop: 10,
    display: "flex",
    marginBottom: 15,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "white",
  },
  text: {
    marginBottom: 6,
    opacity: 0.8,
  },
  time: {
    marginVertical: 5,
  },
  form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    width: "90%",
  },
  input2: {
    height: 100,
    backgroundColor: "white",
    padding: 10,
    width: "90%",
  },
  btn: {
    padding: 12,
    backgroundColor: "#DA9816",
    width: "90%",
    marginBottom: 20,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {})(ContactScreen);
