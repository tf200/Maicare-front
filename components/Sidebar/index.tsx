"use client";

import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/components/icons/HeartIcon";
import InvoiceIcon from "@/components/icons/InvoiceIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import IndividualIcons from "@/components/icons/IndividualIcons";
import GridsIcon from "@/components/icons/GridsIcon";
import DocumentIcon from "@/components/svg/DocumentIcon";
import ReportIcon from "@/components/svg/ReportIcon";
import EducationIcon from "@/components/svg/EducationIcon";
import CertifIcon from "@/components/svg/CertifIcon";
import ExperienceIcon from "@/components/svg/ExperienceIcon";
import RoleIcon from "@/components/svg/RoleIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import clsx from "clsx";
import ArrowRight from "@/components/icons/ArrowRight";
import BuildingIcon from "@/components/icons/BuildingIcon";

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
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
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
    if (
      pathname.startsWith("/clients/") &&
      !pathname.startsWith("/clients/new")
    ) {
      return <ClientMenu />;
    } else if (
      pathname.startsWith("/employees/") &&
      !pathname.startsWith("/employees/new")
    ) {
      return <EmployeeMenu />;
    } else {
      return <GlobalMenu />;
    }
  }, [pathname]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="flex items-center">
          <Image
            width={56}
            height={56}
            src={"/images/logo/logo.ico"}
            alt="Logo"
          />
          <p className="px-4 text-[24px] text-white">
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

type SidebarLinkProps = {
  completeHref: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  getIsActive?: (pathname: string, completeHref: string) => boolean;
};

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
        "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4",
        {
          "bg-graydark dark:bg-meta-4": getIsActive
            ? getIsActive(pathname, completeHref)
            : pathname.startsWith(completeHref),
        }
      )}
    >
      {icon}
      {children}
    </Link>
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
          <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
            {title}
          </h3>

          <ul className="mb-6 flex flex-col gap-1.5">
            {/* <!-- Menu Item Dashboard --> */}
            {items.map((item) => (
              <li key={item.completeHref}>
                <SidebarLink {...item}>{item.children}</SidebarLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* <!-- Sidebar Menu --> */}
    </div>
  );
};

const GlobalMenu: FunctionComponent = () => {
  return (
    <SidebarMenu
      items={[
        {
          completeHref: "/dashboard/crm",
          icon: <GridsIcon />,
          children: "Dashboard",
        },
        {
          completeHref: "/clients",
          icon: <IndividualIcons width={18} height={18} />,
          children: "Cliënten",
        },
        {
          completeHref: "/employees",
          icon: <GroupIcon width={18} height={18} />,
          children: "Medewerkers",
        },
        {
          completeHref: "/contacts",
          icon: <BuildingIcon className={"w-4.5 h-5"} />,
          children: "Opdrachtgevers",
        },
        {
          completeHref: "/contracts",
          icon: <InvoiceIcon height={19} width={18} />,
          children: "Contracten",
        },
        {
          completeHref: "/care",
          icon: <HeartIcon width={18} height={18} />,
          children: "Zorgcoördinatie",
        },
        {
          completeHref: "/tasks",
          icon: <CalendarIcon />,
          children: "Planning & Taken",
        },
      ]}
      title={"MENU"}
    />
  );
};

const ClientMenu: FunctionComponent = () => {
  const { clientId } = useParams();
  return (
    <SidebarMenu
      items={[
        {
          completeHref: `/clients/${clientId}`,
          icon: <IndividualIcons width={18} height={18} />,
          children: "Overzicht",
          getIsActive: (pathname) => {
            return pathname === `/clients/${clientId}`;
          },
        },
        {
          completeHref: `/clients/${clientId}/medical-record`,
          icon: <HeartIcon width={18} height={18} />,
          children: "Medisch Dossier",
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
          completeHref: `/clients/${clientId}/client-network`,
          icon: <GroupIcon width={18} height={18} />,
          children: "Cliëntennetwerk",
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
          icon: <InvoiceIcon height={18} width={18} />,
          children: "Contracten",
        },
        {
          completeHref: `/clients/${clientId}/reports`,
          icon: <ReportIcon height={18} width={18} />,
          children: "Rapporten",
        },
        {
          completeHref: `/clients/${clientId}/document`,
          icon: <DocumentIcon height={18} width={18} />,
          children: "Documenten",
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
          getIsActive: (pathname) => {
            return pathname === `/employees/${employeeId}`;
          },
        },
        {
          completeHref: `/employees/${employeeId}/certificates`,
          icon: <CertifIcon width={18} height={18} />,
          children: "Certificaten",
          getIsActive: (pathname) => {
            return pathname.startsWith(`/employees/${employeeId}/certificates`);
          },
        },
        {
          completeHref: `/employees/${employeeId}/educations`,
          icon: <EducationIcon width={18} height={18} />,
          children: "Opleidingen",
          getIsActive: (pathname) => {
            return pathname.startsWith(`/employees/${employeeId}/educations`);
          },
        },
        {
          completeHref: `/employees/${employeeId}/experiences`,
          icon: <ExperienceIcon width={18} height={18} />,
          children: "Ervaringen",
          getIsActive: (pathname) => {
            return pathname.startsWith(`/employees/${employeeId}/experiences`);
          },
        },
        {
          completeHref: `/employees/${employeeId}/teams`,
          icon: <RoleIcon width={18} height={18} />,
          children: "Rollen",
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
