import { useMemo, useRef, useState } from "react";

import {

  AlertTriangle,

  BrainCircuit,

  Check,

  CheckCircle2,

  ChevronRight,

  CircleAlert,

  FileCheck2,

  FileImage,

  FileText,

  ScanSearch,

  ShieldCheck,

  Sparkles,

  Upload,

  X,

} from "lucide-react";

type VerificationStatus = "VERIFIED" | "REVIEW" | "CONFLICT";

type OCRRecord = {

  id: string;

  workerId: string;

  worker: string;

  day: number;

  detected: string;

  confidence: number;

  status: VerificationStatus;

};

const initialRecords: OCRRecord[] = [

  {

    id: "1",

    workerId: "SEC-0001",

    worker: "Aung Aung",

    day: 1,

    detected: "PRESENT",

    confidence: 99.2,

    status: "VERIFIED",

  },

  {

    id: "2",

    workerId: "SEC-0002",

    worker: "Kyaw Zin",

    day: 1,

    detected: "PRESENT",

    confidence: 97.8,

    status: "VERIFIED",

  },

  {

    id: "3",

    workerId: "SEC-0003",

    worker: "Min Htet",

    day: 1,

    detected: "ABSENT",

    confidence: 94.1,

    status: "REVIEW",

  },

  {

    id: "4",

    workerId: "SEC-0004",

    worker: "Than Win",

    day: 1,

    detected: "HALF DAY",

    confidence: 87.6,

    status: "REVIEW",

  },

  {

    id: "5",

    workerId: "SEC-0005",

    worker: "Htet Naing",

    day: 1,

    detected: "PRESENT",

    confidence: 72.4,

    status: "CONFLICT",

  },

  {

    id: "6",

    workerId: "SEC-0006",

    worker: "Zaw Lin",

    day: 2,

    detected: "PRESENT",

    confidence: 98.8,

    status: "VERIFIED",

  },

  {

    id: "7",

    workerId: "SEC-0007",

    worker: "Myo Min",

    day: 2,

    detected: "LEAVE",

    confidence: 96.7,

    status: "VERIFIED",

  },

  {

    id: "8",

    workerId: "SEC-0008",

    worker: "Ko Ko",

    day: 2,

    detected: "PRESENT",

    confidence: 91.5,

    status: "REVIEW",

  },

];

function statusLabel(status: VerificationStatus) {

  if (status === "VERIFIED") return "Verified";

  if (status === "REVIEW") return "Review";

  return "Conflict";

}

function statusClass(status: VerificationStatus) {

  if (status === "VERIFIED") return "ocr-status verified";

  if (status === "REVIEW") return "ocr-status review";

  return "ocr-status conflict";

}

function confidenceClass(confidence: number) {

  if (confidence >= 95) return "high";

  if (confidence >= 85) return "medium";

  return "low";

}

