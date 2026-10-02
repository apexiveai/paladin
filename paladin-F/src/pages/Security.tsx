import {

  Activity,

  CheckCircle2,

  Clock3,

  Database,

  KeyRound,

  LockKeyhole,

  ShieldCheck,

  UserCheck,

  Users,

} from "lucide-react";

const auditLogs = [

  {

    action: "Attendance records reviewed",

    user: "Administrator",

    time: "2 min ago",

    type: "verification",

  },

  {

    action: "Workforce directory accessed",

    user: "Administrator",

    time: "18 min ago",

    type: "access",

  },

  {

    action: "OCR verification completed",

    user: "AI Engine",

    time: "34 min ago",

    type: "ai",

  },

  {

    action: "Payroll report generated",

    user: "Administrator",

    time: "1 hr ago",

    type: "report",

  },

];

const roles = [

  {

    name: "System Administrator",

    users: 2,

    permissions: "Full system access",

  },

  {

    name: "Operations Manager",

    users: 5,

    permissions: "Workforce · Sites · Attendance",

  },

  {

    name: "Payroll Manager",

    users: 3,

    permissions: "Payroll · Reports",

  },

  {

    name: "Verification Officer",

    users: 8,

    permissions: "OCR · Attendance",

  },

];

function SecurityStatus({

  label,

  value,

  icon: Icon,

}: {

  label: string;

  value: string;

  icon: typeof ShieldCheck;

}) {

  return (

    <div className="security-status-card">

      <div className="security-status-icon">

        <Icon size={19} />

      </div>

      <div>

        <span>{label}</span>

        <strong>{value}</strong>

      </div>

      <div className="security-status-dot" />

    </div>

  );

}

export default function Security() {

  return (

    <main className="page security-page">

      <div className="page-header">

        <div>

          <div className="eyebrow">

            <ShieldCheck size={14} />

            SECURITY & ACCESS

          </div>

          <h1>Security</h1>

          <p>

            Monitor system health, access roles, verification activity and

            administrative events.

          </p>

        </div>

        <div className="security-header-status">

          <span />

          Security Monitoring Active

        </div>

      </div>

      <section className="security-status-grid">

        <SecurityStatus

          label="API"

          value="Operational"

          icon={Activity}

        />

        <SecurityStatus

          label="Database"

          value="Operational"

          icon={Database}

        />

        <SecurityStatus

          label="AI Engine"

          value="Operational"

          icon={ShieldCheck}

        />

        <SecurityStatus

          label="Access Control"

          value="Protected"

          icon={LockKeyhole}

        />

      </section>

      <section className="security-grid">

        <div className="security-panel">

          <div className="security-panel-header">

            <div>

              <h2>Security Controls</h2>

              <p>Administrative protection layers.</p>

            </div>

            <LockKeyhole size={19} />

          </div>

          <div className="security-control">

            <div className="security-control-icon">

              <UserCheck size={18} />

            </div>

            <div>

              <strong>Administrator Verification</strong>

              <span>Required for privileged configuration actions.</span>

            </div>

            <span className="security-enabled">Enabled</span>

          </div>

          <div className="security-control">

            <div className="security-control-icon">

              <KeyRound size={18} />

            </div>

            <div>

              <strong>Protected API Access</strong>

              <span>API endpoints are intended to use authenticated access.</span>

            </div>

            <span className="security-enabled">Enabled</span>

          </div>

          <div className="security-control">

            <div className="security-control-icon">

              <Clock3 size={18} />

            </div>

            <div>
<strong>Session Monitoring</strong>

              <span>Administrative sessions are tracked in the audit layer.</span>

            </div>

            <span className="security-enabled">Enabled</span>

          </div>

        </div>

        <div className="security-panel">

          <div className="security-panel-header">

            <div>

              <h2>Access Roles</h2>

              <p>Current application role structure.</p>

            </div>

            <Users size={19} />

          </div>

          <div className="role-list">

            {roles.map((role) => (

              <div className="role-row" key={role.name}>

                <div className="role-avatar">

                  <Users size={17} />

                </div>

                <div className="role-copy">

                  <strong>{role.name}</strong>

                  <span>{role.permissions}</span>

                </div>

                <div className="role-users">

                  <strong>{role.users}</strong>

                  <span>users</span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <section className="security-panel audit-panel">

        <div className="security-panel-header">

          <div>

            <h2>Recent Audit Activity</h2>

            <p>Latest administrative and AI workflow events.</p>

          </div>

          <div className="audit-live">

            <span />

            LIVE

          </div>

        </div>

        <div className="audit-list">

          {auditLogs.map((log) => (

            <div className="audit-row" key={`${log.action}-${log.time}`}>

              <div className={`audit-icon ${log.type}`}>

                {log.type === "verification" && (

                  <CheckCircle2 size={17} />

                )}

                {log.type === "access" && <Users size={17} />}

                {log.type === "ai" && <ShieldCheck size={17} />}

                {log.type === "report" && <Activity size={17} />}

              </div>

              <div className="audit-copy">

                <strong>{log.action}</strong>

                <span>Performed by {log.user}</span>

              </div>

              <div className="audit-time">

                <Clock3 size={14} />

                {log.time}

              </div>

            </div>

          ))}

        </div>

      </section>

      <div className="security-notice">

        <ShieldCheck size={19} />

        <div>

          <strong>Security architecture</strong>

          <p>

            This page is currently a frontend monitoring shell. Real

            authentication, authorization, audit persistence and API security

            will be connected to the existing backend without recreating the

            existing database models.

          </p>

        </div>

      </div>

    </main>

  );

}