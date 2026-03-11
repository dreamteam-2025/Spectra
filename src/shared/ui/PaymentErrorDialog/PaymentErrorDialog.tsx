import { Dialog } from "@/shared";
import s from "./PaymentErrorDialog.module.scss";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
};

export const PaymentErrorDialog = ({ open, onOpenChange, onBack }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Error" size="sm">
      <div className={s.body}>
        <p className={s.text}>Transaction failed. Please, write to support</p>

        <button className={s.back} onClick={onBack}>
          Back to payment
        </button>
      </div>
    </Dialog>
  );
};
