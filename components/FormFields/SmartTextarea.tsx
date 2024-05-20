import React, {
  FunctionComponent,
  TextareaHTMLAttributes,
  useEffect,
  useMemo,
} from "react";
import IconButton from "@/components/buttons/IconButton";
import Sparkles from "@/components/icons/Sparkles";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import {
  useClearEnhancedReport,
  useEnhancedReport,
  useEnhanceReport,
} from "@/utils/report-enhancement";
import Loader from "@/components/common/Loader";
import { useModal } from "@/components/providers/ModalProvider";
import { Change, diffWords } from "diff";
import { cn } from "@/utils/cn";
import Button from "@/components/buttons/Button";
import { useField } from "formik";

type Props = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "name" | "className" | "rows" | "placeholder" | "required" | "disabled"
> & {
  label: string;
  modalTitle: string;
  error?: any;
};

const SmartTextarea: FunctionComponent<Props> = ({
  label,
  modalTitle,
  error,
  className,
  ...props
}) => {
  const { open } = useModal(TextEnhancingModal);
  const [fieldInput, metaData, helpers] = useField<string>({
    name: props.name,
    id: props.id,
  });
  return (
    <div className={className}>
      <label
        htmlFor={props.id}
        className="mb-2.5 block text-black dark:text-white"
      >
        {label} {props.required && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative w-full h-fit rounded bg-white border-[1.5px] border-stroke transition focus-within:border-primary active:border-primary group-disabled:cursor-default group-disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-within:border-primary">
        <textarea
          className="w-full h-full block rounded px-5 py-3 bg-transparent font-medium outline-none"
          {...props}
          {...fieldInput}
        ></textarea>
        {1 && (
          <IconButton
            disabled={props.disabled || fieldInput.value?.length < 75}
            onClick={() => {
              open({
                title: modalTitle,
                content: fieldInput.value,
                onConfirm: (content: string) => {
                  helpers.setValue(content);
                },
              });
            }}
            className={cn(
              "absolute bottom-4 right-2",
              fieldInput.value?.length < 75 ? "bg-gray-400 text-gray-500" : ""
            )}
          >
            <Sparkles />
          </IconButton>
        )}
      </div>
      {error && (
        <p role="alert" className="pt-1 text-red">
          {error}
        </p>
      )}
    </div>
  );
};

export default SmartTextarea;

const TextEnhancingModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const { mutate: enhance, isError, isLoading } = useEnhanceReport();
  const { data: enhancedReport } = useEnhancedReport();
  const clear = useClearEnhancedReport();
  useEffect(() => {
    enhance({
      content: additionalProps.content,
    });
    return clear;
  }, [additionalProps.content]);
  const diffs: Change[] = useMemo(() => {
    if (!enhancedReport) {
      return [];
    }
    return diffWords(additionalProps.content, enhancedReport?.content);
  }, [enhancedReport]);
  const keptAndRemoved = useMemo(() => {
    return diffs.filter((diff) => !diff.added);
  }, [diffs]);
  const keptAndAdded = useMemo(() => {
    return diffs.filter((diff) => !diff.removed);
  }, [diffs]);
  return (
    <FormModal {...props} title={additionalProps.title}>
      <div className="font-bold mb-2">Originele tekst:</div>
      {!enhancedReport && (
        <div className="rounded-xl bg-white p-5 mb-6">
          {additionalProps.content}
        </div>
      )}
      {enhancedReport && (
        <div className="rounded-xl bg-white p-5 mb-6">
          {keptAndRemoved.map((diff, index) => (
            <span
              key={index}
              className={cn({
                "bg-meta-6/20": diff.removed,
                "bg-meta-3/30": diff.added,
              })}
            >
              {diff.value}
            </span>
          ))}
        </div>
      )}
      <div className="font-bold mb-2">Gewijzigde tekst:</div>
      {isLoading && !enhancedReport && (
        <div className="rounded-xl bg-white p-5 mb-10">
          <Loader />
        </div>
      )}
      {enhancedReport && (
        <div className="rounded-xl bg-white p-5 mb-10">
          {keptAndAdded.map((diff, index) => (
            <span key={index} className={cn({ "bg-meta-3/30": diff.added })}>
              {diff.value}
            </span>
          ))}
        </div>
      )}
      {isError && (
        <div className="rounded-xl bg-white p-5 mb-10 text-red">
          Er is een fout opgetreden bij het verbeteren van de tekst.
          <Button
            onClick={() => {
              enhance({
                content: additionalProps.content,
              });
            }}
          >
            Probeer opnieuw
          </Button>
        </div>
      )}
      <div className="flex justify-center gap-4">
        <Button
          buttonType={"Outline"}
          onClick={() => {
            props.onClose();
          }}
        >
          Annuleer
        </Button>
        <Button
          disabled={!enhancedReport}
          onClick={() => {
            additionalProps.onConfirm(enhancedReport?.content);
            props.onClose();
          }}
        >
          Accepteer wijzigingen
        </Button>
      </div>
    </FormModal>
  );
};
