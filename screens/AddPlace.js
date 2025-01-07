import PlaceForm from "../components/Places/PlaceForm";
import { useSQLiteContext } from 'expo-sqlite';


export default function AddPlace({ navigation, route }) {
  const db = useSQLiteContext();

  const createPlaceHandler = async (place) => {
    try {
      await db.runAsync('INSERT INTO places (title, imageUri, address, location) VALUES (?, ?, ?, ?);',
        place?.title ?? '',
        place?.imageUri ?? '',
        place?.location?.lat ?? '',
        place?.location?.lng ?? '');

      navigation.navigate("AllPlaces");
    } catch (error) {
      console.error(error);
    }
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} selectedLocation={route?.params?.selectedLocation} />;
}
