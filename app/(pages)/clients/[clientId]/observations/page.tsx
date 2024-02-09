import { FunctionComponent } from "react";
import { redirect } from "next/navigation";

const Page: FunctionComponent = () => {
  redirect("reports-record/feedback");
};

export default Page;
