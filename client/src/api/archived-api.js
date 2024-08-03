import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/data/archived';

const getAll = async () => {
    const result = await request.get(BASE_URL);

    const archived = Object.values(result);

    return archived;
};

const getOne = (archiveId) => request.get(`${BASE_URL}/${archiveId}`);

const create = (reportData) => request.post(`${BASE_URL}`, reportData);

const archivedAPI = {
    getAll,
    getOne,
    create
};

export default archivedAPI;