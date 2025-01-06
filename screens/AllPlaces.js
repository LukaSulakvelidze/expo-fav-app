import { useCallback, useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [data, setData] = useState([]);
  const database = useSQLiteContext();

  // useFocusEffect(
    useCallback(() => {
      loadData(); // Fetch data when the screen is focused
    }, [])
  // );

  const loadData = () => {
    const result =
      database.getAllAsync <
      {
        id,
        title,
        imageUri,
        address,
        location,
      } >
      "SELECT * FROM users";
    setData(result);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((prev) => [...prev, route.params.place]);
    }
  }, [isFocused, route]);

  console.log(data, "dataBase");
  return <PlacesList places={loadedPlaces} />;
}
