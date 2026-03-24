import { View } from 'react-native';

const BaseToast = ({ text1, text2, color, icon: Icon }) => {
  return (
    <View className="p-3 rounded-xl shadow bg-background dark:bg-background-accent border border-black/5 w-96 dark:border-white/5">
      <View className=" flex-row items-center gap-3 overflow-hidden">
        <Icon color={color} size={18} />
        <View className="leading-none">
          <Text className="font-instrument-semibold" numberOfLines={1}>
            {text1}
          </Text>
          {text2 && (
            <Text className="font-instrument text-sm to-text-muted">
              {text2}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const toastConfig = {
  success: ({ text1, text2 }) => (
    <BaseToast text1={text1} text2={text2} color="#4CAF50" />
  ),
  error: ({ text1, text2 }) => (
    <BaseToast text1={text1} text2={text2} color="#E53935" />
  ),
  info: ({ text1, text2 }) => (
    <BaseToast text1={text1} text2={text2} color="#2196F3" />
  ),
  notif: ({ text1, text2 }) => (
    <BaseToast text1={text1} text2={text2} color="#2196F3" />
  ),
};
