"use client";

import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/components/icons/HeartIcon";
import InvoiceIcon from "@/components/icons/InvoiceIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import IndividualIcons from "@/components/icons/IndividualIcons";
import GridsIcon from "@/components/icons/GridsIcon";
import DocumentIcon from "@/components/svg/DocumentIcon";
import GoalIcon from "@/components/svg/GoalIcon";
import ReportIcon from "@/components/svg/ReportIcon";
import EducationIcon from "@/components/svg/EducationIcon";
import CertifIcon from "@/components/svg/CertifIcon";
import ExperienceIcon from "@/components/svg/ExperienceIcon";
import RoleIcon from "@/components/svg/RoleIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import clsx from "clsx";
import ArrowRight from "@/components/icons/ArrowRight";
import BuildingIcon from "@/components/icons/BuildingIcon";
import ChatBubblesIcon from "@/components/icons/ChatBubblesIcon";
import ClientSidebarBriefing from "../ClientSidebarBriefing";
import { cn } from "@/utils/cn";
import ChevronDown from "@/components/icons/ChevronDown";
import { Permission } from "@/types/permissions";
import { SecureFragment, useMyPermissions } from "@/components/SecureWrapper";
import * as consts from "@/consts";
import BellAlertIcon from "../svg/BellAlertIcon";
import ClipBoardDocsIcon from "@/components/icons/ClipBoardDocsIcon";
import styles from "./styles.module.scss";
import SmileyFace from "@/components/icons/SmileyFace";
import GearIcon from "@/components/icons/GearIcon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const Sidebar = useMemo(() => {
    if (pathname.startsWith("/clients/") && !pathname.startsWith("/clients/new")) {
      return <ClientMenu />;
    } else if (pathname.startsWith("/employees/") && !pathname.startsWith("/employees/new")) {
      return <EmployeeMenu />;
    } else {
      return <GlobalMenu />;
    }
  }, [pathname]);

  const classNames = useMemo(() => {
    if (pathname.startsWith("/clients/") && !pathname.startsWith("/clients/new")) {
      return styles.clientBg;
    } else if (pathname.startsWith("/employees/") && !pathname.startsWith("/employees/new")) {
      return styles.employeeBg;
    } else {
      return "bg-c_black dark:bg-boxdark";
    }
  }, [pathname]);

  return (
    <aside
      ref={sidebar}
      className={cn(
        `absolute left-0 top-0 z-99 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`,
        classNames
      )}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="px-4 flex items-center">
          <Image width={56} height={56} src={"/images/logo/logo.png"} alt="Logo" />
          <p className="pl-2 text-[24px] text-white">
            MAI<span className="font-bold">Care</span>
          </p>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      {Sidebar}
    </aside>
  );
};

export default Sidebar;

type SidebarDropdownProps = {
  isDropdown: true;
  completeHref?: undefined;
  id: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  getIsActive?: undefined;
  subItems: SidebarLinkProps[];
  permission?: Permission;
};

type SidebarLinkProps =
  | {
      isDropdown?: false;
      completeHref: string;
      children: React.ReactNode;
      icon: React.ReactNode;
      getIsActive?: (pathname: string, completeHref: string) => boolean;
      permission?: Permission;
    }
  | SidebarDropdownProps;

const SidebarLink: FunctionComponent<SidebarLinkProps> = ({
  completeHref,
  children,
  icon,
  getIsActive,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={completeHref}
      className={clsx(
        "group relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out",
        {
          [styles.active]: getIsActive
            ? getIsActive(pathname, completeHref)
            : pathname.startsWith(completeHref),
        },
        styles.element
      )}
    >
      {icon}
      {children}
    </Link>
  );
};

