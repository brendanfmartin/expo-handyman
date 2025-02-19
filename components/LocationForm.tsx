import { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet } from "react-native";

export const LocationForm = ({onSubmit}: { onSubmit: (name: string) => void}) => {

  const [newLocationName, setNewLocationName] = useState<string>('');

  const newLocationNameChanged = (text: string) => {
    setNewLocationName(text);
  }

  const submit = () => {
    if (newLocationName.trim() === '') {
      return;
    }
    onSubmit(newLocationName);
    setNewLocationName('');
  }
    
  return (
    <View>
      <TextInput style={styles.input} placeholder="Location name" onChangeText={newLocationNameChanged} />
      <TouchableOpacity style={styles.button} onPress={() => submit()}>
        <Text>Add Location</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'grey',
      padding: 10,
      borderRadius: 5,
    }
});   
  