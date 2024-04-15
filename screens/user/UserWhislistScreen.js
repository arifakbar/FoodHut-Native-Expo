import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { connect } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";

import {
  getUserWishlist,
  removeFromUserWishlist,
} from "../../functions/wishlist";
import Loading from "../../components/Loading";

function UserWishlistScreen(props) {
  const { user } = props;
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getUserWishlist(user.token);
      setWishlist(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const remove = async (id) => {
    try {
      setLoading(true);
      await removeFromUserWishlist(user.token, id);
      await fetchWishlist();
      setLoading(false);
      alert("Removed from wishlist");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.conatiner}>
      {loading ? (
        <Loading />
      ) : wishlist.length < 1 ? (
        <Text>No products added to wishlist.</Text>
      ) : (
        <FlatList
          data={wishlist.wishlist}
          keyExtractor={(p) => p._id}
          renderItem={(p) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  props.navigation.navigate("Products", {
                    screen: "Product",
                    params: {
                      id: p.item._id,
                      title: p.item.title,
                    },
                  })
                }
              >
                <View style={styles.imgWrapper}>
                  <Image
                    source={{ uri: p.item.images[0].url }}
                    style={styles.img}
                  />
                </View>
                <View style={styles.content}>
                  <Text style={styles.info}>{p.item.title}</Text>
                  <Text style={styles.info}>-</Text>
                  <Text style={styles.info}>Rs. {p.item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => remove(p.item._id)}
                >
                  <Text style={styles.btnText}>X</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

export const UserWishlistScreenContent = (props) => {
  return {
    title: "Wishlist",
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
    paddingTop: 20,
    alignItems: "center",
  },
  container: {
    height: 280,
    elevation: 5,
    marginVertical: 10,
    borderRadius: 15,
    shadowRadius: 15,
    overflow: "hidden",
  },
  imgWrapper: {
    height: "85%",
    overflow: "hidden",
    width: "100%",
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    width: "100%",
    backgroundColor: "white",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  info: {
    fontSize: 15,
    color: "#DA9816",
    fontWeight: "500",
  },
  btn: {
    position: "absolute",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnText: {
    color: "red",
    fontSize: 25,
    fontWeight: "600",
  },
});

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {})(UserWishlistScreen);
