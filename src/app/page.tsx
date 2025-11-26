import { Card } from "@/shared/ui/Card/Card";
import styles from "./page.module.scss";
import { TextArea } from "@/shared/ui/TextArea/TextArea";

export default function Home() {
  return (
    <>
      <main>
        <h1>Spectra. Main Page</h1>
        <Card width={100} height={100} />
        <TextArea label={"label"} placeholder={"Enter title"} />
      </main>
    </>
  );
}
