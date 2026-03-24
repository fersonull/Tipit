import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Optional: If you have vector icons installed, you can replace the text icons below
// import { Feather } from '@expo/vector-icons';

export default function DashboardScreen() {
  // Mockup Data
  const totalBalance = '6,890,000';
  const totalIncome = '3,900,000';
  const totalExpenses = '1,190,000';

  const transactions = [
    {
      id: '1',
      title: 'Ticket plane',
      date: 'Today, 29 December 2021',
      amount: '-$50',
      icon: '✈️', // Replace with actual vector icons later
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
    },
    {
      id: '2',
      title: 'Book Apartment',
      date: 'Yesterday, 13 October 2021',
      amount: '-$150',
      icon: '🏢',
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-500',
    },
    {
      id: '3',
      title: 'Foodies Ngunyah',
      date: 'Recently, 09 May 2021',
      amount: '-$60',
      icon: '🍔',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      id: '4',
      title: 'Foodies Ngunyah',
      date: 'Recently, 12 May 2021',
      amount: '-$30',
      icon: '🍔',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView
        className="flex-1 px-6 pt-4 mb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* --- HEADER --- */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="font-instrument-bold text-3xl text-gray-900 tracking-tight">
              Welcome!
            </Text>
            <Text className="font-instrument text-gray-400 text-sm mt-1">
              Track your budget here
            </Text>
          </View>
          {/* Avatar Placeholder */}
          <View className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image
              source={{
                uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix',
              }}
              className="w-full h-full"
            />
          </View>
        </View>

        {/* --- BALANCE CARD --- */}
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
                  <Text className="text-red-500 font-bold">↓</Text>
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
                  <Text className="text-green-500 font-bold">↑</Text>
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

        {/* --- TRANSACTIONS LIST --- */}
        <View className="flex-row justify-between items-end mb-6">
          <Text className="font-instrument-bold text-xl text-gray-900">
            Transactions
          </Text>
          <TouchableOpacity>
            <Text className="font-instrument text-gray-400 text-sm">
              View all
            </Text>
          </TouchableOpacity>
        </View>

        <View className="gap-4 pb-24">
          {transactions.map(tx => (
            <TouchableOpacity
              key={tx.id}
              className="flex-row justify-between items-center bg-white p-5 rounded-3xl shadow-sm border border-gray-50"
            >
              <View className="flex-row items-center gap-4">
                {/* Icon Container */}
                <View
                  className={`w-14 h-14 ${tx.iconBg} rounded-2xl items-center justify-center`}
                >
                  <Text className="text-2xl">{tx.icon}</Text>
                </View>

                {/* Text Info */}
                <View>
                  <Text className="font-instrument-bold text-gray-900 text-base mb-1">
                    {tx.title}
                  </Text>
                  <Text className="font-instrument text-gray-400 text-xs">
                    {tx.date}
                  </Text>
                </View>
              </View>

              {/* Amount */}
              <Text className="font-instrument-bold text-gray-800 text-lg">
                {tx.amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
