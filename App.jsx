import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { configureGoogleSignIn } from './src/config/googleAuth';
import { AuthProvider } from './src/contexts/AuthContext';
import Toast from 'react-native-toast-message';
import './global.css';

configureGoogleSignIn();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
        <Toast />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
