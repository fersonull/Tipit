import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/AuthContext';
import { updateTransaction } from '../../services/firestore.service';
import Lucide from '@react-native-vector-icons/lucide';
import { toast } from '../../utils/toast.utils';

export default function EditTransactionScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);

  // Extract the existing transaction passed from the Detail Screen
  const { transaction } = route.params;

  // Initialize state with the existing values
  const [type, setType] = useState(transaction.type);
  const [amount, setAmount] = useState(String(transaction.amount));
  const [note, setNote] = useState(transaction.note || '');
  const [selectedCategory, setSelectedCategory] = useState(
    transaction.category,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Food', 'Transport', 'Shopping', 'Bills'];
  const isExpense = type === 'expense';

  const handleUpdate = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error(
        'Invalid Input',
        'Please enter a valid amount greater than 0.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await updateTransaction(user.uid, transaction.id, transaction, {
        type,
        amount: Number(amount),
        category: selectedCategory,
        note,
      });

      // Navigate back to the Dashboard or List, passing the updated data implicitly via Firestore real-time listeners
      navigation.navigate('AppContent');
    } catch (error) {
      toast.error('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className={`flex-1 ${isExpense ? 'bg-red-500' : 'bg-green-500'}`}>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* --- Header --- */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 -ml-2"
          >
            <Lucide name="chevron-left" color="white" size={28} />
          </TouchableOpacity>
          <Text className="font-instrument-bold text-white text-xl">
            Edit Transaction
          </Text>
          <View className="w-8" />
        </View>

        {/* --- Amount Input --- */}
        <View className="px-6 py-8 items-center">
          <Text className="font-instrument text-white/80 text-lg mb-2">
            Change amount?
          </Text>
          <View className="flex-row items-center">
            <Text className="font-instrument-bold text-white text-5xl mr-2">
              ₱
            </Text>
            <TextInput
              className="font-instrument-bold text-white text-6xl min-w-[150px]"
              placeholder="0.00"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* --- Details Form --- */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 bg-white rounded-t-[32px] shadow-2xl"
        >
          <ScrollView
            className="px-6 pt-8 pb-32"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row bg-gray-100 p-1 rounded-2xl mb-8">
              {['expense', 'income'].map(t => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setType(t)}
                  className={`flex-1 py-3 rounded-xl items-center ${
                    type === t ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <Text
                    className={`font-instrument-bold capitalize ${
                      type === t
                        ? t === 'expense'
                          ? 'text-red-500'
                          : 'text-green-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mb-6">
              <View className="flex-row items-center gap-3 mb-3">
                <Lucide name="tag" color="#9CA3AF" size={20} />
                <Text className="font-instrument-bold text-gray-700 text-base">
                  Category
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row overflow-visible"
              >
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    className={`px-5 py-3 rounded-xl mr-3 border ${
                      selectedCategory === cat
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text
                      className={`font-instrument ${
                        selectedCategory === cat
                          ? 'text-blue-600 font-bold'
                          : 'text-gray-600'
                      }`}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View className="mb-8">
              <View className="flex-row items-center gap-3 mb-3">
                <Lucide name="file-text" color="#9CA3AF" size={20} />
                <Text className="font-instrument-bold text-gray-700 text-base">
                  Note
                </Text>
              </View>
              <TextInput
                className="w-full bg-gray-50 border border-gray-100 px-4 py-4 rounded-xl font-instrument text-black"
                placeholder="What was this for?"
                placeholderTextColor="#9ca3af"
                value={note}
                onChangeText={setNote}
              />
            </View>

            <TouchableOpacity
              onPress={handleUpdate}
              disabled={isSubmitting}
              className={`w-full py-5 rounded-2xl items-center shadow-lg mt-4 ${
                isSubmitting ? 'bg-blue-300' : 'bg-[#4D7CFE] shadow-blue-200'
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="font-instrument-bold text-white text-lg">
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
