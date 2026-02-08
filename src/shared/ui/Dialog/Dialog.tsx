import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import s from "./Dialog.module.scss";
import { Card } from "@/shared";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeMap: Record<DialogSize, number | string> = {
  sm: 378,
  md: 520,
  lg: 720,
  xl: 972,
  full: "95vw",
};

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;

  headerSlot?: ReactNode;
  showDivider?: boolean;
  showClose?: boolean;

  size?: DialogSize;
  width?: number | string;

  /** ✅ NEW: padding по осям */
  paddingX?: number; // default 24
  paddingY?: number; // default 24

  contentProps?: Omit<RadixDialog.DialogContentProps, "children" | "asChild" | "className">;
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
  size = "sm",
  width,
  paddingX = 24,
  paddingY = 24,
  contentProps,
}: DialogProps) => {
  const computedWidth = width ?? sizeMap[size];

  const style = {
    width: computedWidth,
    ["--dialog-pad-x" as any]: `${paddingX}px`,
    ["--dialog-pad-y" as any]: `${paddingY}px`,
  } as CSSProperties;

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.overlay} />

        <RadixDialog.Content asChild {...contentProps}>
          <Card data-dialog-content className={clsx(s.content, className)} style={style}>
            <VisuallyHidden asChild>
              <RadixDialog.Title>{title ?? "Dialog"}</RadixDialog.Title>
            </VisuallyHidden>
            {headerSlot ? (
              <>
                <div className={s.headerSlot} data-dialog-header>
                  {headerSlot}
                </div>

                {showDivider && <hr className={s.divider} />}
              </>
            ) : title ? (
              <>
                <div className={s.header}>
                  <span className={s.title}>{title}</span>

                  {showClose && (
                    <RadixDialog.Close className={s.close} aria-label="Close dialog">
                      ✕
                    </RadixDialog.Close>
                  )}
                </div>

                {showDivider && <hr className={s.divider} />}
              </>
            ) : null}
            {description && <RadixDialog.Description className={s.description}>{description}</RadixDialog.Description>}
            <div className={s.children}>{children}</div>
          </Card>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
