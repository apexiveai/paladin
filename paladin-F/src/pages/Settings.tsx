import { useState } from "react";

import {

  Bot,

  Building2,

  Check,

  Clock3,

  DollarSign,

  Globe2,

  Languages,

  Save,

  ShieldCheck,

  SlidersHorizontal,

  Sparkles,

} from "lucide-react";

type SettingsSection = "general" | "attendance" | "payroll" | "ai";

export default function Settings() {

  const [section, setSection] = useState<SettingsSection>("general");

  const [saved, setSaved] = useState(false);

  const [companyName, setCompanyName] = useState("APEXIVE Workforce");

  const [timezone, setTimezone] = useState("Asia/Yangon");

  const [language, setLanguage] = useState("English");

  const [currency, setCurrency] = useState("MMK");

  const [workingDays, setWorkingDays] = useState("26");

  const [lateThreshold, setLateThreshold] = useState("15");

  const [defaultStatus, setDefaultStatus] = useState("Unmarked");

  const [payCycle, setPayCycle] = useState("Monthly");

  const [payDate, setPayDate] = useState("Last working day");

  const [overtime, setOvertime] = useState(true);

  const [confidence, setConfidence] = useState("90");

  const [autoVerify, setAutoVerify] = useState(false);

  const [handwriting, setHandwriting] = useState(true);

  const saveSettings = () => {

    setSaved(true);

    window.setTimeout(() => {

      setSaved(false);

    }, 2200);

  };

  const sections = [

    {

      id: "general" as const,

      label: "General",

      icon: Building2,

      description: "Company and regional settings",

    },

    {

      id: "attendance" as const,

      label: "Attendance",

      icon: Clock3,

      description: "Attendance behavior",

    },

    {

      id: "payroll" as const,

      label: "Payroll",

      icon: DollarSign,

      description: "Payroll configuration",

    },

    {

      id: "ai" as const,

      label: "AI & OCR",

      icon: Sparkles,

      description: "AI recognition settings",

    },

  ];

  return (

    <main className="page settings-page">

      <div className="page-header">

        <div>

          <div className="eyebrow">

            <SlidersHorizontal size={14} />

            SYSTEM CONFIGURATION

          </div>

          <h1>Settings</h1>

          <p>

            Configure your workforce environment, attendance, payroll and AI

            processing preferences.

          </p>

        </div>

        <button

          type="button"

          className={`primary-button ${saved ? "success-button" : ""}`}

          onClick={saveSettings}

        >

          {saved ? <Check size={17} /> : <Save size={17} />}

          {saved ? "Saved" : "Save Changes"}

        </button>

      </div>

      <div className="settings-layout">

        <aside className="settings-sidebar">

          <div className="settings-sidebar-title">Configuration</div>

          {sections.map((item) => {

            const Icon = item.icon;

            const active = section === item.id;

            return (

              <button

                key={item.id}

                type="button"

                className={`settings-nav-item ${active ? "active" : ""}`}

                onClick={() => setSection(item.id)}

              >

                <div className="settings-nav-icon">

                  <Icon size={18} strokeWidth={1.8} />

                </div>

                <div>

                  <strong>{item.label}</strong>

                  <span>{item.description}</span>

                </div>

              </button>

            );

          })}

          <div className="settings-security-card">

            <div className="settings-security-icon">

              <ShieldCheck size={19} />

            </div>

            <strong>Protected Environment</strong>

            <span>

              Configuration changes are restricted to authorized

              administrators.

            </span>

          </div>

        </aside>

        <section className="settings-content">

          {section === "general" && (

            <div className="settings-panel">
<div className="settings-panel-header">

                <div>

                  <h2>General Settings</h2>

                  <p>Basic company and regional configuration.</p>

                </div>

                <div className="settings-panel-badge">

                  <Globe2 size={15} />

                  Regional

                </div>

              </div>

              <div className="settings-form-grid">

                <label className="settings-field">

                  <span>Company Name</span>

                  <div className="settings-input-wrap">

                    <Building2 size={17} />

                    <input

                      value={companyName}

                      onChange={(event) => setCompanyName(event.target.value)}

                    />

                  </div>

                </label>

                <label className="settings-field">

                  <span>Timezone</span>

                  <select

                    value={timezone}

                    onChange={(event) => setTimezone(event.target.value)}

                  >

                    <option>Asia/Yangon</option>

                    <option>Asia/Bangkok</option>

                    <option>Asia/Singapore</option>

                    <option>UTC</option>

                  </select>

                </label>

                <label className="settings-field">

                  <span>Language</span>

                  <div className="settings-input-wrap">

                    <Languages size={17} />

                    <select

                      value={language}

                      onChange={(event) => setLanguage(event.target.value)}

                    >

                      <option>English</option>

                      <option>Myanmar</option>

                    </select>

                  </div>

                </label>

                <label className="settings-field">

                  <span>Currency</span>

                  <select

                    value={currency}

                    onChange={(event) => setCurrency(event.target.value)}

                  >

                    <option>MMK</option>

                    <option>USD</option>

                    <option>THB</option>

                    <option>SGD</option>

                  </select>

                </label>

              </div>

            </div>

          )}

          {section === "attendance" && (

            <div className="settings-panel">

              <div className="settings-panel-header">

                <div>

                  <h2>Attendance Settings</h2>

                  <p>Configure attendance behavior for the workforce.</p>

                </div>

                <div className="settings-panel-badge">

                  <Clock3 size={15} />

                  Workforce

                </div>

              </div>

              <div className="settings-form-grid">

                <label className="settings-field">

                  <span>Configured Working Days</span>

                  <input

                    type="number"

                    min="1"

                    max="31"

                    value={workingDays}

                    onChange={(event) => setWorkingDays(event.target.value)}

                  />

                  <small>Frontend configuration placeholder.</small>

                </label>

                <label className="settings-field">

                  <span>Late Threshold</span>

                  <div className="settings-input-suffix">

                    <input

                      type="number"

                      min="0"

                      value={lateThreshold}

                      onChange={(event) =>

                        setLateThreshold(event.target.value)

                      }

                    />

                    <span>minutes</span>

                  </div>

                </label>

                <label className="settings-field">
<span>Default Attendance Status</span>

                  <select

                    value={defaultStatus}

                    onChange={(event) =>

                      setDefaultStatus(event.target.value)

                    }

                  >

                    <option>Unmarked</option>

                    <option>Present</option>

                    <option>Absent</option>

                    <option>Leave</option>

                    <option>Off</option>

                  </select>

                </label>

              </div>

              <div className="settings-info-box">

                <Clock3 size={18} />

                <div>

                  <strong>Attendance calculation</strong>

                  <p>

                    Final attendance and payable-day rules will be connected

                    to the existing backend model and business logic later.

                  </p>

                </div>

              </div>

            </div>

          )}

          {section === "payroll" && (

            <div className="settings-panel">

              <div className="settings-panel-header">

                <div>

                  <h2>Payroll Settings</h2>

                  <p>Configure payroll cycle preferences.</p>

                </div>

                <div className="settings-panel-badge">

                  <DollarSign size={15} />

                  Finance

                </div>

              </div>

              <div className="settings-form-grid">

                <label className="settings-field">

                  <span>Pay Cycle</span>

                  <select

                    value={payCycle}

                    onChange={(event) => setPayCycle(event.target.value)}

                  >

                    <option>Monthly</option>

                    <option>Bi-weekly</option>

                    <option>Weekly</option>

                  </select>

                </label>

                <label className="settings-field">

                  <span>Default Pay Date</span>

                  <select

                    value={payDate}

                    onChange={(event) => setPayDate(event.target.value)}

                  >

                    <option>Last working day</option>

                    <option>25th of each month</option>

                    <option>30th of each month</option>

                  </select>

                </label>

              </div>

              <div className="settings-toggle-row">

                <div className="settings-toggle-copy">

                  <strong>Overtime Tracking</strong>

                  <span>

                    Allow overtime information to be represented in payroll

                    workflows.

                  </span>

                </div>

                <button

                  type="button"

                  className={`toggle ${overtime ? "on" : ""}`}

                  onClick={() => setOvertime((value) => !value)}

                  aria-label="Toggle overtime tracking"

                >

                  <span />

                </button>

              </div>

              <div className="settings-info-box">

                <DollarSign size={18} />

                <div>

                  <strong>Payroll engine</strong>

                  <p>

                    Actual salary, deduction, allowance and payable-day

                    calculations will use the existing backend records.

                  </p>

                </div>

              </div>

            </div>

          )}

          {section === "ai" && (

            <div className="settings-panel">

              <div className="settings-panel-header">

                <div>

                  <h2>AI & OCR Settings</h2>

                  <p>Configure document recognition and verification.</p>

                </div>

                <div className="settings-panel-badge ai-badge">

                  <Bot size={15} />

                  AI Engine

                </div>
</div>

              <div className="settings-form-grid">

                <label className="settings-field">

                  <span>Minimum Confidence</span>

                  <div className="settings-input-suffix">

                    <input

                      type="number"

                      min="0"

                      max="100"

                      value={confidence}

                      onChange={(event) =>

                        setConfidence(event.target.value)

                      }

                    />

                    <span>%</span>

                  </div>

                </label>

                <label className="settings-field">

                  <span>Recognition Engine</span>

                  <select defaultValue="AI OCR Engine">

                    <option>AI OCR Engine</option>

                    <option>OCR + Vision Engine</option>

                    <option>Manual Verification Only</option>

                  </select>

                </label>

              </div>

              <div className="settings-toggle-row">

                <div className="settings-toggle-copy">

                  <strong>Automatic Verification</strong>

                  <span>

                    Allow high-confidence records to enter the verification

                    workflow automatically.

                  </span>

                </div>

                <button

                  type="button"

                  className={`toggle ${autoVerify ? "on" : ""}`}

                  onClick={() => setAutoVerify((value) => !value)}

                  aria-label="Toggle automatic verification"

                >

                  <span />

                </button>

              </div>

              <div className="settings-toggle-row">

                <div className="settings-toggle-copy">

                  <strong>Handwriting Recognition</strong>

                  <span>

                    Enable handwriting analysis for photographed attendance

                    sheets.

                  </span>

                </div>

                <button

                  type="button"

                  className={`toggle ${handwriting ? "on" : ""}`}

                  onClick={() => setHandwriting((value) => !value)}

                  aria-label="Toggle handwriting recognition"

                >

                  <span />

                </button>

              </div>

              <div className="ai-settings-visual">

                <div className="ai-orb">

                  <Sparkles size={30} />

                </div>

                <div>

                  <strong>AI Processing Layer</strong>

                  <p>

                    Document → OCR → handwriting → confidence → human

                    verification

                  </p>

                </div>

              </div>

            </div>

          )}

        </section>

      </div>

    </main>

  );

}