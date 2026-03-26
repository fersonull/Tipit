import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export default function ConfirmationModal({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' | 'warning' | 'info'
  isLoading = false,
}) {
  // Dynamic styling mapping based on the alert type
  const theme = {
    danger: {
      icon: <Lucide name="trash-2" color="#EF4444" size={28} />,
      iconBg: 'bg-red-50',
      confirmBg: 'bg-red-500',
      confirmText: 'text-white',
    },
    warning: {
      icon: <Lucide name="alert-triangle" color="#F59E0B" size={28} />,
      iconBg: 'bg-yellow-50',
      confirmBg: 'bg-yellow-500',
      confirmText: 'text-white',
    },
    info: {
      icon: <Lucide name="info" color="#3B82F6" size={28} />,
      iconBg: 'bg-blue-50',
      confirmBg: 'bg-[#4D7CFE]',
      confirmText: 'text-white',
    },
  }[type];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/40 px-6">
          {/* Modal Container - Prevent clicks on the card from closing the modal */}
          <TouchableWithoutFeedback>
            <View className="w-full bg-white rounded-[32px] p-6 shadow-2xl items-center">
              {/* Floating Icon */}
              <View
                className={`w-16 h-16 ${theme.iconBg} rounded-full items-center justify-center mb-4`}
              >
                {theme.icon}
              </View>

              {/* Text Content */}
              <Text className="font-instrument-bold text-gray-900 text-2xl text-center mb-2">
                {title}
              </Text>
              <Text className="font-instrument text-gray-500 text-center text-base mb-8 px-2 leading-6">
                {message}
              </Text>

              {/* Action Buttons */}
              <View className="flex-row gap-3 w-full">
                <TouchableOpacity
                  onPress={onClose}
                  disabled={isLoading}
                  className="flex-1 py-4 rounded-2xl bg-gray-100 items-center"
                >
                  <Text className="font-instrument-bold text-gray-600 text-base">
                    {cancelText}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 py-4 rounded-2xl ${
                    theme.confirmBg
                  } items-center shadow-sm ${isLoading ? 'opacity-70' : ''}`}
                >
                  <Text
                    className={`font-instrument-bold ${theme.confirmText} text-base`}
                  >
                    {isLoading ? 'Processing...' : confirmText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
