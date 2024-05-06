"use client";

import { ClientDetailsResDto } from "@/types/clients/client-details-res-dto";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { fullDateFormat } from "@/utils/timeFormatting";
import {
  calculateTotalRate,
  getRate,
  rateType,
} from "@/utils/contracts/rate-utils";
import { formatPrice } from "@/utils/priceFormatting";
import React, { FunctionComponent } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import { useContractDetails } from "@/utils/contracts/getContractDetails";
import Loader from "@/components/common/Loader";
import { WhenNotification } from "@/components/forms/ContractForm";
import { useClientContact } from "@/components/clientDetails/ContactSummary";
import { mapToForm } from "@/utils/contracts/mapToForm";
import DownloadFile from "@/components/DownloadFile";
import MonthsBetween from "@/components/MonthsBetween";
import {
  careTypeDict,
  CONTRACT_STATUS_TRANSLATION_DICT,
  CONTRACT_STATUS_VARIANT_DICT,
} from "@/consts";
import Button from "@/components/buttons/Button";
import { useModal } from "@/components/providers/ModalProvider";
import { getConfirmModal } from "@/components/Modals/Modal";
import { useUpdateContract } from "@/utils/contracts/updateContract";
import { resDtoToPatchDto } from "@/utils/contracts/resDtoToPatchDto";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import ContactAssignment from "@/components/ContactAssignment";
import TerminationModal from "@/components/TerminationModal";
import { DepartureEntries } from "@/types/departure_entries";
import StatusBadge from "@/components/StatusBadge";

type Props = {
  clientId: number;
  contractId: number;
};

const ContractDetails: FunctionComponent<Props> = ({
  clientId,
  contractId,
}) => {
  const { data: client, isLoading: isClientLoading } =
    useClientDetails(clientId);
  const { data: contract, isLoading: isContractLoading } = useContractDetails(
    clientId,
    contractId
  );
  const { data: contactData } = useClientContact(clientId);
  return (
    <div
      id="contract"
      className="rounded-sm bg-white p-4 dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9"
    >
      {isClientLoading && isContractLoading && <Loader />}
      {client && contract && (
        <ClientData clientData={client} contractData={contract} />
      )}
      <div className="flex flex-col xl:flex-row items-start justify-between mt-5">
        {contactData && (
          <ContactAssignment
            clientId={clientId}
            data={contactData}
            unassigned={client && !client.sender}
          />
        )}
        {contract && <WhenNotification values={mapToForm(contract)} />}
      </div>
      {contract && <ContractData contractData={contract} />}
      <div className="flex flex-wrap gap-4">
        {contract?.attachments.map((attachment) => (
          <DownloadFile file={attachment} />
        ))}
      </div>
    </div>
  );
};

export default ContractDetails;

