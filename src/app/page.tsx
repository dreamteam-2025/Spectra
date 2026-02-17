import { MainPage } from "@/(pages)";

type Props = {
  searchParams: Promise<{
    code?: string;
    email?: string;
  }>;
};

export default async function HomePage({ searchParams }: Props) {
  return <MainPage searchParams={searchParams} />;
}
