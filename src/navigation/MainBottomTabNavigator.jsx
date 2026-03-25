import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/main/DashboardScreen';
import StatsScreen from '../screens/main/StatsScreen';
import AddTransactionScreen from '../screens/main/AddTransactionScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import CustomTabBar from '../components/navigation/CustomTabBar';

const tabs = [
  {
    name: 'DashboardScreen',
    screen: DashboardScreen,
    label: 'Dashbboard',
  },
  {
    name: 'StatsScreen',
    screen: StatsScreen,
    label: 'Stats',
  },
  {
    name: 'AddScreen',
    screen: AddTransactionScreen,
    label: 'Add',
  },
  {
    name: 'ProfileScreen',
    screen: ProfileScreen,
    label: 'Profile',
  },
];

const Tab = createBottomTabNavigator();

export default function MainBottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabs.map((tab, idx) => (
        <Tab.Screen
          key={idx}
          name={tab.name}
          component={tab.screen}
          options={{
            tabBarLabel: tab.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
