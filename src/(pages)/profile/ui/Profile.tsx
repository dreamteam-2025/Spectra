import { useLogout } from "@/features/auth/model/hooks/useLogout";
import { Button } from "@/shared";

export const Profile = () => {
  const { logout, isLoading } = useLogout();

  return (
    <>
      <h1>Profile Page</h1>
      <Button children={"Log Out"} variant={"primary"} onClick={logout} disabled={isLoading} />
    </>
  );
};
