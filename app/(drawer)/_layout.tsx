import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from 'expo-sqlite';

const database = 'reports.db';
const db = SQLite.openDatabaseSync(database);

export default function DrawerLayout() {

  useDrizzleStudio(db);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
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
