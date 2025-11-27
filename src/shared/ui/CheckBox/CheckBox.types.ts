import { Root } from "@radix-ui/react-checkbox";
import { ComponentPropsWithRef } from "react";

type RadixRootProps = ComponentPropsWithRef<typeof Root>;

export type Props = Omit<RadixRootProps, "onCheckedChange"> & {
  checked?: boolean | "indeterminate";
  onChange?: (checked: boolean | "indeterminate") => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
};
