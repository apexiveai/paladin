export default function AttendanceOverview() {

  return (

    <section className="small-dashboard-card neu-card">

      <div className="card-heading">

        <div>

          <span className="section-label">

            ATTENDANCE

          </span>

          <h3>Daily Overview</h3>

        </div>

        <button>•••</button>

      </div>

      <div className="attendance-ring">

        <div className="attendance-ring-inner">

          <strong>96.8%</strong>

          <span>Present</span>

        </div>

      </div>

      <div className="attendance-stats">

        <div>

          <span className="status-dot green" />

          <label>Present</label>

          <strong>1,208</strong>

        </div>

        <div>

          <span className="status-dot red" />

          <label>Absent</label>

          <strong>40</strong>

        </div>

        <div>

          <span className="status-dot orange" />

          <label>Late</label>

          <strong>18</strong>

        </div>

      </div>

    </section>

  );

}