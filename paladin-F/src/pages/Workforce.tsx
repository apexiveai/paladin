import {

  ArrowUpRight,

  BriefcaseBusiness,

  ChevronDown,

  Eye,

  Filter,

  MoreHorizontal,

  Search,

  ShieldCheck,

  UserPlus,
  Building2,
  Users,

} from "lucide-react";

import { useMemo, useState } from "react";

type WorkerStatus = "ACTIVE" | "ON_LEAVE" | "INACTIVE";

type Worker = {

  id: string;

  code: string;

  name: string;

  phone: string;

  role: string;

  site: string;

  assignment: string;

  status: WorkerStatus;

  attendance: number;

};

const workers: Worker[] = [

  {

    id: "1",

    code: "SEC-0001",

    name: "Aung Min",

    phone: "09 781 234 501",

    role: "Security Guard",

    site: "Head Office",

    assignment: "Main Gate",

    status: "ACTIVE",

    attendance: 98,

  },

  {

    id: "2",

    code: "SEC-0002",

    name: "Kyaw Zin",

    phone: "09 782 341 602",

    role: "Security Guard",

    site: "Industrial Zone",

    assignment: "Gate A",

    status: "ACTIVE",

    attendance: 96,

  },

  {

    id: "3",

    code: "SEC-0003",

    name: "Min Thu",

    phone: "09 783 452 703",

    role: "Senior Guard",

    site: "Commercial Center",

    assignment: "Control Room",

    status: "ACTIVE",

    attendance: 99,

  },

  {

    id: "4",

    code: "SEC-0004",

    name: "Zaw Lin",

    phone: "09 784 563 804",

    role: "Security Guard",

    site: "Logistics Hub",

    assignment: "Warehouse",

    status: "ON_LEAVE",

    attendance: 94,

  },

  {

    id: "5",

    code: "SEC-0005",

    name: "Htet Naing",

    phone: "09 785 674 905",

    role: "Security Guard",

    site: "Residential Complex",

    assignment: "Building A",

    status: "ACTIVE",

    attendance: 97,

  },

  {

    id: "6",

    code: "SEC-0006",

    name: "Ko Ko",

    phone: "09 786 785 106",

    role: "Security Guard",

    site: "Head Office",

    assignment: "Parking Area",

    status: "ACTIVE",

    attendance: 95,

  },

  {

    id: "7",

    code: "SEC-0007",

    name: "Thura Aung",

    phone: "09 787 896 207",

    role: "Senior Guard",

    site: "Industrial Zone",

    assignment: "Gate B",

    status: "ACTIVE",

    attendance: 99,

  },

  {

    id: "8",

    code: "SEC-0008",

    name: "Ye Min",

    phone: "09 788 907 308",

    role: "Security Guard",

    site: "Commercial Center",

    assignment: "Lobby",

    status: "INACTIVE",

    attendance: 88,

  },

  {

    id: "9",

    code: "SEC-0009",

    name: "Nay Lin",

    phone: "09 789 018 409",

    role: "Security Guard",

    site: "Logistics Hub",

    assignment: "Loading Bay",

    status: "ACTIVE",

    attendance: 97,

  },

  {

    id: "10",

    code: "SEC-0010",

    name: "Win Htet",

    phone: "09 790 129 510",

    role: "Team Leader",

    site: "Residential Complex",

    assignment: "Security Office",

    status: "ACTIVE",

    attendance: 100,

  },

];

function StatusBadge({ status }: { status: WorkerStatus }) {

  const label =

    status === "ON_LEAVE"

      ? "On Leave"

      : status === "INACTIVE"

        ? "Inactive"

        : "Active";

  return (

    <span className={`worker-status ${status.toLowerCase()}`}>

      <span className="worker-status-dot" />

      {label}

    </span>

  );

}

function WorkerAvatar({ name }: { name: string }) {

  const initials = name

    .split(" ")

    .map((part) => part[0])

    .join("")

    .slice(0, 2)

    .toUpperCase();

  return (

    <div className="worker-avatar">

      {initials}

    </div>

  );

}

