export const formatCurrency = amount => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

export const formatPercent = value => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export const formatDate = date => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj);
};

export const getCategoryStyling = category => {
  const styles = {
    Food: { icon: 'hamburger', bg: 'bg-orange-50', color: 'text-orange-500' },
    Transport: { icon: 'car', bg: 'bg-blue-50', color: 'text-blue-500' },
    Shopping: {
      icon: 'shopping-bag',
      bg: 'bg-purple-50',
      color: 'text-purple-500',
    },
    Bills: {
      icon: 'banknote-arrow-down',
      bg: 'bg-teal-50',
      color: 'text-teal-500',
    },
    Default: {
      icon: 'philippine-peso',
      bg: 'bg-gray-50',
      color: 'text-gray-500',
    },
  };
  return styles[category] || styles['Default'];
};
