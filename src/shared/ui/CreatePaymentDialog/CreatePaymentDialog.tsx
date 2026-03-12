import React from "react";
import { Dialog } from "@/shared";
import s from "./CreatePaymentDialog.module.scss";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const CreatePaymentDialog = ({ open, onOpenChange, onConfirm }: Props) => {
  const [agree, setAgree] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Create payment">
      <div className={s.body}>
        <p className={s.text}>
          Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings
        </p>

        <div className={s.footer}>
          <label className={s.checkbox}>
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />I agree
          </label>

          <button className={s.ok} disabled={!agree} onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </Dialog>
  );
};
