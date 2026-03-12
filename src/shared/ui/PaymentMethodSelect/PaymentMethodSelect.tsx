"use client";

import clsx from "clsx";
import s from "./PaymentMethodSelect.module.scss";
import paypal from "../../../../public/images/paypal.svg";
import stripe from "../../../../public/images/stripe.svg";

export type PaymentMethod = "paypal" | "stripe";

type Props = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

export const PaymentMethodSelect = ({ value, onChange }: Props) => {
  return (
    <div className={s.payment}>
      <button
        type="button"
        onClick={() => onChange("paypal")}
        className={clsx(s.paymentCard, {
          [s.active]: value === "paypal",
        })}
      >
        <img src={paypal.src} alt="PayPal" />
      </button>

      <span className={s.or}>Or</span>

      <button
        type="button"
        onClick={() => onChange("stripe")}
        className={clsx(s.paymentCard, {
          [s.active]: value === "stripe",
        })}
      >
        <img src={stripe.src} alt="Stripe" />
      </button>
    </div>
  );
};
