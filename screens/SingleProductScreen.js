import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

import { getProduct } from "../functions/products";
import Slideshow from "../components/Slider";
import Loading from "../components/Loading";
import { addToUserWishlist } from "../functions/wishlist";
import { addToCartAction } from "../actions/index";

function SingleProductScreen(props) {
  const { id } = props.route.params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { user, cart } = props;

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await getProduct(id);
      setProduct(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const addToWishlist = async (id) => {
    if (!user || !user.token) {
      return alert("Please login to add product to your wishlist");
    }
    try {
      setLoading(true);
      const res = await addToUserWishlist(user.token, id);
      setLoading(false);
      alert("Added product to wishlist");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const addToCart = async (p) => {
    try {
      let cart = [];
      let data = await AsyncStorage.getItem("cart");
      if (data) {
        cart = JSON.parse(data);
      }
      let found = false;
      cart.forEach((c) => {
        if (c._id === p._id) {
          found = true;
        }
      });
      if (found === true) {
        alert("Already in cart.");
        return;
      }
      cart.push({ ...p, count: 1 });
      let unique = _.uniqWith(cart, _.isEqual);
      await AsyncStorage.setItem("cart", JSON.stringify(unique));
      props.addToCartAction(unique);
      alert("Successfully added to cart.");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {product.images && <Slideshow photos={product.images} />}
          <View style={styles.content}>
            <Text style={styles.desc}>{product.description}</Text>
            <View style={styles.one}>
              <Text style={styles.price}>Rs. {product.price}</Text>
              {product.veg ? (
                <TouchableOpacity style={styles.veg}>
                  <Text style={{ color: "white" }}>VEG</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.veg}>
                  <Text style={{ color: "white" }}>NON-VEG</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.cat}>
              <Text style={styles.title}>Category: </Text>
              {product.category && (
                <Text style={styles.catText}>{product.category.name}</Text>
              )}
            </View>
            <View style={styles.subcat}>
              <Text style={styles.title2}>Sub Category: </Text>
              {product.subCategory &&
                product.subCategory.map((s) => {
                  return (
                    <Text key={s._id} style={styles.subCat}>
                      {s.name}
                    </Text>
                  );
                })}
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => addToCart(product)}
            >
              <Text style={styles.btnText}>Add To Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => addToWishlist(product._id)}
            >
              <Text style={styles.btnText}>Add To Wishlist</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

export const SingleProductScreenOptions = (props) => {
  return {
    title: props.route.params.title,
  };
};

const styles = StyleSheet.create({
  content: {
    display: "flex",
    padding: 20,
  },
  desc: {
    borderBottomWidth: 1,
    borderBottomColor: "#DA9816",
    paddingVertical: 10,
  },
  one: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DA9816",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "500",
    fontSize: 18,
  },
  veg: {
    backgroundColor: "#F93154",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 6,
    elevation: 4,
  },
  cat: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DA9816",
    paddingVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
  },
  catText: {
    elevation: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "white",
    color: "#DA9816",
    marginLeft: 10,
  },
  subcat: {
    borderBottomWidth: 1,
    borderBottomColor: "#DA9816",
    paddingVertical: 10,
  },
  title2: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 15,
  },
  subCat: {
    width: "100%",
    backgroundColor: "white",
    textAlign: "center",
    padding: 8,
    color: "#DA9816",
    marginVertical: 6,
    elevation: 4,
  },
  btn: {
    width: "100%",
    backgroundColor: "#00B74A",
    padding: 8,
    marginVertical: 10,
    elevation: 4,
  },
  btn2: {
    width: "100%",
    backgroundColor: "#1266F1",
    padding: 8,
    marginTop: 10,
    elevation: 4,
  },
  btnText: {
    textAlign: "center",
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return { user: state.user, cart: state.cart };
};

export default connect(mapStateToProps, { addToCartAction })(
  SingleProductScreen
);
