import { useContext, useEffect } from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from '../../utils/toast.utils';
import { getAuthError } from '../../utils/firebaseAuth.utils';

export default function DashboardScreen() {
  const { logout, user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    toast.success('Login success', `Welcome ${user._user.displayName}!`);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      toast.success('Logout success', 'Logged out successfully');
    } catch (error) {
      toast.error('Error logging out', getAuthError(error));
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-lg font-instrument-bold tracking-tighter">
        Welcome, {user._user.displayName || 'User'}!
      </Text>

      <Text className="font-instrument text-center max-w-sm">
        You are authenticated with an email address
        <Text className="font-instrument-bold"> '{user._user.email}'</Text>.
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}
