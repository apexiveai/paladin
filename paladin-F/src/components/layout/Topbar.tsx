import {

  Bell,

  ChevronRight,

  Search,

  ShieldCheck,

} from "lucide-react";

import { useLocation } from "react-router-dom";

import BackendStatus from "../ui/BackendStatus";

const routeNames: Record<string, string> = {

  "/": "Overview",

  "/workforce": "Workforce",

  "/assignments": "Assignments",

  "/attendance": "Attendance",

  "/payroll": "Payroll",

  "/sites": "Sites",

  "/attendance-ai": "Attendance AI",

  "/ocr-verification": "OCR Verification",

  "/reports": "Reports",

  "/settings": "Settings",

  "/security": "Security",

};

function formatRouteName(pathname: string) {

  if (routeNames[pathname]) {

    return routeNames[pathname];

  }

  const lastPart = pathname

    .split("/")

    .filter(Boolean)

    .pop();

  if (!lastPart) {

    return "Overview";

  }

  return lastPart

    .split("-")

    .map(

      (word) =>

        word.charAt(0).toUpperCase() + word.slice(1),

    )

    .join(" ");

}

export default function Topbar() {

  const location = useLocation();

  const currentPage = formatRouteName(location.pathname);

  return (

    <header className="topbar">

      <div className="topbar-left">

        <div className="topbar-breadcrumb">

          <span className="breadcrumb-muted">APEXIVE</span>

          <ChevronRight

            size={15}

            strokeWidth={1.8}

            className="breadcrumb-arrow"

          />

          <span className="breadcrumb-current">

            {currentPage}

          </span>

        </div>

      </div>

      <div className="topbar-right">

        <BackendStatus />

        <button

          type="button"

          className="icon-button"

          aria-label="Search"

        >

          <Search size={18} strokeWidth={1.8} />

        </button>

        <button

          type="button"

          className="icon-button notification-button"

          aria-label="Notifications"

        >

          <Bell size={18} strokeWidth={1.8} />

          <span className="notification-dot" />

        </button>

        <div className="topbar-divider" />

        <div className="user-profile">

          <div className="user-avatar">

            <ShieldCheck

              size={18}

              strokeWidth={1.9}

            />

          </div>

          <div className="user-info">

            <div className="user-name">

              Administrator

            </div>

            <div className="user-role">

              System Admin

            </div>

          </div>

        </div>

      </div>

    </header>

  );

}