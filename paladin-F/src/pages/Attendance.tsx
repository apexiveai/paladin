import {

  CalendarDays,

  Check,

  ChevronDown,

  Circle,

  Download,

  FileUp,

  Filter,

  Minus,

  Search,

  Sparkles,

  Users,

  X,

} from "lucide-react";

import { useMemo, useState } from "react";

type AttendanceStatus =

  | "PRESENT"

  | "ABSENT"

  | "HALF_DAY"

  | "LEAVE"

  | "OFF"

  | "UNMARKED";

type WorkerAttendance = {

  id: string;

  code: string;

  name: string;

  site: string;

  attendance: Record<number, AttendanceStatus>;

};

const statusCycle: AttendanceStatus[] = [

  "UNMARKED",

  "PRESENT",

  "ABSENT",

  "HALF_DAY",

  "LEAVE",

  "OFF",

];

const workers: WorkerAttendance[] = [

  {

    id: "1",

    code: "SEC-0001",

    name: "Aung Min",

    site: "Head Office",

    attendance: {

      1: "PRESENT",

      2: "PRESENT",

      3: "PRESENT",

      4: "PRESENT",

      5: "PRESENT",

      6: "OFF",

      7: "PRESENT",

      8: "PRESENT",

      9: "PRESENT",

      10: "PRESENT",

      11: "PRESENT",

      12: "PRESENT",

      13: "OFF",

      14: "PRESENT",

      15: "PRESENT",

      16: "PRESENT",

      17: "PRESENT",

      18: "HALF_DAY",

      19: "OFF",

      20: "PRESENT",

      21: "PRESENT",

      22: "PRESENT",

      23: "PRESENT",

      24: "PRESENT",

      25: "OFF",

      26: "PRESENT",

      27: "PRESENT",

      28: "PRESENT",

      29: "PRESENT",

      30: "PRESENT",

      31: "OFF",

    },

  },

  {

    id: "2",

    code: "SEC-0002",

    name: "Kyaw Zin",

    site: "Industrial Zone",

    attendance: {

      1: "PRESENT",

      2: "PRESENT",

      3: "ABSENT",

      4: "PRESENT",

      5: "PRESENT",

      6: "OFF",

      7: "PRESENT",

      8: "PRESENT",

      9: "PRESENT",

      10: "HALF_DAY",

      11: "PRESENT",

      12: "PRESENT",

      13: "OFF",

      14: "PRESENT",

      15: "PRESENT",

      16: "ABSENT",

      17: "PRESENT",

      18: "PRESENT",

      19: "OFF",

      20: "PRESENT",

      21: "PRESENT",

      22: "PRESENT",

      23: "PRESENT",

      24: "PRESENT",

      25: "OFF",

      26: "PRESENT",

      27: "PRESENT",

      28: "PRESENT",

      29: "PRESENT",

      30: "PRESENT",

      31: "OFF",

    },

  },

  {

    id: "3",

    code: "SEC-0003",

    name: "Min Thu",

    site: "Commercial Center",

    attendance: {

      1: "PRESENT",

      2: "PRESENT",

      3: "PRESENT",

      4: "PRESENT",

      5: "PRESENT",

      6: "OFF",

      7: "PRESENT",

      8: "PRESENT",

      9: "PRESENT",

      10: "PRESENT",

      11: "PRESENT",

      12: "LEAVE",

      13: "OFF",

      14: "PRESENT",

      15: "PRESENT",

      16: "PRESENT",

      17: "PRESENT",

      18: "PRESENT",

      19: "OFF",

      20: "PRESENT",

      21: "PRESENT",

      22: "PRESENT",

      23: "PRESENT",

      24: "PRESENT",

      25: "OFF",

      26: "PRESENT",

      27: "PRESENT",

      28: "PRESENT",

      29: "PRESENT",

      30: "PRESENT",

      31: "OFF",

    },

  },

  {

    id: "4",

    code: "SEC-0004",

    name: "Zaw Lin",

    site: "Logistics Hub",

    attendance: {

      1: "PRESENT",

      2: "ABSENT",

      3: "PRESENT",

      4: "PRESENT",

      5: "PRESENT",

      6: "OFF",

      7: "PRESENT",

      8: "PRESENT",

      9: "ABSENT",

      10: "PRESENT",

      11: "PRESENT",

      12: "PRESENT",

      13: "OFF",

      14: "PRESENT",

      15: "HALF_DAY",

      16: "PRESENT",

      17: "PRESENT",

      18: "PRESENT",

      19: "OFF",

      20: "PRESENT",

      21: "PRESENT",

      22: "PRESENT",

      23: "PRESENT",

      24: "PRESENT",

      25: "OFF",

      26: "PRESENT",

      27: "PRESENT",

      28: "PRESENT",

      29: "PRESENT",

      30: "PRESENT",

      31: "OFF",

    },

  },

  {

    id: "5",

    code: "SEC-0005",

    name: "Htet Naing",

    site: "Residential Complex",

    attendance: {

      1: "PRESENT",

      2: "PRESENT",

      3: "PRESENT",

      4: "PRESENT",

      5: "PRESENT",

      6: "OFF",

      7: "PRESENT",

      8: "PRESENT",

      9: "PRESENT",

      10: "PRESENT",
11: "PRESENT",

      12: "PRESENT",

      13: "OFF",

      14: "PRESENT",

      15: "PRESENT",

      16: "PRESENT",

      17: "PRESENT",

      18: "PRESENT",

      19: "OFF",

      20: "PRESENT",

      21: "PRESENT",

      22: "PRESENT",

      23: "PRESENT",

      24: "PRESENT",

      25: "OFF",

      26: "PRESENT",

      27: "PRESENT",

      28: "PRESENT",

      29: "PRESENT",

      30: "PRESENT",

      31: "OFF",

    },

  },

  {

    id: "6",

    code: "SEC-0006",

    name: "Ko Ko",

    site: "Head Office",

    attendance: {

      1: "PRESENT",

      2: "PRESENT",

      3: "PRESENT",

      4: "PRESENT",

      5: "HALF_DAY",

      6: "OFF",

      7: "PRESENT",

      8: "PRESENT",

      9: "PRESENT",

      10: "PRESENT",

      11: "PRESENT",

      12: "PRESENT",

      13: "OFF",

      14: "PRESENT",

      15: "PRESENT",

      16: "PRESENT",

      17: "ABSENT",

      18: "PRESENT",

      19: "OFF",

      20: "PRESENT",

      21: "PRESENT",

      22: "PRESENT",

      23: "PRESENT",

      24: "PRESENT",

      25: "OFF",

      26: "PRESENT",

      27: "PRESENT",

      28: "PRESENT",

      29: "PRESENT",

      30: "PRESENT",

      31: "OFF",

    },

  },

  {

    id: "7",

    code: "SEC-0007",

    name: "Thura Aung",

    site: "Industrial Zone",

    attendance: {

      1: "PRESENT",

      2: "PRESENT",

      3: "PRESENT",

      4: "PRESENT",

      5: "PRESENT",

      6: "OFF",

      7: "PRESENT",

      8: "PRESENT",

      9: "PRESENT",

      10: "PRESENT",

      11: "PRESENT",

      12: "PRESENT",

      13: "OFF",

      14: "PRESENT",

      15: "PRESENT",

      16: "PRESENT",

      17: "PRESENT",

      18: "PRESENT",

      19: "OFF",

      20: "PRESENT",

      21: "PRESENT",

      22: "PRESENT",

      23: "PRESENT",

      24: "PRESENT",

      25: "OFF",

      26: "PRESENT",

      27: "PRESENT",

      28: "PRESENT",

      29: "PRESENT",

      30: "PRESENT",

      31: "OFF",

    },

  },

  {

    id: "8",

    code: "SEC-0008",

    name: "Ye Min",

    site: "Commercial Center",

    attendance: {

      1: "PRESENT",

      2: "ABSENT",

      3: "PRESENT",

      4: "PRESENT",

      5: "PRESENT",

      6: "OFF",

      7: "PRESENT",

      8: "HALF_DAY",

      9: "PRESENT",

      10: "PRESENT",

      11: "PRESENT",

      12: "PRESENT",

      13: "OFF",

      14: "PRESENT",

      15: "PRESENT",

      16: "PRESENT",

      17: "PRESENT",

      18: "PRESENT",

      19: "OFF",

      20: "PRESENT",

      21: "PRESENT",

      22: "PRESENT",

      23: "PRESENT",

      24: "PRESENT",

      25: "OFF",

      26: "PRESENT",

      27: "PRESENT",

      28: "PRESENT",

      29: "PRESENT",

      30: "PRESENT",

      31: "OFF",

    },

  },

];

