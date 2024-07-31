"use client";

import React, { FC, PropsWithChildren, useState } from "react";
import Panel from "@/components/Panel";
import PlusIcon from "@/components/icons/PlusIcon";
import Button from "@/components/buttons/Button";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import InputField from "@/components/FormFields/InputField";
import { useModal } from "@/components/providers/ModalProvider";
import { useCreateGroup, useDeleteGroup, useGroups } from "@/utils/permissions";
import Loader from "@/components/common/Loader";
import { GroupDetailsResDto } from "@/types/permissions";
import { useParams } from "next/navigation";
import { cn } from "@/utils/cn";
import TrashIcon from "@/components/icons/TrashIcon";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import Link from "next/link";
import { ADMIN, ORGANIGRAM_TRANSLATE } from "@/consts";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Panel
      title={"Systeemrechten"}
      containerClassName={"flex items-stretch max-h-[calc(100vh-230px)]"}
    >
      <Groups />
      <div className="flex-grow">{children}</div>
    </Panel>
  );
};

export default Layout;

const Groups: FC = (props) => {
  const { open: newGroupModal } = useModal(NewGroupModal);
  return (
    <section className="flex flex-col overflow-auto gap-4 xl:w-1/4 p-4 border-r-1 border-stroke dark:border-strokedark">
      <Button
        onClick={newGroupModal}
        buttonType={"Outline"}
        className="border border-meta-3 rounded-lg border-dashed flex items-center justify-center gap-4 p-4 text-meta-3 hover:bg-meta-3 hover:text-white dark:border-strokedark dark:text-white dark:hover:bg-meta-3 dark:hover:text-white"
      >
        <PlusIcon />
        <div>Nieuwe groep</div>
      </Button>
      <GroupsList />
    </section>
  );
};

const GroupsList: FC = (props) => {
  const { data: groups, isLoading } = useGroups();

  if (isLoading) {
    return <Loader />;
  }
  if (!groups) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
};

const GroupItem: FC<{ group: GroupDetailsResDto }> = ({ group }) => {
  const params = useParams();
  const selected = params.groupId === group.id.toString();
  const { open: confirmDeleteModal } = useModal(
    getDangerActionConfirmationModal({
      title: "Verwijder groep",
      msg: "Weet je zeker dat je deze groep wilt verwijderen?",
    })
  );
  const { mutate: deleteGroup } = useDeleteGroup(group.id);
  return (
    <Link
      href={`/permissions/${group.id}`}
      className={cn(
        "flex flex-col gap-1 border border-stroke p-4 rounded-lg dark:border-strokedark",
        {
          "bg-meta-3 text-white": selected,
        },
        "min-w-[280px]"
      )}
    >
      <div className="text-xl font-bold flex items-center justify-between">
        <div>{ORGANIGRAM_TRANSLATE[group.name] ?? group.name}</div>
        {group.name !== ADMIN && (
          <button
            onClick={() => {
              confirmDeleteModal({
                onConfirm: () => {
                  deleteGroup();
                },
              });
            }}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      <div>
        Heeft toegang tot{" "}
        <span className="bg-meta-8 text-white w-7 h-7 leading-7 rounded-full text-center inline-block">
          {group.permissions.length}
        </span>{" "}
        rechten
      </div>
    </Link>
  );
};

const NewGroupModal: FC<ModalProps> = ({ additionalProps, ...props }) => {
  const { mutate: createGroup, isLoading: isCreating } = useCreateGroup();

  return (
    <FormModal {...props} title={"Nieuwe groep"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target["name"].value;
          createGroup({ name, permissions: [] });
          props.onClose();
        }}
      >
        <InputField
          required={true}
          label={"Naam"}
          name={"name"}
          placeholder={"Naam"}
        />

        <div className="flex gap-4 mt-6 justify-center">
          <Button buttonType={"Outline"} onClick={props.onClose}>
            Annuleren
          </Button>
          <Button isLoading={isCreating} disabled={isCreating} type={"submit"}>
            Opslaan
          </Button>
        </div>
      </form>
    </FormModal>
  );
};
