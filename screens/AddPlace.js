import PlaceForm from "../components/Places/PlaceForm";

export default function AddPlace({ navigation, route }) {
  const createPlaceHandler = (place) => {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} selectedLocation={route?.params?.selectedLocation} />;
}
