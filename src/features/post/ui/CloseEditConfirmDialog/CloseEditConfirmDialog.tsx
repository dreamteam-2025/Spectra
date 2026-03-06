import { Dialog, Button } from "@/shared/ui";
import s from "./CloseEditConfirmDialog.module.scss";
type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const CloseEditConfirmDialog = ({ open, onConfirm, onCancel }: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onCancel}
      title="Close Post"
      description="Do you really want to close the edition of the publication? If you close changes won’t be saved"
      paddingX={24}
    >
      <div className={s.buttons}>
        <Button variant="outlined" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="primary" onClick={onCancel}>
          No
        </Button>
      </div>
    </Dialog>
  );
};
