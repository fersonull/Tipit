import { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundedCheckbox } from '../../components/ui/RoundedCheckBox';
import { AuthContext } from '../../contexts/AuthContext';
import { getAuthError } from '../../utils/firebaseAuth.utils';

export default function LoginScreen({ navigation }) {
  // Local state to handle the UI toggle for the password visibility
  const { googleLogin, register } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleTextChange = (fieldName, text) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: text,
    }));
  };

  const handleSignup = async () => {
    try {
      await register(formData.email, formData.password);
    } catch (error) {
      Alert.alert('Sign up failed', getAuthError(error));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex items-center py-10">
        <Text className="font-instrument-bold text-3xl tracking-tighter">
          Sup up for Tipit
        </Text>
        <Text className="font-instrument text-sm mt-2 text-gray-500 text-center max-w-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          laboriosam?
        </Text>

        {/* Email and password */}
        <View className="gap-6 w-full px-6 mt-10">
          <View className="gap-2 items-start w-full">
            <Text className="font-instrument-bold text-gray-700">Name</Text>
            <TextInput
              className="w-full border-b-2 border-gray-400 focus:border-gray-800 px-3 py-4 font-instrument-bold text-black"
              placeholder="John Doe"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => handleTextChange('email', text)}
            />
          </View>

          <View className="gap-2 items-start w-full">
            <Text className="font-instrument-bold text-gray-700">Email</Text>
            <TextInput
              className="w-full border-b-2 border-gray-400 focus:border-gray-800 px-3 py-4 font-instrument-bold text-black"
              placeholder="johndoe@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => handleTextChange('email', text)}
            />
          </View>

          <View className="gap-2 items-start w-full">
            <Text className="font-instrument-bold text-gray-700">Password</Text>
            <TextInput
              className="w-full border-b-2 border-gray-400 focus:border-gray-800 px-3 py-4 font-instrument-bold text-black"
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onChangeText={text => handleTextChange('password', text)}
            />
          </View>

          <View className="gap-2 items-start w-full">
            <Text className="font-instrument-bold text-gray-700">
              Confirm Password
            </Text>
            <TextInput
              className="w-full border-b-2 border-gray-400 focus:border-gray-800 px-3 py-4 font-instrument-bold text-black"
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onChangeText={text => handleTextChange('confirmPassword', text)}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <RoundedCheckbox
              value={showPassword}
              onValueChange={setShowPassword}
            />
            <Text className="font-instrument-bold text-gray-700">
              Show password
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleSignup}
            activeOpacity={0.7}
            className="bg-slate-900 rounded-full py-4 mt-2"
          >
            <Text className="font-instrument-bold text-center text-white text-lg">
              Sign up
            </Text>
          </TouchableOpacity>

          <Text className="text-center font-instrument text-sm">
            OR CONTINUE WITH
          </Text>

          {/* Google auth */}
          <TouchableOpacity
            onPress={googleLogin}
            activeOpacity={0.7}
            className="bg-white border border-gray-200 rounded-full py-4"
          >
            <Text className="font-instrument-bold text-center text-slate-900 text-lg">
              Google
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-2">
            <Text className="font-instrument text-gray-700">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text className="font-instrument-bold text-blue-600">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
