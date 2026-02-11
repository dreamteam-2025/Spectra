import { useDeletePostMutation } from "@/features/post/api/postApi";
import { useState } from "react";

export const useDeletePost = () => {
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost({ postId }).unwrap();
      setIsSuccess(true);
      return { success: true };
    } catch (error) {
      console.error("Failed to delete post:", error);
      setIsSuccess(false);
      return { success: false, error };
    }
  };

  return {
    deletePost: handleDeletePost,
    isLoading,
    isSuccess,
  };
};
