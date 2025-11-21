import { API_KEY } from "@env";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

export async function exchangeRateApi(fromCurrency) {
    try {

        const response = await fetch(`${BASE_URL}/${fromCurrency}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

