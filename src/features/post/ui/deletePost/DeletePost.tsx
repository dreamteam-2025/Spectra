import { Dialog, Button } from "@/shared/ui";
import { useDeletePost } from "../../model/hooks/useDeletePost";
import s from "./DeletePost.module.scss";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number | null;
  onDeleteSuccess?: () => void;
};

export const DeletePost = ({ open, onOpenChange, postId, onDeleteSuccess }: Props) => {
  const { deletePost, isLoading, isSuccess } = useDeletePost();

  const handleDelete = async () => {
    if (!postId) return;
    await deletePost(postId);
  };

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
      onDeleteSuccess?.();
    }
  }, [isSuccess, onOpenChange, onDeleteSuccess]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      className={s.dialogWrap}
      title="Delete Post"
      description="Are you sure you want to delete this post?"
    >
      <div className={s.dialogButtons}>
        <Button variant="outlined" onClick={handleDelete} disabled={isLoading} className={s.confirmButton}>
          {isLoading ? "Deleting..." : "Yes"}
        </Button>
        <Button variant="primary" onClick={() => onOpenChange(false)} disabled={isLoading} className={s.cancelButton}>
          No
        </Button>
      </div>
    </Dialog>
  );
};
