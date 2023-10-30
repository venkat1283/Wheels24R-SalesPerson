import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { useFonts } from "expo-font"
import 'react-native-gesture-handler'
import { AppProvider } from './AppProvider';

export default function App() {
  const [isLoad] = useFonts({
    'Roboto-Regular': require("./src/Fonts/Roboto/Roboto-Regular.ttf"),//400
    "Roboto-Medium": require("./src/Fonts/Roboto/Roboto-Medium.ttf"), //500
    "Roboto-Bold": require("./src/Fonts/Roboto/Roboto-Bold.ttf"),//700
    "Roboto-Light": require("./src/Fonts/Roboto/Roboto-Light.ttf"),
  });
  if (!isLoad) {
    return null;
  }
  return (
    <AppProvider>
      <StackNavigator />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
