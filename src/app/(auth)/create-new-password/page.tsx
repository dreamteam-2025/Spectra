"use client";

import { CreateNewPassword } from "@/(pages)/auth/createNewPassword/ui/CreateNewPassword";
//import { useParams } from "next/navigation";

export default function CreateNewPasswordPage() {
  // const p = useParams();
  // console.log(p.token);

  {
    return <CreateNewPassword />; //token={p.token} />;
  }
}
