import React, { FunctionComponent } from "react";
import FormModal from "@/components/Modals/FormModal";
import { ModalProps } from "@/types/modal-props";
import Button from "@/components/buttons/Button";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import ClientSelector from "@/components/FormFields/comboboxes/ClientSelector";
import { GenerateInvoiceReqDto } from "@/types/invoices/generate-invoice.req.dto";
import api from "@/utils/api";
import { InvoiceResDto } from "@/types/invoices/invoices-res.dto";
import { useMutation, useQueryClient } from "react-query";

const initialValues: GenerateInvoiceReqDto = {
  client_id: undefined,
  start_date: "",
  end_date: "",
};

async function generateInvoice(req: GenerateInvoiceReqDto) {
  const response = await api.post<InvoiceResDto>(
    "/client/generate-invoice/",
    req
  );
  return response.data;
}

const useGenerateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateInvoice,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

const GenerateInvoiceModal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  additionalProps,
}) => {
  const { mutate: generate, isLoading } = useGenerateInvoice();
  const formik = useFormik({
    initialValues,
    onSubmit: (data) => {
      generate(data, {
        onSuccess: () => {
          onClose();
          additionalProps?.onSuccess?.();
        },
      });
    },
  });
  const { handleSubmit, handleBlur, handleChange, errors, touched } = formik;
  return (
    <FormModal open={open} onClose={onClose} title={"Genereer factuur"}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <ClientSelector name={"client_id"} />
          <InputField
            type="date"
            name="start_date"
            onBlur={handleBlur}
            onChange={handleChange}
            label="Van"
            className="mb-5"
            error={touched.start_date && errors.start_date}
          />
          <InputField
            type="date"
            name="end_date"
            onBlur={handleBlur}
            onChange={handleChange}
            label="Tot"
            className="mb-5"
            error={touched.end_date && errors.end_date}
          />
          <Button
            type="submit"
            formNoValidate={true}
            className="mt-auto"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Genereer factuur
          </Button>
        </form>
      </FormikProvider>
    </FormModal>
  );
};

export default GenerateInvoiceModal;
