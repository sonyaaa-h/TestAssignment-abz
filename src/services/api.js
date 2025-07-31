import axios from "axios";

export const api = axios.create({
    baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1",
});

export const fetchUsers = async(page) => {
    const {data} =  await api.get(`/users?count=6&page=${page}`);
    return data;
}