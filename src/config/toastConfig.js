import { View, Text } from 'react-native';

export const toastConfig = {
  success: ({ text1, text2 }) => (
    <View className="w-11/12 bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm flex-row items-center mt-2">
      <View className="flex-1 gap-1">
        <Text className="font-instrument-bold text-green-800 text-base">
          {text1}
        </Text>
        {text2 ? (
          <Text className="font-instrument text-green-600 text-sm">
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),

  error: ({ text1, text2 }) => (
    <View className="w-11/12 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm flex-row items-center mt-2">
      <View className="flex-1 gap-1">
        <Text className="font-instrument-bold text-red-800 text-base">
          {text1}
        </Text>
        {text2 ? (
          <Text className="font-instrument text-red-600 text-sm">{text2}</Text>
        ) : null}
      </View>
    </View>
  ),

  info: ({ text1, text2 }) => (
    <View className="w-11/12 bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm flex-row items-center mt-2">
      <View className="flex-1 gap-1">
        <Text className="font-instrument-bold text-blue-800 text-base">
          {text1}
        </Text>
        {text2 ? (
          <Text className="font-instrument text-blue-600 text-sm">{text2}</Text>
        ) : null}
      </View>
    </View>
  ),
};