const days = Array.from({ length: 31 }, (_, index) => index + 1);

function getStatusSymbol(status: AttendanceStatus) {

  switch (status) {

    case "PRESENT":

      return <Check size={13} strokeWidth={2.5} />;

    case "ABSENT":

      return <X size={13} strokeWidth={2.5} />;

    case "HALF_DAY":

      return <span className="half-symbol">½</span>;

    case "LEAVE":

      return <span className="leave-symbol">L</span>;

    case "OFF":

      return <Minus size={13} strokeWidth={2.3} />;

    default:

      return <Circle size={7} strokeWidth={1.8} />;

  }

}

function calculatePayableDays(

  attendance: Record<number, AttendanceStatus>,

) {

  return days.reduce((total, day) => {

    const status = attendance[day];

    if (status === "PRESENT" || status === "LEAVE") {

      return total + 1;

    }

    if (status === "HALF_DAY") {

      return total + 0.5;

    }

    return total;

  }, 0);

}

function getAttendanceRate(

  attendance: Record<number, AttendanceStatus>,

) {

  const workingDays = days.filter(

    (day) => attendance[day] !== "OFF",

  );

  if (!workingDays.length) {

    return 0;

  }

  const payable = calculatePayableDays(attendance);

  return Math.round((payable / workingDays.length) * 100);

}
export default function Attendance() {

  const [selectedMonth, setSelectedMonth] =

    useState("October 2026");

  const [selectedSite, setSelectedSite] =

    useState("All Sites");

  const [search, setSearch] = useState("");

  const [attendanceData, setAttendanceData] =

    useState<WorkerAttendance[]>(workers);

  const filteredWorkers = useMemo(() => {

    const query = search.toLowerCase().trim();

    return attendanceData.filter((worker) => {

      const matchesSearch =

        !query ||

        worker.name.toLowerCase().includes(query) ||

        worker.code.toLowerCase().includes(query);

      const matchesSite =

        selectedSite === "All Sites" ||

        worker.site === selectedSite;

      return matchesSearch && matchesSite;

    });

  }, [attendanceData, search, selectedSite]);

  const updateStatus = (

    workerId: string,

    day: number,

  ) => {

    setAttendanceData((current) =>

      current.map((worker) => {

        if (worker.id !== workerId) {

          return worker;

        }

        const currentStatus =

          worker.attendance[day] ?? "UNMARKED";

        const currentIndex =

          statusCycle.indexOf(currentStatus);

        const nextStatus =

          statusCycle[

            (currentIndex + 1) % statusCycle.length

          ];

        return {

          ...worker,

          attendance: {

            ...worker.attendance,

            [day]: nextStatus,

          },

        };

      }),

    );

  };

  const setAllPresent = (workerId: string) => {

    setAttendanceData((current) =>

      current.map((worker) => {

        if (worker.id !== workerId) {

          return worker;

        }

        const nextAttendance = {

          ...worker.attendance,

        };

        days.forEach((day) => {

          if (nextAttendance[day] !== "OFF") {

            nextAttendance[day] = "PRESENT";

          }

        });

        return {

          ...worker,

          attendance: nextAttendance,

        };

      }),

    );

  };

  const clearWorker = (workerId: string) => {

    setAttendanceData((current) =>

      current.map((worker) => {

        if (worker.id !== workerId) {

          return worker;

        }

        const nextAttendance = {

          ...worker.attendance,

        };

        days.forEach((day) => {

          if (nextAttendance[day] !== "OFF") {

            nextAttendance[day] = "UNMARKED";

          }

        });

        return {

          ...worker,

          attendance: nextAttendance,

        };

      }),

    );

  };

  const totalPresent = attendanceData.reduce(

    (total, worker) =>

      total +

      days.filter(

        (day) => worker.attendance[day] === "PRESENT",

      ).length,

    0,

  );

  const totalAbsent = attendanceData.reduce(

    (total, worker) =>

      total +

      days.filter(

        (day) => worker.attendance[day] === "ABSENT",

      ).length,

    0,

  );

  const totalPayable = attendanceData.reduce(

    (total, worker) =>

      total + calculatePayableDays(worker.attendance),

    0,

  );

  return (

    <main className="page attendance-page">

      <div className="page-header">

        <div>

          <div className="page-eyebrow">

            <CalendarDays size={14} />

            ATTENDANCE CONTROL

          </div>

          <h1>Attendance Matrix</h1>

          <p>

            Review daily workforce attendance and prepare

            verified records for payroll processing.

          </p>

        </div>

        <div className="attendance-header-actions">

          <button type="button" className="secondary-action">

            <Download size={16} />

            Export

          </button>

          <button type="button" className="primary-action">

            <FileUp size={16} />

            Import Sheet

          </button>

        </div>

      </div>

      <div className="attendance-stat-grid">

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon">

            <Users size={20} />
</div>

          <div>

            <span>Workers</span>

            <strong>1,248</strong>

          </div>

          <small>Registered workforce</small>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon success">

            <Check size={20} />

          </div>

          <div>

            <span>Present Records</span>

            <strong>

              {totalPresent.toLocaleString()}

            </strong>

          </div>

          <small>Current displayed dataset</small>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon danger">

            <X size={20} />

          </div>

          <div>

            <span>Absent Records</span>

            <strong>{totalAbsent}</strong>

          </div>

          <small>Requires payroll deduction</small>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon ai">

            <Sparkles size={20} />

          </div>

          <div>

            <span>Payable Days</span>

            <strong>

              {totalPayable.toFixed(1)}

            </strong>

          </div>

          <small>Calculated from attendance</small>

        </div>

      </div>

      <section className="card attendance-matrix-card">

        <div className="attendance-toolbar">

          <div>

            <div className="card-eyebrow">

              <CalendarDays size={14} />

              MONTHLY RECORD

            </div>

            <h2>October 2026</h2>

            <p>

              Click any attendance cell to cycle through

              attendance states.

            </p>

          </div>

          <div className="attendance-toolbar-controls">

            <div className="attendance-control">

              <CalendarDays size={15} />

              <select

                value={selectedMonth}

                onChange={(event) =>

                  setSelectedMonth(event.target.value)

                }

              >

                <option>October 2026</option>

                <option>September 2026</option>

                <option>August 2026</option>

              </select>

              <ChevronDown size={14} />

            </div>

            <div className="attendance-control">

              <Filter size={15} />

              <select

                value={selectedSite}

                onChange={(event) =>

                  setSelectedSite(event.target.value)

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

            <div className="attendance-search">

              <Search size={15} />

              <input

                type="text"

                placeholder="Search worker..."

                value={search}

                onChange={(event) =>

                  setSearch(event.target.value)

                }

              />

            </div>

          </div>

        </div>

        <div className="attendance-legend">

          <span>

            <i className="legend-attendance present" />

            Present

          </span>

          <span>

            <i className="legend-attendance absent" />

            Absent

          </span>

          <span>

            <i className="legend-attendance half" />

            Half Day

          </span>

          <span>

            <i className="legend-attendance leave" />

            Leave

          </span>

          <span>

            <i className="legend-attendance off" />

            Off

          </span>

          <span>

            <i className="legend-attendance unmarked" />

            Unmarked

          </span>
</div>

        <div className="attendance-table-wrap">

          <table className="attendance-table">

            <thead>

              <tr>

                <th className="worker-sticky-col">

                  <div className="attendance-worker-header">

                    <span>WORKER</span>

                    <small>CODE / NAME</small>

                  </div>

                </th>

                {days.map((day) => (

                  <th key={day}>

                    <div className="day-header">

                      <span>

                        {String(day).padStart(2, "0")}

                      </span>

                      <small>

                        {day % 7 === 0 ? "SUN" : "DAY"}

                      </small>

                    </div>

                  </th>

                ))}

                <th className="payable-sticky-col">

                  <div className="payable-header">

                    <span>PAY</span>

                    <small>DAYS</small>

                  </div>

                </th>

                <th className="rate-sticky-col">

                  <div className="payable-header">

                    <span>RATE</span>

                    <small>%</small>

                  </div>

                </th>

                <th className="actions-sticky-col">

                  <span>ACTIONS</span>

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredWorkers.map((worker) => {

                const payableDays =

                  calculatePayableDays(worker.attendance);

                const rate = getAttendanceRate(

                  worker.attendance,

                );

                return (

                  <tr key={worker.id}>

                    <td className="worker-sticky-col">

                      <div className="attendance-worker">

                        <div className="attendance-worker-avatar">

                          {worker.name

                            .split(" ")

                            .map((part) => part[0])

                            .join("")

                            .slice(0, 2)}

                        </div>

                        <div>

                          <strong>{worker.code}</strong>

                          <span>{worker.name}</span>

                          <small>{worker.site}</small>

                        </div>

                      </div>

                    </td>

                    {days.map((day) => {

                      const status =

                        worker.attendance[day] ??

                        "UNMARKED";

                      return (

                        <td key={day}>

                          <button

                            type="button"

                            className={`attendance-cell ${status.toLowerCase()}`}

                            onClick={() =>

                              updateStatus(

                                worker.id,

                                day,

                              )

                            }

                            title={`${worker.name} · Day ${day} · ${status}`}

                          >

                            {getStatusSymbol(status)}

                          </button>

                        </td>

                      );

                    })}

                    <td className="payable-sticky-col">

                      <div className="payable-value">

                        {payableDays.toFixed(1)}

                      </div>

                    </td>

                    <td className="rate-sticky-col">

                      <div

                        className={`attendance-rate ${

                          rate >= 95

                            ? "excellent"

                            : rate >= 85

                              ? "normal"

                              : "warning"

                        }`}

                      >

                        {rate}%
</div>

                    </td>

                    <td className="actions-sticky-col">

                      <div className="attendance-row-actions">

                        <button

                          type="button"

                          onClick={() =>

                            setAllPresent(worker.id)

                          }

                        >

                          ALL P

                        </button>

                        <button

                          type="button"

                          onClick={() =>

                            clearWorker(worker.id)

                          }

                        >

                          CLR

                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })}

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

        <div className="attendance-footer">

          <div className="attendance-footer-left">

            <span>

              Showing {filteredWorkers.length} workers

            </span>

            <span className="footer-divider" />

            <span>

              Month: {selectedMonth}

            </span>

          </div>

          <div className="attendance-footer-right">

            <span>Last modified</span>

            <strong>Just now</strong>

          </div>

        </div>

      </section>

    </main>

  );

}