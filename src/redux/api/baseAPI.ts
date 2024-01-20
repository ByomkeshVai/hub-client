import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseWithRefreshToken = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    const user = (api.getState() as RootState).auth.user;

    api.dispatch(
      setUser({
        user,
        token: data?.data?.accessToken,
      })
    );
  }
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseWithRefreshToken,
  endpoints: () => ({}),
});
