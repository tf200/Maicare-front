import React, { FunctionComponent } from "react";
import ProfilePicturePlaceholder from "@/components/icons/ProfilePicturePlaceholder";

type Props = {
  profilePicture?: string;
};

const ProfilePicture: FunctionComponent<Props> = ({ profilePicture }) => {
  return profilePicture ? (
    <img
      width={64}
      height={64}
      src={profilePicture}
      className="object-cover rounded-full w-16 h-16"
      alt={"Profile picture"}
    />
  ) : (
    <ProfilePicturePlaceholder width={64} height={64} />
  );
};

export default ProfilePicture;
