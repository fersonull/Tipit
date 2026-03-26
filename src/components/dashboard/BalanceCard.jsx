import Lucide from '@react-native-vector-icons/lucide';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency } from '../../utils/formatters.utils';

export default function BalanceCard() {
  const { transactions, isLoading } = useTransactions();

  console.log(transactions);

  const currentMonthTransactions = transactions;
  const totalIncome = currentMonthTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpenses = currentMonthTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const calculatedBalance = totalIncome - totalExpenses;

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4D7CFE" className=" h-48" />;
  }

  return (
    <View className="items-center relative mt-10">
      {/* Stacked background effect */}
      <View className="absolute -top-4 w-[90%] h-48 bg-[#4D7CFE] rounded-3xl opacity-40 z-0" />

      <View className="w-full rounded-xl py-8 px-6 shadow-sm bg-[#4D7CFE]">
        <View className="items-center mb-6">
          <Text className="font-instrument text-blue-100 text-sm mb-2">
            Total Balance
          </Text>
          <Text className="font-instrument-bold text-white text-4xl tracking-tight">
            {formatCurrency(calculatedBalance)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center pt-2 px-2">
          {/* Expenses */}
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
              <Lucide name="move-down" size={16} color="#ef4444" />
            </View>
            <View>
              <Text className="font-instrument text-blue-100 text-xs">
                Expenses
              </Text>
              <Text className="font-instrument-bold text-white text-base">
                {formatCurrency(totalExpenses)}
              </Text>
            </View>
          </View>

          {/* Income */}
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
              <Lucide name="move-up" size={16} color="#22c55e" />
            </View>
            <View>
              <Text className="font-instrument text-blue-100 text-xs">
                Income
              </Text>
              <Text className="font-instrument-bold text-white text-base">
                {formatCurrency(totalIncome)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
