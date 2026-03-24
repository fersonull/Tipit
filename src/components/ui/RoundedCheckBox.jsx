import { TouchableOpacity } from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';

export const RoundedCheckbox = ({ value, onValueChange }) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    // Use "rounded-full" for a circle, or "rounded-md" for slightly rounded
    className={`w-5 h-5 border-2 items-center justify-center rounded-full 
      ${value ? 'bg-slate-900 border-slate-900' : 'border-gray-400'}`}
  >
    {value && <Lucide name="check" size={14} color="white" />}
  </TouchableOpacity>
);
