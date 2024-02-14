"use client";

import React, { FunctionComponent } from "react";
import { useEmployeeDetails } from "@/utils/employees/getEmployeeDetails";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import ProfilePicture from "@/components/ProfilePicture";
import dayjs from "dayjs";
import "dayjs/locale/en";

type Props = {
  employeeId: number;
};

const EmployeeInformation: FunctionComponent<Props> = ({ employeeId }) => {
  const { data, isLoading, isError } = useEmployeeDetails(employeeId);
  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red">We failed to load employee data</div>;
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <ProfilePicture profilePicture={data.profile_picture} />
        </div>
        <DetailCell
          ignoreIfEmpty={true}
          label={"Full Name"}
          value={`${data.first_name} ${data.last_name}` || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Position"}
          value={data.position || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Is a subcontractor"}
          value={
            data.is_subcontractor === null
              ? "Not specified"
              : data.is_subcontractor === true
                ? "Yes"
                : "No"
          }
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Work Email"}
          type={data.email_address ? "email" : "text"}
          value={data.email_address || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Private Email"}
          type={data.private_email_address ? "email" : "text"}
          value={data.private_email_address || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Work Phone Number"}
          type={data.work_phone_number ? "phone" : "text"}
          value={data.work_phone_number || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Department"}
          value={data.department || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Private Phone Number"}
          type={data.private_phone_number ? "phone" : "text"}
          value={data.private_phone_number || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Home Phone Number"}
          type={data.home_telephone_number ? "phone" : "text"}
          value={data.home_telephone_number || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Auth Phone Number"}
          type={data.authentication_phone_number ? "phone" : "text"}
          value={data.authentication_phone_number || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Gender"}
          value={data.gender || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Date of birth"}
          value={dayjs(data.date_of_birth).format("DD MMM, YYYY")}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Employee Number"}
          value={data.employee_number || "Not specified"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Employment Number"}
          value={data.employment_number || "Not specified"}
        />
      </div>
    );
  }
};

export default EmployeeInformation;
