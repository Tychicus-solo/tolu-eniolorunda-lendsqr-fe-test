import "./StatusPill.scss";

type StatusType = "Inactive" | "Pending" | "Blacklisted" | "Active";

const StatusPill = ({ status }: { status: StatusType }) => {
  const modifier = status.toLowerCase();

  return (
    <span className={`status-pill status-pill--${modifier}`}>{status}</span>
  );
};

export default StatusPill;
