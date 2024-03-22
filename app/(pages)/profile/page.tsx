"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EmployeeDetails from "@/components/EmployeeDetails";
import { useMyInfo } from "@/utils/user-info/getUserInfo";

const Profile = () => {
  const { data: userData } = useMyInfo();

  return (
    <>
      <Breadcrumb pageName="Profiel" />
      <EmployeeDetails showAsProfile={true} employeeId={userData?.id} />
    </>
  );
};

export default Profile;
