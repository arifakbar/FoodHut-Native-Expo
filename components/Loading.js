import { View, ActivityIndicator } from 'react-native';

export default function Loading() {
    return <View style={{ display: "flex", height: 670, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#DA9816" />
    </View>
}