import {
  BrainCircuit,

  Building2,

  ClipboardCheck,

  FileSearch,

  FileBarChart,

  LayoutDashboard,

  Network,

  ScanSearch,

  Settings,

  ShieldCheck,

  Users,

  WalletCards,

} from "lucide-react";

import { NavLink } from "react-router-dom";

type NavigationItem = {

  label: string;

  path: string;

  icon: React.ElementType;

  badge?: string;

};

const operations: NavigationItem[] = [

  {

    label: "Overview",

    path: "/",

    icon: LayoutDashboard,

  },

  {

    label: "Workforce",

    path: "/workforce",

    icon: Users,

  },

  {

    label: "Assignments",

    path: "/assignments",

    icon: Network,

  },

  {

    label: "Attendance",

    path: "/attendance",

    icon: ClipboardCheck,

  },

  {

    label: "Payroll",

    path: "/payroll",

    icon: WalletCards,

  },

  {

    label: "Sites",

    path: "/sites",

    icon: Building2,

  },

];

const intelligence: NavigationItem[] = [

  {

    label: "Attendance AI",

    path: "/attendance-ai",

    icon: BrainCircuit,

    badge: "AI",

  },

  {

    label: "OCR Verification",

    path: "/ocr-verification",

    icon: ScanSearch,

  },

  {

    label: "Reports",

    path: "/reports",

    icon: FileBarChart,

  },

];

function SidebarLink({ item }: { item: NavigationItem }) {

  const Icon = item.icon;

  return (

    <NavLink

      to={item.path}

      end={item.path === "/"}

      className={({ isActive }) =>

        `sidebar-link ${isActive ? "active" : ""}`

      }

    >

      <Icon strokeWidth={1.8} />

      <span>{item.label}</span>

      {item.badge && <span className="nav-badge">{item.badge}</span>}

    </NavLink>

  );

}

function SidebarSection({

  title,

  items,

}: {

  title: string;

  items: NavigationItem[];

}) {

  return (

    <div className="sidebar-section">

      <div className="sidebar-section-title">{title}</div>

      <nav className="sidebar-nav">

        {items.map((item) => (

          <SidebarLink key={item.path} item={item} />

        ))}

      </nav>

    </div>

  );

}

export default function Sidebar() {

  return (

    <aside className="sidebar">

      {/* BRAND */}

      <div className="sidebar-brand">

        <div className="brand-mark">

          <ShieldCheck strokeWidth={2.1} />

        </div>

        <div className="brand-copy">

          <div className="brand-title">APEXIVE</div>

          <div className="brand-subtitle">Workforce AI</div>

        </div>

      </div>

      {/* OPERATIONS */}

      <SidebarSection

        title="Operations"

        items={operations}

      />

      {/* INTELLIGENCE */}

      <SidebarSection

        title="Intelligence"

        items={intelligence}

      />

      {/* SETTINGS */}

      <div className="sidebar-section">

        <div className="sidebar-section-title">

          System

        </div>

        <nav className="sidebar-nav">

          <SidebarLink

            item={{

              label: "Settings",

              path: "/settings",

              icon: Settings,

            }}

          />

          <SidebarLink

            item={{

              label: "Security",

              path: "/security",

              icon: FileSearch,

            }}

          />

        </nav>

      </div>

      {/* SYSTEM STATUS */}

      <div className="system-status">

        <div className="system-status-top">

          <span className="system-status-label">

            System Status

          </span>

          <span className="status-dot" />

        </div>

        <div className="system-status-value">

          All Systems Operational

        </div>

        <div className="system-status-meta">

          AI Engine · Database · API

        </div>

      </div>

    </aside>

  );

}