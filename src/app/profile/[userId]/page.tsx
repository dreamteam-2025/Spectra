import { Profile } from "@/(pages)";
import { UserInfoByIdResponse } from "@/features/user/api/userApi.types";
import { Metadata } from "next";
import { getUserInfo } from "./getUserInfo";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const userId = (await params).userId;
  const userInfo: UserInfoByIdResponse = await getUserInfo(userId);

  return {
    title: userInfo.userName ?? "Unnamed profile",
    description: "View user profile on Spectra — explore photos, posts, and connect with others.",
  };
}

export default async function ProfilePage(props: Props) {
  const userId = (await props.params).userId;
  const searchParams = await props.searchParams;

  try {
    const userInfo = await getUserInfo(userId);
    return <Profile userId={userId} searchParams={searchParams} initialUserInfo={userInfo} />;
  } catch (error) {
    // если пользователь не найден или другая ошибка, то 404
    notFound();
  }
}
