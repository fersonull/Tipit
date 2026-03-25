import { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <View className="flex-row justify-between items-center mb-8">
      <View>
        <Text className="font-instrument-bold text-2xl text-gray-900 tracking-tight">
          Welcome, {user.displayName || 'User1'}!
        </Text>
        <Text className="font-instrument text-gray-400 text-sm mt-1">
          Track your budget here
        </Text>
      </View>
      {/* Avatar Placeholder */}
      <View className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
        <Image
          source={{
            uri:
              user.photoURL ||
              'https://api.dicebear.com/7.x/avataaars/png?seed=Felix',
          }}
          className="w-full h-full"
        />
      </View>
    </View>
  );
}
