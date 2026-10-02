import { useState } from "react";

type ProcessingState =

  | "idle"

  | "processing"

  | "complete";

export default function AttendanceAI() {

  const [processing, setProcessing] =

    useState<ProcessingState>("idle");

  const [fileName, setFileName] =

    useState("");

  function handleFile(

    event: React.ChangeEvent<HTMLInputElement>,

  ) {

    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    setProcessing("processing");

    window.setTimeout(() => {

      setProcessing("complete");

    }, 2200);

  }

  return (

    <main className="ai-page">

      <section className="page-heading">

        <div>

          <span className="section-label">

            APEXIVE INTELLIGENCE

          </span>

          <h1>

            Attendance

            <span> AI</span>

          </h1>

          <p>

            Convert attendance sheets into verified

            digital records.

          </p>

        </div>

        <div className="ai-status">

          <span />

          AI ENGINE READY

        </div>

      </section>

      <section className="ai-upload-grid">

        <div className="upload-card neu-card">

          <div className="upload-icon">

            ✦

          </div>

          <h2>

            Upload Attendance Sheet

          </h2>

          <p>

            Upload a photo, scanned sheet, PDF or

            attendance document.

          </p>

          <label className="upload-zone">

            <input

              type="file"

              accept=".jpg,.jpeg,.png,.pdf"

              onChange={handleFile}

            />

            <div className="upload-zone-icon">

              ↑

            </div>

            <strong>

              Drop file here

            </strong>

            <span>

              or click to browse

            </span>

            <small>

              JPG · PNG · PDF

            </small>

          </label>

          {fileName && (

            <div className="selected-file">

              <span>▣</span>

              <div>

                <strong>{fileName}</strong>

                <small>

                  Ready for AI processing

                </small>

              </div>

              <span className="file-ready">

                ✓

              </span>

            </div>

          )}

        </div>

        <div className="ai-process-card neu-card">

          <div className="card-heading">

            <div>

              <span className="section-label">

                PROCESSING PIPELINE

              </span>

              <h3>

                AI Recognition

              </h3>

            </div>

            <span className="ai-chip">

              AI

            </span>

          </div>

          <div className="pipeline">

            <PipelineStep

              number="01"

              title="Document Analysis"

              description="Detect sheet structure"

              active={

                processing === "processing" ||

                processing === "complete"

              }

            />

            <PipelineStep

              number="02"

              title="OCR Recognition"

              description="Read names and marks"

              active={

                processing === "processing" ||

                processing === "complete"

              }

            />

            <PipelineStep

              number="03"

              title="Handwriting Detection"

              description="Interpret attendance marks"

              active={

                processing === "complete"

              }

            />

            <PipelineStep

              number="04"

              title="Confidence Analysis"

              description="Identify uncertain records"

              active={

                processing === "complete"

              }

            />

            <PipelineStep

              number="05"

              title="Human Verification"

              description="Approve AI results"
active={false}

            />

          </div>

        </div>

      </section>

      {processing === "processing" && (

        <section className="processing-banner neu-card">

          <div className="processing-orb">

            <span />

          </div>

          <div>

            <strong>

              AI is analyzing your attendance sheet

            </strong>

            <span>

              Detecting rows, workers and attendance

              marks...

            </span>

          </div>

          <div className="processing-percent">

            68%

          </div>

        </section>

      )}

      {processing === "complete" && (

        <VerificationPreview />

      )}

    </main>

  );

}

function PipelineStep({

  number,

  title,

  description,

  active,

}: {

  number: string;

  title: string;

  description: string;

  active: boolean;

}) {

  return (

    <div

      className={`pipeline-step ${

        active ? "active" : ""

      }`}

    >

      <div className="pipeline-number">

        {active ? "✓" : number}

      </div>

      <div>

        <strong>{title}</strong>

        <span>{description}</span>

      </div>

    </div>

  );

}

function VerificationPreview() {

  return (

    <section className="verification-card neu-card">

      <div className="verification-header">

        <div>

          <span className="section-label">

            AI DRAFT

          </span>

          <h2>

            Verification Required

          </h2>

          <p>

            Review AI-detected attendance before

            creating AttendanceRecord entries.

          </p>

        </div>

        <div className="confidence">

          <span>AI CONFIDENCE</span>

          <strong>94.8%</strong>

        </div>

      </div>

      <div className="verification-summary">

        <div>

          <span>WORKERS DETECTED</span>

          <strong>48</strong>

        </div>

        <div>

          <span>PRESENT</span>

          <strong>1,218</strong>

        </div>

        <div>

          <span>ABSENT</span>

          <strong>164</strong>

        </div>

        <div>

          <span>REVIEW REQUIRED</span>

          <strong className="warning-text">

            17

          </strong>

        </div>

      </div>

      <div className="verification-table">

        <div className="verification-row header">

          <span>WORKER</span>

          <span>DATE</span>

          <span>AI RESULT</span>

          <span>CONFIDENCE</span>

          <span>ACTION</span>

        </div>

        <VerificationRow

          worker="SEC-0001"

          date="01 Oct"

          result="PRESENT"

          confidence="99.2%"

        />

        <VerificationRow

          worker="SEC-0002"

          date="01 Oct"

          result="PRESENT"

          confidence="97.8%"

        />

        <VerificationRow

          worker="SEC-0003"

          date="01 Oct"

          result="ABSENT"

          confidence="98.4%"

        />

        <VerificationRow

          worker="SEC-0004"

          date="01 Oct"

          result="HALF DAY"

          confidence="81.2%"

          warning

        />

        <VerificationRow

          worker="SEC-0005"

          date="01 Oct"

          result="PRESENT"

          confidence="95.7%"

        />

      </div>

      <div className="verification-actions">

        <button className="secondary-button">

          Review All

        </button>

        <button className="primary-button">

          ✓ Approve Verified Records

        </button>

      </div>

    </section>

  );

}

function VerificationRow({

  worker,

  date,

  result,

  confidence,

  warning = false,

}: {

  worker: string;

  date: string;

  result: string;

  confidence: string;

  warning?: boolean;

}) {

  return (

    <div className="verification-row">

      <span className="worker-code">

        {worker}

      </span>

      <span>{date}</span>

      <span

        className={`result-pill ${
result === "PRESENT"

            ? "present"

            : result === "ABSENT"

              ? "absent"

              : "half"

        }`}

      >

        {result}

      </span>

      <span

        className={

          warning

            ? "confidence-warning"

            : "confidence-good"

        }

      >

        {confidence}

      </span>

      <button className="verify-button">

        {warning ? "Review" : "✓"}

      </button>

    </div>

  );

}