function ClientData(props: {
  clientData: ClientDetailsResDto;
  contractData: ContractResDto;
}) {
  const { mutate: updateContract, isLoading: isUpdating } = useUpdateContract(
    props.contractData.id
  );
  const { open: openApprove } = useModal(
    getConfirmModal({
      modalTitle: "Contract goedkeuren",
      children: "Weet je zeker dat je dit contract wilt goedkeuren?",
    })
  );

  const { open: openTerminate } = useModal(TerminationModal);
  return (
    <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row xl:gap-9">
        <div>
          <p className="mb-1.5 text-lg font-medium text-black dark:text-white">
            Cliënt
          </p>
          <h4 className="mb-4 text-2xl font-semibold text-black dark:text-white">
            {props.clientData.first_name} {props.clientData.last_name}
          </h4>
          <a href={`mailto:${props.clientData.email}`} className="block">
            <span className="font-medium">Email:</span> {props.clientData.email}
          </a>
          <span className="mt-2 block">
            <span className="font-medium">Locatie:</span>{" "}
            {props.clientData.location}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end w-full max-w-142.5">
        <h3 className="text-2xl mb-10 font-semibold text-black dark:text-white">
          Contract #{props.contractData.id}
        </h3>
        {props.contractData.status === "draft" && (
          <Button
            onClick={() => {
              openApprove({
                onConfirm: (close: () => void) => {
                  updateContract(
                    {
                      ...resDtoToPatchDto(props.contractData),
                      status: "approved",
                    },
                    {
                      onSuccess: () => {
                        close();
                      },
                    }
                  );
                },
              });
            }}
            buttonType={"Outline"}
          >
            Contract goedkeuren
          </Button>
        )}
        {props.contractData.status === "approved" && (
          <Button
            isLoading={isUpdating}
            disabled={isUpdating}
            buttonType={"Danger"}
            onClick={() => {
              openTerminate({
                title: "Contract beëindigen",
                msg: "Weet je zeker dat je dit contract wilt beëindigen?",
                onSubmit: (terminationEntries: DepartureEntries) => {
                  updateContract({
                    ...resDtoToPatchDto(props.contractData),
                    status: "terminated",
                    ...terminationEntries,
                  });
                },
              });
            }}
          >
            Contract beëindigen
          </Button>
        )}
        {props.contractData.status === "terminated" && (
          <div className="flex flex-col gap-4 w-full bg-gray rounded-lg p-4">
            <div>
              <StatusBadge
                type={CONTRACT_STATUS_VARIANT_DICT[props.contractData.status]}
                text={
                  CONTRACT_STATUS_TRANSLATION_DICT[props.contractData.status]
                }
              />
            </div>
            <div>
              <p className="text-sm font-bold">Reden van beëindiging:</p>
              <p className="text-black dark:text-white">
                {props.contractData.departure_reason}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Afsluitend rapport:</p>
              <p className="text-black dark:text-white">
                {props.contractData.departure_report}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContractData(props: { contractData: ContractResDto }) {
  return (
    <div className="my-10 rounded-sm border border-stroke p-5 dark:border-strokedark">
      <div className="items-center sm:flex">
        <div className="w-full items-center justify-between md:flex">
          <div className="mb-3 md:mb-0">
            <span className="inline-block font-medium text-black hover:text-primary dark:text-white">
              {props.contractData.care_name} (
              {careTypeDict[props.contractData.care_type]})
            </span>
            <p className="flex text-sm font-medium">
              <span className="mr-5">
                {" "}
                Van: {fullDateFormat(props.contractData.start_date)}{" "}
              </span>
              <span className="mr-5">
                {" "}
                Tot: {fullDateFormat(props.contractData.end_date)}{" "}
              </span>
              <span className="mr-5">
                {" "}
                Zorgperiode:{" "}
                <MonthsBetween
                  startDate={props.contractData.start_date}
                  endDate={props.contractData.end_date}
                />
              </span>
            </p>
          </div>
          <div className="flex items-center md:justify-end">
            <p className="mr-20 font-semibold text-black dark:text-white">
              Rate: {rateType(props.contractData)}
            </p>
            <p className="mr-5 font-semibold text-black dark:text-white">
              {getRate(props.contractData)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentDetails(props: { item: ContractResDto }) {
  return (
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4 sm:w-1/2 xl:w-3/12">
        <div className="mb-10">
          <h4 className="mb-4 text-xl font-semibold text-black dark:text-white md:text-2xl">
            Total Payed
          </h4>
          <p>{formatPrice(0)}</p>
        </div>
      </div>
      <div className="w-full px-4 sm:w-1/2 xl:w-3/12">
        <div className="mb-10">
          <h4 className="mb-4 text-xl font-semibold text-black dark:text-white md:text-2xl">
            Left to Pay
          </h4>
          <p>{calculateTotalRate(props.item)}</p>
        </div>
      </div>
      <div className="w-full px-4 xl:w-6/12">
        <div className="mr-10 text-right md:ml-auto">
          <div className="ml-auto sm:w-1/2">
            <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
              <span> Subtotal </span>
              <span> {calculateTotalRate(props.item)} </span>
            </p>
            <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
              <span> Insurance (-) </span>
              <span> {formatPrice(0)} </span>
            </p>
            <p className="mb-4 mt-2 flex justify-between border-t border-stroke pt-6 font-medium text-black dark:border-strokedark dark:text-white">
              <span> Total Payable </span>
              <span> {calculateTotalRate(props.item)} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
