import { useMemo, useState } from "react";

import {

  Activity,

  Building2,

  ChevronRight,

  MapPin,

  Search,

  ShieldCheck,

  Users,

  X,

} from "lucide-react";

type SiteStatus = "ACTIVE" | "PAUSED" | "REVIEW";

type Site = {

  id: string;

  code: string;

  name: string;

  client: string;

  location: string;

  workers: number;

  attendance: number;

  shifts: number;

  status: SiteStatus;

  manager: string;

};

const sites: Site[] = [

  {

    id: "1",

    code: "SITE-001",

    name: "Central Business Tower",

    client: "Apex Corporate Group",

    location: "Yangon Downtown",

    workers: 96,

    attendance: 98.4,

    shifts: 3,

    status: "ACTIVE",

    manager: "Ko Min Zaw",

  },

  {

    id: "2",

    code: "SITE-002",

    name: "International Airport",

    client: "Airport Operations",

    location: "Mingaladon",

    workers: 142,

    attendance: 97.8,

    shifts: 3,

    status: "ACTIVE",

    manager: "Mg Htet Aung",

  },

  {

    id: "3",

    code: "SITE-003",

    name: "Industrial Security Zone",

    client: "Myanmar Industrial Group",

    location: "Hlaing Tharyar",

    workers: 184,

    attendance: 96.2,

    shifts: 3,

    status: "ACTIVE",

    manager: "U Than Win",

  },

  {

    id: "4",

    code: "SITE-004",

    name: "Premium Residential Complex",

    client: "Urban Living Myanmar",

    location: "Bahan",

    workers: 74,

    attendance: 99.1,

    shifts: 2,

    status: "ACTIVE",

    manager: "Ko Aung Kyaw",

  },

  {

    id: "5",

    code: "SITE-005",

    name: "Logistics Distribution Center",

    client: "Myanmar Logistics Co.",

    location: "South Dagon",

    workers: 126,

    attendance: 95.7,

    shifts: 3,

    status: "REVIEW",

    manager: "Ko Kyaw Zin",

  },

  {

    id: "6",

    code: "SITE-006",

    name: "Corporate Headquarters",

    client: "Global Holdings",

    location: "Mayangone",

    workers: 58,

    attendance: 99.4,

    shifts: 2,

    status: "ACTIVE",

    manager: "U Nay Lin",

  },

  {

    id: "7",

    code: "SITE-007",

    name: "Retail Security Network",

    client: "Metro Retail Group",

    location: "Sanchaung",

    workers: 212,

    attendance: 96.8,

    shifts: 3,

    status: "ACTIVE",

    manager: "Ko Hein Htet",

  },

  {

    id: "8",

    code: "SITE-008",

    name: "Construction Project Alpha",

    client: "Apex Construction",

    location: "Thanlyin",

    workers: 88,

    attendance: 94.9,

    shifts: 2,

    status: "REVIEW",

    manager: "Ko Ye Min",

  },

  {

    id: "9",

    code: "SITE-009",

    name: "Financial Services Center",

    client: "Myanmar Finance Group",

    location: "Pazundaung",

    workers: 63,

    attendance: 98.7,

    shifts: 2,

    status: "ACTIVE",

    manager: "U Zaw Lin",

  },

  {

    id: "10",

    code: "SITE-010",

    name: "Technology Park",

    client: "Digital Myanmar",

    location: "Hlaing",

    workers: 116,

    attendance: 97.2,

    shifts: 3,

    status: "ACTIVE",

    manager: "Ko Thura",

  },

  {

    id: "11",

    code: "SITE-011",

    name: "Warehouse Complex",

    client: "National Supply Network",

    location: "Dala",

    workers: 45,

    attendance: 93.8,

    shifts: 2,

    status: "PAUSED",

    manager: "Ko Myo Min",

  },

  {

    id: "12",

    code: "SITE-012",

    name: "Hotel & Hospitality Site",

    client: "Premium Hospitality",

    location: "Insein",

    workers: 0,

    attendance: 0,

    shifts: 2,

    status: "PAUSED",

    manager: "Unassigned",

  },

];

