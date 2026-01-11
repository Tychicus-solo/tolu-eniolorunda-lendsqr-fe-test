import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./UserDashboard.scss";
import UserStats from "../../features/users/components/UserStats";
import UserTable from "../../features/users/components/UserTable";
import Pagination from "../../features/users/components/Pagination";
import { getUsers } from "../../features/users/services/userService";


interface DashboardContext {
  searchTerm: string;
}

const UserDashboard: React.FC = () => {
  const { searchTerm } = useOutletContext<DashboardContext>();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setAllUsers(getUsers());
  }, []);

  const organizations = useMemo(
    () => Array.from(new Set(allUsers.map((u) => u.organization))),
    [allUsers]
  );

  const filteredUsers = useMemo(() => {
    let results = allUsers;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      results = results.filter(
        (u) =>
          u.username.toLowerCase().includes(lowerSearch) ||
          u.email.toLowerCase().includes(lowerSearch) ||
          u.organization.toLowerCase().includes(lowerSearch)
      );
    }

    if (columnFilters) {
      results = results.filter((u) => {
        return (
          (!columnFilters.organization ||
            u.organization === columnFilters.organization) &&
          (!columnFilters.username ||
            u.username
              .toLowerCase()
              .includes(columnFilters?.username?.toLowerCase())) &&
          (!columnFilters?.email ||
            u.email
              .toLowerCase()
              .includes(columnFilters?.email?.toLowerCase())) &&
          (!columnFilters?.status || u?.status === columnFilters?.status) &&
          (!columnFilters?.phoneNumber ||
            String(u?.phoneNumber).includes(columnFilters?.phoneNumber))
        );
      });
    }

    return results;
  }, [searchTerm, allUsers, columnFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, columnFilters]);

  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredUsers]);

  return (
    <div className="users-dashboard">
      <h1 className="users-dashboard__title">Users</h1>
      <UserStats />
      <section className="users-dashboard__table-container">
        <UserTable
          users={currentTableData}
          organizations={organizations}
          onApplyFilter={setColumnFilters}
        />
      </section>
      <Pagination
        totalCount={filteredUsers.length}
        pageSize={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setItemsPerPage}
      />
    </div>
  );
};

export default UserDashboard;
