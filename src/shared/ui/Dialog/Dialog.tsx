import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { ReactNode } from "react";
import s from "./Dialog.module.scss";
import { Button, Card } from "@/shared";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  // Кастомная шапка (для CreatePost и других "нестандартных" модалок).
  //Если не передана — используется дефолтная шапка с title и X.
  headerSlot?: ReactNode;
  showDivider?: boolean;
  showClose?: boolean;
};

export const Dialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  headerSlot,
  showDivider = true,
  showClose = true,
}: DialogProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.overlay} />

        <RadixDialog.Content className={clsx(s.content, className)} asChild>
          <Card data-dialog-content>
            {headerSlot ? (
              <>
                <div className={s.headerSlot} data-dialog-header>
                  {/* обязательный Title для доступности (Radix requirement) */}
                  <RadixDialog.Title className={s.visuallyHidden}>{title ?? "Dialog"}</RadixDialog.Title>
                  {headerSlot}
                </div>

                {showDivider && <hr className={s.divider} />}
              </>
            ) : title ? (
              <>
                <div className={s.header}>
                  <RadixDialog.Title className={s.title}>{title}</RadixDialog.Title>

                  {showClose && (
                    <RadixDialog.Close className={s.close} aria-label="Close dialog">
                      ✕
                    </RadixDialog.Close>
                  )}
                  <RadixDialog.Title className={s.title}>{title}</RadixDialog.Title>
                </div>

                {showDivider && <hr className={s.divider} />}
              </>
            ) : null}

            {description && <RadixDialog.Description className={s.description}>{description}</RadixDialog.Description>}

            <div className={s.children}>{children}</div>

            <div className={s.footer}>
              {!children && (
                <RadixDialog.Close asChild>
                  <Button variant="primary" className={s.okButton} type="button">
                    OK
                  </Button>
                </RadixDialog.Close>
              )}
            </div>
          </Card>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
