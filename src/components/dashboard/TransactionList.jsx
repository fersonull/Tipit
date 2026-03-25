import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import { useTransactions } from '../../hooks/useTransactions';
import {
  formatCurrency,
  formatDate,
  getCategoryStyling,
} from '../../utils/formatters.utils';

export default function TransactionList() {
  const { transactions, isLoading } = useTransactions();

  return (
    <>
      <View className="flex-row justify-between items-end mb-6">
        <Text className="font-instrument-bold text-xl text-gray-900">
          Recent Transactions
        </Text>
        <TouchableOpacity>
          <Text className="font-instrument text-gray-400 text-sm">
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-4 pb-36">
        {isLoading ? (
          <ActivityIndicator size="large" color="#4D7CFE" className="mt-10" />
        ) : transactions.length === 0 ? (
          <View className="items-center justify-center py-10">
            <Text className="font-instrument text-gray-400">
              No transactions yet.
            </Text>
          </View>
        ) : (
          transactions.map(tx => {
            const style = getCategoryStyling(tx.category);
            const isExpense = tx.type === 'expense';

            return (
              <TouchableOpacity
                key={tx.id}
                activeOpacity={0.7}
                className="flex-row justify-between items-center bg-white p-5 rounded-3xl shadow-sm border border-gray-50"
              >
                <View className="flex-row items-center gap-4">
                  {/* Dynamic Icon */}
                  <View
                    className={`w-14 h-14 ${style.bg} rounded-2xl items-center justify-center`}
                  >
                    <Lucide name={style.icon} size={20} />
                  </View>

                  {/* Text Info */}
                  <View>
                    <Text className="font-instrument-bold text-gray-900 text-base mb-1 capitalize">
                      {tx.category} {tx.note ? `- ${tx.note}` : ''}
                    </Text>
                    <Text className="font-instrument text-gray-400 text-xs">
                      {formatDate(tx.date)}
                    </Text>
                  </View>
                </View>

                {/* Dynamic Amount Formatting */}
                <Text
                  className={`font-instrument-bold text-lg ${
                    isExpense ? 'text-gray-900' : 'text-green-500'
                  }`}
                >
                  {isExpense ? '-' : '+'}
                  {formatCurrency(tx.amount)}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </>
  );
}
