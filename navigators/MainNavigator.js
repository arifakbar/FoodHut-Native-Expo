import { StatusBar, Pressable } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "../screens/HomeScreen";
import { homeScreenOptions } from "../screens/HomeScreen";
import MenuScreen from '../screens/MenuScreen';
import ReservationScreen from '../screens/ReservationScreen';
import PressScreen from "../screens/PressScreen";
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import DrawerContent from '../components/DrawerContent';
import ProfileScreen, { profileScreenContent } from '../screens/user/ProfileScreen';
import SearchScreen from "../screens/SearchScreen";
import CartScreen, { cartScreenOptions } from '../screens/CartScreen';
import ProductsScreen, { ProductsScreenOptions } from "../screens/ProductsScreen";
import SingleProductScreen, { SingleProductScreenOptions } from "../screens/SingleProductScreen";
import UserDrawerContent from "../components/UserDrawerContent";
import UserHistoryScreen, { UserHistoryScreenContent } from "../screens/user/UserHistoryScreen";
import UserReservationScreen, { UserReservationScreenContent } from '../screens/user/UserReservationScreen';
import UserWishlistScreen, { UserWishlistScreenContent } from "../screens/user/UserWhislistScreen";
import ChangePasswordScreen, { ChangePasswordScreenContent } from "../screens/ChangePasswordScreen";
import UpdateScreen, { UpdateScreenContent } from "../screens/user/UpdateScreen";
import CheckoutScreen, { CheckoutScreenOptions } from "../screens/user/CheckoutScreen";
import PaymentScreen from "../screens/user/PaymentScreen";


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = (props) => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerTintColor: '#DA9816',
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={homeScreenOptions} initialParams={{ modal: false, type: "login" }} />
            <HomeStack.Screen name="Profile" component={ProfileDrawerNavigator} options={{ headerShown: false }} />
            <HomeStack.Screen name="Search" component={SearchScreen} options={{ title: "Search" }} />
            <HomeStack.Screen name="Products" component={ProductsStackNavigator} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    )
}

const ProductsStack = createNativeStackNavigator();

const ProductsStackNavigator = (props) => {
    return <ProductsStack.Navigator screenOptions={{
        headerTintColor: '#DA9816',
        headerTitleAlign: "center",
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}>
        <ProductsStack.Screen name="Products2" component={ProductsScreen} options={ProductsScreenOptions} />
        <ProductsStack.Screen name="Product" component={SingleProductScreen} options={SingleProductScreenOptions} />
    </ProductsStack.Navigator>
}

const MenuStack = createNativeStackNavigator();

const MenuStackNavigator = (props) => {
    return (
        <MenuStack.Navigator>
            <MenuStack.Screen name="Menu" component={MenuScreen} options={{
                title: "MENU",
                headerTintColor: '#DA9816',
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <Pressable onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name="menu" size={26} color="#DA9816" />
                </Pressable>
            }} />
        </MenuStack.Navigator>
    )
}

const ReservationStack = createNativeStackNavigator();

const ReservationStackNavigator = (props) => {
    return (
        <ReservationStack.Navigator>
            <ReservationStack.Screen name="Reservation" component={ReservationScreen} options={{
                title: "RESERVATION",
                headerTintColor: '#DA9816',
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    // fontFamily: "Montserrat"
                },
                headerLeft: () => <Pressable onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name="menu" size={26} color="#DA9816" />
                </Pressable>
            }} />
        </ReservationStack.Navigator>
    )
}

const PressStack = createNativeStackNavigator();

const PressStackNavigator = (props) => {
    return (
        <PressStack.Navigator>
            <PressStack.Screen name="Press" component={PressScreen} options={{
                title: "PRESS",
                headerTintColor: '#DA9816',
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    // fontFamily: "Montserrat"
                },
                headerLeft: () => <Pressable onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name="menu" size={26} color="#DA9816" />
                </Pressable>
            }} />
        </PressStack.Navigator>
    )
}

const AboutStack = createNativeStackNavigator();

const AboutStackNavigator = (props) => {
    return (
        <AboutStack.Navigator>
            <AboutStack.Screen name="About" component={AboutScreen} options={{
                title: "ABOUT",
                headerTintColor: '#DA9816',
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    // fontFamily: "Montserrat"
                },
                headerLeft: () => <Pressable onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name="menu" size={26} color="#DA9816" />
                </Pressable>
            }} />
        </AboutStack.Navigator>
    )
}

