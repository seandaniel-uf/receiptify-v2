import { type ReceiptProps } from "./Components/Receipt";

export const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const generateRandomNumber = (numDigits: number): number => {
  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const returnTimeRange = (receiptData: ReceiptProps): string => {
  switch (true) {
    case receiptData.href.includes("short_term"):
      return "Last Month";
    case receiptData.href.includes("long_term"):
      return "All Time";
    default:
      return "Last 6 Months";
  }
};

export const formatTimeFromSeconds = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString()}:${secs.toString().padStart(2, "0")}`;
};

export const addTotal = (receiptData: ReceiptProps): string | number => {
  const isTimeFormat = receiptData.items[0]?.duration_ms !== undefined;

  const totalValue = receiptData.items.reduce((accumulator, item) => {
    return (
      accumulator +
      (isTimeFormat ? item.duration_ms ?? 0 : item.popularity ?? 0)
    );
  }, 0);

  return isTimeFormat ? formatTimeFromSeconds(totalValue) : totalValue;
};
