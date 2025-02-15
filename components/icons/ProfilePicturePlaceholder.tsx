import React, { FunctionComponent } from "react";
import { IconProps } from "@/types/IconProps";

const ProfilePicturePlaceholder: FunctionComponent<IconProps> = ({ width = 24, height = 24 }) => {
  return (
    <div
      className="bg-slate-200/50  flex items-center justify-center text-slate-600 dark:text-slate-50 dark:bg-slate-700 rounded-full p-3 overflow-hidden"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg
        className="fill-current"
        viewBox="0 0 18 18"
        fill="none"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
          fill=""
        ></path>
        <path
          d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
          fill=""
        ></path>
      </svg>
    </div>
  );
};

export default ProfilePicturePlaceholder;
