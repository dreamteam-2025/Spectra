import { useDeletePostMutation } from "@/features/post/api/postApi";

export const useDeletePost = () => {
  const [deletePost, { isLoading, isSuccess }] = useDeletePostMutation();

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost({ postId }).unwrap();
      return { success: true };
    } catch (error) {
      console.error("Failed to delete post:", error);
      return { success: false, error };
    }
  };

  return {
    deletePost: handleDeletePost,
    isLoading,
    isSuccess,
  };
};
