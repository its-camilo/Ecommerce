import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    scrollView: {
        flexGrow: 0,
    },
    carousel: {
        width: width,
        height: 160,
    },
});