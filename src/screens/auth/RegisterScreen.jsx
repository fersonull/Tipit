import { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundedCheckbox } from '../../components/ui/RoundedCheckBox';
import { AuthContext } from '../../contexts/AuthContext';
import { getAuthError } from '../../utils/firebaseAuth.utils';
import { toast } from '../../utils/toast.utils';
import { GoogleIcon } from '../../components/icons';

export default function RegisterScreen({ navigation }) {
  const { googleLogin, register } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
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
    // 1. Basic Form Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error('Validation Error', 'Please fill in all fields.');
      return;
    }

    // 2. Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Validation Error', 'Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      // NOTE: If your register context function accepts a 'name' parameter,
      // you can pass formData.name here to update their Firebase profile!
      await register(formData.email, formData.password);
    } catch (error) {
      console.log(error);
      toast.error('Sign up failed', getAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
      await googleLogin();
    } catch (error) {
      console.log(error);
      toast.error('Google Sign up failed', getAuthError(error));
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
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          {/* Header */}
          <View className="items-center mb-8 mt-4">
            <Text className="font-instrument-bold text-4xl text-gray-900 tracking-tight">
              Create an account
            </Text>
            <Text className="font-instrument text-gray-400 text-base mt-2 text-center px-4">
              Join Tipit to start tracking your budget and reaching your
              financial goals.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-5 w-full">
            {/* Name Input */}
            <View className="gap-2 w-full">
              <Text className="font-instrument-bold text-gray-700 ml-1">
                Name
              </Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white px-5 py-4 rounded-2xl font-instrument text-gray-900 text-base shadow-sm"
                placeholder="John Doe"
                placeholderTextColor="#9ca3af"
                autoCapitalize="words"
                editable={!isSubmitting && !isGoogleLoading}
                onChangeText={text => handleTextChange('name', text)}
              />
            </View>

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

            {/* Confirm Password Input */}
            <View className="gap-2 w-full">
              <Text className="font-instrument-bold text-gray-700 ml-1">
                Confirm Password
              </Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white px-5 py-4 rounded-2xl font-instrument text-gray-900 text-base shadow-sm"
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isSubmitting && !isGoogleLoading}
                onChangeText={text => handleTextChange('confirmPassword', text)}
              />
            </View>

            {/* Checkbox Container */}
            <View className="flex-row items-center gap-3 ml-1 mt-1 mb-2">
              <RoundedCheckbox
                value={showPassword}
                onValueChange={setShowPassword}
              />
              <Text className="text-gray-600 font-instrument-bold text-sm">
                Show passwords
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSignup}
              disabled={isSubmitting || isGoogleLoading}
              className={`w-full py-5 rounded-2xl items-center shadow-lg shadow-blue-200 mt-2 ${
                isSubmitting ? 'bg-blue-400' : 'bg-[#4D7CFE]'
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="font-instrument-bold text-white text-lg tracking-wide">
                  Sign up
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
              onPress={handleGoogleSignup}
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

            {/* Login Link */}
            <View className="flex-row justify-center mt-6 mb-8">
              <Text className="font-instrument text-gray-500 text-base">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('LoginScreen')}
                disabled={isSubmitting || isGoogleLoading}
              >
                <Text className="font-instrument-bold text-[#4D7CFE] text-base">
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
