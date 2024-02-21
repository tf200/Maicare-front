import React, { FunctionComponent, useMemo } from "react";
import { FormikProvider, useFormik } from "formik";
import { useListRoles } from "@/utils/roles/list-roles";
import { SelectionOption } from "@/types/selection-option";
import Select from "@/components/FormFields/Select";
import { RoleAssignmentFormType } from "@/types/role-assignments/role-assignment-form-type";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import { useCreateRoleAssignment } from "@/utils/role-assignements/create-role-assignment";
import * as yup from "yup";
import FormikCheckboxItem from "@/components/FormFields/FormikCheckboxItem";
import { NewAssignReqDto } from "@/types/role-assignments/new-assign-req.dto";

const initialValues: RoleAssignmentFormType = {
  group_id: undefined,
  start_date: "",
  start_date_always: false,
  end_date: "",
  end_date_always: false,
};

const roleAssignmentSchema: yup.ObjectSchema<RoleAssignmentFormType> =
  yup.object({
    // Team is required
    group_id: yup.string().required("Team is verplicht"),
    start_date: yup
      .string()
      .when(["start_date_always"], ([start_date_always]) => {
        return start_date_always
          ? yup.string().notRequired()
          : yup.string().required("Startdatum is verplicht");
      }),
    end_date: yup.string().when(["end_date_always"], ([end_date_always]) => {
      return end_date_always
        ? yup.string().notRequired()
        : yup.string().required("Einddatum is verplicht");
    }),
    start_date_always: yup.boolean(),
    end_date_always: yup.boolean(),
  });

type Props = {
  employeeId: number;
  onSuccess?: () => void;
};

function mapFormToDto(
  values: RoleAssignmentFormType,
  employeeId: number
): NewAssignReqDto {
  return {
    group_id: +values.group_id,
    employee_id: employeeId,
    start_date: values.start_date_always ? null : values.start_date,
    end_date: values.end_date_always ? null : values.end_date,
  };
}

const RoleAssignmentForm: FunctionComponent<Props> = ({
  employeeId,
  onSuccess,
}) => {
  const { data: roles, isLoading: rolesLoading } = useListRoles();
  const rolesOptions = useMemo<SelectionOption[]>(() => {
    const options = roles?.map((role) => ({
      label: role.name,
      value: role.id + "",
    }));
    return options
      ? [{ label: "Selecteer Team", value: "" }, ...options]
      : undefined;
  }, [roles]);
  const { mutate, isLoading } = useCreateRoleAssignment(employeeId);
  const roleAssignmentForm = useFormik({
    initialValues,
    validationSchema: roleAssignmentSchema,
    onSubmit: (values) => {
      mutate(mapFormToDto(values, employeeId), {
        onSuccess,
      });
    },
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    roleAssignmentForm;
  return (
    <FormikProvider value={roleAssignmentForm}>
      <form onSubmit={handleSubmit} className="lg:max-w-4xl">
        {rolesLoading && <span className="ml-2">Loading Roles...</span>}

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          {rolesOptions ? (
            <Select
              label={"Selecteer Team"}
              name="group_id"
              id="group_id"
              className="w-full xl:w-1/2"
              required={true}
              options={rolesOptions}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.group_id && errors.group_id}
            />
          ) : (
            <div className="w-full xl:w-1/2" />
          )}
          <div className="w-full xl:w-1/2" />
        </div>
        <div className="mb-8 flex flex-col gap-6 xl:flex-row">
          <div className={"w-full xl:w-1/2"}>
            <InputField
              id={"start_date"}
              label={"Startdatum"}
              className="mb-3.5"
              type={"date"}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.start_date && errors.start_date}
              disabled={values.start_date_always}
              required={!values.start_date_always}
            />

            <FormikCheckboxItem
              label={"Altijd"}
              id={"start_date_always"}
              name={"start_date_always"}
              value={values.start_date_always}
            />
          </div>
          <div className={"w-full xl:w-1/2"}>
            <InputField
              id={"end_date"}
              label={"Einddatum"}
              className="mb-3.5"
              type={"date"}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.end_date && errors.end_date}
              disabled={values.end_date_always}
              required={!values.end_date_always}
            />
            <FormikCheckboxItem
              label={"Altijd"}
              id={"end_date_always"}
              name={"end_date_always"}
              value={values.end_date_always}
            />
          </div>
        </div>
        <Button
          type={"submit"}
          disabled={isLoading}
          isLoading={isLoading}
          formNoValidate={true}
          loadingText={"Team Wordt Toegewezen..."}
        >
          Team Toewijzen
        </Button>
      </form>
    </FormikProvider>
  );
};

export default RoleAssignmentForm;
