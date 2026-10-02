import { useMemo, useState } from "react";

import {

  Activity,

  Sparkles,

  ArrowDownRight,

  ArrowUpRight,

  BarChart3,

  BrainCircuit,

  CalendarDays,

  CheckCircle2,

  ChevronDown,

  Clock3,

  Download,

  FileBarChart,

  ShieldCheck,

  TrendingUp,

  Users,

  WalletCards,

} from "lucide-react";

type ReportPeriod = "THIS_MONTH" | "LAST_MONTH" | "THIS_QUARTER";

type SiteReport = {

  site: string;

  workers: number;

  attendance: number;

  payroll: number;

  incidents: number;

};

const siteReports: SiteReport[] = [

  {

    site: "Central Business Tower",

    workers: 96,

    attendance: 98.4,

    payroll: 28_400_000,

    incidents: 1,

  },

  {

    site: "International Airport",

    workers: 142,

    attendance: 97.8,

    payroll: 41_800_000,

    incidents: 2,

  },

  {

    site: "Industrial Security Zone",

    workers: 184,

    attendance: 96.2,

    payroll: 53_600_000,

    incidents: 4,

  },

  {

    site: "Premium Residential Complex",

    workers: 74,

    attendance: 99.1,

    payroll: 21_700_000,

    incidents: 0,

  },

  {

    site: "Logistics Distribution Center",

    workers: 126,

    attendance: 95.7,

    payroll: 37_200_000,

    incidents: 5,

  },

  {

    site: "Technology Park",

    workers: 116,

    attendance: 97.2,

    payroll: 34_500_000,

    incidents: 2,

  },

];

const attendanceTrend = [

  { day: "01", value: 96.2 },

  { day: "05", value: 97.1 },

  { day: "10", value: 95.8 },

  { day: "15", value: 97.8 },

  { day: "20", value: 96.9 },

  { day: "25", value: 98.1 },

  { day: "31", value: 96.8 },

];

const payrollTrend = [

  { month: "May", value: 321 },

  { month: "Jun", value: 337 },

  { month: "Jul", value: 348 },

  { month: "Aug", value: 355 },

  { month: "Sep", value: 371 },

  { month: "Oct", value: 384 },

];

function formatMillions(value: number) {

  return `${(value / 1_000_000).toFixed(1)}M`;

}

