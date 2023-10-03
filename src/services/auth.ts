import axios from "axios";

export const authService = axios.create({
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk2Mjg0MzQwLCJleHAiOjE2OTg4NzYzNDB9.tGMSOY6BCd4CpuuzCFOqciy-E8r4ktYTTkz4KMGrZGI`,
  },
});

export const login = async (email: string, password: string) => {
  const { data } = await axios.post("http://localhost:1337/api/auth/local/", {
    identifier: "mikel@aaa.pl",
    password: "password",
  });
  return data;
};
