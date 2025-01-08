export const getMapPreview = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&key=${process.env.EXPO_PUBLIC_API_GOOGLE_API_KEY}`;
};

export const getAddress = async (lat, lng) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_API_GOOGLE_API_KEY}`
  );

  if (!response) {
    throw new Error("Failed fetch");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;

  return address;
};
