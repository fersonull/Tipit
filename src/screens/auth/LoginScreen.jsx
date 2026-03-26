import { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundedCheckbox } from '../../components/ui/RoundedCheckBox';
import { AuthContext } from '../../contexts/AuthContext';
import { getAuthError } from '../../utils/firebaseAuth.utils';
import { toast } from '../../utils/toast.utils';
import { GoogleIcon } from '../../components/icons';

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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
    if (!formData.email || !formData.password) {
      toast.error('Validation Error', 'Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.log(error);
      toast.error('Login failed', getAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await googleLogin();
    } catch (error) {
      console.log(error);
      toast.error('Google Login failed', getAuthError(error));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          {/* Header */}
          <View className="items-center mb-10">
            <Text className="font-instrument-bold text-4xl text-gray-900 tracking-tight">
              Welcome back
            </Text>
            <Text className="font-instrument text-gray-400 text-base mt-2 text-center">
              Log in to Tipit to manage your finances securely.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-5 w-full">
            {/* Email Input */}
            <View className="gap-2 w-full">
              <Text className="font-instrument-bold text-gray-700 ml-1">
                Email
              </Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white px-5 py-4 rounded-2xl font-instrument text-gray-900 text-base shadow-sm"
                placeholder="johndoe@example.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isSubmitting && !isGoogleLoading}
                onChangeText={text => handleTextChange('email', text)}
              />
            </View>

            {/* Password Input */}
            <View className="gap-2 w-full">
              <Text className="font-instrument-bold text-gray-700 ml-1">
                Password
              </Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white px-5 py-4 rounded-2xl font-instrument text-gray-900 text-base shadow-sm"
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isSubmitting && !isGoogleLoading}
                onChangeText={text => handleTextChange('password', text)}
              />
            </View>

            {/* Checkbox Container */}
            <View className="flex-row items-center gap-3 ml-1 mt-1 mb-2">
              <RoundedCheckbox
                value={showPassword}
                onValueChange={setShowPassword}
              />
              <Text className="text-gray-600 font-instrument-bold text-sm">
                Show password
              </Text>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleLogin}
              disabled={isSubmitting || isGoogleLoading}
              className={`w-full py-5 rounded-2xl items-center shadow-lg shadow-blue-200 mt-2 ${
                isSubmitting ? 'bg-blue-400' : 'bg-[#4D7CFE]'
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="font-instrument-bold text-white text-lg tracking-wide">
                  Log in
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-[1px] bg-gray-100" />
              <Text className="font-instrument text-gray-400 mx-4 text-xs uppercase tracking-widest">
                Or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-gray-100" />
            </View>

            {/* Google Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleGoogleLogin}
              disabled={isSubmitting || isGoogleLoading}
              className="flex-row justify-center items-center w-full py-4 rounded-2xl bg-white border border-gray-200 shadow-sm"
            >
              {isGoogleLoading ? (
                <ActivityIndicator color="#4D7CFE" />
              ) : (
                <View className="flex-row gap-4 items-center">
                  <GoogleIcon size={20} />
                  <Text className="font-instrument-bold text-gray-800 text-lg">
                    Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="font-instrument text-gray-500 text-base">
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('RegisterScreen')}
                disabled={isSubmitting || isGoogleLoading}
              >
                <Text className="font-instrument-bold text-[#4D7CFE] text-base">
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
