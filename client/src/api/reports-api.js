import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/data/reports';

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
    const reports = Object.values(result);
    
    return {
        reports,
        pages
    }
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