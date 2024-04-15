import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

export default function MoreIn({ data, navigation }) {
    return (
        <View style={styles.moreIn}>
            <View style={styles.moreInWrapper}>
                {data && data.map((d, index) => {
                    return <View key={index}>
                        <TouchableOpacity style={styles.moreInImg} onPress={() => navigation.navigate("Products", { screen: "Products2", params: { id: d._id, title: d.name, search: "subcategory" } })}>
                            <Image source={require('../assets/images/menu-ff-pasta.jpg')} resizeMode="cover" style={styles.moreInImage} />
                        </TouchableOpacity>
                        <Text style={styles.moreInTitle2}>{d.name}</Text>
                    </View>
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    moreIn: {
        width: "100%",
    },
    moreInImg: {
        height: 70,
        width: 70,
        borderRadius: 50,
        overflow: "hidden",
        elevation: 4,
        margin: 10,
    },
    moreInImage: {
        height: "100%",
        width: "100%"
    },
    moreInWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    moreInTitle2: {
        fontSize: 10,
        color: "grey",
        textAlign: "center"
    },
})