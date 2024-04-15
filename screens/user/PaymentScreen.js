import { View } from "react-native";
// import { loadStripe } from "@stripe/stripe-js";
import { StripeProvider } from "@stripe/stripe-react-native";
import StripeCheckout from "../../components/StripeCheckout";

// const publishableKey = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function PaymentScreen(props) {
  return (
    <StripeProvider publishableKey={process.env.REACT_APP_STRIPE_KEY}>
      <View>
        <StripeCheckout navigation={props.navigation} />
      </View>
    </StripeProvider>
  );
}

export default PaymentScreen;
