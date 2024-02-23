import React, { FunctionComponent } from "react";
import ProfilePicturePlaceholder from "@/components/icons/ProfilePicturePlaceholder";
import Image from "next/image";

type Props = {
  profilePicture?: string;
  width?: number;
  height?: number;
};

const ProfilePicture: FunctionComponent<Props> = ({
  profilePicture,
  width = 64,
  height = 64,  
}) => {
  return profilePicture ? (
    <Image
      width={width}
      height={height}
      src={profilePicture}
      className={`object-cover rounded-full w-${width / 4} h-${height / 4}`}
      alt={"Profile picture"}
    />
  ) : (
    <ProfilePicturePlaceholder width={width} height={height} />
  );
};

export default ProfilePicture;
