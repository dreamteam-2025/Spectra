// import styles from "./page.module.scss";
'use client'

import { RadioGroup } from "@radix-ui/react-radio-group";

export default function Home() {
  return (
    <main>
      <h1>Main Page</h1>
      <p>Some text here. Some text here. Some text here.</p>
      <Component />
    </main>
  );
}



import { Radio } from ".././shared/ui/RadioGroup/RadioGroup";
import { useState } from "react";

function Component() {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
      <Radio value="option3" disabled>
        Option 3 (disabled)
      </Radio>
    </RadioGroup>
  );
}