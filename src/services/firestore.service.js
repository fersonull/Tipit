import firestore from '@react-native-firebase/firestore';

export const saveTransaction = async (userId, transactionData) => {
  const batch = firestore().batch();

  const userRef = firestore().collection('users').doc(userId);
  const newTransactionRef = userRef.collection('transactions').doc();

  try {
    // 3. Prepare the Transaction Document
    batch.set(newTransactionRef, {
      ...transactionData,
      amount: Number(transactionData.amount), // Ensure strict type safety
      createdAt: firestore.FieldValue.serverTimestamp(), // Always use server time, never device time
    });

    // 4. Calculate the balance adjustment
    // If it's an expense, we subtract. If income, we add.
    const adjustmentAmount =
      transactionData.type === 'expense'
        ? -Number(transactionData.amount)
        : Number(transactionData.amount);

    // 5. Safely increment the user's total balance
    // firestore.FieldValue.increment is an atomic server-side operation.
    // It prevents race conditions if a user submits two transactions at the exact same millisecond.
    batch.set(
      userRef,
      {
        totalBalance: firestore.FieldValue.increment(adjustmentAmount),
        lastUpdated: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    ); // merge: true ensures we don't accidentally overwrite other user profile data

    // 6. Commit the batch
    await batch.commit();

    return true;
  } catch (error) {
    console.error('Failed to process transaction securely:', error);
    throw new Error('Transaction failed to save. Please try again.');
  }
};
