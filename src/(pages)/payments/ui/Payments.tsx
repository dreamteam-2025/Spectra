"use client";

import React from "react";
import {
  RadioCard,
  type RadioOption,
  PaymentMethodSelect,
  type PaymentMethod,
  CreatePaymentDialog,
  PaymentErrorDialog,
  SuccessPaymentDialog,
} from "@/shared";

import s from "./Payments.module.scss";

type AccountType = "personal" | "business";
type Plan = "day" | "week" | "month";

const ACCOUNT_OPTIONS: RadioOption<AccountType>[] = [
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
];

const PLAN_OPTIONS: RadioOption<Plan>[] = [
  { value: "day", label: "$10 per 1 Day" },
  { value: "week", label: "$50 per 7 Day" },
  { value: "month", label: "$100 per month" },
];

export const PaymentsPage = () => {
  const [accountType, setAccountType] = React.useState<AccountType>("business");
  const [plan, setPlan] = React.useState<Plan>("day");
  const [payment, setPayment] = React.useState<PaymentMethod>("paypal");

  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPayment(method);
    setCreateDialogOpen(true);
  };

  const handleConfirmPayment = () => {
    setCreateDialogOpen(false);

    // здесь потом будет реальный запрос оплаты
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      setSuccessDialogOpen(true);
    } else {
      setErrorDialogOpen(true);
    }
  };

  const handleBackToPayment = () => {
    setErrorDialogOpen(false);
    setCreateDialogOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.block}>
          <h3 className={s.title}>Account type:</h3>

          <RadioCard
            name="accountType"
            value={accountType}
            onChange={setAccountType}
            options={ACCOUNT_OPTIONS}
            className={s.card}
          />
        </div>

        <div className={s.block}>
          <h3 className={s.title}>Your subscription costs:</h3>

          <RadioCard name="plan" value={plan} onChange={setPlan} options={PLAN_OPTIONS} className={s.card} />
        </div>

        <div className={s.payments}>
          <PaymentMethodSelect value={payment} onChange={handlePaymentSelect} />
        </div>
      </div>

      {/* Create payment */}
      <CreatePaymentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onConfirm={handleConfirmPayment}
      />

      {/* Error */}
      <PaymentErrorDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen} onBack={handleBackToPayment} />

      {/* Success */}
      <SuccessPaymentDialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen} onOk={handleSuccessClose} />
    </>
  );
};
