import { findOrCreateUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await findOrCreateUser();
  if (!user) redirect("/");
  return <h1>This is a dashboard</h1>;
};

export default page;
