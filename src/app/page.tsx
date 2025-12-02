import { Card } from "@/shared/ui";
import styles from "./page.module.scss";
// import { Privacy } from "@/(pages)/auth/privacy/ui/Privacy";
import { CreateNewPassword } from "@/(pages)";

export default function Home() {
  return (
    <>
      <main>
        {/* <h1>Spectra. Main Page</h1>
        <Card width={100} height={100} /> */}
        <CreateNewPassword />
      </main>
    </>
  );
}
