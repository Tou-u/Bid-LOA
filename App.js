import { Provider, MD3DarkTheme } from "react-native-paper";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./Navigator";
import Home from "./Home";
import Help from "./Help";
import Settings from "./Settings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider theme={MD3DarkTheme}>
      <StatusBar backgroundColor={MD3DarkTheme.colors.background} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <Navigator {...props} />,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="Help"
            component={Help}
            options={{ animation: "none" }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ animation: "none" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
