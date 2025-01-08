import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";

import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { useSQLiteContext } from "expo-sqlite";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  const db = useSQLiteContext();
  const selectedPlaceId = route.params.placeId;

  const showOnMapHandler = () => {};
  const deletePlaceHandler = async () => {
    try {
      await db.runAsync("DELETE FROM places WHERE id=?;", [selectedPlaceId]);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadPlaceData() {
      const place = await db.getAllAsync("SELECT * FROM places WHERE id = ?;", [
        selectedPlaceId,
      ]);
      setFetchedPlace(place[0]);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {fetchedPlace.imageUri && (
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      )}
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.title}</Text>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
        <OutlinedButton
          isRemoveButton={true}
          icon="remove-circle"
          onPress={deletePlaceHandler}
        >
          Delete
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: Colors.primary500,
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
