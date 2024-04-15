import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  CardForm,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";
import { connect } from "react-redux";

import { createPaymentIntent } from "../functions/stripe";
import { createOrder } from "../functions/orders";
import { couponAppliedAction, addToCartAction } from "../actions/index";
import { deleteUsercart } from "../functions/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./Loading";

function StripeCheckout(props) {
  const { user, coupon } = props;

  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadPaymentDetails = async () => {
    try {
      setLoading(true);
      const res = await createPaymentIntent(user.token, coupon);
      setClientSecret(res.data.data.clientSecret);
      setCartTotal(res.data.data.cartTotal);
      setTotalAfterDiscount(res.data.data.totalAfterDiscount);
      setPayable(res.data.data.payable);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentDetails();
  }, []);

  const { confirmPayment } = useConfirmPayment();

  const handlePress = async () => {
    try {
      setLoading(true);
      let payload = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: {
            name: user.email,
          },
        },
      });
      if (payload.error) {
        setLoading(false);
        alert(`Error: ${payload.error.localizedMessage}`);
      } else {
        payload.paymentIntent.payment_method_types = ["Card"];
        const res = await createOrder(user.token, payload);
        console.log(res.data.data);
        await AsyncStorage.removeItem("cart");
        await deleteUsercart(user.token);
        props.couponAppliedAction(false);
        props.addToCartAction([]);
        setLoading(false);
        props.navigation.pop(2);
        props.navigation.navigate("Profile", { screen: "Orders" });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Text style={{ ...styles.btn, backgroundColor: "#DA9816" }}>
            Total: Rs. {cartTotal}
          </Text>
          <Text style={{ ...styles.btn, backgroundColor: "lightgreen" }}>
            Payable: Rs. {payable / 100}
          </Text>
          <CardForm
            postalCodeEnabled={true}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 300,
              marginVertical: 30,
            }}
          />
          <TouchableOpacity
            style={{ ...styles.btn, backgroundColor: "blue" }}
            onPress={handlePress}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>
              Pay
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  btn: {
    padding: 10,
    marginVertical: 10,
    textAlign: "center",
    color: "white",
    elevation: 4,
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => {
  return { user: state.user, coupon: state.coupon };
};

export default connect(mapStateToProps, {
  couponAppliedAction,
  addToCartAction,
})(StripeCheckout);
