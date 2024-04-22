export type ContractTypeItem = {
  id: number;
  name: string;
};

export type ContractTypesResDto = ContractTypeItem[];

export type ContractTypeCreateReqDto = {
  name: string;
};
