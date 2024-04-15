import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { searchProducts } from "../functions/products";
import Loading from '../components/Loading';
import Card from '../components/Card';

function SearchScreen(props) {
    const { query } = props.route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await searchProducts(query);
            setProducts(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    const fetchProducts2 = async (e) => {
        try {
            setLoading(true);
            const res = await searchProducts(e);
            setProducts(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [query]);

    return (
        <>
            {loading ?
                <Loading /> :
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Search here...." style={styles.search} value={search} onChangeText={e => setSearch(e)} />
                        <TouchableOpacity style={styles.searchBar} disabled={query.length < 3} onPress={() => fetchProducts2(search)} >
                            <Ionicons name="search" size={20} color="grey" />
                        </TouchableOpacity>
                    </View>
                    <Card navigation={props.navigation} products={products} />
                </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginVertical: 20,
        paddingHorizontal: 10
    },
    inputContainer: {
        padding: 10,
        backgroundColor: "white",
        elevation: 4,
        borderRadius: 10,
        width: "100%",
        position: "relative",
        marginBottom: 20
    },
    searchBar: {
        position: "absolute",
        top: 13,
        right: 8
    },
    search: {
        width: "92%",
    },
});

export default SearchScreen;