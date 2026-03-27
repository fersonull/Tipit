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

// Add this below your existing saveTransaction function

export const updateTransaction = async (
  userId,
  transactionId,
  oldTx,
  newTxData,
) => {
  const batch = firestore().batch();
  const userRef = firestore().collection('users').doc(userId);
  const txRef = userRef.collection('transactions').doc(transactionId);

  try {
    // 1. Calculate the old financial impact
    const oldAmount = Number(oldTx.amount);
    const oldImpact = oldTx.type === 'expense' ? -oldAmount : oldAmount;

    // 2. Calculate the new financial impact
    const newAmount = Number(newTxData.amount);
    const newImpact = newTxData.type === 'expense' ? -newAmount : newAmount;

    // 3. Find the exact difference to adjust the user's total balance
    const balanceDifference = newImpact - oldImpact;

    // 4. Update the transaction document
    batch.update(txRef, {
      ...newTxData,
      amount: newAmount,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    // 5. Update the user's total balance ONLY if the amount or type changed
    if (balanceDifference !== 0) {
      batch.update(userRef, {
        totalBalance: firestore.FieldValue.increment(balanceDifference),
        lastUpdated: firestore.FieldValue.serverTimestamp(),
      });
    }

    // 6. Execute atomic write
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Failed to update transaction:', error);
    throw new Error('Could not update transaction. Please try again.');
  }
};

export const deleteTransaction = async (userId, transaction) => {
  const batch = firestore().batch();
  const userRef = firestore().collection('users').doc(userId);
  const txRef = userRef.collection('transactions').doc(transaction.id);

  try {
    const amount = Number(transaction.amount);
    const reversalAdjustment =
      transaction.type === 'expense' ? amount : -amount;

    // 2. Queue the deletion
    batch.delete(txRef);

    // 3. Queue the balance adjustment using SET with MERGE
    // This bypasses the React Native bridge "update" bug completely
    batch.set(
      userRef,
      {
        totalBalance: firestore.FieldValue.increment(reversalAdjustment),
        lastUpdated: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    // 4. Commit the atomic operation
    await batch.commit();
    return true;
  } catch (error) {
    console.error('FIREBASE BATCH ERROR:', error.code, error.message);
    throw new Error('Could not delete transaction. Balance remains unchanged.');
  }
};
