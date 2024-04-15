import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Loading from "../components/Loading";

import { getFilterProducts } from "../functions/products";
import Card from "../components/Card";

function ProductsScreen(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id, search } = props.route.params;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await (search === "category"
          ? getFilterProducts({ category: id })
          : getFilterProducts({ subCategory: id }));
        setProducts(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchProducts();
  }, [id, search]);

  return (
    <View style={{ alignItems: "center", paddingVertical: 20 }}>
      {loading ? (
        <Loading />
      ) : products.length > 0 ? (
        <Card products={products} navigation={props.navigation} />
      ) : (
        <Text>Currently, Out of Stock!</Text>
      )}
    </View>
  );
}

export const ProductsScreenOptions = (props) => {
  const { title } = props.route.params;
  return {
    title: title,
  };
};

const styles = StyleSheet.create({});

export default ProductsScreen;