export default function Reports() {

  const [period, setPeriod] = useState<ReportPeriod>("THIS_MONTH");

  const periodLabel = useMemo(() => {

    if (period === "LAST_MONTH") return "September 2026";

    if (period === "THIS_QUARTER") return "Q3 2026";

    return "October 2026";

  }, [period]);

  const maxPayroll = Math.max(...payrollTrend.map((item) => item.value));

  return (

    <main className="page reports-page">

      <section className="page-header">

        <div>

          <div className="eyebrow">

            <FileBarChart size={15} />

            BUSINESS INTELLIGENCE

          </div>

          <h1>Reports & Analytics</h1>

          <p>

            Workforce performance, attendance, payroll and operational

            intelligence in one reporting layer.

          </p>

        </div>

        <div className="reports-header-actions">

          <div className="report-period">

            <CalendarDays size={16} />

            <select

              value={period}

              onChange={(event) =>

                setPeriod(event.target.value as ReportPeriod)

              }

            >

              <option value="THIS_MONTH">This Month</option>

              <option value="LAST_MONTH">Last Month</option>

              <option value="THIS_QUARTER">This Quarter</option>

            </select>

            <ChevronDown size={14} />

          </div>

          <button type="button" className="primary-action">

            <Download size={17} />

            Export Report

          </button>

        </div>

      </section>

      <section className="report-summary-grid">

        <div className="report-summary-card">

          <div className="report-summary-icon">

            <Users size={19} />

          </div>

          <div className="report-summary-content">

            <span>Total Workforce</span>

            <strong>1,248</strong>

            <div className="report-change positive">

              <ArrowUpRight size={13} />

              3.8%

              <span>vs previous period</span>
</div>

          </div>

        </div>

        <div className="report-summary-card">

          <div className="report-summary-icon success">

            <CheckCircle2 size={19} />

          </div>

          <div className="report-summary-content">

            <span>Attendance Rate</span>

            <strong>96.8%</strong>

            <div className="report-change positive">

              <ArrowUpRight size={13} />

              1.4%

              <span>vs previous period</span>

            </div>

          </div>

        </div>

        <div className="report-summary-card">

          <div className="report-summary-icon violet">

            <WalletCards size={19} />

          </div>

          <div className="report-summary-content">

            <span>Payroll Volume</span>

            <strong>384.2M</strong>

            <div className="report-change positive">

              <ArrowUpRight size={13} />

              3.5%

              <span>vs previous period</span>

            </div>

          </div>

        </div>

        <div className="report-summary-card">

          <div className="report-summary-icon warning">

            <Activity size={19} />

          </div>

          <div className="report-summary-content">

            <span>Open Exceptions</span>

            <strong>17</strong>

            <div className="report-change negative">

              <ArrowDownRight size={13} />

              8.2%

              <span>vs previous period</span>

            </div>

          </div>

        </div>

      </section>

      <section className="reports-main-grid">

        <div className="report-chart-card glass-card">

          <div className="report-card-header">

            <div>

              <span>ATTENDANCE PERFORMANCE</span>

              <h2>Daily Attendance Trend</h2>

            </div>

            <div className="report-card-value">

              <strong>96.8%</strong>

              <span>Average</span>

            </div>

          </div>

          <div className="attendance-chart">

            <div className="chart-y-axis">

              <span>100%</span>

              <span>98%</span>

              <span>96%</span>

              <span>94%</span>

            </div>

            <div className="attendance-chart-area">

              <div className="chart-grid-line line-1" />

              <div className="chart-grid-line line-2" />

              <div className="chart-grid-line line-3" />

              <div className="chart-grid-line line-4" />

              <div className="attendance-bars">

                {attendanceTrend.map((item) => (

                  <div className="attendance-bar-column" key={item.day}>

                    <div

                      className="attendance-bar"

                      style={{

                        height: `${Math.max(

                          12,

                          ((item.value - 94) / 6) * 100,

                        )}%`,

                      }}

                    >

                      <span>{item.value}%</span>

                    </div>

                    <small>{item.day}</small>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

        <div className="report-ai-card glass-card">

          <div className="report-ai-header">

            <div className="report-ai-icon">

              <BrainCircuit size={22} />

            </div>

            <div>

              <span>AI ANALYTICS</span>

              <h2>Operational Intelligence</h2>

            </div>

          </div>

          <div className="ai-report-score">

            <div>

              <strong>92</strong>

              <span>Health Score</span>

            </div>

            <div className="ai-score-progress">

              <div style={{ width: "92%" }} />

            </div>

          </div>

          <div className="ai-report-insights">

            <div>

              <TrendingUp size={16} />

              <div>
<strong>Attendance is stable</strong>

                <span>

                  Workforce attendance remains above the operational threshold.

                </span>

              </div>

            </div>

            <div>

              <Clock3 size={16} />

              <div>

                <strong>17 records need review</strong>

                <span>

                  OCR and manual attendance exceptions are awaiting action.

                </span>

              </div>

            </div>

            <div>

              <ShieldCheck size={16} />

              <div>

                <strong>Site coverage is healthy</strong>

                <span>

                  Active locations maintain broad workforce deployment.

                </span>

              </div>

            </div>

          </div>

          <button type="button" className="secondary-action ai-generate-button">

            <SparklesIcon />

            Generate AI Summary

          </button>

        </div>

      </section>

      <section className="reports-secondary-grid">

        <div className="report-chart-card glass-card payroll-report-card">

          <div className="report-card-header">

            <div>

              <span>PAYROLL VOLUME</span>

              <h2>Monthly Payroll Trend</h2>

            </div>

            <div className="report-card-value">

              <strong>384.2M</strong>

              <span>{periodLabel}</span>

            </div>

          </div>

          <div className="payroll-chart">

            {payrollTrend.map((item) => (

              <div className="payroll-column" key={item.month}>

                <div

                  className="payroll-column-fill"

                  style={{

                    height: `${(item.value / maxPayroll) * 100}%`,

                  }}

                >

                  <span>{item.value}M</span>

                </div>

                <small>{item.month}</small>

              </div>

            ))}

          </div>

        </div>

        <div className="report-table-card glass-card">

          <div className="report-card-header">

            <div>

              <span>SITE PERFORMANCE</span>

              <h2>Operational Breakdown</h2>

            </div>

            <BarChart3 size={20} />

          </div>

          <div className="report-site-table">

            {siteReports.map((site) => (

              <div className="report-site-row" key={site.site}>

                <div className="report-site-name">

                  <div className="report-site-dot" />

                  <div>

                    <strong>{site.site}</strong>

                    <span>{site.workers} workers</span>

                  </div>

                </div>

                <div className="report-site-attendance">

                  <span>{site.attendance}%</span>

                  <div>

                    <div

                      style={{

                        width: `${site.attendance}%`,

                      }}

                    />

                  </div>

                </div>

                <div className="report-site-payroll">

                  <strong>{formatMillions(site.payroll)}</strong>

                  <span>Payroll</span>

                </div>

                <div className="report-site-incidents">

                  <strong>{site.incidents}</strong>

                  <span>Exceptions</span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <section className="report-export-panel glass-card">

        <div>

          <div className="report-export-icon">

            <FileBarChart size={21} />

          </div>

          <div>

            <span>REPORT CENTER</span>

            <h2>Generate operational reports</h2>

            <p>

              Prepare workforce, attendance, payroll and site performance

              reports for management review.

            </p>

          </div>

        </div>
<div className="report-export-actions">

          <button type="button" className="secondary-action">

            Workforce Report

          </button>

          <button type="button" className="secondary-action">

            Attendance Report

          </button>

          <button type="button" className="secondary-action">

            Payroll Report

          </button>

        </div>

      </section>

    </main>

  );

}

function SparklesIcon() {

  return <Sparkles size={16} />;

}