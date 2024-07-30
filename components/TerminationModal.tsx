import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import WarningIcon from "@/components/icons/WarningIcon";
import { FormikProvider, useFormik } from "formik";
import { DepartureEntries } from "@/types/departure_entries";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import Button from "@/components/buttons/Button";

const TerminationModal: FunctionComponent<ModalProps> = ({ additionalProps, ...props }) => {
  const formik = useFormik<DepartureEntries>({
    initialValues: {
      departure_reason: "",
      departure_report: "",
    },
    onSubmit: (values) => {
      additionalProps.onSubmit(values);
      props.onClose();
    },
  });
  const { handleSubmit, handleBlur, handleChange, values } = formik;
  return (
    <FormModal {...props} title={additionalProps.title ?? "Cliëntdossier beëindigen"}>
      <p className="mb-6 bg-meta-8/20 p-4 rounded-xl text-c_black dark:text-white">
        <WarningIcon className="inline" />{" "}
        {additionalProps.msg ??
          "Weet u zeker dat u de status van deze cliënt wilt wijzigen in 'Uit zorg'? bevestigen door een afsluitend rapport in te dienen."}
      </p>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            label={"Reden van beëindiging"}
            placeholder={"Reden van beëindiging"}
            id="departure_reason"
            name="departure_reason"
            value={values.departure_reason}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mb-4"
            required={true}
          />
          <Textarea
            label={"Afsluitend rapport"}
            placeholder={"Afsluitend rapport"}
            id="departure_report"
            name="departure_report"
            value={values.departure_report}
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
            rows={6}
            className="w-full mb-6"
          />
          <div className="flex justify-center gap-4 items-center">
            <Button buttonType={"Outline"} onClick={props.onClose}>
              Annuleren
            </Button>
            <Button type="submit">Bevestigen</Button>
          </div>
        </form>
      </FormikProvider>
    </FormModal>
  );
};

export default TerminationModal;
