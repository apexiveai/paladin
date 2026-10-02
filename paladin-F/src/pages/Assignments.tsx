import {

  ArrowRight,

  Building2,

  CheckCircle2,

  ChevronDown,

  ClipboardList,

  Clock3,

  MapPin,

  MoreHorizontal,

  Network,

  Search,

  ShieldCheck,

  Users,

} from "lucide-react";

import { useMemo, useState } from "react";

type AssignmentStatus =

  | "ACTIVE"

  | "PENDING"

  | "COMPLETED";

type Assignment = {

  id: string;

  code: string;

  worker: string;

  workerCode: string;

  site: string;

  location: string;

  position: string;

  shift: string;

  startTime: string;

  endTime: string;

  status: AssignmentStatus;

  workers: number;

};

const assignments: Assignment[] = [

  {

    id: "1",

    code: "ASN-0001",

    worker: "Aung Min",

    workerCode: "SEC-0001",

    site: "Head Office",

    location: "Yangon",

    position: "Main Gate",

    shift: "Day Shift",

    startTime: "06:00",

    endTime: "18:00",

    status: "ACTIVE",

    workers: 24,

  },

  {

    id: "2",

    code: "ASN-0002",

    worker: "Kyaw Zin",

    workerCode: "SEC-0002",

    site: "Industrial Zone",

    location: "Hlaing Tharyar",

    position: "Gate A",

    shift: "Night Shift",

    startTime: "18:00",

    endTime: "06:00",

    status: "ACTIVE",

    workers: 42,

  },

  {

    id: "3",

    code: "ASN-0003",

    worker: "Min Thu",

    workerCode: "SEC-0003",

    site: "Commercial Center",

    location: "Downtown",

    position: "Control Room",

    shift: "Day Shift",

    startTime: "06:00",

    endTime: "18:00",

    status: "ACTIVE",

    workers: 31,

  },

  {

    id: "4",

    code: "ASN-0004",

    worker: "Zaw Lin",

    workerCode: "SEC-0004",

    site: "Logistics Hub",

    location: "Dagon Seikkan",

    position: "Warehouse",

    shift: "Night Shift",

    startTime: "18:00",

    endTime: "06:00",

    status: "PENDING",

    workers: 28,

  },

  {

    id: "5",

    code: "ASN-0005",

    worker: "Htet Naing",

    workerCode: "SEC-0005",

    site: "Residential Complex",

    location: "Yankin",

    position: "Building A",

    shift: "Day Shift",

    startTime: "06:00",

    endTime: "18:00",

    status: "ACTIVE",

    workers: 36,

  },

  {

    id: "6",

    code: "ASN-0006",

    worker: "Ko Ko",

    workerCode: "SEC-0006",

    site: "Head Office",

    location: "Yangon",

    position: "Parking Area",

    shift: "Day Shift",

    startTime: "06:00",

    endTime: "18:00",

    status: "ACTIVE",

    workers: 18,

  },

  {

    id: "7",

    code: "ASN-0007",

    worker: "Thura Aung",

    workerCode: "SEC-0007",

    site: "Industrial Zone",

    location: "Hlaing Tharyar",

    position: "Gate B",

    shift: "Night Shift",

    startTime: "18:00",

    endTime: "06:00",

    status: "ACTIVE",

    workers: 39,

  },

  {

    id: "8",

    code: "ASN-0008",

    worker: "Ye Min",

    workerCode: "SEC-0008",

    site: "Commercial Center",

    location: "Downtown",

    position: "Lobby",

    shift: "Day Shift",

    startTime: "06:00",

    endTime: "18:00",

    status: "COMPLETED",

    workers: 21,

  },

];

function AssignmentStatusBadge({

  status,

}: {

  status: AssignmentStatus;

}) {

  const label =

    status === "ACTIVE"

      ? "Active"

      : status === "PENDING"

        ? "Pending"

        : "Completed";

  return (

    <span

      className={`assignment-status ${status.toLowerCase()}`}

    >

      <span className="assignment-status-dot" />

      {label}

    </span>

  );

}

