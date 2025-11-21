export const maskMoney = (value, symbol) => {
    value = value.replace(/\D/g, "");
  value = (Number(value) / 100).toFixed(2);
  value = value.replace(".", ",");
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return  value;
}