import {

  Activity,

  ArrowUpRight,

  BrainCircuit,

  Building2,

  CheckCircle2,

  Clock3,

  DollarSign,

  Network,

  ShieldCheck,

  Sparkles,

  Users,

  WalletCards,

} from "lucide-react";

type Metric = {

  label: string;

  value: string;

  change: string;

  description: string;

  icon: React.ElementType;

  positive?: boolean;

};

const metrics: Metric[] = [

  {

    label: "Total Workforce",

    value: "1,248",

    change: "+4.8%",

    description: "vs previous month",

    icon: Users,

    positive: true,

  },

  {

    label: "Attendance Rate",

    value: "96.8%",

    change: "+1.9%",

    description: "monthly average",

    icon: CheckCircle2,

    positive: true,

  },

  {

    label: "Active Sites",

    value: "12",

    change: "+2",

    description: "operational locations",

    icon: Building2,

    positive: true,

  },

  {

    label: "Monthly Payroll",

    value: "384.2M",

    change: "+3.6%",

    description: "MMK projected",

    icon: WalletCards,

    positive: true,

  },

];

const sites = [

  {

    code: "HQ",

    name: "Head Office",

    workers: 184,

    attendance: 98.4,

    status: "Operational",

  },

  {

    code: "S01",

    name: "Industrial Zone",

    workers: 246,

    attendance: 97.1,

    status: "Operational",

  },

  {

    code: "S02",

    name: "Commercial Center",

    workers: 198,

    attendance: 96.5,

    status: "Operational",

  },

  {

    code: "S03",

    name: "Logistics Hub",

    workers: 221,

    attendance: 95.8,

    status: "Operational",

  },

  {

    code: "S04",

    name: "Residential Complex",

    workers: 173,

    attendance: 96.9,

    status: "Operational",

  },

];

const activities = [

  {

    icon: CheckCircle2,

    title: "Attendance batch verified",

    detail: "48 worker records approved",

    time: "2 min ago",

    type: "success",

  },

  {

    icon: BrainCircuit,

    title: "AI attendance analysis",

    detail: "17 records require review",

    time: "11 min ago",

    type: "ai",

  },

  {

    icon: WalletCards,

    title: "Payroll calculation completed",

    detail: "October payroll processed",

    time: "28 min ago",

    type: "payroll",

  },

  {

    icon: Network,

    title: "Assignment updated",

    detail: "12 workers reassigned",

    time: "42 min ago",

    type: "assignment",

  },

];

function MetricCard({ metric }: { metric: Metric }) {

  const Icon = metric.icon;

  return (

    <div className="metric-card">

      <div className="metric-card-top">

        <div className="metric-icon">

          <Icon size={20} strokeWidth={1.8} />

        </div>

        <div

          className={`metric-change ${

            metric.positive ? "positive" : "negative"

          }`}

        >

          <ArrowUpRight size={13} strokeWidth={2} />

          {metric.change}

        </div>

      </div>

      <div className="metric-label">{metric.label}</div>

      <div className="metric-value">{metric.value}</div>

      <div className="metric-description">

        {metric.description}

      </div>

    </div>

  );

}

