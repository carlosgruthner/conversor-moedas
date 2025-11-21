import { Text, View } from "react-native";
import { styles } from "./ResultCardStyles";

export function ResultCard({exchangeRate, result, fromCurrency, toCurrency, currencies}){ {

    if(!result || !exchangeRate) return null

    const toSymbol  = currencies.find(currency => currency.code === toCurrency).symbol
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Resultado:</Text>
            <Text style={styles.value}>{toSymbol} {result}</Text>
            <Text style={styles.label}>Taxa de câmbio: {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</Text>
        </View>
    );
}
}