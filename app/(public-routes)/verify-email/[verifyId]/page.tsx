"use client";
import { useCheckEmail } from "@/utils/verify-email/useCheckEmail";
import React from "react";

export default function VerifyEmailPage({ params }) {
  const { data, isLoading, isError } = useCheckEmail(params.verifyId);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white shadow-lg rounded-lg p-6">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 mb-4"
              style={{ color: "#3498db" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="text-lg font-semibold" style={{ color: "#333" }}>
              Wacht even, we zijn uw e-mailadres aan het verifiëren!
            </p>
            <p className="text-sm" style={{ color: "#555" }}>
              Dit zal niet lang duren. Wij zorgen ervoor dat alles voor u klaarstaat.
            </p>
          </div>
        ) : isError ? (
          <div className="bg-red-100 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Oh Oh!</strong>
            <br />
            <span className="block text-sm">
              Er is iets misgegaan bij het verifiëren van uw e-mailadres. Probeer het opnieuw of
              neem contact op met de ondersteuning als het probleem zich blijft voordoen.
            </span>
          </div>
        ) : (
          <div className="   px-4 py-3 rounded relative " role="alert">
            <strong className="font-bold">Gefeliciteerd!</strong> <br />
            <span className="block sm:inline">
              Uw e-mailadres is succesvol geverifieerd. Welkom aan boord!{" "}
            </span>
            <p className="mt-2 text-sm">U kunt nu alle beschikbare functies verkennen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
