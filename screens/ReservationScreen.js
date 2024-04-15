import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect } from "react-redux";

import { bookReservation } from "../functions/reservation";
import Loading from "../components/Loading";

function ReservationScreen(props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [guests, setGuests] = useState(1);

  const { user } = props;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  // console.log(user);

  const onSubmit = async () => {
    if (!user || !user.token) {
      return alert("Please login to make a reservation.");
    }
    try {
      setLoading(true);
      const res = await bookReservation(user.token, {
        name: name,
        reservationDateTime: date,
        seats: guests,
        reservedBy: user._id,
      });
      setName("");
      setGuests(1);
      setDate(new Date());
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Easy-Inside-Bottles.jpg")}
        style={styles.img}
      >
        <View style={styles.overlay}></View>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text style={styles.heading}>Make A Reservation</Text>
            <View style={styles.form}>
              <View style={styles.formInput}>
                <Text style={styles.labelText}>Name: </Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(e) => setName(e)}
                  placeholder="Enter name for reservation."
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.labelText}>Date: </Text>
                <View style={styles.dateInput}>
                  <TouchableOpacity onPress={showDatepicker}>
                    <Ionicons
                      name="calendar-outline"
                      size={32}
                      color="#DA9816"
                    />
                  </TouchableOpacity>
                  <Text style={styles.dateText}>{date.toLocaleString()}</Text>
                  {show && (
                    <DateTimePicker
                      mode="date"
                      value={date}
                      onChange={onChange}
                      minimumDate={Date.now()}
                    />
                  )}
                </View>
              </View>
              <View style={styles.formInput}>
                <Text style={styles.labelText}>Guests: </Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  value={guests}
                  onChangeText={(e) => setGuests(e)}
                  placeholder="Enter total number of guests."
                />
              </View>
              <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  img: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    minHeight: 735,
    width: "100%",
    backgroundColor: "#fff",
    opacity: 0.3,
  },
  text: {
    color: "black",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  formInput: {
    width: "80%",
    display: "flex",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "black",
  },
  labelText: {
    color: "#fff",
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "600",
  },
  btn: {
    backgroundColor: "#DA9816",
    padding: 15,
    width: "80%",
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  dateInput: {
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dateText: {
    color: "grey",
  },
  heading: {
    top: "20%",
    left: "20%",
    color: "#fff",
    fontWeight: "600",
    fontSize: 30,
  },
});

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {})(ReservationScreen);
