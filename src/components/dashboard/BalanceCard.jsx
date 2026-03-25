import { View, Text } from 'react-native';

export default function BalanceCard() {
  const totalBalance = '6,890,000';
  const totalIncome = '3,900,000';
  const totalExpenses = '1,190,000';
  return (
    <View className="items-center relative mb-10 mt-2">
      {/* Stacked background effect */}
      <View className="absolute -top-4 w-[90%] h-48 bg-[#4D7CFE] rounded-3xl opacity-40 z-0" />

      <View className="w-full rounded-xl py-8 px-6 shadow-sm bg-[#4D7CFE]">
        <View className="items-center mb-6">
          <Text className="font-instrument text-blue-100 text-sm mb-2">
            Total Balance
          </Text>
          <Text className="font-instrument-bold text-white text-4xl tracking-tight">
            ${totalBalance}
          </Text>
        </View>

        <View className="flex-row justify-between items-center pt-2 px-2">
          {/* Expenses */}
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
              <Text className="text-red-500 font-bold text-xl">↓</Text>
            </View>
            <View>
              <Text className="font-instrument text-blue-100 text-xs">
                Expenses
              </Text>
              <Text className="font-instrument-bold text-white text-base">
                ${totalExpenses}
              </Text>
            </View>
          </View>

          {/* Income */}
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
              <Text className="text-green-500 font-bold text-xl">↑</Text>
            </View>
            <View>
              <Text className="font-instrument text-blue-100 text-xs">
                Income
              </Text>
              <Text className="font-instrument-bold text-white text-base">
                ${totalIncome}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
