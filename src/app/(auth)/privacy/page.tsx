import { ROUTES } from "@/shared/lib/constants";
import Link from "next/link";

export default function Privacy() {
  return (
    <main>
      <Link href={ROUTES.AUTH.SIGNUP}>Back to Sign Up</Link>
      <h1>Privacy Policy</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsa totam sed optio nostrum minus officia sint
        architecto illum provident modi nulla, placeat assumenda velit, cupiditate iusto quam voluptatibus dolores.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex assumenda at reiciendis dicta temporibus
        necessitatibus totam facere? Non minus nihil cum magnam, earum totam similique in quasi quaerat necessitatibus
        veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ipsa totam sed optio nostrum minus
        officia sint architecto illum provident modi nulla, placeat assumenda velit, cupiditate iusto quam voluptatibus
        dolores. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex assumenda at reiciendis dicta temporibus
        necessitatibus totam facere? Non minus nihil cum magnam, earum totam similique in quasi quaerat necessitatibus
        veritatis?
      </p>
    </main>
  );
}
