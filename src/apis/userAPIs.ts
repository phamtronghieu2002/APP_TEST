import instance from "@/configs/axios";

interface paramGetUser {
  limit?: number;
  offset?: number;
  q?: string;
}
interface paramFilterUser {
  key: string;
  value: string;
  q?: string;
}

const userApis = {
  async getUser(
    params: paramGetUser = {
      limit: 10,
      offset: 0,
      q: "",
    }
  ) {
    const response = await instance.get(
      `/users/search?skip=${params?.offset}&limit=${params?.limit}&q=${params?.q}`
    );
    return response?.data;
  },

  async filterUser(params: paramFilterUser) {
    const response = await instance.get(
      `/users/filter?q=${params?.q}&key=${params?.key}&value=${params?.value}`
    );
    return response?.data;
  },
};
export default userApis;
