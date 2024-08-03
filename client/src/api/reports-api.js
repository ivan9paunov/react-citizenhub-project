import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/data/reports';

const getAll = async () => {
    const result = await request.get(`${BASE_URL}?sortBy=_createdOn%20desc`);

    const reports = Object.values(result);

    return reports;
};

const getOne = (reportId) => request.get(`${BASE_URL}/${reportId}`);

const create = (reportData) => request.post(`${BASE_URL}`, reportData);

const remove = (reportId) => request.del(`${BASE_URL}/${reportId}`);

const update = (reportId, reportData) => request.put(`${BASE_URL}/${reportId}`, reportData);

const reportsAPI = {
    getAll,
    getOne,
    create,
    remove,
    update
};

export default reportsAPI;