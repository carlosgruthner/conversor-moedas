import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/Input/Input';
import { ResultCard } from './src/components/ResultCard/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { useState } from 'react';
import { convertCurrency } from './src/Utils/convertCurrency';
import { maskMoney } from './src/Utils/maskMoney';

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  async function fetchExchangeRate() {
    try {
      if(!amount) return 
      setLoading(true);

      const data = await exchangeRateApi(fromCurrency);
      const rate  = data.conversion_rates[toCurrency];
      setExchangeRate(rate);
      const convertedAmount = convertCurrency(amount, rate);
      setResult(convertedAmount);
      console.log(convertedAmount);
    } catch (error) {
      alert("Ops, houve um erro", error);
    }finally{
      setLoading(false);
    }
  }

  function swapCurrency() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
  }
  return (

    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.ScrollView}>
      <View style={styles.content}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.title}>Conversor de Moedas</Text>
          <Text style={styles.subTitle}>Converta valores entre diferentes moedas</Text>
        </View>

        <View style={styles.card}>
          
          <Text style={styles.label}>De:</Text>
          <View style={styles.currencyGrid}>
            {currencies.map(currency => (
              <Button
                key={currency.code}
                currency={currency}
                variant="primary"
                onPress={() => setFromCurrency(currency.code)}
                isSelected={fromCurrency === currency.code}
              ></Button>
            ))}
          </View>
            
                
            <Text style={styles.label}>Para: </Text>
            <View style={styles.currencyGrid}>
            {currencies.map(currency => (
              <Button
                key={currency.code}
                currency={currency}
                variant="secondary"
                onPress={() => setToCurrency(currency.code)}
                isSelected={toCurrency === currency.code}
              ></Button>
            ))}
            </View>
            <Text 
              style={styles.label}
            >Inverter</Text>
            <TouchableOpacity 
              style={styles.swapButton}
              onPress={swapCurrency}
            >
                <Text style={styles.swapButtonText}>⇋</Text>
            </TouchableOpacity>
        <Input label="Valor" value={amount} onChangeText={(v) => setAmount(maskMoney(v ))} />
        </View>

        <TouchableOpacity 
        style={[styles.convertButton, (!amount || loading) && styles.convertButtonDisabled]}
          onPress={fetchExchangeRate}
          disabled={!amount || loading}
        >
          {loading ? (
            <ActivityIndicator style={styles.swapButtonText} size="small" />
          ) : (
            <View style={styles.swapButtonText}>
            <Text style={styles.swapButtonText}>Converter</Text>
          </View>
          )}
          
        </TouchableOpacity>

        <ResultCard
          exchangeRate={exchangeRate}
          result={result}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          currencies={currencies}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
