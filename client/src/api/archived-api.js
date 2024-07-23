import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/jsonstore/archived';

export const getAll = async () => {
    const result = await request.get(BASE_URL);

    const archived = Object.values(result);

    return archived;
};

export const getOne = (archiveId) => request.get(`${BASE_URL}/${archiveId}`);

const archivedAPI = {
    getAll,
    getOne
};

export default archivedAPI;