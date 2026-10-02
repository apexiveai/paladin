import {

  ArrowDownRight,

  ArrowUpRight,

  Calculator,

  CheckCircle2,

  ChevronDown,

  Download,

  FileText,

  Search,

  Sparkles,

  WalletCards,

} from "lucide-react";

import { useMemo, useState } from "react";

type PayrollStatus =

  | "APPROVED"

  | "PENDING"

  | "EXCEPTION";

type PayrollWorker = {

  id: string;

  code: string;

  name: string;

  site: string;

  monthlySalary: number;

  payableDays: number;

  absentDays: number;

  halfDays: number;

  allowance: number;

  deduction: number;

  status: PayrollStatus;

};

const payrollWorkers: PayrollWorker[] = [

  {

    id: "1",

    code: "SEC-0001",

    name: "Aung Min",

    site: "Head Office",

    monthlySalary: 420000,

    payableDays: 28,

    absentDays: 0,

    halfDays: 1,

    allowance: 30000,

    deduction: 0,

    status: "APPROVED",

  },

  {

    id: "2",

    code: "SEC-0002",

    name: "Kyaw Zin",

    site: "Industrial Zone",

    monthlySalary: 400000,

    payableDays: 26.5,

    absentDays: 2,

    halfDays: 1,

    allowance: 25000,

    deduction: 26667,

    status: "APPROVED",

  },

  {

    id: "3",

    code: "SEC-0003",

    name: "Min Thu",

    site: "Commercial Center",

    monthlySalary: 450000,

    payableDays: 27,

    absentDays: 0,

    halfDays: 0,

    allowance: 35000,

    deduction: 0,

    status: "APPROVED",

  },

  {

    id: "4",

    code: "SEC-0004",

    name: "Zaw Lin",

    site: "Logistics Hub",

    monthlySalary: 400000,

    payableDays: 25.5,

    absentDays: 2,

    halfDays: 1,

    allowance: 20000,

    deduction: 60000,

    status: "EXCEPTION",

  },

  {

    id: "5",

    code: "SEC-0005",

    name: "Htet Naing",

    site: "Residential Complex",

    monthlySalary: 420000,

    payableDays: 28,

    absentDays: 0,

    halfDays: 0,

    allowance: 30000,

    deduction: 0,

    status: "APPROVED",

  },

  {

    id: "6",

    code: "SEC-0006",

    name: "Ko Ko",

    site: "Head Office",

    monthlySalary: 400000,

    payableDays: 26.5,

    absentDays: 1,

    halfDays: 1,

    allowance: 20000,

    deduction: 26667,

    status: "PENDING",

  },

  {

    id: "7",

    code: "SEC-0007",

    name: "Thura Aung",

    site: "Industrial Zone",

    monthlySalary: 450000,

    payableDays: 28,

    absentDays: 0,

    halfDays: 0,

    allowance: 35000,

    deduction: 0,

    status: "APPROVED",

  },

  {

    id: "8",

    code: "SEC-0008",

    name: "Ye Min",

    site: "Commercial Center",

    monthlySalary: 400000,

    payableDays: 25,

    absentDays: 3,

    halfDays: 1,

    allowance: 15000,

    deduction: 40000,

    status: "EXCEPTION",

  },

];

function formatMoney(value: number) {

  return `${Math.round(value).toLocaleString()} MMK`;

}

function calculatePayableSalary(worker: PayrollWorker) {

  const dailyRate = worker.monthlySalary / 30;

  return dailyRate * worker.payableDays;

}

function calculateNetPay(worker: PayrollWorker) {

  return (

    calculatePayableSalary(worker) +

    worker.allowance -

    worker.deduction

  );

}

function PayrollStatusBadge({

  status,

}: {

  status: PayrollStatus;

}) {

  const label =

    status === "APPROVED"

      ? "Approved"

      : status === "PENDING"

        ? "Pending"

        : "Exception";

  return (

    <span

      className={`payroll-status ${status.toLowerCase()}`}

    >

      <span />

      {label}

    </span>

  );

}

