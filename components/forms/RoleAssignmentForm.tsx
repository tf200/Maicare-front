import React, { FunctionComponent, useMemo } from "react";
import { useFormik } from "formik";
import { useListRoles } from "@/utils/roles/list-roles";
import { SelectionOption } from "@/types/selection-option";
import Select from "@/components/FormFields/Select";
import { RoleAssignmentFormType } from "@/types/role-assignments/role-assignment-form-type";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Button from "@/components/buttons/Button";
import { useCreateRoleAssignment } from "@/utils/role-assignements/create-role-assignment";

const initialValues: RoleAssignmentFormType = {
  group_id: undefined,
};

const RANGE_OPTIONS = [
  { label: "Select Range", value: "" },
  { label: "Standard Access", value: "standard" },
  { label: "Full Access", value: "full" },
  { label: "Limited Access", value: "limited" },
];

type Props = {
  employeeId: number;
  onSuccess?: () => void;
};

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
      ? [{ label: "Select Team", value: "" }, ...options]
      : undefined;
  }, [roles]);
  const { mutate, isLoading } = useCreateRoleAssignment();
  const { handleSubmit, handleChange, handleBlur, errors, touched } = useFormik(
    {
      initialValues,
      onSubmit: (values) => {
        mutate(
          {
            group_id: +values.group_id,
            user_id: employeeId,
          },
          {
            onSuccess,
          }
        );
      },
    }
  );
  return (
    <form onSubmit={handleSubmit}>
      {rolesLoading && <span className="ml-2">Loading Roles...</span>}

      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        {rolesOptions ? (
          <Select
            label={"Select Team"}
            name="group_id"
            id="group_id"
            placeholder={"Select Team For the Employee"}
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
        <Select
          label={"Select Range"}
          id="range"
          placeholder={"Select Range"}
          className="w-full xl:w-1/2"
          options={RANGE_OPTIONS}
        />
      </div>
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputFieldThin
          className={"w-full xl:w-1/2"}
          id={"start_date"}
          label={"Start Date"}
          type={"date"}
          placeholder={"Enter Start Date"}
        />
        <InputFieldThin
          className={"w-full xl:w-1/2"}
          id={"end_date"}
          label={"End Date"}
          type={"date"}
          placeholder={"Enter End Date"}
        />
      </div>
      <Button
        type={"submit"}
        disabled={isLoading}
        isLoading={isLoading}
        formNoValidate={true}
        loadingText={"Assigning Team..."}
      >
        Assign Team
      </Button>
      <div className="border-stroke w-full border-t my-4" />
    </form>
  );
};

export default RoleAssignmentForm;
