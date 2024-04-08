import React, { FunctionComponent, useMemo } from "react";
import Button from "@/components/buttons/Button";
import { cn } from "@/utils/cn";
import DropdownDefault from "@/components/Dropdowns/DropdownDefault";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { useModal } from "@/components/providers/ModalProvider";
import Textarea from "@/components/FormFields/Textarea";
import { MDomain } from "@/types/domains";
import { useCreateDomain, useDomains } from "@/utils/domains";
import Select from "@/components/FormFields/Select";
import * as Yup from "yup";
import InfoIcon from "@/components/icons/InfoIcon";
import PlusIcon from "@/components/icons/PlusIcon";

const MaturityLevelTypes = [
  "acute_problems",
  "not_self_reliant",
  "limited_self_reliant",
  "sufficient_self_reliant",
  "fully_self_reliant",
] as const;

type MaturityLevelType = (typeof MaturityLevelTypes)[number];

const MLevelTrans: { [key in MaturityLevelType]: string } = {
  acute_problems: "Acute problematiek",
  not_self_reliant: "Niet zelfredzaam",
  limited_self_reliant: "Beperkt zelfredzaam",
  sufficient_self_reliant: "Voldoende zelfredzaam",
  fully_self_reliant: "Volledig zelfredzaam",
};

const MLevels = [
  "Acute problematiek", // acute problems
  "Niet zelfredzaam", // not self-reliant
  "Beperkt zelfredzaam", // limited self-reliant
  "Voldoende zelfredzaam", // sufficient self-reliant
  "Volledig zelfredzaam", // fully self-reliant
];

const GRADIENT_COLORS = [
  "bg-meta-7/[0.4]",
  "bg-meta-8/[0.4]",
  "bg-meta-8/[0.2]",
  "bg-meta-3/[0.2]",
  "bg-meta-3/[0.4]",
];

const MaturityMatrix: FunctionComponent = (props) => {
  const { open } = useModal(SelectDomainModal);
  const [domains, setDomains] = React.useState<MDomain[]>([]);
  return (
    <div className="mb-6">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border border-stroke">Domein</th>
            {MLevels.map((level, index) => (
              <th
                className={cn(
                  GRADIENT_COLORS[index],
                  "px-5 py-2 border border-stroke"
                )}
                key={level}
              >
                {level}
              </th>
            ))}
            <th className="border border-stroke" />
          </tr>
        </thead>
        <tbody>
          {domains.map((domain, index) => (
            <tr key={domain.name}>
              <td className="w-1/8 align-top border border-stroke p-2">
                {domain.name}
              </td>
              {domain.levels.map((level) => (
                <td
                  key={level.level}
                  className="align-top p-2 w-1/6 border border-stroke whitespace-pre-wrap"
                >
                  <p>
                    <div>{level.assessments}</div>
                  </p>
                </td>
              ))}
              <td className="align-top py-4 px-2 border border-stroke">
                <DropdownDefault
                  visible={[false, true]}
                  onDelete={() => {
                    setDomains((ds) => ds.filter((d) => d.id !== domain.id));
                  }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={7} className="border border-stroke py-5">
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    open({
                      onSelected: (created: MDomain) => {
                        setDomains([...domains, created]);
                      },
                    });
                  }}
                  className="flex items-center gap-2"
                >
                  <PlusIcon /> <span>Domein toevoegen</span>
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MaturityMatrix;

const DomainFormModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const { mutate: create, isLoading: isCreating } = useCreateDomain();
  const formik = useFormik({
    initialValues: {
      name: "",
      levels: MLevels.map((level, key) => {
        return {
          level: key + 1,
          assessments: "",
        };
      }),
    },
    onSubmit: (values) => {
      create(values, {
        onSuccess: (created) => {
          additionalProps.onCreated(created);
          props.onClose();
        },
      });
    },
  });
  const { values, touched, handleBlur, errors, handleChange, handleSubmit } =
    formik;

  return (
    <FormModal {...props} title={"Domein bewerken"}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <InputField
            className="mb-6"
            label={"Naam"}
            placeholder={"Naam"}
            name={"name"}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
          <h2 className="mb-4">
            <strong>Beoordelingen</strong>
          </h2>
          {MLevels.map((level, index) => (
            <Textarea
              className="mb-5"
              key={level}
              label={level}
              placeholder={level}
              name={`levels[${index}].assessments`}
              value={values.levels[index]?.assessments}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.levels && errors.levels}
            />
          ))}

          <Button type={"submit"} isLoading={isCreating}>
            Opslaan
          </Button>
        </form>
      </FormikProvider>
    </FormModal>
  );
};

const selectDomainVSchema = Yup.object({
  domain: Yup.string().required("Domein is verplicht"),
});

const SelectDomainModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const { data: domains } = useDomains();
  const options = useMemo(() => {
    if (!domains)
      return [
        {
          label: "Selecteer domein",
          value: "",
        },
      ];
    return [
      {
        label: "Selecteer domein",
        value: "",
      },
      ...domains?.map((domain) => ({
        label: domain.name,
        value: domain.id + "",
      })),
    ];
  }, [domains]);

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        domain: "",
      },
      validationSchema: selectDomainVSchema,
      onSubmit: (values) => {
        additionalProps.onSelected(
          domains?.find((d) => d.id === +values.domain)
        );
        props.onClose();
      },
    });

  const { open: openCreateModal } = useModal(DomainFormModal);
  return (
    <FormModal
      {...props}
      title={"Selecteer domein"}
      panelClassName={"min-h-100"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col grow">
        <Select
          className="mb-6"
          label={"Domein"}
          name={"domain"}
          options={options}
          disabled={!domains}
          value={values.domain}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.domain && errors.domain}
        />
        <button
          onClick={() => {
            openCreateModal({
              onCreated: (created) => {
                additionalProps.onSelected(created);
                props.onClose();
              },
            });
          }}
          className="flex items-baseline gap-1 font-bold mb-10"
        >
          <InfoIcon className="w-5 h-5 relative bottom-[-0.3rem]" />
          <div className="text-sm text-gray-400">
            Domein niet gevonden? Klik hier om toe te voegen
          </div>
        </button>
        <Button type={"submit"} className="mt-auto">
          Selecteer
        </Button>
      </form>
    </FormModal>
  );
};
