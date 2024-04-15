import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

export default function Banner(props) {
    return (
        <View style={styles.banner}>
            <TouchableOpacity style={{ width: 80 }}>
                <Text style={styles.bannerText}>{props.title}</Text>
            </TouchableOpacity>
            <ScrollView horizontal style={styles.bannerScroll} showsHorizontalScrollIndicator={false}>
                {props.img && props.img.map((i, index) => {
                    return <TouchableOpacity key={index} onPress={() => props.navigation.navigate("Products", { screen: "Products2", params: { id: props.id, title: props.title, search: "category" } })} >
                        <Image source={i} style={styles.bannerImg} resizeMode="cover" />
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {
        height: 300,
        marginVertical: 20,
    },
    bannerText: {
        margin: 5,
        width: "100%",
    },
    bannerScroll: {
        borderTopWidth: 1,
        borderTopColor: "grey",
        paddingVertical: 5
    },
    bannerImg: {
        height: "100%",
        width: 280,
        marginRight: 10
    },
    bannerText: {
        fontSize: 18,
        textTransform: "capitalize",
        marginBottom: 5,
        fontWeight: "bold",
        color: "grey",
    },
    bannerImg: {
        height: "100%",
        width: 280,
        marginRight: 10
    },
})