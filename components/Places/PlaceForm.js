import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/place";
import { useSQLiteContext } from "expo-sqlite";

export default function PlaceForm({
  onCreatePlace,
  selectedLocation
}) {
  const [enteredTitle, setEnteredTitle] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState({ address: selectedLocation?.address, lat: selectedLocation?.lat, lng: selectedLocation?.lng });

  const dateBase = useSQLiteContext();

  const changeTtitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    const placeDate = new Place(enteredTitle, selectedImage, pickedLocation);
    try {
      const response = dateBase.runAsync(
        `INSERT INTO users (title, imageUri, address, location) VALUES (?, ?, ?)`,
        [enteredTitle, selectedImage, pickedLocation]
      );
      console.log("Item saved successfully:", response?.changes);
    } catch (error) {
      console.error("Error saving item:", error);
    }
    onCreatePlace(placeDate);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}> Title </Text>
        <TextInput style={styles.input} onChangeText={changeTtitleHandler} />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 18,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
