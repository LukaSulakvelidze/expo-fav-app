import { useCallback, useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useSQLiteContext } from 'expo-sqlite';
import { useIsFocused } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

export default function AllPlaces() {
  const db = useSQLiteContext();
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
    if (isFocused) {
      async function getPlaces() {
        const result = await db.getAllAsync('SELECT * FROM places');
        setLoadedPlaces(result);
      }
      getPlaces();
    }
  }, [isFocused]);

  console.log(data, "dataBase");
  return <PlacesList places={loadedPlaces} />;
}
