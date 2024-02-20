"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import api from "@/utils/api";
import Image from "next/image";
import { useQuery } from "react-query";
import jwt from "jsonwebtoken";
import InputField from "@/components/FormFields/InputField";

const Profile = () => {
  const decode = jwt.decode(localStorage.getItem("a"));
  const { data: userData }: any = useQuery({
    queryFn: () => api.get("/employee/profile/"),
    queryKey: ["user"],
  });

  if (!userData) return null;
  const {
    first_name,
    last_name,
    username,
    phone_number,
    email,
    profile_picture,
  } = userData.data;

  const role =
    decode.groups.length > 0
      ? decode.groups[0].charAt(0).toUpperCase() +
        decode.groups[0].slice(1).toLowerCase()
      : null;

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35">
          <Image
            src={"/images/cover/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
          />
        </div>
        <div className="px-4 pb-6 lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="w-full h-full overflow-hidden rounded-full">
              <Image
                src={profile_picture}
                width={160}
                height={160}
                className="w-full"
                alt="profile"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl text-center font-semibold text-black dark:text-white">
              {username}
            </h3>
            <p className="font-medium  text-center">{role}</p>
            <div className="w-full flex justify-center">
              <div className="flex justify-center w-full max-w-[500px]">
                <div className="flex flex-col w-full gap-2">
                  <InputField
                    className={"w-full"}
                    label={"First Name"}
                    type={"text"}
                    disabled
                    defaultValue={first_name}
                  />
                  <InputField
                    className={"w-full"}
                    label={"Last Name"}
                    type={"text"}
                    disabled
                    defaultValue={last_name}
                  />
                  <InputField
                    className={"w-full"}
                    label={"Email"}
                    type={"text"}
                    disabled
                    defaultValue={email}
                  />
                  <InputField
                    className={"w-full"}
                    label={"Phone number"}
                    type={"text"}
                    disabled
                    defaultValue={phone_number}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
