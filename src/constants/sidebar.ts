import * as Icons from "../assets/icons"

export const sidebarLinks = [
  {
    title: "Switch Organization",
    icon: Icons.Briefcase,
    path: "/switch-org",
    type: "top",
  },
  { title: "Dashboard", icon: Icons.Dashboard, path: "/dashboard", type: "top" },

  { title: "CUSTOMERS", header: true },
  { title: "Users", icon: Icons.Users, path: "/users" },
  { title: "Guarantors", icon: Icons.Guarantors, path: "/guarantors" },
  { title: "Loans", icon: Icons.Loans, path: "/loans" },
  { title: "Decision Models", icon: Icons.DecisionModels, path: "/decision-models" },
  { title: "Savings", icon: Icons.Savings, path: "/savings" },
  { title: "Loan Requests", icon: Icons.LoanRequests, path: "/loan-requests" },
  { title: "Whitelist", icon: Icons.Whitelist, path: "/whitelist" },
  { title: "Karma", icon: Icons.Karma, path: "/karma" },

  { title: "BUSINESSES", header: true },
  { title: "Organization", icon: Icons.Briefcase, path: "/organization" },
  { title: "Loan Products", icon: Icons.LoanRequests, path: "/loan-products" },
  { title: "Savings Products", icon: Icons.SavingsProducts, path: "/savings-products" },
  { title: "Fees and Charges", icon: Icons.FeesAndCharges, path: "/fees" },
  { title: "Transactions", icon: Icons.Transactions, path: "/transactions" },
  { title: "Services", icon: Icons.Services, path: "/services" },
  { title: "Service Account", icon: Icons.ServiceAccount, path: "/service-account" },
  { title: "Settlements", icon: Icons.Settlements, path: "/settlements" },
  { title: "Reports", icon: Icons.Reports, path: "/reports" },

  { title: "SETTINGS", header: true },
  { title: "Preferences", icon: Icons.Preferences, path: "/preferences" },
  { title: "Fees and Pricing", icon: Icons.FeesAndPricing, path: "/pricing" },
  { title: "Audit Logs", icon: Icons.AuditLogs, path: "/audit-logs" },
];