function WorkforceOverview() {

  return (

    <section className="card workforce-overview">

      <div className="card-header">

        <div>

          <div className="card-eyebrow">

            <Activity size={14} />

            Workforce Network

          </div>

          <h2>Workforce Overview</h2>

          <p>Live operational distribution across active sites.</p>

        </div>

        <button type="button" className="card-action">

          View all

          <ArrowUpRight size={15} />

        </button>

      </div>

      <div className="workforce-visual">

        <div className="network-core">

          <div className="network-core-ring">

            <ShieldCheck size={30} strokeWidth={1.6} />

          </div>

          <div className="network-core-title">

            APEXIVE

          </div>

          <div className="network-core-subtitle">

            Workforce Core

          </div>

        </div>
<div className="network-orbit orbit-one" />

        <div className="network-orbit orbit-two" />

        <div className="network-node node-hq">

          <span>HQ</span>

          <strong>184</strong>

        </div>

        <div className="network-node node-s01">

          <span>S01</span>

          <strong>246</strong>

        </div>

        <div className="network-node node-s02">

          <span>S02</span>

          <strong>198</strong>

        </div>

        <div className="network-node node-s03">

          <span>S03</span>

          <strong>221</strong>

        </div>

        <div className="network-node node-s04">

          <span>S04</span>

          <strong>173</strong>

        </div>

        <div className="network-pulse pulse-one" />

        <div className="network-pulse pulse-two" />

        <div className="network-pulse pulse-three" />

      </div>

      <div className="site-mini-list">

        {sites.slice(0, 4).map((site) => (

          <div className="site-mini-row" key={site.code}>

            <div className="site-mini-main">

              <div className="site-code">{site.code}</div>

              <div>

                <div className="site-name">{site.name}</div>

                <div className="site-workers">

                  {site.workers} workers

                </div>

              </div>

            </div>

            <div className="site-attendance">

              <span>{site.attendance}%</span>

              <div className="mini-progress">

                <div

                  className="mini-progress-fill"

                  style={{ width: `${site.attendance}%` }}

                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

function AttendanceOverview() {

  const attendance = 96.8;

  return (

    <section className="card attendance-overview">

      <div className="card-header">

        <div>

          <div className="card-eyebrow">

            <CheckCircle2 size={14} />

            Attendance Intelligence

          </div>

          <h2>Daily Attendance</h2>

          <p>Current workforce attendance status.</p>

        </div>

        <div className="live-badge">

          <span />

          LIVE

        </div>

      </div>

      <div className="attendance-main">

        <div className="attendance-ring">

          <svg

            viewBox="0 0 160 160"

            className="attendance-ring-svg"

          >

            <circle

              cx="80"

              cy="80"

              r="64"

              className="attendance-ring-bg"

            />

            <circle

              cx="80"

              cy="80"

              r="64"

              className="attendance-ring-progress"

              style={{

                strokeDasharray: `${2 * Math.PI * 64}`,

                strokeDashoffset:

                  `${2 * Math.PI * 64 * (1 - attendance / 100)}`,

              }}

            />

          </svg>

          <div className="attendance-ring-content">

            <strong>{attendance}%</strong>

            <span>Present</span>

          </div>

        </div>

        <div className="attendance-stats">

          <div className="attendance-stat">

            <span className="attendance-stat-dot present" />

            <div>

              <strong>1,208</strong>

              <span>Present</span>

            </div>

          </div>

          <div className="attendance-stat">

            <span className="attendance-stat-dot absent" />

            <div>

              <strong>40</strong>

              <span>Absent</span>

            </div>

          </div>

          <div className="attendance-stat">

            <span className="attendance-stat-dot late" />

            <div>

              <strong>18</strong>

              <span>Late</span>

            </div>

          </div>

        </div>

      </div>

      <div className="attendance-footer">

        <div>

          <Clock3 size={15} />

          Last sync
</div>

        <strong>Just now</strong>

      </div>

    </section>

  );

}

function PayrollOverview() {

  return (

    <section className="card payroll-overview">

      <div className="card-header">

        <div>

          <div className="card-eyebrow">

            <DollarSign size={14} />

            Payroll Intelligence

          </div>

          <h2>October 2026 Payroll</h2>

          <p>Current monthly payroll processing state.</p>

        </div>

        <button type="button" className="card-action">

          Details

          <ArrowUpRight size={15} />

        </button>

      </div>

      <div className="payroll-total">

        <span>Total projected payroll</span>

        <strong>384.2M MMK</strong>

      </div>

      <div className="payroll-progress">

        <div

          className="payroll-progress-approved"

          style={{ width: "82%" }}

        />

        <div

          className="payroll-progress-pending"

          style={{ width: "14%" }}

        />

        <div

          className="payroll-progress-exception"

          style={{ width: "4%" }}

        />

      </div>

      <div className="payroll-legend">

        <div>

          <span className="legend-dot approved" />

          <span>Approved</span>

          <strong>82%</strong>

        </div>

        <div>

          <span className="legend-dot pending" />

          <span>Pending</span>

          <strong>14%</strong>

        </div>

        <div>

          <span className="legend-dot exception" />

          <span>Exception</span>

          <strong>4%</strong>

        </div>

      </div>

      <div className="payroll-summary">

        <div>

          <span>Processed workers</span>

          <strong>1,024</strong>

        </div>

        <div>

          <span>Awaiting verification</span>

          <strong>174</strong>

        </div>

        <div>

          <span>Exceptions</span>

          <strong>50</strong>

        </div>

      </div>

    </section>

  );

}

function ActivityFeed() {

  return (

    <section className="card activity-card">

      <div className="card-header">

        <div>

          <div className="card-eyebrow">

            <Activity size={14} />

            System Activity

          </div>

          <h2>Recent Activity</h2>

          <p>Latest workforce intelligence events.</p>

        </div>

        <div className="activity-status">

          <span />

          System online

        </div>

      </div>

      <div className="activity-list">

        {activities.map((activity, index) => {

          const Icon = activity.icon;

          return (

            <div

              className="activity-item"

              key={`${activity.title}-${index}`}

            >

              <div className={`activity-icon ${activity.type}`}>

                <Icon size={17} strokeWidth={1.8} />

              </div>

              <div className="activity-content">

                <strong>{activity.title}</strong>

                <span>{activity.detail}</span>

              </div>

              <time>{activity.time}</time>

            </div>

          );

        })}

      </div>

    </section>

  );

}

export default function Dashboard() {

  return (

    <main className="page dashboard-page">

      <div className="page-header">

        <div>

          <div className="page-eyebrow">

            <Sparkles size={14} />

            APEXIVE AI OPERATIONS

          </div>

          <h1>Workforce Command Center</h1>

          <p>

            Monitor workforce, attendance, assignments and payroll

            from a single operational intelligence layer.

          </p>

        </div>

        <button type="button" className="primary-action">

          <BrainCircuit size={17} strokeWidth={1.9} />

          Generate AI Report

        </button>

      </div>

      <div className="metric-grid">

        {metrics.map((metric) => (

          <MetricCard

            key={metric.label}

            metric={metric}

          />
))}

      </div>

      <div className="dashboard-grid">

        <WorkforceOverview />

        <AttendanceOverview />

        <PayrollOverview />

        <ActivityFeed />

      </div>

    </main>

  );

}