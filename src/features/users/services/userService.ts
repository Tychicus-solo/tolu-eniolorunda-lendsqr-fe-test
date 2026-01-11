import mockData from "./users.json";

const STORAGE_KEY = "lendsqr_users";

export const getUsers = () => {
  
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
    return mockData;
  }

  return JSON.parse(stored);
};

export const getUserById = (id: string) => {
  const users = getUsers();
  return users.find((user: any) => user.id === id);
};
