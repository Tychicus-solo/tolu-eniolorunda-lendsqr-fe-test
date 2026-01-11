import "./UserStats.scss";
import * as Icons from "../../../../assets/icons";

const statsData = [
  {
    label: "USERS",
    value: "2,453",
    icon: Icons.UserStats,
    color: "#df18ff",
  },
  {
    label: "ACTIVE USERS",
    value: "2,453",
    icon: Icons.ActiveUsersStats,
    color: "#5718ff",
  },
  {
    label: "USERS WITH LOANS",
    value: "12,453",
    icon: Icons.UsersWithLoans,
    color: "#f55f44",
  },
  {
    label: "USERS WITH SAVINGS",
    value: "102,453",
    icon: Icons.UsersWithSavings,
    color: "#ff3366",
  },
];

const UserStats = () => (
  <div className="user-stats-container">
    {statsData.map((stat) => (
      <div key={stat.label} className="stat-card">
        <div
          className="stat-card__icon-wrapper"
          style={{ backgroundColor: `${stat.color}15` }}
        >
          <img src={stat.icon} alt="" className="stat-card__icon" />
        </div>
        <span className="stat-card__label">{stat?.label}</span>
        <span className="stat-card__value">{stat?.value}</span>
      </div>
    ))}
  </div>
);

export default UserStats;
