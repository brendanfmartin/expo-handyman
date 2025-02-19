import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Location } from "../../types/location";  


export const DrawerIndex = () => {

  const db = useSQLiteContext();
  const [locations, setLocations] = useState<Location[]>([]);


  useEffect(() => { 
    const getLocations = async () => {
      const locations = await db.getAllAsync<Location>('SELECT * FROM locations');
      setLocations(locations);
    }
    getLocations();
  }, []);

  return (
    <View>
      <Text>Drawer index</Text>
      <FlatList 
        data={locations} 
        renderItem={({ item }: { item: Location }) => <Text>{item.name}</Text>} 
      />
    </View>
  )
}

export default DrawerIndex;