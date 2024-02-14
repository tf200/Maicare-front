import React, { FunctionComponent, useState } from "react";
import Button from "@/components/buttons/Button";
import Loader from "@/components/common/Loader";
import LargeErrorMessage from "@/components/LargeErrorMessage";
import Panel from "@/components/Panel";
import { UseQueryResult } from "react-query";
import { FormProps } from "@/types/form-props";

type ListComponentProps<TData> = {
  data: TData;
};

type FormComponentProps<TInitialData> = FormProps<TInitialData> & {
  employeeId: number;
};

type Props<TQueryData, TFormInitialValue, TQueryError> = {
  title: string;
  addButtonText: string;
  cancelText: string;
  errorText: string;

  employeeId: number;
  query: UseQueryResult<TQueryData, TQueryError>;
  ListComponent: FunctionComponent<ListComponentProps<TQueryData>>;
  FormComponent: FunctionComponent<FormComponentProps<TFormInitialValue>>;
};

function EmployeeBackground<TData, TInitialValue, TError>({
  title,
  employeeId,
  addButtonText,
  cancelText,
  errorText,
  FormComponent,

  query: { data, error, isLoading },
  ListComponent,
}: Props<TData, TInitialValue, TError>) {
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Panel title={title} containerClassName="py-4 px-7">
      <div className="mb-4.5">
        <Button
          className="w-72 block ml-auto"
          onClick={() => setIsAdding((is) => !is)}
        >
          {isAdding ? cancelText : addButtonText}
        </Button>
      </div>
      {isAdding && (
        <FormComponent
          employeeId={+employeeId}
          onSuccess={() => setIsAdding(false)}
        />
      )}
      {data && <ListComponent data={data} />}
      {isLoading && <Loader />}
      {error && (
        <LargeErrorMessage
          firstLine="Something went wrong"
          secondLine={errorText}
        />
      )}
    </Panel>
  );
}

export default EmployeeBackground;
