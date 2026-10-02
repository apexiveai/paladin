import { useEffect, useState } from "react";

import { Activity, AlertCircle, LoaderCircle } from "lucide-react";

import { getBackendHealth } from "../../services/health";

type Status = "checking" | "online" | "offline";

export default function BackendStatus() {

  const [status, setStatus] = useState<Status>("checking");

  const [message, setMessage] = useState("Checking backend...");

  useEffect(() => {

    let mounted = true;

    async function checkBackend() {

      try {

        const result = await getBackendHealth();

        if (!mounted) return;

        setStatus("online");

        setMessage(

          typeof result.status === "string"

            ? result.status

            : "Backend connected",

        );

      } catch {

        if (!mounted) return;

        setStatus("offline");

        setMessage("Backend unavailable");

      }

    }

    checkBackend();

    return () => {

      mounted = false;

    };

  }, []);

  const icon =

    status === "checking" ? (

      <LoaderCircle className="backend-status-spin" size={16} />

    ) : status === "online" ? (

      <Activity size={16} />

    ) : (

      <AlertCircle size={16} />

    );

  return (

    <div className={`backend-status ${status}`}>

      <span className="backend-status-icon">{icon}</span>

      <span className="backend-status-copy">

        <strong>

          {status === "checking"

            ? "Backend"

            : status === "online"

              ? "API Connected"

              : "API Offline"}

        </strong>

        <small>{message}</small>

      </span>

      <span className="backend-status-dot" />

    </div>

  );

}