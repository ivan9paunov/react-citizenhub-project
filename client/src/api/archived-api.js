import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/data/archived';

const getAll = async (filterValues, page) => {
    let requestURL = BASE_URL;
    const pageSize = 6;

    if (filterValues.order == 'newest') {
        requestURL += '?sortBy=_createdOn%20desc';
    } else {
        requestURL += '?sortBy=_createdOn';
    }

    if (filterValues.topic != 'all') {
        const params = new URLSearchParams({
            where: `topic="${filterValues.topic}"`
        });

        requestURL += `&${params.toString()}`;
    }

    const totalPages = await request.get(`${requestURL}&count`);
    const pages = Math.ceil(totalPages / pageSize);

    requestURL += `&offset=${(page - 1) * pageSize}&pageSize=${pageSize}`;

    const result = await request.get(requestURL);
    const archived = Object.values(result);

    return {
        archived,
        pages
    }
};

const getOne = (archiveId) => request.get(`${BASE_URL}/${archiveId}`);

const create = (reportData) => request.post(`${BASE_URL}`, reportData);

const archivedAPI = {
    getAll,
    getOne,
    create
};

export default archivedAPI;