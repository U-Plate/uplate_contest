
import { api } from "./client";
import type { Contest } from "./constants";



type ApiContest = Omit<Contest, "startDate" | "endDate"> & {
  startDate: string;
  endDate: string;

  // only returned for admin routes
};

function fromApi(r: ApiContest): Contest {
  console.log("Parsing contest from API:", r);
  const { startDate, endDate, ...rest } = r;
  return {
    ...rest,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  } as Contest;
}

export const contestsApi = {

  /** GET /:school/restaurants/:id */
  getById: async (id: string) => {
    const data = await api.get<ApiContest>(
      `/contests/${id}`,
    );
    return fromApi(data);
  },

  joinContest: async (id: string, email: string) => {
    await api.post(`/contests/joinContest?contestId=${id}&contestantEmail=${email}`, {});
  }


};
