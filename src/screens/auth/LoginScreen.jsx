import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundedCheckbox } from '../../components/ui/RoundedCheckBox';
import { AuthContext } from '../../contexts/AuthContext';
import { getAuthError } from '../../utils/firebaseAuth.utils';
import { toast } from '../../utils/toast.utils';

export default function LoginScreen({ navigation }) {
  // Local state to handle the UI toggle for the password visibility
  const [showPassword, setShowPassword] = useState(false);
  const { googleLogin, login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleTextChange = (fieldName, text) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: text,
    }));
  };

  const handleLogin = async () => {
    try {
      const user = await login(formData.email, formData.password);
    } catch (error) {
      console.log(error);
      toast.error('Login failed', getAuthError(error));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex items-center my-10">
        <Text className="font-instrument-bold text-3xl tracking-tighter">
          Log in to Tipit
        </Text>
        <Text className="font-instrument mt-2 text-gray-500">
          Lorem ipsum dolor sit amet consectetur.
        </Text>

        {/* Email and password */}
        <View className="gap-6 w-full px-6 mt-10">
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

          {/* Checkbox Container */}
          <View className="flex-row items-center gap-2">
            <RoundedCheckbox
              value={showPassword}
              onValueChange={setShowPassword}
            />
            <Text className=" text-gray-700 font-instrument-bold">
              Show password
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleLogin}
            className="bg-slate-900 rounded-full py-4 mt-2"
          >
            <Text className="font-instrument-bold text-center text-white text-lg">
              Log in
            </Text>
          </TouchableOpacity>

          <Text className="text-center font-instrument text-sm">
            OR CONTINUE WITH
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={googleLogin}
            className="bg-white border border-gray-200 rounded-full py-4"
          >
            <Text className="font-instrument-bold text-center text-slate-900 text-lg">
              Google
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-2">
            <Text className="font-instrument text-gray-700">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              <Text className="font-instrument-bold text-blue-600">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