export default function OCRVerification() {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [fileName, setFileName] = useState("");

  const [processing, setProcessing] = useState(false);

  const [uploaded, setUploaded] = useState(false);

  const [records, setRecords] = useState<OCRRecord[]>(initialRecords);

  const [selectedRecord, setSelectedRecord] = useState<OCRRecord | null>(null);

  const verifiedCount = records.filter(

    (record) => record.status === "VERIFIED",

  ).length;

  const reviewCount = records.filter(

    (record) => record.status === "REVIEW",

  ).length;

  const conflictCount = records.filter(

    (record) => record.status === "CONFLICT",

  ).length;

  const averageConfidence = useMemo(() => {

    if (!records.length) return 0;

    return (

      records.reduce((sum, record) => sum + record.confidence, 0) /

      records.length

    );

  }, [records]);

  const handleFile = (file: File | undefined) => {

    if (!file) return;

    setFileName(file.name);

    setUploaded(true);

    setProcessing(true);

    window.setTimeout(() => {

      setProcessing(false);

    }, 1800);

  };

  const verifyRecord = (id: string) => {

    setRecords((current) =>

      current.map((record) =>

        record.id === id

          ? {

              ...record,

              status: "VERIFIED",

            }

          : record,

      ),

    );

    setSelectedRecord((current) =>

      current && current.id === id

        ? {

            ...current,

            status: "VERIFIED",

          }

        : current,

    );

  };

  const rejectRecord = (id: string) => {

    setRecords((current) =>

      current.map((record) =>

        record.id === id

          ? {

              ...record,

              status: "CONFLICT",

            }

          : record,

      ),

    );

    setSelectedRecord((current) =>

      current && current.id === id

        ? {

            ...current,

            status: "CONFLICT",

          }

        : current,

    );

  };

  const resetUpload = () => {

    setUploaded(false);

    setProcessing(false);

    setFileName("");

    inputRef.current?.click();

  };

  return (

    <main className="page ocr-page">

      <section className="page-header">

        <div>

          <div className="eyebrow">

            <ScanSearch size={15} />

            AI DOCUMENT INTELLIGENCE

          </div>

          <h1>OCR Verification</h1>

          <p>

            Convert photographed attendance sheets into structured workforce

            records with AI-assisted verification.

          </p>

        </div>

        {uploaded && !processing && (

          <button

            type="button"

            className="secondary-action"

            onClick={() => {

              setUploaded(false);

              setFileName("");

              setRecords(initialRecords);

            }}

          >

            <Upload size={17} />

            New Document

          </button>

        )}

      </section>

      {!uploaded && (

        <section className="ocr-upload-layout">

          <div className="ocr-upload-card glass-card">

            <div className="ocr-upload-icon">

              <ScanSearch size={32} />

            </div>

            <h2>Upload Attendance Sheet</h2>

            <p>

              Upload a photographed, scanned or exported attendance sheet.

              Supported formats include JPG, PNG and PDF.

            </p>

            <input

              ref={inputRef}

              type="file"

              accept=".jpg,.jpeg,.png,.pdf"

              hidden

              onChange={(event) => handleFile(event.target.files?.[0])}

            />

            <button

              type="button"

              className="primary-action"

              onClick={() => inputRef.current?.click()}

            >

              <Upload size={18} />

              Select Attendance Sheet

            </button>

            <div className="ocr-supported">

              <span>

                <FileImage size={14} />

                JPG / PNG

              </span>

              <span>

                <FileText size={14} />

                PDF

              </span>

              <span>

                <BrainCircuit size={14} />

                AI OCR

              </span>

            </div>

          </div>

          <div className="ocr-pipeline-card glass-card">

            <div className="section-heading">

              <div>

                <span>AI PIPELINE</span>

                <h2>Recognition Workflow</h2>

              </div>

              <Sparkles size={21} />

            </div>

            <div className="ocr-pipeline">

              <div className="ocr-pipeline-step active">

                <div className="pipeline-number">01</div>

                <div>

                  <strong>Document Analysis</strong>

                  <span>Detect table structure</span>

                </div>

              </div>

              <div className="ocr-pipeline-line" />

              <div className="ocr-pipeline-step">

                <div className="pipeline-number">02</div>

                <div>

                  <strong>OCR Recognition</strong>

                  <span>Extract text and marks</span>

                </div>

              </div>

              <div className="ocr-pipeline-line" />

              <div className="ocr-pipeline-step">

                <div className="pipeline-number">03</div>

                <div>

                  <strong>Handwriting Analysis</strong>

                  <span>Interpret handwritten values</span>

                </div>

              </div>
<div className="ocr-pipeline-line" />

              <div className="ocr-pipeline-step">

                <div className="pipeline-number">04</div>

                <div>

                  <strong>Confidence Scoring</strong>

                  <span>Detect uncertain records</span>

                </div>

              </div>

              <div className="ocr-pipeline-line" />

              <div className="ocr-pipeline-step">

                <div className="pipeline-number">05</div>

                <div>

                  <strong>Human Verification</strong>

                  <span>Approve before persistence</span>

                </div>

              </div>

            </div>

          </div>

        </section>

      )}

      {uploaded && (

        <>

          <section className="ocr-document-bar glass-card">

            <div className="ocr-document-info">

              <div className="ocr-document-icon">

                <FileCheck2 size={20} />

              </div>

              <div>

                <span>DOCUMENT</span>

                <strong>{fileName}</strong>

              </div>

            </div>

            <div className="ocr-document-state">

              {processing ? (

                <>

                  <span className="ocr-processing-dot" />

                  AI Processing

                </>

              ) : (

                <>

                  <CheckCircle2 size={16} />

                  Analysis Complete

                </>

              )}

            </div>

            <button

              type="button"

              className="icon-button"

              aria-label="Reset document"

              onClick={resetUpload}

            >

              <X size={17} />

            </button>

          </section>

          {processing ? (

            <section className="ocr-processing-card glass-card">

              <div className="ocr-processing-orb">

                <BrainCircuit size={38} />

              </div>

              <h2>AI is analyzing the document</h2>

              <p>

                Detecting attendance cells, worker identifiers and handwritten

                marks...

              </p>

              <div className="ocr-processing-track">

                <div />

              </div>

              <div className="ocr-processing-meta">

                <span>Document Vision</span>

                <span>Handwriting Engine</span>

                <span>Confidence Model</span>

              </div>

            </section>

          ) : (

            <>

              <section className="ocr-metrics">

                <div className="ocr-metric-card">

                  <div className="ocr-metric-icon">

                    <FileCheck2 size={18} />

                  </div>

                  <div>

                    <span>Records Detected</span>

                    <strong>{records.length}</strong>

                    <small>Attendance cells recognized</small>

                  </div>

                </div>

                <div className="ocr-metric-card">

                  <div className="ocr-metric-icon success">

                    <CheckCircle2 size={18} />

                  </div>

                  <div>

                    <span>Verified</span>

                    <strong>{verifiedCount}</strong>

                    <small>High confidence records</small>

                  </div>

                </div>

                <div className="ocr-metric-card">

                  <div className="ocr-metric-icon warning">

                    <AlertTriangle size={18} />

                  </div>

                  <div>

                    <span>Review Required</span>

                    <strong>{reviewCount}</strong>

                    <small>Human verification needed</small>

                  </div>

                </div>

                <div className="ocr-metric-card">

                  <div className="ocr-metric-icon danger">

                    <CircleAlert size={18} />
</div>

                  <div>

                    <span>Conflicts</span>

                    <strong>{conflictCount}</strong>

                    <small>Low confidence records</small>

                  </div>

                </div>

              </section>

              <section className="ocr-analysis-grid">

                <div className="ocr-table-card glass-card">

                  <div className="section-heading">

                    <div>

                      <span>DETECTED ATTENDANCE</span>

                      <h2>Verification Queue</h2>

                    </div>

                    <div className="ocr-confidence-summary">

                      <ShieldCheck size={16} />

                      {averageConfidence.toFixed(1)}% avg confidence

                    </div>

                  </div>

                  <div className="ocr-table-wrapper">

                    <table className="ocr-table">

                      <thead>

                        <tr>

                          <th>Worker</th>

                          <th>Day</th>

                          <th>Detected</th>

                          <th>Confidence</th>

                          <th>Status</th>

                          <th />

                        </tr>

                      </thead>

                      <tbody>

                        {records.map((record) => (

                          <tr key={record.id}>

                            <td>

                              <div className="ocr-worker">

                                <div className="ocr-worker-avatar">

                                  {record.worker.charAt(0)}

                                </div>

                                <div>

                                  <strong>{record.worker}</strong>

                                  <span>{record.workerId}</span>

                                </div>

                              </div>

                            </td>

                            <td>

                              <span className="ocr-day">DAY {record.day}</span>

                            </td>

                            <td>

                              <span className="ocr-detected-value">

                                {record.detected}

                              </span>

                            </td>

                            <td>

                              <div className="confidence-cell">

                                <div className="confidence-bar">

                                  <div

                                    className={confidenceClass(

                                      record.confidence,

                                    )}

                                    style={{

                                      width: `${record.confidence}%`,

                                    }}

                                  />

                                </div>

                                <span>

                                  {record.confidence.toFixed(1)}%

                                </span>

                              </div>

                            </td>

                            <td>

                              <span className={statusClass(record.status)}>

                                <span />

                                {statusLabel(record.status)}

                              </span>

                            </td>

                            <td>

                              <button

                                type="button"

                                className="ocr-review-button"

                                onClick={() => setSelectedRecord(record)}

                              >

                                Review

                                <ChevronRight size={14} />

                              </button>

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>
</div>

                </div>

                <aside className="ocr-insight-card glass-card">

                  <div className="section-heading">

                    <div>

                      <span>AI INSIGHTS</span>

                      <h2>Document Analysis</h2>

                    </div>

                    <BrainCircuit size={21} />

                  </div>

                  <div className="ai-score-ring">

                    <div>

                      <strong>{averageConfidence.toFixed(0)}%</strong>

                      <span>AI Confidence</span>

                    </div>

                  </div>

                  <div className="ai-insight-list">

                    <div>

                      <CheckCircle2 size={17} />

                      <div>

                        <strong>Table structure detected</strong>

                        <span>Attendance grid identified successfully.</span>

                      </div>

                    </div>

                    <div>

                      <CheckCircle2 size={17} />

                      <div>

                        <strong>Worker identifiers matched</strong>

                        <span>Worker IDs mapped against workforce data.</span>

                      </div>

                    </div>

                    <div className="warning">

                      <AlertTriangle size={17} />

                      <div>

                        <strong>Manual review required</strong>

                        <span>

                          Low-confidence handwriting needs confirmation.

                        </span>

                      </div>

                    </div>

                  </div>

                  <button type="button" className="primary-action ocr-approve-all">

                    <Check size={17} />

                    Approve Verified Records

                  </button>

                </aside>

              </section>

            </>

          )}

        </>

      )}

      {selectedRecord && (

        <div

          className="ocr-review-overlay"

          onMouseDown={() => setSelectedRecord(null)}

        >

          <aside

            className="ocr-review-drawer"

            onMouseDown={(event) => event.stopPropagation()}

          >

            <div className="site-drawer-header">

              <div>

                <span>AI VERIFICATION</span>

                <h2>{selectedRecord.worker}</h2>

              </div>

              <button

                type="button"

                className="icon-button"

                onClick={() => setSelectedRecord(null)}

                aria-label="Close review"

              >

                <X size={19} />

              </button>

            </div>

            <div className="ocr-review-preview">

              <div className="ocr-preview-grid">

                <div>

                  <span>WORKER ID</span>

                  <strong>{selectedRecord.workerId}</strong>

                </div>

                <div>

                  <span>ATTENDANCE DAY</span>

                  <strong>Day {selectedRecord.day}</strong>

                </div>

                <div>

                  <span>AI DETECTION</span>

                  <strong>{selectedRecord.detected}</strong>

                </div>

                <div>

                  <span>CONFIDENCE</span>

                  <strong>{selectedRecord.confidence.toFixed(1)}%</strong>

                </div>

              </div>

              <div className="ocr-handwriting-preview">

                <FileImage size={28} />

                <span>Source image region</span>

                <small>Attendance mark detected here</small>

              </div>

            </div>

            <div className="ocr-review-warning">

              <AlertTriangle size={17} />

              <div>

                <strong>Human verification recommended</strong>

                <span>

                  AI confidence is below the automatic verification threshold.
</span>

              </div>

            </div>

            <div className="ocr-review-actions">

              <button

                type="button"

                className="secondary-action"

                onClick={() => rejectRecord(selectedRecord.id)}

              >

                <X size={16} />

                Mark Conflict

              </button>

              <button

                type="button"

                className="primary-action"

                onClick={() => verifyRecord(selectedRecord.id)}

              >

                <Check size={16} />

                Verify Record

              </button>

            </div>

          </aside>

        </div>

      )}

    </main>

  );

}