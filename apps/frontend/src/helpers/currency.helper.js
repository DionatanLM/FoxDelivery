export const moneyToPtBrTwoPrecision = (value = '0') => {
  if (value !== '0' && value !== null) {
    let newValue = Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return newValue;
  }
  return '0';
};

export const maskCurrency = value => {
  value = value?.replace(/\D/g, '');

  const parsedNumber = parseFloat(value) / 100;

  if (isNaN(parsedNumber)) return null;

  return Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
    parsedNumber
  );
};
