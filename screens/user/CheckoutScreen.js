import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";

import Loading from "../../components/Loading";
import { deleteUsercart, getUserCart } from "../../functions/cart";
import { applyDiscountCoupon } from "../../functions/auth";
import { couponAppliedAction, addToCartAction } from "../../actions/index";
import { createCashOrderForUser } from "../../functions/orders";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CheckoutScreen(props) {
  const { user, couponApplied } = props;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);

  const fetchCartFromDb = async () => {
    try {
      setLoading(true);
      const res = await getUserCart(user.token);
      setProducts(res.data.data.products);
      setTotal(res.data.data.cartTotal);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleCouponSubmit = async () => {
    try {
      setLoading(true);
      const res = await applyDiscountCoupon(user.token, coupon);
      if (res.data.data) {
        setTotalAfterDiscount(res.data.data);
        alert("Coupon applied successfully");
        await props.couponAppliedAction(true);
      } else {
        alert("Invalid coupon");
        await props.couponAppliedAction(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleCOD = async () => {
    try {
      setLoading(true);
      const res = await createCashOrderForUser(user.token, couponApplied, true);
      if (res.data.ok) {
        await AsyncStorage.removeItem("cart");
        await props.addToCartAction([]);
        await props.couponAppliedAction(false);
        await deleteUsercart(user.token);
        setLoading(false);
        alert("Ordered successfully");
        props.navigation.goBack();
        props.navigation.navigate("Profile", { screen: "Orders" });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartFromDb();
  }, [total]);

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.summary}>
          <View style={styles.address}>
            <Text style={styles.title}>Address</Text>
            <Text
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "lightgrey",
                minHeight: 100,
              }}
            >
              {user.address}
            </Text>
            <TouchableOpacity
              style={{ ...styles.btn, backgroundColor: "lightgreen" }}
              onPress={() =>
                props.navigation.navigate("Profile", { screen: "Main_profile" })
              }
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Change Address
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.coupon}>
            <Text style={{ fontSize: 15, marginBottom: 10 }}>
              Have A Coupon?
            </Text>
            <TextInput
              placeholder="Enter coupon code..."
              style={styles.input}
              value={coupon}
              onChangeText={(e) => setCoupon(e)}
            />
            <TouchableOpacity
              style={{ ...styles.btn, backgroundColor: "#1266F1" }}
              onPress={handleCouponSubmit}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Apply</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Order Summary</Text>
          <View style={styles.content}>
            {products.map((p, i) => {
              return (
                <Text style={{ fontSize: 16, marginBottom: 10 }} key={i}>
                  {i + 1}. {p.product.title} X {p.count} = Rs. {p.price}
                </Text>
              );
            })}
            <Text style={styles.total}>Total : Rs. {total}</Text>
            {totalAfterDiscount && (
              <Text style={styles.total}>
                After Discount : Rs. {totalAfterDiscount}
              </Text>
            )}
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={{ ...styles.btn, backgroundColor: "lightgreen" }}
              onPress={() => props.navigation.navigate("Payment")}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Checkout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.btn, backgroundColor: "#1266F1" }}
            >
              <Text
                style={{ color: "white", textAlign: "center" }}
                onPress={handleCOD}
              >
                Cash On Delivery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  summary: {
    width: "100%",
    padding: 10,
  },
  content: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 10,
  },
  total: {
    fontSize: 18,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
  },
  address: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingBottom: 20,
  },
  btn: {
    marginVertical: 10,
    padding: 10,
    width: "40%",
    elevation: 4,
    borderRadius: 5,
  },
  coupon: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
  },
});

export const CheckoutScreenOptions = (props) => {
  return {
    headerShown: false,
  };
};

const mapStateToProps = (state) => {
  return { user: state.user, couponApplied: state.coupon };
};

export default connect(mapStateToProps, {
  couponAppliedAction,
  addToCartAction,
})(CheckoutScreen);