function WorkerDrawer({

  worker,

  onClose,

}: {

  worker: Worker;

  onClose: () => void;

}) {

  return (

    <div className="worker-drawer-overlay" onClick={onClose}>

      <aside

        className="worker-drawer"

        onClick={(event) => event.stopPropagation()}

      >

        <div className="worker-drawer-header">

          <div>

            <div className="drawer-eyebrow">

              WORKER PROFILE

            </div>

            <h2>{worker.code}</h2>

          </div>

          <button

            type="button"

            className="drawer-close"

            onClick={onClose}
aria-label="Close"

          >

            ×

          </button>

        </div>

        <div className="drawer-profile">

          <WorkerAvatar name={worker.name} />

          <div>

            <h3>{worker.name}</h3>

            <p>{worker.role}</p>

          </div>

        </div>

        <StatusBadge status={worker.status} />

        <div className="drawer-section">

          <div className="drawer-section-title">

            Assignment

          </div>

          <div className="drawer-info-grid">

            <div>

              <span>Site</span>

              <strong>{worker.site}</strong>

            </div>

            <div>

              <span>Position</span>

              <strong>{worker.assignment}</strong>

            </div>

          </div>

        </div>

        <div className="drawer-section">

          <div className="drawer-section-title">

            Contact

          </div>

          <div className="drawer-info-row">

            <span>Phone</span>

            <strong>{worker.phone}</strong>

          </div>

        </div>

        <div className="drawer-section">

          <div className="drawer-section-title">

            Attendance

          </div>

          <div className="drawer-attendance">

            <div className="drawer-attendance-value">

              {worker.attendance}%

            </div>

            <div className="drawer-progress">

              <div

                style={{

                  width: `${worker.attendance}%`,

                }}

              />

            </div>

            <span>Monthly attendance rate</span>

          </div>

        </div>

        <div className="drawer-actions">

          <button type="button" className="secondary-action">

            <Eye size={16} />

            View Attendance

          </button>

          <button type="button" className="primary-action">

            <ArrowUpRight size={16} />

            Open Worker

          </button>

        </div>

      </aside>

    </div>

  );

}

