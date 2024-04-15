import { View, Text, StyleSheet, ScrollView } from "react-native";

import { getAllProducts } from "../functions/products";
import Loading from '../components/Loading';
import Card from "../components/Card";

function MenuScreen(props) {
    return (
        <ScrollView style={styles.conatiner}>
            <View>
                <Text>Menu Screen</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
    }
});

export default MenuScreen;