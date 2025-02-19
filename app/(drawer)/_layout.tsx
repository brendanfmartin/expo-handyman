import { DrawerContentScrollView, DrawerItemList, useDrawerStatus } from "@react-navigation/drawer";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { openDatabaseSync, useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Location } from "../../types/location";

const database = 'reports.db';
const debugDbConnection = openDatabaseSync(database);

export default function DrawerLayout() {

  useDrizzleStudio(debugDbConnection);

  const CustonDrawerContent = (props: any) => {

    const db = useSQLiteContext();

    const [locations, setLocations] = useState<Location[]>([]);
    const isDrawerOpen = useDrawerStatus() === 'open';
  
    useEffect(() => { 
      const getLocations = async () => {
        console.log('getting locations');
        
        const locations = await db.getAllAsync<Location>('SELECT * FROM locations');
        setLocations(locations);
      }
  
      if (isDrawerOpen) {
        getLocations();
      }
    }, [isDrawerOpen]);

    const router = useRouter();
    const { bottom } = useSafeAreaInsets();


    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
        drawerContent={CustonDrawerContent}
        screenOptions={{
        headerTintColor: "black",
      }}>
        <Drawer.Screen name="locations" options={{
          title: "Locations"
        }} />
        <Drawer.Screen name="index" options={{
          title: "Home",
        }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
