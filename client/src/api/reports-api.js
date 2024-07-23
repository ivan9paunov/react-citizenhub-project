import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/jsonstore/reports';

export const getAll = async () => {
    const result = await request.get(BASE_URL);

    const reports = Object.values(result);

    return reports;
};

export const getOne = (reportId) => request.get(`${BASE_URL}/${reportId}`);

const reportsAPI = {
    getAll,
    getOne
};

export default reportsAPI;