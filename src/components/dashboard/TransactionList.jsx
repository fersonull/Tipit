import { View, Text, TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function TransactionList() {
  const transactions = [
    {
      id: '1',
      title: 'Ticket plane',
      date: 'Today, 29 December 2021',
      amount: '-$50',
      icon: 'plane',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
    },
    {
      id: '2',
      title: 'Book Apartment',
      date: 'Yesterday, 13 October 2021',
      amount: '-$150',
      icon: 'building',
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-500',
    },
    {
      id: '3',
      title: 'Foodies Ngunyah',
      date: 'Recently, 09 May 2021',
      amount: '-$60',
      icon: 'hamburger',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      id: '4',
      title: 'Foodies Ngunyah',
      date: 'Recently, 12 May 2021',
      amount: '-$30',
      icon: 'hamburger',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <>
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
                <Lucide name={tx.icon} size={20} />
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
    </>
  );
}
