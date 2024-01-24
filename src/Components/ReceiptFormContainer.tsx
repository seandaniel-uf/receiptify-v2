import { Form, type FormData } from "./Form";
import { Receipt, type ReceiptProps } from "./Receipt";

export interface ReceiptFormContainerProps {
  isLoggedIn: string | null;
  handleFormUpdate: (formData: FormData) => void;
  logOut: () => void;
  receiptData: ReceiptProps;
}
export const ReceiptFormContainer = ({
  isLoggedIn,
  handleFormUpdate,
  receiptData,
  logOut,
}: ReceiptFormContainerProps) => {
  return (
    isLoggedIn && (
      <div className="receipt-form-container">
        <Receipt receiptData={receiptData} />
        <Form handleFormUpdate={handleFormUpdate} logOut={logOut} />
      </div>
    )
  );
};
