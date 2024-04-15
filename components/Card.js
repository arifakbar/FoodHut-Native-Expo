import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

function Card(props) {
  return (
    <FlatList
      data={props.products}
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
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
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
});

export default Card;
