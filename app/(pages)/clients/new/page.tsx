"use client";

import React, { FunctionComponent, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxFour from "@/components/Checkboxes /CheckboxFour";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import Checkbox from "@/components/Checkboxes/CheckboxFour";
import Image from "next/image";
import CameraIcon from "@/components/svg/CameraIcon";

const ClientNewPage: FunctionComponent = (props) => {
  // const [selectedValues, setSelectedValues] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleCheckboxChange = (label, isChecked) => {
    if (isChecked) {
      console.log("checked DONE", label);
      setSelectedGender(label);
    } else if (selectedGender === label) {
      setSelectedGender(null); // Uncheck if the same label is clicked again
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add New Client" />

      <div className="grid w-full grid-cols-1 gap-9 sm:grid-cols-2 ">
        <div className="flex flex-col gap-9">
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Client Details
              </h3>
            </div>

            <form action="#">
              <div className="p-6.5">
                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Username <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your Username"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div> */}

                <div className="px-4 mt-[70px] text-center">
                  <div className="relative z-30 w-full p-1 mx-auto rounded-full -mt-22 h-30 max-w-30 bg-white/20 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                    <div className="relative drop-shadow-2">
                      <Image
                        src={"/images/user/user-06.png"}
                        width={160}
                        height={160}
                        alt="profile"
                      />
                      <label
                        htmlFor="profile"
                        className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                      >
                        <CameraIcon />
                        <input
                          type="file"
                          name="profile"
                          id="profile"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 py-4 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Organisation
                  </label>
                  <input
                    type="text"
                    placeholder="organisation"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Departement
                  </label>
                  <input
                    type="text"
                    placeholder="departement"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Gender
                  </label>
                  <input
                    type="text"
                    placeholder="gender"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div> */}

                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select className="relative z-20 w-full px-5 py-3 transition bg-transparent border rounded outline-none appearance-none border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Type your subject</option>
                      <option value="">USA</option>
                      <option value="">UK</option>
                      <option value="">Canada</option>
                    </select>
                    <span className="absolute z-30 -translate-y-1/2 top-1/2 right-4">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div> */}

                <div className="mb-4.5 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-6  px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Gender
                    </h3>
                  </div>
                  <div className="flex flex-row gap-5.5 p-6.5">
                    <Checkbox
                      id="male-checkbox"
                      label="Male"
                      isChecked={selectedGender === "Male"}
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      id="female-checkbox"
                      label="Female"
                      isChecked={selectedGender === "Female"}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    File Number
                  </label>

                  <input
                    type="number"
                    placeholder="fileNumber"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                {/* <div className="mb-4.5 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      File upload
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                      <label className="block mb-3 text-black dark:text-white">
                        Attach file
                      </label>
                      <input
                        type="file"
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div> */}

                {/* <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div> */}

                <button className="flex justify-center w-full p-3 font-medium rounded bg-primary text-gray">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9"></div>
      </div>
    </>
  );
};

export default ClientNewPage;
