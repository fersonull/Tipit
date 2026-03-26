import { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';

// Color map for the progress bars
const CATEGORY_COLORS = {
  'Food': 'bg-orange-400',
  'Transport': 'bg-blue-400',
  'Shopping': 'bg-purple-400',
  'Bills': 'bg-teal-400',
  'Default': 'bg-gray-400'
};

export const useStats = (period) => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    spendingData: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    setIsLoading(true);

    // 1. Calculate the start date based on the selected period
    const startDate = new Date();
    if (period === 'Week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'Month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'Year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // 2. Query Firestore for transactions strictly AFTER the start date
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('transactions')
      .where('createdAt', '>=', firestore.Timestamp.fromDate(startDate))
      .onSnapshot(
        (querySnapshot) => {
          if (!querySnapshot) return;

          let income = 0;
          let expense = 0;
          const categoryMap = {};

          // 3. Aggregate the data in a single pass (O(n) time complexity)
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const amount = Number(data.amount) || 0;

            if (data.type === 'income') {
              income += amount;
            } else if (data.type === 'expense') {
              expense += amount;
              const cat = data.category || 'Other';
              categoryMap[cat] = (categoryMap[cat] || 0) + amount;
            }
          });

          // 4. Format the category map into an array for the UI progress bars
          const formattedSpending = Object.keys(categoryMap).map((key, index) => {
            const catAmount = categoryMap[key];
            // Prevent division by zero
            const percentage = expense > 0 ? (catAmount / expense) * 100 : 0; 
            
            return {
              id: String(index),
              category: key,
              amount: catAmount,
              percentage: percentage,
              color: CATEGORY_COLORS[key] || CATEGORY_COLORS['Default'],
            };
          });

          // 5. Sort spending highest to lowest
          formattedSpending.sort((a, b) => b.amount - a.amount);

          setStats({
            totalIncome: income,
            totalExpense: expense,
            spendingData: formattedSpending,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Failed to fetch stats:", error);
          setIsLoading(false);
        }
      );

    return () => unsubscribe();
  }, [user, period]); // Re-run the query whenever the period changes

  return { ...stats, isLoading };
};