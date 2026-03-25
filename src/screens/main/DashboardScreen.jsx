import Lucide from '@react-native-vector-icons/lucide';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/dashboard/Header';
import BalanceCard from '../../components/dashboard/BalanceCard';
import TransactionList from '../../components/dashboard/TransactionList';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView
        className="flex-1 px-6 pt-4 mb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* --- HEADER --- */}
        <Header />

        {/* --- BALANCE CARD --- */}
        <BalanceCard />

        {/* --- TRANSACTIONS LIST --- */}
        <TransactionList />
      </ScrollView>
    </SafeAreaView>
  );
}
