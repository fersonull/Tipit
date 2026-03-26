import { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lucide from '@react-native-vector-icons/lucide';
import { AuthContext } from '../../contexts/AuthContext';
import BalanceCard from '../../components/dashboard/BalanceCard';
import { toast } from '../../utils/toast.utils';
import { getAuthError } from '../../utils/firebaseAuth.utils';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

export default function ProfileScreen() {
  const [isLogOutModalVisible, setLogOutModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout, user } = useContext(AuthContext);
  console.log(user);

  const executeLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setIsLoggingOut(false);
    } catch (error) {
      toast.error('Error logging you out', getAuthError(error));
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { icon: 'settings', label: 'Account Settings', color: '#4B5563' },
    { icon: 'bell', label: 'Notifications', color: '#4B5563' },
    { icon: 'shield', label: 'Privacy & Security', color: '#4B5563' },
    { icon: 'circle-help', label: 'Help & Support', color: '#4B5563' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View className="px-6 py-8 items-center border-b border-gray-100 bg-white">
          <View className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-sm mb-4">
            <Image
              source={{
                uri:
                  user.photoURL ||
                  'https://api.dicebear.com/7.x/avataaars/png?seed=Felix',
              }}
              className="w-full h-full"
            />
          </View>
          <Text className="font-instrument-bold text-2xl text-gray-900">
            {user.displayName || 'User67'}
          </Text>
          <View className="items-center">
            <Text className="font-instrument text-gray-500 mt-1">
              {user?.email || 'user@example.com'}
            </Text>
          </View>

          <TouchableOpacity className="mt-4 px-6 py-2 bg-blue-50 rounded-full">
            <Text className="font-instrument-bold text-blue-600">
              Edit Profile
            </Text>
          </TouchableOpacity>

          <BalanceCard />
        </View>

        {/* Menu Items */}
        <View className="px-6 py-6 gap-2">
          {!user.emailVerified && (
            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.7}
              className="flex-row items-center justify-between bg-yellow-50 p-4 rounded-2xl shadow-sm border border-yellow-100 mt-4"
            >
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 bg-yellow-100 rounded-xl items-center justify-center">
                  <Lucide name="mail-warning" color="#ca8a04" size={20} />
                </View>
                <View>
                  <Text className="font-instrument-bold text-base">
                    Your email is not verified
                  </Text>
                  <Text className="font-instrument text-sm">
                    Verify your email
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {menuItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-50"
              >
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
                    <Lucide name={item.icon} color={item.color} size={20} />
                  </View>
                  <Text className="font-instrument-bold text-gray-800 text-base">
                    {item.label}
                  </Text>
                </View>
                <Lucide name="chevron-right" color="#D1D5DB" size={20} />
              </TouchableOpacity>
            );
          })}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={() => setLogOutModalVisible(true)}
            className="flex-row items-center justify-between bg-red-50 p-4 rounded-2xl shadow-sm border border-red-100 mt-4"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center">
                <Lucide name="log-out" color="#DC2626" size={20} />
              </View>
              <Text className="font-instrument-bold text-red-600 text-base">
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="h-32" />

        <ConfirmationModal
          visible={isLogOutModalVisible}
          onClose={() => setLogOutModalVisible(false)}
          onConfirm={executeLogout}
          title="Log out account?"
          message="Are you sure you want to log out?"
          confirmText="Yes, Log out"
          cancelText="Cancel"
          type="danger"
          isLoading={isLoggingOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
