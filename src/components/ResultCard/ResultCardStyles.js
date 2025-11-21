import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.cardBackground,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        gap:8
    },
    label: {
        color: colors.textSecondary,
        marginBottom: 8,
        fontSize: 14,
    },
    value: {
        color: colors.text,
        fontSize: 24,
        fontWeight: 'bold',
    }
})