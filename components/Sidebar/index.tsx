"use client";

import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/components/icons/HeartIcon";
import InvoiceIcon from "@/components/icons/InvoiceIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import IndividualIcons from "@/components/icons/IndividualIcons";
import GridsIcon from "@/components/icons/GridsIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import clsx from "clsx";
import ArrowRight from "@/components/icons/ArrowRight";

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
      {pathname.startsWith("/clients/") ? <ClientMenu /> : <GlobalMenu />}
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
          children: "Clients",
        },
        {
          completeHref: "/employee",
          icon: <GroupIcon width={18} height={18} />,
          children: "Employee",
        },
        {
          completeHref: "/finance",
          icon: <InvoiceIcon height={19} width={18} />,
          children: "Finance",
        },
        {
          completeHref: "/care",
          icon: <HeartIcon width={18} height={18} />,
          children: "Care Coordination",
        },
        {
          completeHref: "/tasks",
          icon: <CalendarIcon />,
          children: "Planning & Tasks",
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
          children: "Overview",
          getIsActive: (pathname) => {
            return pathname === `/clients/${clientId}`;
          },
        },
        {
          completeHref: `/clients/${clientId}/medical-record`,
          icon: <HeartIcon width={18} height={18} />,
          children: "Medical Record",
          getIsActive: (pathname) => {
            return (
              pathname.startsWith(`/clients/${clientId}/medical-record`) ||
              pathname.startsWith(`/clients/${clientId}/diagnosis`) ||
              pathname.startsWith(`/clients/${clientId}/medications`) ||
              pathname.startsWith(`/clients/${clientId}/allergies`)
            );
          },
        },
        {
          completeHref: `/clients/${clientId}/client-network`,
          icon: <GroupIcon width={18} height={18} />,
          children: "Client Network",
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
          children: "Contracts",
        },
        {
          completeHref: `/clients/${clientId}/reports`,
          icon: <GridsIcon height={18} width={18} />,
          children: "Reports",
        },
        {
          completeHref: `/clients/${clientId}/document`,
          icon: <GridsIcon height={18} width={18} />,
          children: "Documents",
        },
      ]}
      title={
        <Link href={"/clients"} className="flex items-center">
          <ArrowRight className="rotate-180" />
          <span className="ml-2">BACK TO CLIENTS LIST</span>
        </Link>
      }
    />
  );
};
