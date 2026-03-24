import { View, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  // Dictionary to map route names to Lucide icons cleanly
  const icons = {
    DashboardScreen: 'house',
    Stats: 'chart-pie',
    Add: 'square-plus',
    Profile: 'user',
  };

  return (
    <View
      // Tailwind classes for the floating pill shape, background, and shadows
      className="absolute left-6 right-6 bg-white rounded-[32px] flex-row justify-between items-center px-6 py-4 shadow-xl border border-gray-50"
      style={{
        bottom: insets.bottom + 24, // Dynamically floats above the safe area
        elevation: 10, // Fallback shadow for Android
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const icon = icons[route.name] || Home;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            className="items-center justify-center p-2 relative"
          >
            <Lucide
              size={24}
              name={icon}
              color={isFocused ? '#4D7CFE' : '#9CA3AF'} // Blue active, Gray inactive
              strokeWidth={isFocused ? 2.5 : 2}
            />
            {/* Optional indicator dot for the active tab */}
            {isFocused && (
              <View className="absolute -bottom-2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
