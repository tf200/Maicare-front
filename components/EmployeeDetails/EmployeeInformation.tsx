"use client";

import React, { FunctionComponent } from "react";
import { useEmployeeDetails } from "@/utils/employees/getEmployeeDetails";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import ProfilePicture from "@/components/ProfilePicture";
import dayjs from "dayjs";
import "dayjs/locale/en";
import CameraIcon from "../svg/CameraIcon";
import IconButton from "../buttons/IconButton";
import { useModal } from "../providers/ModalProvider";
import ProfilePictureModal from "../Modals/ProfilePictureModal";

type Props = {
  employeeId: number;
};

const EmployeeInformation: FunctionComponent<Props> = ({ employeeId }) => {
  const { open } = useModal(ProfilePictureModal);
  const { data, isLoading, isError } = useEmployeeDetails(employeeId);

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red">We failed to load employee data</div>;
  if (data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div
            onClick={() => {
              open({
                id: employeeId,
              });
            }}
            className="relative w-fit cursor-pointer"
          >
            <ProfilePicture profilePicture={data.profile_picture} />
            <IconButton className="p-[5px] absolute right-1 bottom-1">
              <CameraIcon className="w-3 h-3" />
            </IconButton>
          </div>
        </div>
        <DetailCell
          ignoreIfEmpty={true}
          label={"Volledige Naam"}
          value={
            `${data.first_name} ${data.last_name}` || "Niet gespecificeerd"
          }
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Positie"}
          value={data.position || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Is een onderaannemer"}
          value={
            data.is_subcontractor === null
              ? "Niet gespecificeerd"
              : data.is_subcontractor === true
                ? "Yes"
                : "No"
          }
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Werk E-mail"}
          type={data.email_address ? "email" : "text"}
          value={data.email_address || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Privé E-mail"}
          type={data.private_email_address ? "email" : "text"}
          value={data.private_email_address || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Werk Telefoonnummer"}
          type={data.work_phone_number ? "phone" : "text"}
          value={data.work_phone_number || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Afdeling"}
          value={data.department || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Privé Telefoonnummer"}
          type={data.private_phone_number ? "phone" : "text"}
          value={data.private_phone_number || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Huis Telefoonnummer"}
          type={data.home_telephone_number ? "phone" : "text"}
          value={data.home_telephone_number || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Authenticatie Telefoonnummer"}
          type={data.authentication_phone_number ? "phone" : "text"}
          value={data.authentication_phone_number || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Geslacht"}
          value={data.gender || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Geboortedatum"}
          value={dayjs(data.date_of_birth).format("DD MMM, YYYY")}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Medewerkernummer"}
          value={data.employee_number || "Niet gespecificeerd"}
        />
        <DetailCell
          ignoreIfEmpty={true}
          label={"Dienstnummer"}
          value={data.employment_number || "Niet gespecificeerd"}
        />
      </div>
    );
  }
};

export default EmployeeInformation;
