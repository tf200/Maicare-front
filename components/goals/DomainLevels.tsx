import React, { Fragment, FunctionComponent, useState } from "react";
import { SecureFragment } from "@/components/SecureWrapper";
import {
  GRADIENT_COLORS,
  MANAGE_DOMAIN_LEVELS,
  MaturityLevelTypes,
  MLevels,
} from "@/consts";
import { useClientDomains, useClientLevels } from "@/utils/domains";
import DataCard from "@/components/DataCard";
import { cn } from "@/utils/cn";
import PencilSquare from "@/components/icons/PencilSquare";
import { ModalProps } from "@/types/modal-props";
import { getImgProps } from "next/dist/shared/lib/get-img-props";
import FormModal from "@/components/Modals/FormModal";
import { useModal } from "@/components/providers/ModalProvider";
import ChevronDown from "@/components/icons/ChevronDown";
import { MDomain } from "@/types/domains";
import Button from "@/components/buttons/Button";
import { useSetDomainLevel } from "@/utils/goal";

const DomainLevels: FunctionComponent<{
  clientId: number;
}> = ({ clientId }) => {
  const { data: domains, isLoading: isLoadingDomains } =
    useClientDomains(clientId);
  const { data: levels, isLoading: isLoadingLevels } =
    useClientLevels(clientId);
  const getLevelByDomain = (domainId: number) => {
    return levels.find((level) => level.domain_id === domainId)?.level;
  };
  const { open: editLevel } = useModal(UpdateDomainLevelModal);
  if (isLoadingDomains || isLoadingLevels) {
    return null;
  }
  if (!domains || !levels) {
    return null;
  }
  return (
    <SecureFragment permission={MANAGE_DOMAIN_LEVELS}>
      <div className="mb-6">
        <h2 className="px-4 py-2 text-xl text-black font-bold">Domeinen</h2>
        <div className="flex flex-wrap gap-4">
          {domains.map((domain) => (
            <DataCard title={domain.name} key={domain.id}>
              <button
                className={cn(
                  "mt-4 flex items-center justify-center gap-2 w-full bg-meta-4/20 text-sm font-medium text-center py-1 px-2 rounded-md",
                  GRADIENT_COLORS[getLevelByDomain(domain.id)]
                )}
                onClick={() => {
                  editLevel({
                    currentLevel: getLevelByDomain(domain.id),
                    currentDomain: domain,
                    clientId,
                  });
                }}
              >
                <PencilSquare className="w-5 h-5" />
                {MLevels[getLevelByDomain(domain.id)] ?? "N/A"}
              </button>
            </DataCard>
          ))}
        </div>
      </div>
    </SecureFragment>
  );
};

export default DomainLevels;

const UpdateDomainLevelModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const currentLevel = additionalProps?.currentLevel;
  const currentDomain: MDomain = additionalProps?.currentDomain;
  const [level, setLevel] = useState<number>(currentLevel);
  const { mutate: setDomainLevel, isLoading: isSetting } = useSetDomainLevel(
    additionalProps.clientId
  );
  return (
    <FormModal
      {...props}
      title={`Beoordeel het volwassenheidsniveau van het domein (${currentDomain.name})`}
    >
      {MLevels.map((mLevel, index) => (
        <Fragment key={mLevel}>
          <button
            className={cn(
              "mt-4 flex border-2 pl-5 border-transparent items-center justify-center gap-2 w-full bg-meta-4/20 text-sm font-medium text-center py-1 pr-2 rounded-md",
              GRADIENT_COLORS[index],
              {
                "border-2 border-primary": level === index + 1,
              }
            )}
            onClick={() => setLevel(index + 1)}
          >
            <div>{MLevels[index]}</div>
            {level === index + 1 && (
              <div className="text-primary">(geselecteerd)</div>
            )}
            <ChevronDown
              className={cn("ml-auto", {
                "transform rotate-180": level === index + 1,
              })}
            />
          </button>
          {level === index + 1 && (
            <div className="mt-2 bg-white rounded-lg p-5">
              {currentDomain.levels[index].assessments}
            </div>
          )}
        </Fragment>
      ))}

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button onClick={props.onClose} buttonType={"Outline"}>
          Annuleren
        </Button>
        <Button
          isLoading={isSetting}
          disabled={isSetting}
          onClick={() => {
            setDomainLevel(
              {
                domain_id: currentDomain.id,
                level,
              },
              {
                onSuccess: props.onClose,
              }
            );
          }}
        >
          Opslaan
        </Button>
      </div>
    </FormModal>
  );
};
