import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MoreIn from "../components/MoreIn";
import Banner from "../components/Banner";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { getSubByParent } from "../functions/SubCategory";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

function HomeScreen(props) {
  const [loading, setLoading] = useState(false);
  const [sweet, setSweet] = useState([]);
  const [FC, setFC] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [query, setQuery] = useState("");

  const fetchSubs = async () => {
    try {
      setLoading(true);
      const res = await getSubByParent("6154966a3223dc77b6b85915");
      setSweet(res.data.data);
      const res2 = await getSubByParent("615496563223dc77b6b85911");
      setFC(res2.data.data);
      const res3 = await getSubByParent("615495973223dc77b6b85909");
      setDrinks(res3.data.data);
      const res4 = await getSubByParent("615495913223dc77b6b85905");
      setSnacks(res4.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  return (
    <ScrollView style={styles.main}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          {props.route.params.type == "login" ? (
            <LoginModal
              visible={props.route.params.modal}
              navigation={props.navigation}
            />
          ) : (
            <SignupModal
              visible={props.route.params.modal}
              navigation={props.navigation}
            />
          )}
          {/* <SignupCompleteModal visible={props.route.params.modal} navigation={props.navigation} /> */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search here...."
              style={styles.search}
              value={query}
              onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
              style={styles.searchBar}
              disabled={query.length < 3}
              onPress={() => props.navigation.navigate("Search", { query })}
            >
              <Ionicons name="search" size={20} color="grey" />
            </TouchableOpacity>
          </View>
          <Banner
            title="Snacks"
            img={[
              require("../assets/images/menu-ff-pizza.jpg"),
              require("../assets/images/menu-ff-frankie.jpg"),
              require("../assets/images/menu-ff-pasta.jpg"),
            ]}
            id="615495913223dc77b6b85905"
            navigation={props.navigation}
          />
          <MoreIn data={snacks} navigation={props.navigation} />
          <View style={styles.banner2}>
            <TouchableOpacity>
              <Text style={styles.bannerText2}>Full Course</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bannerScroll}
              onPress={() =>
                props.navigation.navigate("Products", {
                  screen: "Products2",
                  params: {
                    id: "615496563223dc77b6b85911",
                    title: "Full Course",
                    search: "category",
                  },
                })
              }
            >
              <Image
                source={require("../assets/images/menu-meal.jpg")}
                style={styles.bannerImg2}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <MoreIn data={FC} navigation={props.navigation} />
          <Banner
            title="Drinks"
            img={[
              require("../assets/images/menu-drinks-mocktail.jpg"),
              require("../assets/images/menu-drinks-shakes.jpg"),
              require("../assets/images/menu-drinks-soup.jpg"),
            ]}
            id="615495973223dc77b6b85909"
            navigation={props.navigation}
          />
          <MoreIn data={drinks} navigation={props.navigation} />
          <Banner
            title="Desserts"
            img={[
              require("../assets/images/menu-desserts-ball.jpg"),
              require("../assets/images/menu-desserts-cake.jpg"),
              require("../assets/images/menu-desserts-icecream.jpg"),
              require("../assets/images/menu-desserts-sandwich.jpg"),
            ]}
            id="6154966a3223dc77b6b85915"
            navigation={props.navigation}
          />
          <MoreIn data={sweet} navigation={props.navigation} />
        </View>
      )}
    </ScrollView>
  );
}

const selectedUser = (state) => state.user;

export const homeScreenOptions = (props) => {
  const user = useSelector(selectedUser);
  return {
    title: "FoodHUT",
    headerRight: () => {
      return user && user.token ? (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Profile", {
              screen: "Main_Profile.Main_profile_2",
              params: {
                id: "615496563223dc77b6b85911",
                title: "Full Course",
                search: "category",
              },
            })
          }
        >
          <Ionicons name="person-circle-outline" color="#DA9816" size={32} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            props.navigation.setParams({ modal: true, type: "login" });
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      );
    },
    headerLeft: () => (
      <Pressable onPress={() => props.navigation.openDrawer()}>
        <Ionicons name="menu" size={26} color="#DA9816" />
      </Pressable>
    ),
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  search: {
    width: "92%",
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 10,
    width: "100%",
    position: "relative",
  },
  searchBar: {
    position: "absolute",
    top: 13,
    right: 8,
  },
  banner2: {
    overflow: "hidden",
    paddingHorizontal: 5,
    display: "flex",
    justifyContent: "space-between",
    height: 300,
    width: "100%",
    marginVertical: 20,
  },
  bannerText2: {
    fontSize: 18,
    textTransform: "capitalize",
    marginBottom: 5,
    fontWeight: "bold",
    color: "grey",
  },
  bannerImg2: {
    height: "100%",
    width: "100%",
  },
  bannerScroll: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    paddingVertical: 5,
  },
  loginBtn: {
    borderWidth: 2,
    borderColor: "#DA9816",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  loginText: {
    color: "#DA9816",
    fontWeight: "600",
  },
});

export default HomeScreen;
