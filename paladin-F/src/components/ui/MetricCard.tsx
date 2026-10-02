type MetricCardProps = {

  label: string;

  value: string;

  change: string;

  description: string;

  icon: string;

  positive?: boolean;

};

export default function MetricCard({

  label,

  value,

  change,

  description,

  icon,

  positive = true,

}: MetricCardProps) {

  return (

    <div className="metric-card neu-card">

      <div className="metric-top">

        <div className="metric-icon">

          {icon}

        </div>

        <span

          className={`metric-change ${

            positive ? "positive" : "negative"

          }`}

        >

          {positive ? "↗" : "↘"} {change}

        </span>

      </div>

      <div className="metric-label">

        {label}

      </div>

      <div className="metric-value">

        {value}

      </div>

      <div className="metric-description">

        {description}

      </div>

      <div className="metric-line">

        <span />

      </div>

    </div>

  );

}