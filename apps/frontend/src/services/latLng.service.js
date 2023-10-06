import axios from 'axios';

const latLng = async address => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const result = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  );
  return result.data.results[0].geometry.location;
};
export default latLng;
