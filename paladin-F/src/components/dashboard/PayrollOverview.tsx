export default function PayrollOverview() {

  return (

    <section className="small-dashboard-card neu-card">

      <div className="card-heading">

        <div>

          <span className="section-label">

            PAYROLL

          </span>

          <h3>October 2026</h3>

        </div>

        <button>•••</button>

      </div>

      <div className="payroll-total">

        <span>Total Payroll</span>

        <strong>

          384.2M

          <small> MMK</small>

        </strong>

        <div className="payroll-change">

          ↗ 8.7% from September

        </div>

      </div>

      <div className="payroll-bars">

        <div className="bar-row">

          <span>Approved</span>

          <div>

            <i style={{ width: "82%" }} />

          </div>

          <strong>82%</strong>

        </div>

        <div className="bar-row">

          <span>Pending</span>

          <div>

            <i style={{ width: "14%" }} />

          </div>

          <strong>14%</strong>

        </div>

        <div className="bar-row">

          <span>Exception</span>

          <div>

            <i style={{ width: "4%" }} />

          </div>

          <strong>4%</strong>

        </div>

      </div>

    </section>

  );

}