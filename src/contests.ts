
import { api } from "./client";
import type { Contest } from "./constants";



type ApiContest = Omit<Contest, "startDate" | "endDate"> & {
  startDate: string;
  endDate: string;

  // only returned for admin routes
};

function fromApi(r: ApiContest): Contest {
  console.log("Parsing contest from API:", r);
  const { startDate, endDate, type, ...rest } = r;
  return {
    ...rest,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    type: type === "referral" ? "referral" : "marketing",
  } as Contest;
}

export const contestsApi = {

  /** GET /:school/restaurants/:id */
  getById: async (id: string) => {
    const data = await api.get<ApiContest>(
      `/contests/${encodeURIComponent(id)}`,
    );
    return fromApi(data);
  },

  joinContest: async (id: string, email: string, referredByEmail?: string) => {
    const params = new URLSearchParams({ contestId: id, contestantEmail: email });
    if (referredByEmail) params.set("referredByEmail", referredByEmail);
    await api.post(`/contests/joinContest?${params.toString()}`, {});
  },

  createReferrer: async (
    id: string,
    email: string,
    name: string,
    instagramHandle: string,
  ) => {
    const params = new URLSearchParams({ contestId: id, email, name, instagramHandle });
    await api.post(`/contests/createReferrer?${params.toString()}`, {});
  },

};
