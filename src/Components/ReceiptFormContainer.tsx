import { Form, type FormData } from "./Form";
import { Receipt } from "./Receipt";

export interface ReceiptFormContainerProps {
  isLoggedIn: string | null;
  handleFormUpdate: (formData: FormData) => void;
  receiptData: any;
}
export const ReceiptFormContainer = ({
  isLoggedIn,
  handleFormUpdate,
  receiptData,
}: ReceiptFormContainerProps) => {
  return (
    isLoggedIn && (
      <div className="form-receipt-container">
        <Receipt receiptData={receiptData} />
        <Form handleFormUpdate={handleFormUpdate} />
      </div>
    )
  );
};
