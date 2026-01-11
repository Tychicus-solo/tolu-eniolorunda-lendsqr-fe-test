import { useState } from "react";
import "./UserTable.scss";
import {
  Filter,
  ActivateUser,
  BlacklistUser,
  Eye,
  Ellipsis,
} from "../../../../assets/icons";
import StatusPill from "../StatusPill";
import { useNavigate } from "react-router-dom";
import FilterModal from "../FilterModal";

interface UserTableProps {
  users: any[];
  organizations: string[];
  onApplyFilter: (filters: any) => void;
}

const UserTable = ({ users, organizations, onApplyFilter }: UserTableProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="user-table-wrapper" style={{ position: "relative" }}>
      {showFilter && (
        <FilterModal
          organizations={organizations}
          onFilter={(filters) => {
            onApplyFilter(filters);
            setShowFilter(false);
          }}
          onReset={() => {
            onApplyFilter(null);
            setShowFilter(false);
          }}
        />
      )}

      <table className="user-table">
        <thead>
          <tr>
            {[
              "ORGANIZATION",
              "USERNAME",
              "EMAIL",
              "PHONE NUMBER",
              "DATE JOINED",
              "STATUS",
            ].map((header) => (
              <th key={header}>
                <div className="user-table__header-content">
                  {header}
                  <img
                    src={Filter}
                    alt="filter"
                    className="user-table__filter-icon"
                    onClick={handleFilterToggle}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((user) => (
              <tr key={user?.id}>
                <td>{user?.organization}</td>
                <td>{user?.personalInfo?.fullName || "N/A"}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>{user?.dateJoined}</td>
                <td>
                  <StatusPill status={user?.status} />
                </td>
                <td className="user-table__actions">
                  <button
                    onClick={() => toggleMenu(user.id)}
                    className="user-table__more-btn"
                  >
                    <img src={Ellipsis} alt="more" />
                  </button>

                  {activeMenu === user.id && (
                    <div className="user-table__dropdown">
                      <button
                        className="user-table__dropdown-item"
                        onClick={() => navigate(`/users/${user?.id}`)}
                      >
                        <img src={Eye} alt="" /> View Details
                      </button>
                      <button className="user-table__dropdown-item">
                        <img src={BlacklistUser} alt="" /> Blacklist User
                      </button>
                      <button className="user-table__dropdown-item">
                        <img src={ActivateUser} alt="" /> Activate User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="no-results">
                No users found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