const ContactStack = createNativeStackNavigator();

const ContactStackNavigator = (props) => {
    return (
        <ContactStack.Navigator>
            <ContactStack.Screen name="Contact" component={ContactScreen} options={{
                title: "CONTACT",
                headerTintColor: '#DA9816',
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    // fontFamily: "Montserrat"
                },
                headerLeft: () => <Pressable onPress={() => props.navigation.openDrawer()}>
                    <Ionicons name="menu" size={26} color="#DA9816" />
                </Pressable>
            }} />
        </ContactStack.Navigator>
    )
}

const Tabs = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tabs.Navigator screenOptions={{
            headerTintColor: '#DA9816',
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            tabBarActiveTintColor: "#DA9816",
            tabBarActiveBackgroundColor: "lightgrey"
        }}>
            <Tabs.Screen name="HomeMain" options={{ headerShown: false, tabBarLabel: "Home", tabBarIcon: () => (<Ionicons name="home" color="#DA9816" size={20} />), }} component={HomeStackNavigator} />
            <Tabs.Screen name="Cart" component={CartStackNavigator} options={cartScreenOptions} />
        </Tabs.Navigator>
    )
}

const CartStack = createNativeStackNavigator();

const CartStackNavigator = props => {
    return (
        <CartStack.Navigator screenOptions={{
            headerTintColor: '#DA9816',
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: 'bold',
                // fontFamily: "Montserrat"
            },
        }}>
            <CartStack.Screen name="Main_Cart" options={{ title: "Cart" }} component={CartScreen} />
            <CartStack.Screen name="Checkout" component={CheckoutStackNavigator} />
        </CartStack.Navigator>
    )
}

const CheckoutStack = createNativeStackNavigator();

const CheckoutStackNavigator = props => {
    return (
        <CheckoutStack.Navigator>
            <CheckoutStack.Screen name="Main_Checkout" component={CheckoutScreen} options={CheckoutScreenOptions} />
            <CheckoutStack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        </CheckoutStack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

export const MainNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerStyle: {
                marginTop: StatusBar.currentHeight,
            },
            drawerActiveTintColor: "#DA9816",
        }}
            drawerContent={DrawerContent}
        >
            <Drawer.Screen name="HOME" component={TabNavigator} />
            {/* <Drawer.Screen name="MENU" component={MenuStackNavigator} /> */}
            <Drawer.Screen name="RESERVATION" component={ReservationStackNavigator} />
            <Drawer.Screen name="PRESS" component={PressStackNavigator} />
            {/* <Drawer.Screen name="ABOUT" component={AboutStackNavigator} /> */}
            <Drawer.Screen name="CONTACT" component={ContactStackNavigator} />
        </Drawer.Navigator>
    )
}

const UpdateStack = createNativeStackNavigator();

const UpdateStackNavigator = props => {
    return (
        <UpdateStack.Navigator screenOptions={{
            headerTintColor: '#DA9816',
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <UpdateStack.Screen name="Main_profile_2" component={ProfileScreen} options={profileScreenContent} />
            <UpdateStack.Screen name="Update" component={UpdateScreen} options={UpdateScreenContent} />
        </UpdateStack.Navigator>
    )
}

const ProfileStack = createDrawerNavigator();

const ProfileDrawerNavigator = (props) => {
    return (
        <ProfileStack.Navigator screenOptions={{
            drawerStyle: {
                marginTop: StatusBar.currentHeight,
            },
            drawerActiveTintColor: "#DA9816",
            headerTintColor: '#DA9816',
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
            drawerContent={UserDrawerContent}
        >
            <ProfileStack.Screen name="Main_Profile" component={UpdateStackNavigator} options={{ headerShown: false, title: "Profile" }} />
            {/* <ProfileStack.Screen name="Update" component={UpdateScreen} options={UpdateScreenContent} /> */}
            <ProfileStack.Screen name="Orders" component={UserHistoryScreen} options={UserHistoryScreenContent} />
            <ProfileStack.Screen name="Reservations" component={UserReservationScreen} options={UserReservationScreenContent} />
            <ProfileStack.Screen name="Wishlist" component={UserWishlistScreen} options={UserWishlistScreenContent} />
            <ProfileStack.Screen name="Reset_Password" component={ChangePasswordScreen} options={ChangePasswordScreenContent} />
        </ProfileStack.Navigator>
    )
}