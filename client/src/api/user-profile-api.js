import * as request from './requester.js';

const getAll = async (userId, collection, filterValues, page) => {
    let requestURL = `http://localhost:3030/data/${collection}`;
    const pageSize = 6;

    const ownerParams = new URLSearchParams({
        where: `_ownerId="${userId}"`
    });

    requestURL += `?${ownerParams.toString()}`

    if (filterValues.order == 'newest') {
        requestURL += '&sortBy=_createdOn%20desc';
    } else {
        requestURL += '&sortBy=_createdOn';
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

const reportsAPI = {
    getAll
};

export default reportsAPI;