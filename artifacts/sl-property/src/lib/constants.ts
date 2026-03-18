export const APK_URL = "https://github.com/your-repo/releases/latest/download/app.apk";
export const COMPANY_NAME = "Subhalaxmi Property & Construction";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const maskPhone = (phone: string | undefined) => {
  if (!phone || phone.length < 6) return phone || "";
  const firstTwo = phone.substring(0, 2);
  const lastThree = phone.substring(phone.length - 3);
  return `${firstTwo}****${lastThree}`;
};
