import { View, Text, StyleSheet, ScrollView } from "react-native";

function AboutScreen(props) {
    return (
        <ScrollView style={styles.conatiner}>
            <View>
                <Text>About Screen</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
    }
});

export default AboutScreen;