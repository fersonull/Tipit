import { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';

export const useTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Security check: Ensure we have a user before querying
    if (!user?.uid) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    // Initialize the real-time listener
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('transactions')
      .orderBy('createdAt', 'desc') // Show newest first
      .limit(20) // Paginate or limit to prevent massive data reads
      .onSnapshot(
        querySnapshot => {
          if (!querySnapshot) return;

          const txList = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              // Securely handle Firestore timestamps (they can be null locally during the optimistic UI write phase)
              date: data.createdAt ? data.createdAt.toDate() : new Date(),
            };
          });

          setTransactions(txList);
          setIsLoading(false);
        },
        error => {
          console.error('Failed to fetch transactions:', error);
          setIsLoading(false);
        },
      );

    // Cleanup function: Detaches the listener when the component unmounts
    return () => unsubscribe();
  }, [user]);

  return { transactions, isLoading };
};
