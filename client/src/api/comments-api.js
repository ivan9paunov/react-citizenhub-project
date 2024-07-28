import requester from "./requester.js";

const BASE_URL = 'http://localhost:3030/jsonstore/reports';

const buildUrl = (reportId) => `${BASE_URL}/${reportId}/comments`;

const create = (reportId, comment) => requester.post(buildUrl(reportId), { comment });
;

const getAll = async (reportId) => {
    const result = await requester.get(buildUrl(reportId));

    const comments = Object.values(result);

    return comments;
};

const commentsApi = {
    create,
    getAll
}

export default commentsApi;