function statusLabel(status: SiteStatus) {

  if (status === "ACTIVE") return "Active";

  if (status === "PAUSED") return "Paused";

  return "Review";

}

function statusClass(status: SiteStatus) {

  if (status === "ACTIVE") return "site-status active";

  if (status === "PAUSED") return "site-status paused";

  return "site-status review";

}

export default function Sites() {

  const [query, setQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<"ALL" | SiteStatus>("ALL");
const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  const filteredSites = useMemo(() => {

    const normalized = query.trim().toLowerCase();

    return sites.filter((site) => {

      const matchesQuery =

        !normalized ||

        site.name.toLowerCase().includes(normalized) ||

        site.code.toLowerCase().includes(normalized) ||

        site.client.toLowerCase().includes(normalized) ||

        site.location.toLowerCase().includes(normalized);

      const matchesStatus =

        statusFilter === "ALL" || site.status === statusFilter;

      return matchesQuery && matchesStatus;

    });

  }, [query, statusFilter]);

  const activeSites = sites.filter((site) => site.status === "ACTIVE").length;

  const reviewSites = sites.filter((site) => site.status === "REVIEW").length;

  const deployedWorkers = sites.reduce(

    (total, site) => total + site.workers,

    0,

  );

  const attendanceValues = sites

    .filter((site) => site.workers > 0)

    .map((site) => site.attendance);

  const averageAttendance =

    attendanceValues.reduce((a, b) => a + b, 0) / attendanceValues.length;

  return (

    <main className="page sites-page">

      <section className="page-header">

        <div>

          <div className="eyebrow">

            <Building2 size={15} />

            SITE OPERATIONS

          </div>

          <h1>Sites Control Center</h1>

          <p>

            Manage client locations, workforce deployment, shifts and site

            attendance performance.

          </p>

        </div>

        <button type="button" className="primary-action">

          <Building2 size={17} />

          Add New Site

        </button>

      </section>

      <section className="sites-metrics">

        <div className="site-metric-card">

          <div className="site-metric-icon">

            <Building2 size={19} />

          </div>

          <div>

            <span>Total Sites</span>

            <strong>{sites.length}</strong>

            <small>Registered locations</small>

          </div>

        </div>

        <div className="site-metric-card">

          <div className="site-metric-icon success">

            <Activity size={19} />

          </div>

          <div>

            <span>Active Sites</span>

            <strong>{activeSites}</strong>

            <small>{reviewSites} require review</small>

          </div>

        </div>

        <div className="site-metric-card">

          <div className="site-metric-icon violet">

            <Users size={19} />

          </div>

          <div>

            <span>Deployed Workforce</span>

            <strong>{deployedWorkers.toLocaleString()}</strong>

            <small>Across all locations</small>

          </div>

        </div>

        <div className="site-metric-card">

          <div className="site-metric-icon gold">

            <ShieldCheck size={19} />

          </div>

          <div>

            <span>Attendance Coverage</span>

            <strong>{averageAttendance.toFixed(1)}%</strong>

            <small>Current site average</small>

          </div>

        </div>

      </section>

      <section className="sites-toolbar glass-card">

        <div className="sites-search">

          <Search size={18} />

          <input

            value={query}

            onChange={(event) => setQuery(event.target.value)}

            placeholder="Search site, client, location or code..."

          />

        </div>

        <div className="site-filters">

          {(["ALL", "ACTIVE", "REVIEW", "PAUSED"] as const).map((status) => (

            <button

              key={status}

              type="button"

              className={`site-filter ${

                statusFilter === status ? "active" : ""

              }`}

              onClick={() => setStatusFilter(status)}

            >

              {status === "ALL" ? "All Sites" : statusLabel(status)}

            </button>

          ))}

        </div>

      </section>

      <section className="sites-grid">
{filteredSites.map((site) => (

          <article className="site-card" key={site.id}>

            <div className="site-card-top">

              <div className="site-code">{site.code}</div>

              <span className={statusClass(site.status)}>

                <span />

                {statusLabel(site.status)}

              </span>

            </div>

            <div className="site-card-title">

              <h2>{site.name}</h2>

              <p>{site.client}</p>

            </div>

            <div className="site-location">

              <MapPin size={15} />

              <span>{site.location}</span>

            </div>

            <div className="site-card-stats">

              <div>

                <span>Workforce</span>

                <strong>{site.workers}</strong>

              </div>

              <div>

                <span>Shifts</span>

                <strong>{site.shifts}</strong>

              </div>

              <div>

                <span>Attendance</span>

                <strong>

                  {site.workers > 0 ? `${site.attendance}%` : "—"}

                </strong>

              </div>

            </div>

            <div className="site-attendance-bar">

              <div

                style={{

                  width:    `${Math.min(site.attendance, 100)}%`,

                }}

              />

            </div>

            <div className="site-card-footer">

              <div className="site-manager">

                <div className="site-manager-avatar">

                  {site.manager.charAt(0)}

                </div>

                <div>

                  <span>Site Manager</span>

                  <strong>{site.manager}</strong>

                </div>

              </div>

              <button

                type="button"

                className="site-view-button"

                onClick={() => setSelectedSite(site)}

              >

                View

                <ChevronRight size={15} />

              </button>

            </div>

          </article>

        ))}

      </section>

      {filteredSites.length === 0 && (

        <div className="empty-state glass-card">

          <Building2 size={34} />

          <h3>No sites found</h3>

          <p>Try another search term or change the status filter.</p>

        </div>

      )}

      {selectedSite && (

        <div

          className="site-drawer-overlay"

          onMouseDown={() => setSelectedSite(null)}

        >

          <aside

            className="site-drawer"

            onMouseDown={(event) => event.stopPropagation()}

          >

            <div className="site-drawer-header">

              <div>

                <span>{selectedSite.code}</span>

                <h2>{selectedSite.name}</h2>

              </div>

              <button

                type="button"

                className="icon-button"

                aria-label="Close"

                onClick={() => setSelectedSite(null)}

              >

                <X size={19} />

              </button>

            </div>

            <div className="site-drawer-status">

              <span className={statusClass(selectedSite.status)}>

                <span />

                {statusLabel(selectedSite.status)}

              </span>

            </div>

            <div className="site-detail-block">

              <span>Client</span>

              <strong>{selectedSite.client}</strong>

            </div>

            <div className="site-detail-block">

              <span>Location</span>

              <strong>{selectedSite.location}</strong>

            </div>

            <div className="site-detail-grid">

              <div>

                <span>Workers</span>

                <strong>{selectedSite.workers}</strong>

              </div>

              <div>

                <span>Shifts</span>

                <strong>{selectedSite.shifts}</strong>

              </div>

              <div>

                <span>Attendance</span>

                <strong>
{selectedSite.workers > 0

                    ? `${selectedSite.attendance}%`

                    : "—"}

                </strong>

              </div>

              <div>

                <span>Manager</span>

                <strong>{selectedSite.manager}</strong>

              </div>

            </div>

            <div className="site-drawer-section">

              <div className="drawer-section-heading">

                <span>Deployment Health</span>

                <strong>

                  {selectedSite.workers > 0

                    ? `${selectedSite.attendance}%`

                    : "No deployment"}

                </strong>

              </div>

              <div className="site-health-track">

                <div

                  style={{

                    width: `${Math.min(selectedSite.attendance, 100)}%`,

                  }}

                />

              </div>

            </div>

            <button type="button" className="primary-action drawer-action">

              <Users size={17} />

              View Assigned Workforce

            </button>

          </aside>

        </div>

      )}

    </main>

  );

}