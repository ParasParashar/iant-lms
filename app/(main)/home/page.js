import { findOrCreateUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await findOrCreateUser();
  if (!user) redirect("/");
  return <div>this is a home route or a dashboard route.</div>;
};

export default page;
