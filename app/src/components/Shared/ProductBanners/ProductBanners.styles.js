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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});