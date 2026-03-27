import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lucide from '@react-native-vector-icons/lucide';
import {
  formatCurrency,
  formatDate,
  getCategoryStyling,
} from '../../utils/formatters.utils';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { deleteTransaction } from '../../services/firestore.service';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from '../../utils/toast.utils';

export default function TransactionDetailScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const transaction = route?.params?.transaction || {
    id: 'tx_123456789',
    type: 'expense',
    amount: 125.5,
    category: 'Food',
    note: 'Dinner with the team at the steakhouse',
    date: new Date(),
  };

  const executeDelete = async () => {
    if (!user?.uid || !transaction?.id) {
      throw new Error('Invalid user or transaction ID.');
    }

    setIsDeleting(true);
    try {
      // TODO: delete transaction
      await deleteTransaction(user.uid, transaction);

      setDeleteModalVisible(false);
      navigation.goBack();
      toast.success('Deleted', 'Transaction has been deleted successfully.');
    } catch (error) {
      toast.error('Error deleting', error.message);
      setIsDeleting(false);
    }
  };

  const isExpense = transaction.type === 'expense';
  const headerColor = isExpense ? 'bg-red-500' : 'bg-green-500';
  const style = getCategoryStyling(transaction.category);

  return (
    <View className={`flex-1 ${headerColor}`}>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* --- Header Navigation --- */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 -ml-2 bg-white/20 rounded-full"
          >
            <Lucide name="chevron-left" color="white" size={24} />
          </TouchableOpacity>
          <Text className="font-instrument-bold text-white text-lg">
            Details
          </Text>
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(true)}
            className="p-2 -mr-2 bg-white/20 rounded-full"
          >
            <Lucide name="trash-2" color="white" size={20} />
          </TouchableOpacity>
        </View>

        {/* --- Top Amount Display --- */}
        <View className="px-6 py-10 items-center">
          <Text className="font-instrument-bold text-white text-5xl tracking-tight">
            {isExpense ? '-' : '+'}
            {formatCurrency(transaction.amount)}
          </Text>
          <View className="font-instrument mt-2 flex-row gap-2 items-center">
            <Lucide name={style.icon} color="white" size={16} />
            <Text className=" text-white/80 text-lg capitalize">
              {transaction.category}
            </Text>
          </View>
        </View>

        {/* --- Bottom Details Sheet --- */}
        <View className="flex-1 bg-[#F8FAFC] rounded-t-[32px] shadow-2xl">
          <ScrollView
            className="px-6 pt-8 pb-10"
            showsVerticalScrollIndicator={false}
          >
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 gap-6 mb-8">
              {/* Date */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
                    <Lucide name="calendar" color="#6B7280" size={20} />
                  </View>
                  <Text className="font-instrument text-gray-500 text-base">
                    Date
                  </Text>
                </View>
                <Text className="font-instrument-bold text-gray-900 text-base">
                  {formatDate(transaction.date)}
                </Text>
              </View>

              {/* Time */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
                    <Lucide name="clock" color="#6B7280" size={20} />
                  </View>
                  <Text className="font-instrument text-gray-500 text-base">
                    Time
                  </Text>
                </View>
                <Text className="font-instrument-bold text-gray-900 text-base">
                  {new Date(transaction.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>

              {/* Reference ID */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
                    <Lucide name="hash" color="#6B7280" size={20} />
                  </View>
                  <Text className="font-instrument text-gray-500 text-base">
                    Reference
                  </Text>
                </View>
                <Text className="font-instrument-bold text-gray-900 text-sm">
                  {transaction.id.slice(0, 8).toUpperCase()}
                </Text>
              </View>
            </View>

            {/* --- Notes Section --- */}
            {transaction.note ? (
              <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-8">
                <View className="flex-row items-center gap-3 mb-2">
                  <Lucide name="file-text" color="#9CA3AF" size={20} />
                  <Text className="font-instrument-bold text-gray-700 text-base">
                    Note
                  </Text>
                </View>
                <Text className="font-instrument text-gray-600 leading-6">
                  {transaction.note}
                </Text>
              </View>
            ) : null}

            {/* --- Edit Button --- */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('EditTransaction', { transaction })
              }
              className="w-full flex-row justify-center items-center py-5 gap-4 rounded-2xl bg-white border border-gray-200  shadow-sm"
            >
              <Lucide name="edit-3" color="#4B5563" size={20} />
              <Text className="font-instrument-bold text-gray-700 text-lg ml-2">
                Edit Transaction
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <ConfirmationModal
          visible={isDeleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={executeDelete}
          title="Delete Transaction?"
          message="Are you sure you want to delete this record? This will permanently remove it from your balance and history."
          confirmText="Yes, Delete"
          cancelText="Cancel"
          type="danger"
          isLoading={isDeleting}
        />
      </SafeAreaView>
    </View>
  );
}
