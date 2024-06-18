export const getCurrencySymbol = currency => {
    if (currency === 'USD') return '$';
    if (currency === 'EUR') return '€';
    if (currency === 'UAH') return '₴';
    return null;
};
