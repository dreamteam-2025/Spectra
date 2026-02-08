import { skipToken } from "@reduxjs/toolkit/query";
import s from "./ViewPostModal.module.scss";

import { useGetPostByIdQuery, useGetPostCommentsQuery } from "@/features/post/api/postApi";
import { Dialog, Loader } from "@/shared/ui";
import { formatPostDate } from "@/shared/lib";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number | null;
};

export const ViewPostModal = ({ open, onOpenChange, postId }: Props) => {
  const { data: post, isLoading: isPostLoading } = useGetPostByIdQuery(postId ? { postId } : skipToken);

  const { data: comments, isLoading: isCommentsLoading } = useGetPostCommentsQuery(
    postId ? { postId, pageSize: 10 } : skipToken
  );

  const isLoading = isPostLoading || isCommentsLoading;

  if (!post && !isLoading) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="xl" paddingX={0} paddingY={0} showDivider={false} showClose>
      {isLoading && (
        <div className={s.loader}>
          <Loader />
        </div>
      )}

      {post && (
        <div className={s.wrapper}>
          {/* LEFT */}
          <div className={s.left}>
            {post.images?.[0]?.url && <img src={post.images[0].url} alt="post" className={s.image} />}

            {post.images.length > 1 && (
              <>
                <button className={s.navLeft}>‹</button>
                <button className={s.navRight}>›</button>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className={s.right}>
            {/* Author */}
            <div className={s.author}>
              {post.avatarOwner && <img src={post.avatarOwner} alt="avatar" className={s.avatar} />}
              <span className={s.username}>{post.userName}</span>
            </div>

            {/* Description */}
            {post.description && (
              <div className={s.description}>
                {post.avatarOwner && <img src={post.avatarOwner} alt="avatar" className={s.avatar} />}
                <div>
                  <span className={s.username}>{post.userName}</span>
                  <p>{post.description}</p>
                </div>
              </div>
            )}

            {/* Comments */}
            <div className={s.comments}>
              {comments?.items?.map(c => {
                const avatar = (c.from.avatars?.[0] as any)?.url;

                return (
                  <div key={c.id} className={s.comment}>
                    {avatar && <img src={avatar} alt="avatar" className={s.avatar} />}
                    <div>
                      <span className={s.username}>{c.from.username}</span>
                      <p>{c.content}</p>
                      <span className={s.time}>{c.createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className={s.footer}>
              <div className={s.likes}>{post.likesCount} likes</div>
              <div className={s.date}>{formatPostDate(post.createdAt)}</div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};
