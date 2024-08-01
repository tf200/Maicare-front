import React, { FunctionComponent, InputHTMLAttributes, useMemo, useState } from "react";
import FormikTagInput from "@/components/FormFields/FormikTagInput";
import { useClientsList } from "@/utils/clients/getClientsList";
import { useDebounce } from "@/hooks/useDebounce";
import { useClientDetails } from "@/utils/clients/getClientDetails";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const ClientsTagInput: FunctionComponent<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useMemo(() => {
    return {
      search: searchQuery,
      status__in: undefined,
    };
  }, [searchQuery]);
  const debouncedParams = useDebounce(searchParams, 300);
  const { data, isLoading } = useClientsList(debouncedParams);
  const options = useMemo(() => {
    if (!data?.results) return [];
    return data.results.map((client) => ({
      label: client.first_name + " " + client.last_name,
      value: client,
    }));
  }, [data]);
  return (
    <FormikTagInput
      {...props}
      options={searchQuery ? options : []}
      handleQueryChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      renderTag={(tagId) => <ClientTag id={tagId} />}
    />
  );
};

export default ClientsTagInput;

const ClientTag: FunctionComponent<{ id: number }> = ({ id }) => {
  const { data, isLoading } = useClientDetails(id);
  return <div>{isLoading ? "Loading..." : data?.first_name + " " + data?.last_name}</div>;
};
