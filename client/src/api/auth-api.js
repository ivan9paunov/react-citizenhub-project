import requester from "./requester.js";

const BASE_URL = 'http://localhost:3030/users';

export const login = async (email, password) => await requester.post(`${BASE_URL}/login`, { email, password });