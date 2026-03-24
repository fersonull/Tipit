import Toast from 'react-native-toast-message';

export const toast = {
  success: (title, message) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
    });
  },
  error: (title, message) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  },
};
