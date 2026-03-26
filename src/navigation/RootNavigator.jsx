import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import MainTabNavigator from './MainTabNavigator';
import TransactionDetailScreen from '../screens/main/TransactionDetailScreen';
import AllTransactionsScreen from '../screens/main/AllTransactionsScreen';
import EditTransactionScreen from '../screens/main/EditTransactionScreen';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Group>
            <Stack.Screen
              name="AppContent"
              component={MainTabNavigator}
              options={{
                animation: 'ios_from_right',
              }}
            />
            <Stack.Screen
              name="TransactionDetail"
              component={TransactionDetailScreen}
              options={{
                animation: 'ios_from_right',
              }}
            />
            <Stack.Screen
              name="AllTransactions"
              component={AllTransactionsScreen}
              options={{
                animation: 'ios_from_right',
              }}
            />
            <Stack.Screen
              name="EditTransaction"
              component={EditTransactionScreen}
              options={{
                animation: 'ios_from_right',
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Authentication"
            component={AuthStack}
            options={{
              animation: 'ios_from_left',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default RootNavigator;
