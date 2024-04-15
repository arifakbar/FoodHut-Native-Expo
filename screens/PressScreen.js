import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";

import { getNews } from "../functions/press";
import Loading from "../components/Loading";

function PressScreen(props) {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await getNews();
      setNews(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  //<ImageBackground source={require("../assets/images/news.jpg")} style={styles.img}>

  return (
    <ImageBackground
      source={require("../assets/images/news.jpg")}
      style={styles.conatiner}
      imageStyle={{ opacity: 0.5 }}
    >
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          style={{ width: "85%" }}
          keyExtractor={(i) => i._id}
          data={news}
          renderItem={(i) => {
            return (
              <View style={styles.main}>
                <Text style={styles.date}>
                  Posted on {new Date(i.item.createdAt).toDateString()}
                </Text>
                <Text style={styles.title}>{i.item.title}</Text>
                <Text style={styles.content}>{i.item.content} ...</Text>
              </View>
            );
          }}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderBottomColor: "#da9816",
    marginVertical: 25,
  },
  date: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 18,
  },
  content: {
    marginBottom: 10,
    fontSize: 15,
  },
});

export default PressScreen;
