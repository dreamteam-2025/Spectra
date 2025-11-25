import { Card } from "@/shared/ui/Card/Card";
import styles from "./page.module.scss";
import { Input } from "@/shared/ui/Input/Input";

export default function Home() {
  return (
    <>
      <main >
        <h1>Spectra. Main Page</h1>
        <Card width={100} height={100} />
      </main>
    </>
  );
}
