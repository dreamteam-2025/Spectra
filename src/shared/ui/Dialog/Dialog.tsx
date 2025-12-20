import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { ReactNode } from "react";
import s from "./Dialog.module.scss";
import { Button, Card } from "@/shared";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Dialog({ open, onOpenChange, title, description, children, className }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.overlay} />

        <Card>
          <RadixDialog.Content className={clsx(s.content, className)}>
            {title && (
              <>
                <div className={s.header}>
                  {title && <RadixDialog.Title className={s.title}>{title}</RadixDialog.Title>}
                  <RadixDialog.Close className={s.close}>✕</RadixDialog.Close>
                </div>

                <hr className={s.divider} />
              </>
            )}

            {description && <RadixDialog.Description className={s.description}>{description}</RadixDialog.Description>}

            <div className={s.children}>{children}</div>

            <div className={s.footer}>
              {!children && (
                <RadixDialog.Close asChild>
                  <Button variant="primary" className={s.okButton}>
                    OK
                  </Button>
                </RadixDialog.Close>
              )}
            </div>
          </RadixDialog.Content>
        </Card>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
