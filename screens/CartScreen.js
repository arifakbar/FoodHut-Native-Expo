import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect } from "react-redux";
import Loading from "../components/Loading";
import { addToCartAction } from "../actions";
import { addToUserCart } from "../functions/cart";

function CartScreen(props) {
  const { user, cart } = props;
  const [loading, setLoading] = useState(false);

  const change = async (e, p) => {
    let count = e;
    if (count < 1) {
      return alert("Quantity can't be less than 1");
    }
    if (count == p.quantity) {
      return alert("Maximum quantity reached.");
    }
    let cart = [];
    const data = await AsyncStorage.getItem("cart");
    if (data) {
      cart = JSON.parse(data);
    }
    cart.map((c, i) => {
      if (p._id === c._id) {
        cart[i].count = count;
      }
    });
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    await props.addToCartAction(cart);
  };

  const remove = async (p) => {
    let cart = [];
    const data = await AsyncStorage.getItem("cart");
    if (data) {
      cart = JSON.parse(data);
    }
    cart.map((c, i) => {
      if (c._id === p._id) {
        cart.splice(i, 1);
      }
    });
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    await props.addToCartAction(cart);
  };

  const saveOrderToDB = async () => {
    try {
      setLoading(true);
      const res = await addToUserCart(cart, user.token);
      if (res.data.ok) {
        props.navigation.navigate("Checkout", { screen: "Main_Checkout" });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <Loading />
      ) : cart.length < 1 ? (
        <Text>No orders in cart yet.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(p) => p._id}
            renderItem={(p) => {
              return (
                <View style={styles.container}>
                  <Image
                    source={{ uri: p.item.images[0].url }}
                    style={styles.img}
                  />
                  <View
                    style={{
                      display: "flex",
                      height: 70,
                      gap: 5,
                      width: 120,
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                      {p.item.title}
                    </Text>
                    <View style={styles.input}>
                      <TouchableOpacity
                        style={{ ...styles.btn, backgroundColor: "blue" }}
                        onPress={() => change(p.item.count - 1, p.item)}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>-</Text>
                      </TouchableOpacity>
                      <Text>{p.item.count}</Text>
                      <TouchableOpacity
                        style={{ ...styles.btn, backgroundColor: "red" }}
                        onPress={() => change(p.item.count + 1, p.item)}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      fontSize: 13,
                      width: 100,
                      display: "flex",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "600",
                      }}
                    >
                      Qty: {p.item.price} * {p.item.count}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "600",
                      }}
                    >
                      Total: Rs. {p.item.price * p.item.count}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => remove(p.item)}>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 18,
                        padding: 5,
                        fontWeight: "600",
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <Text style={{ fontSize: 18, fontWeight: "600", marginVertical: 10 }}>
            Total: Rs.{" "}
            {cart.reduce((curr, next) => {
              return curr + next.count * next.price;
            }, 0)}
          </Text>
          {user && user.token ? (
            <TouchableOpacity style={styles.btn2} onPress={saveOrderToDB}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
                Place Order
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btn2}
              onPress={() =>
                props.navigation.navigate("Home", {
                  modal: true,
                  type: "login",
                })
              }
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
                Login To Checkout
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const selectedCart = (state) => state.cart;

export const cartScreenOptions = ({ navigation }) => {
  const cart = useSelector(selectedCart);
  return {
    headerShown: false,
    tabBarlabel: "Cart",
    tabBarIcon: () => (
      <View style={{ position: "relative" }}>
        <Ionicons name="cart" color="#DA9816" size={24} />
        <View style={styles.circle}>
          <Text style={{ color: "white", fontSize: 8 }}>
            {cart && cart.length > 0 ? cart.length : 0}
          </Text>
        </View>
      </View>
    ),
  };
};

const mapStateToProps = (state) => {
  return { user: state.user, cart: state.cart };
};

export default connect(mapStateToProps, { addToCartAction })(CartScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  circle: {
    position: "absolute",
    backgroundColor: "red",
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    color: "white",
    fontSize: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingRight: 30,
    paddingLeft: 5,
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 8,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
  },
  img: {
    height: 70,
    width: 70,
    resizeMode: "cover",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 26,
    width: 65,
  },
  btn: {
    height: "100%",
    width: "33%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn2: {
    backgroundColor: "#DA9816",
    marginVertical: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 4,
  },
});
