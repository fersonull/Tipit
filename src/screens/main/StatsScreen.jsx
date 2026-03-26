import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStats } from '../../hooks/useStats';
import { formatCurrency, formatPercent } from '../../utils/formatters.utils';
import Lucide from '@react-native-vector-icons/lucide';

export default function StatsScreen() {
  const [period, setPeriod] = useState('Month'); // Week, Month, Year

  // Inject the Firestore hook, passing the current period state
  const { totalIncome, totalExpense, spendingData, isLoading } =
    useStats(period);

  console.log(spendingData);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <View className="flex-row justify-between items-center px-6 pt-4 pb-6">
        <Text className="font-instrument-bold text-2xl text-gray-900">
          Statistics
        </Text>
        <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
          <Lucide name="filter" color="#4B5563" size={20} />
        </TouchableOpacity>
      </View>

      <View className="px-6 mb-8">
        <View className="flex-row bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          {['Week', 'Month', 'Year'].map(p => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-xl items-center ${
                period === p ? 'bg-[#4D7CFE]' : ''
              }`}
            >
              <Text
                className={`font-instrument-bold ${
                  period === p ? 'text-white' : 'text-gray-500'
                }`}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6 pb-32"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between gap-4 mb-8">
          <View className="flex-1 bg-white p-5 rounded-3xl shadow-sm border border-gray-50">
            <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mb-3">
              <Lucide name="trending-down" color="#EF4444" size={20} />
            </View>
            <Text className="font-instrument text-gray-400 text-sm mb-1">
              Total Spend
            </Text>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="#EF4444"
                className="items-start"
              />
            ) : (
              <Text
                className="font-instrument-bold text-gray-900 text-xl"
                numberOfLines={1}
              >
                {formatCurrency(totalExpense)}
              </Text>
            )}
          </View>

          <View className="flex-1 bg-white p-5 rounded-3xl shadow-sm border border-gray-50">
            <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mb-3">
              <Lucide name="trending-up" color="#10B981" size={20} />
            </View>
            <Text className="font-instrument text-gray-400 text-sm mb-1">
              Total Income
            </Text>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="#10B981"
                className="items-start"
              />
            ) : (
              <Text
                className="font-instrument-bold text-gray-900 text-xl"
                numberOfLines={1}
              >
                {formatCurrency(totalIncome)}
              </Text>
            )}
          </View>
        </View>
        <Text className="font-instrument-bold text-lg text-gray-900 mb-4">
          Spend Breakdown
        </Text>
        <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 justify-center">
          {isLoading ? (
            <ActivityIndicator size="large" color="#4D7CFE" />
          ) : spendingData.length === 0 ? (
            <View className="items-center justify-center opacity-50 py-4">
              <Lucide
                name="pie-chart"
                color="#9CA3AF"
                size={48}
                strokeWidth={1.5}
              />
              <Text className="font-instrument text-gray-500 mt-4">
                No spending data for this period.
              </Text>
            </View>
          ) : (
            <View className="gap-6">
              {spendingData.map(item => (
                <View key={item.id}>
                  <View className="flex-row items-center gap-4 overflow-y-auto">
                    <View>
                      <Text className="text-lg font-instrument-bold text-gray-400">
                        {formatPercent(item.percentage)}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="font-instrument-bold text-gray-700 capitalize">
                          {item.category}
                        </Text>
                        <Text className="font-instrument-bold text-gray-900">
                          {formatCurrency(item.amount)}
                        </Text>
                      </View>
                      <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <View
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
        <View className="h-32" />
      </ScrollView>
    </SafeAreaView>
  );
}
