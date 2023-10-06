import React from 'react'; import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TailwindProvider } from 'tailwindcss-react-native';
import Main from './screens/Main';
import HomepageScreen from './screens/HomepageScreen';
import ResultScreen from './screens/ResultScreen';
import ListItinerayScreen from './screens/ListItinerayScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="HomepageScreen" component={HomepageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ListItinerayScreen" component={ListItinerayScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;