export default function Payroll() {

  const [search, setSearch] = useState("");

  const [site, setSite] = useState("All Sites");

  const [status, setStatus] = useState<

    "ALL" | PayrollStatus

  >("ALL");

  const filteredWorkers = useMemo(() => {

    const query = search.toLowerCase().trim();

    return payrollWorkers.filter((worker) => {

      const matchesSearch =

        !query ||

        worker.name.toLowerCase().includes(query) ||

        worker.code.toLowerCase().includes(query) ||

        worker.site.toLowerCase().includes(query);

      const matchesSite =

        site === "All Sites" || worker.site === site;
const matchesStatus =

        status === "ALL" || worker.status === status;

      return (

        matchesSearch &&

        matchesSite &&

        matchesStatus

      );

    });

  }, [search, site, status]);

  const totalGross = payrollWorkers.reduce(

    (sum, worker) =>

      sum + calculatePayableSalary(worker),

    0,

  );

  const totalAllowance = payrollWorkers.reduce(

    (sum, worker) => sum + worker.allowance,

    0,

  );

  const totalDeduction = payrollWorkers.reduce(

    (sum, worker) => sum + worker.deduction,

    0,

  );

  const totalNet = payrollWorkers.reduce(

    (sum, worker) => sum + calculateNetPay(worker),

    0,

  );

  const approved = payrollWorkers.filter(

    (worker) => worker.status === "APPROVED",

  ).length;

  const pending = payrollWorkers.filter(

    (worker) => worker.status === "PENDING",

  ).length;

  const exceptions = payrollWorkers.filter(

    (worker) => worker.status === "EXCEPTION",

  ).length;

  return (

    <main className="page payroll-page">

      <div className="page-header">

        <div>

          <div className="page-eyebrow">

            <WalletCards size={14} />

            PAYROLL INTELLIGENCE

          </div>

          <h1>Payroll Control Center</h1>

          <p>

            Calculate workforce payroll from verified

            attendance, allowances and deductions.

          </p>

        </div>

        <div className="payroll-header-actions">

          <button

            type="button"

            className="secondary-action"

          >

            <Download size={16} />

            Export Payroll

          </button>

          <button

            type="button"

            className="primary-action"

          >

            <Calculator size={16} />

            Run Calculation

          </button>

        </div>

      </div>

      <div className="payroll-period-bar">

        <div className="payroll-period-main">

          <div className="payroll-period-icon">

            <WalletCards size={19} />

          </div>

          <div>

            <span>PAYROLL PERIOD</span>

            <strong>October 2026</strong>

          </div>

        </div>

        <div className="payroll-period-controls">

          <div className="payroll-select">

            <select defaultValue="October 2026">

              <option>October 2026</option>

              <option>September 2026</option>

              <option>August 2026</option>

            </select>

            <ChevronDown size={14} />

          </div>

          <div className="payroll-processing">

            <span />

            Calculation ready

          </div>

        </div>

      </div>

      <div className="payroll-stat-grid">

        <div className="payroll-stat-card">

          <div className="payroll-stat-top">

            <div className="payroll-stat-icon">

              <WalletCards size={19} />

            </div>

            <ArrowUpRight size={16} />

          </div>

          <span>Total Gross Pay</span>

          <strong>{formatMoney(totalGross)}</strong>

          <small>Based on payable days</small>

        </div>

        <div className="payroll-stat-card">

          <div className="payroll-stat-top">

            <div className="payroll-stat-icon success">

              <ArrowUpRight size={19} />

            </div>

            <ArrowUpRight size={16} />

          </div>

          <span>Allowances</span>

          <strong>{formatMoney(totalAllowance)}</strong>

          <small>Additional workforce benefits</small>

        </div>

        <div className="payroll-stat-card">

          <div className="payroll-stat-top">

            <div className="payroll-stat-icon danger">

              <ArrowDownRight size={19} />

            </div>

            <ArrowDownRight size={16} />

          </div>

          <span>Deductions</span>

          <strong>{formatMoney(totalDeduction)}</strong>

          <small>Attendance and payroll deductions</small>

        </div>
<div className="payroll-stat-card featured">

          <div className="payroll-stat-top">

            <div className="payroll-stat-icon ai">

              <Sparkles size={19} />

            </div>

            <CheckCircle2 size={16} />

          </div>

          <span>Net Payroll</span>

          <strong>{formatMoney(totalNet)}</strong>

          <small>Projected final payout</small>

        </div>

      </div>

      <div className="payroll-processing-grid">

        <section className="card payroll-status-card">

          <div className="card-header">

            <div>

              <div className="card-eyebrow">

                <FileText size={14} />

                PROCESSING STATUS

              </div>

              <h2>Payroll Progress</h2>

              <p>

                Workforce payroll verification status.

              </p>

            </div>

            <div className="payroll-percent">

              82%

            </div>

          </div>

          <div className="payroll-main-progress">

            <div style={{ width: "82%" }} />

          </div>

          <div className="payroll-progress-stats">

            <div>

              <span className="approved-dot" />

              <div>

                <strong>{approved + 1_016}</strong>

                <span>Approved</span>

              </div>

            </div>

            <div>

              <span className="pending-dot" />

              <div>

                <strong>{pending + 158}</strong>

                <span>Pending</span>

              </div>

            </div>

            <div>

              <span className="exception-dot" />

              <div>

                <strong>{exceptions + 42}</strong>

                <span>Exceptions</span>

              </div>

            </div>

          </div>

        </section>

        <section className="card payroll-calculation-card">

          <div className="card-eyebrow">

            <Sparkles size={14} />

            AI PAYROLL ENGINE

          </div>

          <h2>Calculation Logic</h2>

          <div className="calculation-flow">

            <div>

              <span>Monthly Salary</span>

              <strong>÷ 30</strong>

            </div>

            <ArrowRightIcon />

            <div>

              <span>Daily Rate</span>

              <strong>× Payable Days</strong>

            </div>

            <ArrowRightIcon />

            <div>

              <span>Gross Pay</span>

              <strong>+ Allowance</strong>

            </div>

            <ArrowRightIcon />

            <div>

              <span>Net Pay</span>

              <strong>− Deductions</strong>

            </div>

          </div>

        </section>

      </div>

      <section className="card payroll-table-card">

        <div className="payroll-toolbar">

          <div>

            <div className="card-eyebrow">

              <FileText size={14} />

              PAYROLL REGISTER

            </div>

            <h2>Worker Payroll</h2>

            <p>

              {filteredWorkers.length} records displayed

            </p>

          </div>

          <div className="payroll-toolbar-actions">

            <div className="payroll-search">

              <Search size={16} />

              <input

                type="text"

                placeholder="Search worker..."

                value={search}

                onChange={(event) =>

                  setSearch(event.target.value)

                }

              />

            </div>

            <div className="payroll-filter">

              <select

                value={site}

                onChange={(event) =>

                  setSite(event.target.value)

                }

              >

                <option>All Sites</option>

                <option>Head Office</option>

                <option>Industrial Zone</option>

                <option>Commercial Center</option>

                <option>Logistics Hub</option>
<option>Residential Complex</option>

              </select>

              <ChevronDown size={14} />

            </div>

            <div className="payroll-filter">

              <select

                value={status}

                onChange={(event) =>

                  setStatus(

                    event.target.value as

                      | "ALL"

                      | PayrollStatus,

                  )

                }

              >

                <option value="ALL">All Status</option>

                <option value="APPROVED">Approved</option>

                <option value="PENDING">Pending</option>

                <option value="EXCEPTION">

                  Exception

                </option>

              </select>

              <ChevronDown size={14} />

            </div>

          </div>

        </div>

        <div className="payroll-table-wrap">

          <table className="payroll-table">

            <thead>

              <tr>

                <th>Worker</th>

                <th>Site</th>

                <th>Monthly Salary</th>

                <th>Payable Days</th>

                <th>Deduction</th>

                <th>Allowance</th>

                <th>Net Pay</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredWorkers.map((worker) => {

                const netPay = calculateNetPay(worker);

                return (

                  <tr key={worker.id}>

                    <td>

                      <div className="payroll-worker">

                        <div className="payroll-worker-avatar">

                          {worker.name

                            .split(" ")

                            .map((part) => part[0])

                            .join("")

                            .slice(0, 2)}

                        </div>

                        <div>

                          <strong>{worker.name}</strong>

                          <span>{worker.code}</span>

                        </div>

                      </div>

                    </td>

                    <td>

                      <span className="payroll-site">

                        {worker.site}

                      </span>

                    </td>

                    <td>

                      <strong className="money-cell">

                        {formatMoney(

                          worker.monthlySalary,

                        )}

                      </strong>

                    </td>

                    <td>

                      <div className="payable-days-cell">

                        <strong>

                          {worker.payableDays}

                        </strong>

                        <span>

                          {worker.absentDays} absent

                          {worker.halfDays > 0

                            ?  `· ${worker.halfDays} half`

                            : ""}

                        </span>

                      </div>

                    </td>

                    <td>

                      <span className="deduction-cell">

                        {worker.deduction > 0

                          ? `−${formatMoney(

                              worker.deduction,

                            )}`

                          : "—"}

                      </span>

                    </td>

                    <td>

                      <span className="allowance-cell">

                        {worker.allowance > 0

                          ? `+${formatMoney(

                              worker.allowance,

                            )}`

                          : "—"}

                      </span>

                    </td>

                    <td>

                      <strong className="net-pay-cell">

                        {formatMoney(netPay)}

                      </strong>

                    </td>

                    <td>

                      <PayrollStatusBadge
status={worker.status}

                      />

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

          {filteredWorkers.length === 0 && (

            <div className="empty-state">

              <Search size={28} />

              <strong>No payroll records found</strong>

              <span>

                Try another worker, site or status.

              </span>

            </div>

          )}

        </div>

      </section>

    </main>

  );

}

function ArrowRightIcon() {

  return (

    <div className="calculation-arrow">

      →

    </div>

  );

}