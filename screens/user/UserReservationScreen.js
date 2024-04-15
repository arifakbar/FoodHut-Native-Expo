import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { connect } from "react-redux";

import { getUserReservations, deleteReservation } from "../../functions/reservation";
import Loading from '../../components/Loading';
import { FlatList } from "react-native";
import { Dimensions } from "react-native";

function UserReservationScreen(props) {
    const { user } = props;
    // console.log(user);
    const [reservation, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const res = await getUserReservations(user.token, user._id);
            setReservations(res.data.data);
            // console.log(res.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const deleteRes = (r) => {
        Alert.alert("Cancel", `Do you really want to remove ${r.name} reservation? `, [
            {
                text: "No",
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: async () => {
                    try {
                        setLoading(true);
                        await deleteReservation(user.token, r._id);
                        await fetchReservations();
                        setLoading(false);
                    } catch (err) {
                        console.log(err);
                        setLoading(false);
                    }
                },
                style: "default"
            }
        ]);
    }

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <View style={styles.conatiner}>
            {loading ? <Loading /> : reservation.length < 1 ? <Text>No reservation yet.</Text> : <FlatList data={reservation} keyExtractor={r => r._id} renderItem={r => {
                return <View style={styles.card}>
                    <Text style={styles.text} >Name: {r.item.name}</Text>
                    <Text style={styles.text} >Seats: {r.item.seats.toString()}</Text>
                    <Text style={styles.text} >Time: {new Date(r.item.reservationDateTime).toDateString()}</Text>
                    <Text style={styles.text} >Status: {r.item.status}</Text>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={styles.btn} onPress={() => deleteRes(r.item)}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            }} />}
        </View>
    )
}

export const UserReservationScreenContent = props => {
    return {
        title: "Reservations",
        headerRight: () => <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { props.navigation.navigate("Home", { modal: false }) }}>
            <Ionicons name="home" color="#DA9816" size={22} />
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: "white",
        padding: 20,
        display: "flex",
        gap: 10,
        width: Dimensions.get('window').width,
        alignItems: "flex-start",
        marginVertical: 10
    },
    line: {
        width: "90%",
        borderWidth: 0.2,
        color: "lightgrey"
    },
    text: {
        fontSize: 15
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "red",
        // width: "20%",
        elevation: 4,
        borderRadius: 5
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
    }
});

const mapStateToProps = state => {
    return { user: state.user };
}

export default connect(mapStateToProps, {})(UserReservationScreen);