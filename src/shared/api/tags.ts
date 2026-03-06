export const TAG_TYPES = ["Auth", "User", "UserAvatar", "PostsList", "SinglePost", "Comments"] as const;

export type TagTypes = (typeof TAG_TYPES)[number];
