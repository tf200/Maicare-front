import { useGetProtectedEmail } from "@/utils/protected-email/useGetProtectedEmail";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import Button from "../buttons/Button";
import { cn } from "@/utils/cn";
import IncidentEmail from "./IncidentEmail";
import ProgressReportEmail from "./ProgressReportEmail";
import { INCIDENT_TYPE } from "@/consts";

export default function ProtectedEmail({ emailId }) {
  const router = useRouter();
  const initialValues = { passkey: "" };

  const [wrongPassKey, setwrongPassKey] = useState(null);
  const [emailContent, setEmailContent] = useState(null);

  const validationSchema = Yup.object({
    passkey: Yup.string().required("Wachtwoord is vereist"),
  });

  const { mutate: getProtectedEmail, isLoading } = useGetProtectedEmail();

  const handleSubmit = (values) => {
    getProtectedEmail(
      { uuid: emailId, passkey: values.passkey },
      {
        onSuccess(data) {
          setwrongPassKey(null);
          setEmailContent(data);
        },
        onError(error: any) {
          setwrongPassKey(error.response.data.message);
        },
      }
    );
  };

  if (emailContent) {
    return emailContent.email_type === INCIDENT_TYPE ? (
      <IncidentEmail emailContent={emailContent} />
    ) : (
      <ProgressReportEmail emailContent={emailContent} />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Beschermde e-mail</h1>
        <p className="text-center mb-12">
          Om uw privacy en veiligheid te garanderen, is deze e-mail beveiligd met een wachtwoord.
          Voer de aan u verstrekte toegangssleutel in om de inhoud van dit bericht te ontgrendelen.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="passkey" className="block text-sm font-medium">
                  Wachtwoord
                </label>
                <Field
                  id="passkey"
                  name="passkey"
                  type="password"
                  className={`mt-1 mb-4 block w-full px-3 py-2 border ${
                    errors.passkey && touched.passkey ? "border-red-500" : "border-gray"
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                />
                <ErrorMessage
                  name="passkey"
                  component="div"
                  className={"mt-2 text-sm text-red font-semibold"}
                />
              </div>
              <div>
                <Button
                  type={"submit"}
                  disabled={isLoading}
                  isLoading={isLoading}
                  className={cn(
                    "w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                  )}
                >
                  Ontvang mijn e-mail
                </Button>
              </div>
              <p className="mt-2 text-m text-red text-center font-semibold">
                {wrongPassKey && !isLoading ? wrongPassKey : ""}
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