const SidebarDropdown: FunctionComponent<SidebarDropdownProps> = ({
  completeHref,
  getIsActive,
  icon,
  children,
  subItems,
}) => {
  const pathname = usePathname();
  const inferOpen = useMemo(() => {
    return subItems.some((item) => {
      if (item.getIsActive) {
        return item.getIsActive(pathname, completeHref);
      } else {
        return pathname.startsWith(item.completeHref);
      }
    });
  }, [subItems, pathname]);
  const [isOpen, setIsOpen] = useState(inferOpen);

  return (
    <>
      <button
        className={clsx(
          "group relative w-full flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4",
          {
            [styles.active]: inferOpen,
          }
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {icon}
        {children}
        <ChevronDown
          className={cn("ml-auto text-white", {
            "transform rotate-180": isOpen,
          })}
        />
      </button>
      {isOpen && (
        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
          {subItems.map((item) => (
            <li key={item.completeHref}>
              <Link
                href={item.completeHref}
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white",
                  {
                    "text-white":
                      item.getIsActive?.(pathname, item.completeHref) ??
                      pathname.startsWith(item.completeHref),
                  }
                )}
              >
                {item.children}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

type SidebarMenuProps = {
  items: SidebarLinkProps[];
  title: string | React.ReactNode;
};

const SidebarMenu: FunctionComponent<SidebarMenuProps> = ({ items, title }) => {
  return (
    <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      {/* <!-- Sidebar Menu --> */}
      <nav className="px-4 py-4 mt-5 lg:mt-9 lg:px-6">
        {/* <!-- Menu Group --> */}
        <div>
          <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">{title}</h3>

          <ul className="mb-6 flex flex-col gap-1.5">
            {/* <!-- Menu Item Dashboard --> */}
            {items.map((item) => (
              <SecureFragment
                permission={item.permission}
                key={"id" in item ? item.id : item.completeHref}
              >
                <li>
                  {item.isDropdown ? (
                    <SidebarDropdown {...item}>{item.children}</SidebarDropdown>
                  ) : (
                    <SidebarLink {...item}>{item.children}</SidebarLink>
                  )}
                </li>
              </SecureFragment>
            ))}
          </ul>
        </div>
      </nav>
      {/* <!-- Sidebar Menu --> */}
    </div>
  );
};

const GlobalMenu: FunctionComponent = () => {
  const { hasPerm } = useMyPermissions();
  return (
    <SidebarMenu
      items={[
        {
          completeHref: "/dashboard",
          icon: <GridsIcon />,
          children: "Dashboard",
          permission: consts.DASHBOARD_VIEW,
        },
        {
          completeHref: "/clients",
          icon: <IndividualIcons width={18} height={18} />,
          children: "Cliënten",
          permission: consts.CLIENT_VIEW,
        },
        {
          completeHref: "/employees",
          icon: <GroupIcon width={18} height={18} />,
          children: "Medewerkers",
          permission: consts.EMPLOYEE_VIEW,
        },
        {
          isDropdown: true,
          id: "finance",
          icon: <InvoiceIcon className={"w-4.5 h-5"} />,
          children: "Financiën",
          permission: consts.FINANCE_VIEW,
          subItems: [
            {
              completeHref: "/invoices",
              icon: <InvoiceIcon className={"w-4.5 h-5"} />,
              children: "Facturen",
              permission: consts.FINANCE_VIEW,
            },
            {
              completeHref: "/expenses",
              icon: <InvoiceIcon className={"w-4.5 h-5"} />,
              children: "Uitgaven",
              permission: consts.FINANCE_VIEW,
            },
          ],
        },
        {
          isDropdown: true,
          id: "care-coordination",
          icon: <HeartIcon width={18} height={18} />,
          children: "Zorgcoördinatie",
          permission: consts.CARE_COORDINATION_VIEW,
          subItems: [
            hasPerm(consts.CONTACTS_VIEW) && {
              completeHref: "/contacts",
              icon: <BuildingIcon className={"w-4.5 h-5"} />,
              children: "Opdrachtgevers",
              permission: consts.CONTACTS_VIEW,
            },
            hasPerm(consts.CONTRACTS_VIEW) && {
              completeHref: "/contracts",
              icon: <InvoiceIcon className={"w-4.5 h-5"} />,
              children: "Contracten",
              permission: consts.CONTRACTS_VIEW,
            },
            // hasPerm(consts.CARE_PLANS_VIEW) && {
            //   completeHref: "/care-plans",
            //   icon: <HeartIcon width={18} height={18} />,
            //   children: "Zorgplannen",
            //   permission: consts.CARE_PLANS_VIEW,
            // },
            hasPerm(consts.INCIDENT_OVERVIEW_VIEW) && {
              completeHref: "/incident-overview",
              icon: <></>,
              children: "Incidenten overzicht",
              permission: consts.INCIDENT_OVERVIEW_VIEW,
            },
          ].filter(Boolean) as SidebarLinkProps[],
        },
        {
          completeHref: "/locations",
          icon: <BuildingIcon className={"w-4.5 h-5"} />,
          children: "Locaties",
          permission: consts.LOCATION_VIEW,
        },
        {
          completeHref: "/tasks",
          icon: <CalendarIcon />,
          children: "Planning & Taken",
          permission: consts.TASKS_VIEW,
        },
        {
          completeHref: "/conversations",
          icon: <ChatBubblesIcon className={"w-4.5 h-4.5"} />,
          children: "Conversaties",
          permission: consts.CONVERSATION_VIEW,
        },
        {
          isDropdown: true,
          id: "settings",
          icon: <GearIcon className="w-4.5 h-4.5" />,
          children: "Instellingen",
          permission: consts.SETTINGS_VIEW,
          subItems: [
            hasPerm(consts.PERMISSIONS_EDIT) && {
              completeHref: "/permissions",
              icon: <RoleIcon width={18} height={18} />,
              children: "Permissies",
              permission: consts.PERMISSIONS_EDIT,
            },
            hasPerm(consts.ACTIVITY_LOGS_VIEW) && {
              completeHref: "/activity_logs",
              icon: <></>,
              children: "Activiteitenlogs",
              permission: consts.ACTIVITY_LOGS_VIEW,
            },
          ].filter(Boolean) as SidebarLinkProps[],
        },
      ]}
      title={"MENU"}
    />
  );
};

const ClientMenu: FunctionComponent = () => {
  const { clientId } = useParams();

  return (
    <>
      <ClientSidebarBriefing clientId={parseInt(clientId as string)} />
      <SidebarMenu
        items={[
          {
            completeHref: `/clients/${clientId}`,
            icon: <IndividualIcons width={18} height={18} />,
            children: "Overzicht",
            permission: consts.CLIENT_VIEW,
            getIsActive: (pathname) => {
              return pathname === `/clients/${clientId}`;
            },
          },
          {
            completeHref: `/clients/${clientId}/medical-record`,
            icon: <HeartIcon width={18} height={18} />,
            children: "Medisch Dossier",
            permission: consts.CLIENT_VIEW,
            getIsActive: (pathname) => {
              return (
                pathname.startsWith(`/clients/${clientId}/medical-record`) ||
                pathname.startsWith(`/clients/${clientId}/diagnosis`) ||
                pathname.startsWith(`/clients/${clientId}/medications`) ||
                pathname.startsWith(`/clients/${clientId}/allergies`) ||
                pathname.startsWith(`/clients/${clientId}/episodes`)
              );
            },
          },
          {
            completeHref: `/clients/${clientId}/incidents`,
            icon: <BellAlertIcon height={18} width={18} />,
            children: "Incidents",
            permission: consts.CLIENT_VIEW,
          },
          {
            completeHref: `/clients/${clientId}/client-network`,
            icon: <GroupIcon width={18} height={18} />,
            children: "Cliëntennetwerk",
            permission: consts.CONTACT_VIEW,
            getIsActive: (pathname) => {
              return (
                pathname.startsWith(`/clients/${clientId}/client-network`) ||
                pathname.startsWith(`/clients/${clientId}/emergency`) ||
                pathname.startsWith(`/clients/${clientId}/involved-employees`)
              );
            },
          },
          {
            completeHref: `/clients/${clientId}/contracts`,
            icon: <InvoiceIcon width={18} height={18} />,
            children: "Contracten",
            permission: consts.CONTRACT_VIEW,
          },
          {
            completeHref: `/clients/${clientId}/reports`,
            icon: <ReportIcon height={18} width={18} />,
            children: "Rapporten",
            permission: consts.CLIENT_VIEW,
          },
          {
            completeHref: `/clients/${clientId}/document`,
            icon: <DocumentIcon height={18} width={18} />,
            children: "Documenten",
            permission: consts.CLIENT_VIEW,
          },
          // {
          //   completeHref: `/clients/${clientId}/care-plans`,
          //   icon: <ClipBoardDocsIcon className={"w-4.5 h-4.5"} />,
          //   children: "Zorgplannen",
          //   permission: consts.CARE_PLANS_VIEW,
          // },
          // {
          //   completeHref: `/clients/${clientId}/goals`,
          //   icon: <GoalIcon height={18} width={18} />,
          //   children: "Doelen",
          //   permission: consts.CLIENT_VIEW,
          // },
          {
            completeHref: `/clients/${clientId}/questionnaire`,
            icon: <DocumentIcon className={"w-4.5 h-4.5"} />,
            children: "Vragenlijsten",
            permission: consts.CLIENT_VIEW,
          },
          {
            completeHref: `/clients/${clientId}/physical_emotional_states`,
            icon: <SmileyFace className={"w-4.5 h-4.5"} />,
            children: "Fysieke & Emotionele",
            permission: consts.CLIENT_VIEW,
          },
        ]}
        title={
          <Link href={"/clients"} className="flex items-center">
            <ArrowRight className="rotate-180" />
            <span className="ml-2">TERUG NAAR CLIËNTENLIJST</span>
            {/* BACK TO CLIENTS LIST */}
          </Link>
        }
      />
    </>
  );
};

const EmployeeMenu: FunctionComponent = () => {
  const { employeeId } = useParams();
  return (
    <SidebarMenu
      items={[
        {
          completeHref: `/employees/${employeeId}`,
          icon: <IndividualIcons width={18} height={18} />,
          children: "Overzicht",
          permission: consts.EMPLOYEE_VIEW,
          getIsActive: (pathname) => {
            return pathname === `/employees/${employeeId}`;
          },
        },
        {
          completeHref: `/employees/${employeeId}/certificates`,
          icon: <CertifIcon width={18} height={18} />,
          children: "Certificaten",
          permission: consts.EMPLOYEE_VIEW,
          getIsActive: (pathname) => {
            return pathname.startsWith(`/employees/${employeeId}/certificates`);
          },
        },
        {
          completeHref: `/employees/${employeeId}/educations`,
          icon: <EducationIcon width={18} height={18} />,
          children: "Opleidingen",
          permission: consts.EMPLOYEE_VIEW,
          getIsActive: (pathname) => {
            return pathname.startsWith(`/employees/${employeeId}/educations`);
          },
        },
        {
          completeHref: `/employees/${employeeId}/experiences`,
          icon: <ExperienceIcon width={18} height={18} />,
          children: "Ervaringen",
          permission: consts.EMPLOYEE_VIEW,
          getIsActive: (pathname) => {
            return pathname.startsWith(`/employees/${employeeId}/experiences`);
          },
        },
        {
          completeHref: `/employees/${employeeId}/teams`,
          icon: <RoleIcon width={18} height={18} />,
          children: "Rollen",
          permission: consts.EMPLOYEE_PERMISSIONS_VIEW,
          getIsActive: (pathname) => {
            return pathname.startsWith(`/employees/${employeeId}/teams`);
          },
        },
      ]}
      title={
        <Link href={"/employees"} className="flex items-center">
          <ArrowRight className="rotate-180" />
          <span className="ml-2">TERUG NAAR MEDEWERKERSLIJST</span>
          {/* BACK TO EMPLOYEES LIST */}
        </Link>
      }
    />
  );
};
