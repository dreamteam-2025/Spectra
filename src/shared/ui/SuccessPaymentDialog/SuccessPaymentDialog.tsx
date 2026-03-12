"use client";

import { Dialog } from "@/shared";
import s from "./SuccessPaymentDialog.module.scss";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOk: () => void;
};

export const SuccessPaymentDialog = ({ open, onOpenChange, onOk }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Success">
      <div className={s.body}>
        <p className={s.text}>Payment was successful!</p>

        <button className={s.ok} onClick={onOk}>
          OK
        </button>
      </div>
    </Dialog>
  );
};
