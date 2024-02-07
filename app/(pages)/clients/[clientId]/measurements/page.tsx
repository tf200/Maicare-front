import { FunctionComponent } from "react";
import { redirect } from "next/navigation";

const Page: FunctionComponent = (props) => {
  redirect("reports-record/measurements");
};

export default Page;
