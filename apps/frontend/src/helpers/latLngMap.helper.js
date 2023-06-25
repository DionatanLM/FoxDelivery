import latLng from "@/services/latLng.service";

export const latLngOrder = async data => {
  const address =
    data.rua +
    ', ' +
    data.numero +
    ' - ' +
    data.bairro +
    ', ' +
    data.nomeCidade;
  const addressReplace = address.replace(/undefined/g, '');
  try {
    return latLng(addressReplace);
  } catch (err) {
    return { lat: null, lng: null };
  }
};