export default function Workforce() {

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<

    "ALL" | WorkerStatus

  >("ALL");

  const [selectedWorker, setSelectedWorker] =

    useState<Worker | null>(null);

  const filteredWorkers = useMemo(() => {

    const query = search.toLowerCase().trim();

    return workers.filter((worker) => {

      const matchesSearch =

        !query ||

        worker.name.toLowerCase().includes(query) ||

        worker.code.toLowerCase().includes(query) ||

        worker.site.toLowerCase().includes(query) ||

        worker.assignment.toLowerCase().includes(query);

      const matchesStatus =

        statusFilter === "ALL" ||

        worker.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [search, statusFilter]);

  const activeCount = workers.filter(

    (worker) => worker.status === "ACTIVE",

  ).length;

  const leaveCount = workers.filter(

    (worker) => worker.status === "ON_LEAVE",

  ).length;

  return (

    <main className="page workforce-page">

      <div className="page-header">

        <div>

          <div className="page-eyebrow">

            <Users size={14} />

            WORKFORCE MANAGEMENT

          </div>

          <h1>Workforce</h1>

          <p>

            Manage security personnel, assignments and

            operational workforce status.

          </p>

        </div>

        <button type="button" className="primary-action">

          <UserPlus size={17} />

          Add Worker

        </button>

      </div>

      <div className="workforce-stat-grid">

        <div className="workforce-stat-card">

          <div className="workforce-stat-icon">

            <Users size={20} />

          </div>

          <div>

            <span>Total Workforce</span>

            <strong>1,248</strong>

          </div>

          <small>Registered workers</small>

        </div>

        <div className="workforce-stat-card">
<div className="workforce-stat-icon success">

            <ShieldCheck size={20} />

          </div>

          <div>

            <span>Active</span>

            <strong>{activeCount + 1238}</strong>

          </div>

          <small>Currently operational</small>

        </div>

        <div className="workforce-stat-card">

          <div className="workforce-stat-icon warning">

            <BriefcaseBusiness size={20} />

          </div>

          <div>

            <span>On Leave</span>

            <strong>{leaveCount + 9}</strong>

          </div>

          <small>Temporary unavailable</small>

        </div>

        <div className="workforce-stat-card">

          <div className="workforce-stat-icon">

            <Building2 size={20} />

          </div>

          <div>

            <span>Assigned Sites</span>

            <strong>12</strong>

          </div>

          <small>Active client locations</small>

        </div>

      </div>

      <section className="card workforce-table-card">

        <div className="workforce-toolbar">

          <div>

            <div className="card-eyebrow">

              <ShieldCheck size={14} />

              Personnel Registry

            </div>

            <h2>Worker Directory</h2>

            <p>

              {filteredWorkers.length} workers displayed

            </p>

          </div>

          <div className="workforce-toolbar-actions">

            <div className="worker-search">

              <Search size={17} />

              <input

                type="text"

                placeholder="Search workers..."

                value={search}

                onChange={(event) =>

                  setSearch(event.target.value)

                }

              />

            </div>

            <div className="filter-wrapper">

              <Filter size={16} />

              <select

                value={statusFilter}

                onChange={(event) =>

                  setStatusFilter(

                    event.target.value as

                      | "ALL"

                      | WorkerStatus,

                  )

                }

              >

                <option value="ALL">All Status</option>

                <option value="ACTIVE">Active</option>

                <option value="ON_LEAVE">On Leave</option>

                <option value="INACTIVE">Inactive</option>

              </select>

              <ChevronDown size={15} />

            </div>

          </div>

        </div>

        <div className="workforce-table-wrap">

          <table className="workforce-table">

            <thead>

              <tr>

                <th>Worker</th>

                <th>Role</th>

                <th>Site</th>

                <th>Assignment</th>

                <th>Status</th>

                <th>Attendance</th>

                <th />

              </tr>

            </thead>

            <tbody>

              {filteredWorkers.map((worker) => (

                <tr key={worker.id}>

                  <td>

                    <div className="worker-identity">

                      <WorkerAvatar name={worker.name} />

                      <div>

                        <strong>{worker.name}</strong>

                        <span>{worker.code}</span>

                      </div>

                    </div>

                  </td>

                  <td>

                    <span className="worker-role">

                      {worker.role}

                    </span>

                  </td>

                  <td>

                    <div className="worker-site">

                      <Building2 size={15} />

                      {worker.site}

                    </div>

                  </td>

                  <td>

                    <span className="worker-assignment">

                      {worker.assignment}

                    </span>

                  </td>

                  <td>

                    <StatusBadge status={worker.status} />

                  </td>
<td>

                    <div className="table-attendance">

                      <strong>{worker.attendance}%</strong>

                      <div className="table-progress">

                        <div

                          style={{

                            width: `${worker.attendance}%`,

                          }}

                        />

                      </div>

                    </div>

                  </td>

                  <td>

                    <button

                      type="button"

                      className="table-more"

                      onClick={() =>

                        setSelectedWorker(worker)

                      }

                      aria-label={`Open ${worker.name}`}

                    >

                      <MoreHorizontal size={18} />

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredWorkers.length === 0 && (

            <div className="empty-state">

              <Search size={28} />

              <strong>No workers found</strong>

              <span>

                Try another worker name, code or site.

              </span>

            </div>

          )}

        </div>

        <div className="workforce-pagination">

          <span>

            Showing {filteredWorkers.length} of 1,248 workers

          </span>

          <div className="pagination-actions">

            <button type="button" disabled>

              Previous

            </button>

            <button type="button" className="active">

              1

            </button>

            <button type="button">2</button>

            <button type="button">3</button>

            <button type="button">Next</button>

          </div>

        </div>

      </section>

      {selectedWorker && (

        <WorkerDrawer

          worker={selectedWorker}

          onClose={() => setSelectedWorker(null)}

        />

      )}

    </main>

  );

}