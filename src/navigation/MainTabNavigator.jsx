import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBottomTabNavigator from './MainBottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function MainTabNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainBottomTab" component={MainBottomTabNavigator} />
    </Stack.Navigator>
  );
}
