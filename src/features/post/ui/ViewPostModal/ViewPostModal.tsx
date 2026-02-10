import { skipToken } from "@reduxjs/toolkit/query";
import s from "./ViewPostModal.module.scss";
import { useGetPostByIdQuery, useGetPostCommentsQuery } from "@/features/post/api/postApi";
import { Dialog, Dropdown, Loader } from "@/shared/ui";
import { formatPostDate } from "@/shared/lib";
import { useState } from "react";
import { ImageSlider } from "@/shared/ui";
import { useMeQuery } from "@/features/auth";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number | null;
};

export const ViewPostModal = ({ open, onOpenChange, postId }: Props) => {
  const { data: post, isLoading: isPostLoading } = useGetPostByIdQuery(postId ? { postId } : skipToken);

  const { data: comments, isLoading: isCommentsLoading } = useGetPostCommentsQuery(
    postId ? { postId, pageSize: 10 } : skipToken,
    { skip: !open }
  );
  const { data: me, isLoading: isMeLoading } = useMeQuery();

  const [openMenu, setOpenMenu] = useState(false);
  const isLoading = isPostLoading || isCommentsLoading;
  const isOwner = me?.userId === post?.ownerId;

  const slides = {};

  const menuItems = isOwner
    ? [
        {
          id: "edit",
          label: "Edit Post",
          icon: "/icons/edit-icon.svg",
          onSelect: () => console.log("edit"), // todo
        },
        {
          id: "delete",
          label: "Delete",
          icon: "/icons/trash-outline.svg",
          onSelect: () => console.log("delete"), // todo
        },
      ]
    : [
        {
          id: "unfollow",
          label: "Unfollow",
          icon: "/icons/person-remove-outline.svg",
          onSelect: () => console.log("unfollow"), // todo
        },
        {
          id: "copyLink",
          label: "Copy link",
          icon: "/icons/copy-outline.svg",
          onSelect: () => console.log("copy link"), //todo
        },
      ];

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
            <ImageSlider
              slides={post.images.map((img, index) => ({
                id: index,
                postImage: img.url,
              }))}
              variant="big"
            />
          </div>

          {/* RIGHT */}
          <div className={s.right}>
            {/* Header */}
            <div className={s.header}>
              <div className={s.author}>
                {/* Author */}
                {post.avatarOwner && <img src={post.avatarOwner} alt="avatar" className={s.avatar} />}
                <span className={s.username}>{post.userName}</span>
              </div>

              {/* Menu */}
              <Dropdown
                open={openMenu}
                onOpenChange={setOpenMenu}
                trigger={
                  <button className={s.iconBtn} type="button">
                    ...
                  </button>
                }
                items={menuItems}
              />
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
