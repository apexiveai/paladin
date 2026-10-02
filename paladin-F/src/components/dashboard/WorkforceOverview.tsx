const sites = [

  {

    name: "HQ",

    workers: 428,

    x: 50,

    y: 50,

  },

  {

    name: "SITE A",

    workers: 214,

    x: 23,

    y: 28,

  },

  {

    name: "SITE B",

    workers: 183,

    x: 76,

    y: 25,

  },

  {

    name: "SITE C",

    workers: 241,

    x: 23,

    y: 76,

  },

  {

    name: "SITE D",

    workers: 182,

    x: 77,

    y: 76,

  },

];

export default function WorkforceOverview() {

  return (

    <section className="workforce-visual neu-card">

      <div className="visual-header">

        <div>

          <span className="section-label">

            LIVE WORKFORCE

          </span>

          <h2>

            Workforce Network

          </h2>

        </div>

        <div className="live-badge">

          <span />

          LIVE

        </div>

      </div>

      <div className="network-stage">

        <div className="network-grid" />

        <div className="network-ring ring-a" />

        <div className="network-ring ring-b" />

        <div className="network-ring ring-c" />

        <svg

          className="network-lines"

          viewBox="0 0 100 100"

          preserveAspectRatio="none"

        >

          <line

            x1="50"

            y1="50"

            x2="23"

            y2="28"

          />

          <line

            x1="50"

            y1="50"

            x2="76"

            y2="25"

          />

          <line

            x1="50"

            y1="50"

            x2="23"

            y2="76"

          />

          <line

            x1="50"

            y1="50"

            x2="77"

            y2="76"

          />

        </svg>

        {sites.map((site, index) => (

          <div

            key={site.name}

            className={`network-node ${

              index === 0 ? "central" : ""

            }`}

            style={{

              left: `${site.x}%`,

              top: `${site.y}%`,

            }}

          >

            <div className="node-glow" />

            <div className="node-core">

              {index === 0 ? "AX" : "●"}

            </div>

            <div className="node-label">

              <strong>{site.name}</strong>

              <span>

                {site.workers} workers

              </span>

            </div>

          </div>

        ))}

        <div className="network-center-info">

          <span>TOTAL WORKFORCE</span>

          <strong>1,248</strong>

          <small>ACTIVE PERSONNEL</small>

        </div>

      </div>

      <div className="visual-footer">

        <div>

          <span className="footer-dot green" />

          Active Sites

          <strong>12</strong>

        </div>

        <div>

          <span className="footer-dot blue" />

          Assigned

          <strong>1,204</strong>

        </div>

        <div>

          <span className="footer-dot orange" />

          Unassigned

          <strong>44</strong>

        </div>

      </div>

    </section>

  );

}