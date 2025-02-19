import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        drawerActiveBackgroundColor: "red",
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
