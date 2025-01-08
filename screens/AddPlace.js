import { useCallback, useState } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { useSQLiteContext } from "expo-sqlite";
import { Place } from "../models/place";

export default function AddPlace({ navigation, route }) {
  const [enteredTitle, setEnteredTitle] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState({
    address: route?.params?.address,
    lat: route?.params?.selectedLocation.lat,
    lng: route?.params?.selectedLocation.lng,
  });

  const db = useSQLiteContext();

  const changeTtitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = async () => {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    try {
      await db.runAsync(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          placeData?.title ?? "",
          placeData?.imageUri ?? "",
          placeData?.address ?? "",
          placeData?.location?.lat ?? "",
          placeData?.location?.lng ?? "",
        ]
      );
      navigation.navigate("AllPlaces");
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };
  return (
    <PlaceForm
      onCreatePlace={savePlaceHandler}
      changeTtitleHandler={changeTtitleHandler}
      takeImageHandler={takeImageHandler}
      pickLocationHandler={pickLocationHandler}
      savePlaceHandler={savePlaceHandler}
    />
  );
}
