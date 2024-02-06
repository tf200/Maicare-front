import React, { useState, useEffect, useRef } from "react";

interface ConfirmationModalProps {
  title: string;
  message: string;
  buttonMessage: string;
  modalOpen: any;
  setModalOpen: Function;
  action: Function;
  isLoading: boolean;
}

const ConfirmationModal: React.FC<
  ConfirmationModalProps & { setModalOpen: Function; action: Function }
> = ({
  title,
  message,
  buttonMessage,
  modalOpen,
  setModalOpen,
  action,
  isLoading,
}) => {
  // const trigger = useRef<any>(null);
  // const modal = useRef<any>(null);

  // // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }: MouseEvent) => {
  //     if (!modal.current) return;
  //     if (
  //       !modalOpen ||
  //       modal.current.contains(target) ||
  //       trigger.current.contains(target)
  //     )
  //       return;
  //     setModalOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // });

  // // close if the esc key is pressed
  // useEffect(() => {
  //   const keyHandler = ({ keyCode }: KeyboardEvent) => {
  //     if (!modalOpen || keyCode !== 27) return;
  //     setModalOpen(false);
  //   };
  //   document.addEventListener("keydown", keyHandler);
  //   return () => document.removeEventListener("keydown", keyHandler);
  // });

  return (
    <div>
      <div
        className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? "block" : "hidden"
        }`}
      >
        <div
          // ref={modal}
          onFocus={() => setModalOpen(true)}
          onBlur={() => setModalOpen(false)}
          className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5"
        >
          <span className="mx-auto inline-block">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.1"
                width="60"
                height="60"
                rx="30"
                fill="#DC2626"
              />
              <path
                d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
                stroke="#DC2626"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mb-10">{message}</p>
          <div className="-mx-3 flex flex-wrap gap-y-4">
            <div className="w-full px-3 2xsm:w-1/2">
              <button
                disabled={isLoading}
                onClick={() => setModalOpen(false)}
                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-black hover:bg-black hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-black dark:hover:bg-black"
              >
                Cancel
              </button>
            </div>
            <div className="w-full px-3 2xsm:w-1/2">
              <button
                disabled={isLoading}
                onClick={() => {
                  action();
                }}
                className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
              >
                {!isLoading ? (
                  buttonMessage
                ) : (
                  <div className="inline-block h-[1.23rem] w-[1.23rem] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