function AssignmentCard({

  assignment,

}: {

  assignment: Assignment;

}) {

  return (

    <div className="assignment-card">

      <div className="assignment-card-top">

        <div className="assignment-code">

          <div className="assignment-icon">

            <Network size={17} />

          </div>

          <div>

            <strong>{assignment.code}</strong>

            <span>{assignment.position}</span>

          </div>

        </div>

        <AssignmentStatusBadge status={assignment.status} />

        <button

          type="button"

          className="assignment-more"
aria-label="Assignment actions"

        >

          <MoreHorizontal size={18} />

        </button>

      </div>

      <div className="assignment-flow">

        <div className="assignment-entity">

          <div className="assignment-entity-icon worker">

            <Users size={17} />

          </div>

          <div>

            <span>WORKER</span>

            <strong>{assignment.worker}</strong>

            <small>{assignment.workerCode}</small>

          </div>

        </div>

        <div className="assignment-flow-line">

          <ArrowRight size={17} />

        </div>

        <div className="assignment-entity">

          <div className="assignment-entity-icon site">

            <Building2 size={17} />

          </div>

          <div>

            <span>SITE</span>

            <strong>{assignment.site}</strong>

            <small>{assignment.location}</small>

          </div>

        </div>

      </div>

      <div className="assignment-details">

        <div>

          <span>Shift</span>

          <strong>{assignment.shift}</strong>

        </div>

        <div>

          <span>Schedule</span>

          <strong>

            {assignment.startTime} — {assignment.endTime}

          </strong>

        </div>

        <div>

          <span>Workforce</span>

          <strong>{assignment.workers} guards</strong>

        </div>

      </div>

      <div className="assignment-card-footer">

        <div className="assignment-location">

          <MapPin size={14} />

          {assignment.location}

        </div>

        <button type="button" className="assignment-view">

          View assignment

          <ArrowRight size={14} />

        </button>

      </div>

    </div>

  );

}

export default function Assignments() {

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<

    "ALL" | AssignmentStatus

  >("ALL");

  const filteredAssignments = useMemo(() => {

    const query = search.toLowerCase().trim();

    return assignments.filter((assignment) => {

      const matchesSearch =

        !query ||

        assignment.code.toLowerCase().includes(query) ||

        assignment.worker.toLowerCase().includes(query) ||

        assignment.workerCode.toLowerCase().includes(query) ||

        assignment.site.toLowerCase().includes(query) ||

        assignment.position.toLowerCase().includes(query);

      const matchesStatus =

        status === "ALL" || assignment.status === status;

      return matchesSearch && matchesStatus;

    });

  }, [search, status]);

  const active = assignments.filter(

    (item) => item.status === "ACTIVE",

  ).length;

  const pending = assignments.filter(

    (item) => item.status === "PENDING",

  ).length;

  const completed = assignments.filter(

    (item) => item.status === "COMPLETED",

  ).length;

  return (

    <main className="page assignments-page">

      <div className="page-header">

        <div>

          <div className="page-eyebrow">

            <Network size={14} />

            OPERATIONS MANAGEMENT

          </div>

          <h1>Assignments</h1>

          <p>

            Connect workforce personnel with client sites,

            positions and operational shifts.

          </p>

        </div>

        <button type="button" className="primary-action">

          <ClipboardList size={17} />

          New Assignment

        </button>

      </div>

      <div className="assignment-stat-grid">

        <div className="assignment-stat-card">

          <div className="assignment-stat-icon">

            <Network size={20} />

          </div>

          <div>

            <span>Total Assignments</span>

            <strong>1,204</strong>

          </div>

          <small>Current workforce allocation</small>

        </div>

        <div className="assignment-stat-card">

          <div className="assignment-stat-icon success">

            <CheckCircle2 size={20} />

          </div>

          <div>

            <span>Active</span>
<strong>{active + 1_196}</strong>

          </div>

          <small>Currently deployed</small>

        </div>

        <div className="assignment-stat-card">

          <div className="assignment-stat-icon warning">

            <Clock3 size={20} />

          </div>

          <div>

            <span>Pending</span>

            <strong>{pending + 6}</strong>

          </div>

          <small>Awaiting activation</small>

        </div>

        <div className="assignment-stat-card">

          <div className="assignment-stat-icon">

            <ShieldCheck size={20} />

          </div>

          <div>

            <span>Completed</span>

            <strong>{completed + 2}</strong>

          </div>

          <small>Recently closed</small>

        </div>

      </div>

      <section className="card assignments-board">

        <div className="assignments-toolbar">

          <div>

            <div className="card-eyebrow">

              <Network size={14} />

              Workforce Allocation

            </div>

            <h2>Assignment Network</h2>

            <p>

              {filteredAssignments.length} assignments displayed

            </p>

          </div>

          <div className="assignments-toolbar-actions">

            <div className="assignment-search">

              <Search size={17} />

              <input

                type="text"

                placeholder="Search assignments..."

                value={search}

                onChange={(event) =>

                  setSearch(event.target.value)

                }

              />

            </div>

            <div className="assignment-filter">

              <ChevronDown size={15} />

              <select

                value={status}

                onChange={(event) =>

                  setStatus(

                    event.target.value as

                      | "ALL"

                      | AssignmentStatus,

                  )

                }

              >

                <option value="ALL">All Status</option>

                <option value="ACTIVE">Active</option>

                <option value="PENDING">Pending</option>

                <option value="COMPLETED">Completed</option>

              </select>

            </div>

          </div>

        </div>

        <div className="assignment-grid">

          {filteredAssignments.map((assignment) => (

            <AssignmentCard

              key={assignment.id}

              assignment={assignment}

            />

          ))}

        </div>

        {filteredAssignments.length === 0 && (

          <div className="empty-state">

            <Network size={30} />

            <strong>No assignments found</strong>

            <span>

              Try another worker, site or assignment code.

            </span>

          </div>

        )}

      </section>

    </main>

  );

}