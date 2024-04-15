import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { connect } from "react-redux";

import { getUserOrders } from "../../functions/orders";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Image } from "react-native";

function UserHistoryScreen(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = props;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getUserOrders(user.token);
      setOrders(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.conatiner}>
          {orders.length < 1 ? (
            <Text>No orders yet.</Text>
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(o) => o._id}
              renderItem={(o) => {
                return (
                  <View style={styles.card}>
                    <View style={styles.info}>
                      <Text style={styles.text}>Order Id.: {o.item._id}</Text>
                      <Text style={styles.text}>
                        Amount: Rs. {o.item.paymentIntent.amount / 100}
                      </Text>
                      <Text style={styles.text}>
                        Currency: {o.item.paymentIntent.currency.toUpperCase()}
                      </Text>
                      <Text style={styles.text}>
                        Method:{" "}
                        {o.item.paymentIntent.payment_method_types[0].toUpperCase()}
                      </Text>
                      <Text style={styles.text}>
                        Status: {o.item.orderStatus.toUpperCase()}
                      </Text>
                      <Text style={styles.text}>
                        Ordered On.:{" "}
                        {new Date(
                          o.item.paymentIntent.created
                        ).toLocaleString()}
                      </Text>
                      {o.item.orderStatus !== "Cancelled" ? (
                        <View style={styles.btnWrapper}>
                          <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnText}>Track Order</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ ...styles.btn, backgroundColor: "red" }}
                          >
                            <Text style={styles.btnText}>Invoice</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity style={styles.btn}>
                          <Text style={styles.btnText}>Order Cancelled</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.list}>
                      <FlatList
                        horizontal
                        keyExtractor={(p) => p._id}
                        data={o.item.products}
                        renderItem={(p) => {
                          return (
                            <View style={styles.card2}>
                              <Image
                                source={{ uri: p.item.product.images[0].url }}
                                style={styles.img}
                              />
                              <Text style={styles.text}>
                                {p.item.product.title}
                              </Text>
                              <Text style={styles.text}>
                                {p.item.count} X {p.item.product.price} = Rs.{" "}
                                {p.item.product.price * p.item.count}
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      )}
    </View>
  );
}

export const UserHistoryScreenContent = (props) => {
  return {
    title: "Orders",
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
  };
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 10,
  },
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 10,
  },
  info: {
    borderBottomColor: "#DA9816",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderStyle: "dashed",
  },
  card2: {
    marginVertical: 10,
    marginRight: 10,
  },
  text: {
    marginVertical: 5,
    fontSize: 15,
  },
  img: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  btnWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  btn: {
    paddingHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: "blue",
    marginRight: 20,
    elevation: 4,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {})(UserHistoryScreen);
