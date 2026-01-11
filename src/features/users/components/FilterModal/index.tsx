import React, { useState } from "react";
import "./FilterModal.scss";

interface FilterModalProps {
  onFilter: (filters: any) => void;
  onReset: () => void;
  organizations: string[];
}

const FilterModal = ({
  onFilter,
  onReset,
  organizations,
}: FilterModalProps) => {
  const [formValues, setFormValues] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(formValues);
  };

  return (
    <div className="filter-modal">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="organization">Organization</label>
          <select
            id="organization"
            name="organization"
            onChange={handleChange}
            value={formValues.organization}
          >
            <option value="">Select</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="User"
            onChange={handleChange}
            value={formValues.username}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formValues.email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={handleChange}
            value={formValues.date}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formValues.phoneNumber}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            onChange={handleChange}
            value={formValues.status}
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="filter-modal__btns">
          <button
            type="button"
            className="btn-reset"
            onClick={() => {
              setFormValues({
                organization: "",
                username: "",
                email: "",
                date: "",
                phoneNumber: "",
                status: "",
              });
              onReset();
            }}
          >
            Reset
          </button>
          <button type="submit" className="btn-filter">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterModal;
