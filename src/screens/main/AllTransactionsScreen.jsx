import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTransactions } from '../../hooks/useTransactions';
import {
  formatCurrency,
  formatDate,
  getCategoryStyling,
} from '../../utils/formatters.utils';
import Lucide from '@react-native-vector-icons/lucide';

export default function AllTransactionsScreen({ navigation }) {
  const { transactions, isLoading } = useTransactions();

  // Memoize the grouping logic so it only recalculates when transactions change
  const groupedTransactions = useMemo(() => {
    if (!transactions.length) return [];

    const groups = transactions.reduce((acc, tx) => {
      // Use our existing formatter to create the date group key (e.g., "Oct 13, 2021")
      const dateKey = formatDate(tx.date);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(tx);
      return acc;
    }, {});

    // Convert the object map into the array format required by <SectionList>
    return Object.keys(groups).map(date => ({
      title: date,
      data: groups[date],
    }));
  }, [transactions]);

  // The individual transaction row (reused design from Dashboard)
  const renderTransaction = ({ item: tx }) => {
    const style = getCategoryStyling(tx.category);
    const isExpense = tx.type === 'expense';

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('TransactionDetail', { transaction: tx })
        }
        className="flex-row justify-between items-center bg-white p-5 rounded-3xl shadow-sm border border-gray-50 mb-3 mx-6"
      >
        <View className="flex-row items-center gap-4 flex-1">
          <View
            className={`w-14 h-14 ${style.bg} rounded-2xl items-center justify-center`}
          >
            <Lucide name={style.icon} size={20} />
          </View>

          <View className="flex-1">
            <Text
              className="font-instrument-bold text-gray-900 text-base mb-1 capitalize"
              numberOfLines={1}
            >
              {tx.category}
            </Text>
            {tx.note ? (
              <Text
                className="font-instrument text-gray-400 text-xs"
                numberOfLines={1}
              >
                {tx.note}
              </Text>
            ) : null}
          </View>
        </View>

        <Text
          className={`font-instrument-bold text-lg ml-2 ${
            isExpense ? 'text-gray-900' : 'text-green-500'
          }`}
        >
          {isExpense ? '-' : '+'}
          {formatCurrency(tx.amount)}
        </Text>
      </TouchableOpacity>
    );
  };

  // The sticky date header
  const renderSectionHeader = ({ section: { title } }) => (
    <View className="bg-[#F8FAFC] py-3 px-6">
      <Text className="font-instrument-bold text-gray-500 text-sm uppercase tracking-wider">
        {title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      {/* --- Header --- */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-[#F8FAFC] z-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 -ml-2"
        >
          <Lucide name="chevron-left" color="#111827" size={28} />
        </TouchableOpacity>
        <Text className="font-instrument-bold text-gray-900 text-xl">
          Transactions
        </Text>
        <View className="flex-row gap-2">
          <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
            <Lucide name="search" color="#4B5563" size={20} />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
            <Lucide name="filter" color="#4B5563" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- List Body --- */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4D7CFE" />
        </View>
      ) : groupedTransactions.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">📭</Text>
          </View>
          <Text className="font-instrument-bold text-gray-900 text-lg mb-2">
            No Transactions Yet
          </Text>
          <Text className="font-instrument text-gray-500 text-center">
            When you add expenses or income, they will appear here.
          </Text>
        </View>
      ) : (
        <SectionList
          sections={groupedTransactions}
          keyExtractor={item => item.id}
          renderItem={renderTransaction}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          stickySectionHeadersEnabled={true} // Creates that premium iOS-style sticky header scroll effect
        />
      )}
    </SafeAreaView>
  );
}
