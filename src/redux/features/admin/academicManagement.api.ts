import { baseAPI } from "../../api/baseAPI";

const academicSemesterApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => {
        return {
          url: "/academic-semesters",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllSemestersQuery } = academicSemesterApi;
