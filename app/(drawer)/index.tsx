import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Location } from "../../types/location";  
import { LocationForm } from "@/components/LocationForm";


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

  const deleteLocation = async (id: string) => {
    await db.runAsync('DELETE FROM locations WHERE id = ?', id);
    const locations = await db.getAllAsync<Location>('SELECT * FROM locations');
    setLocations(locations);
  }


  const locationItem = ({ item }: { item: Location }) => {
    return (
      <View style={styles.locationItem}>
        <Text>{item.name}</Text>
        <TouchableOpacity onPress={() => deleteLocation(item.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const addLocation = async (name: string) => {
    db.runAsync('INSERT INTO locations (name) VALUES (?)', name);
    const locations = await db.getAllAsync<Location>('SELECT * FROM locations');
    setLocations(locations);
  }

  return (
    <View style={styles.container}>
      <LocationForm onSubmit={addLocation} />
      <FlatList
        data={locations} 
        renderItem={locationItem} 
      />
    </View>
  )
}

export default DrawerIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  }, 
});
