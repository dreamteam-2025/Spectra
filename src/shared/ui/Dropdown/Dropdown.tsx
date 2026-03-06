import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import s from "./Dropdown.module.scss";
import type { ReactNode } from "react";
import Image from "next/image";

export type DropdownItem = {
  id: string;
  label: string;
  icon?: string;
  onSelect?: () => void;
  disabled?: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
};

export function Dropdown({ open, onOpenChange, trigger, items, className }: Props) {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={clsx(s.content, className)} side="bottom" align="end" sideOffset={8}>
          {items.map(item => (
            <DropdownMenu.Item
              key={item.id}
              className={s.item}
              disabled={item.disabled}
              onSelect={() => {
                item.onSelect?.();
                onOpenChange(false);
              }}
            >
              {item.icon && <Image alt={item.label} src={item.icon} width={24} height={24}></Image>}
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
