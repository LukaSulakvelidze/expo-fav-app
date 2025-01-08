import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

export default function AllPlaces() {
  const db = useSQLiteContext();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      async function getPlaces() {
        const result = await db.getAllAsync("SELECT * FROM places");
        setLoadedPlaces(result);
      }
      getPlaces();
    }
  }, [isFocused]);

  const sortedPlaces = [...loadedPlaces].reverse();
  return <PlacesList places={sortedPlaces} />;
}
