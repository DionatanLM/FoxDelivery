export const maskCEP = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

export const maskPhone = (value) => {
  if (value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  }
  return "";
};

export const maskDate = (value) => {
  if (value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d+?)$/, "$1/$2");
  }
  return "";
};

export const maskCPF = (value) => {
  return value
    ?.replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const maskCurrency = (value) => {
  value = value.replace(/\D/g, "");
  return Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(
    parseFloat(value) / 100
  );
};

export const maskCNPJ = (value) => {
  return value
    ?.replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const maskTime = (value) => {
  if (value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1:$2")
      .replace(/(:\d{2})(\d+?)$/, "$1");
  }
  return "";
};

export const maskTemperature = (value) => {
  if (value) {
    return value.replace(/\D/g, "").replace(/(\d+)$/, "$1° C");
  }
  return "";
};

export const moneyToPtBr = (value) => {
  if (value !== "0") {
    let newValue = String(value).replace(".", ",");
    return newValue;
  }
  return "0";
};

export const moneyToPtBrTwoPrecision = (value) => {
  if (value !== "0" && value !== null) {
    let newValue = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return newValue;
  }
  return "R$ 0";
};
