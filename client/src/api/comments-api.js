import requester from "./requester.js";

const BASE_URL = 'http://localhost:3030/data/comments';

const create = (reportId, comment, username) => requester.post(BASE_URL, { reportId, comment, author: { username } });

const getAll = (reportId) => {
    const params = new URLSearchParams({
        where: `reportId="${reportId}"`
    });

    return requester.get(`${BASE_URL}?${params.toString()}`);
};

const remove = (commentId) => requester.del(`${BASE_URL}/${commentId}`);

const commentsApi = {
    create,
    getAll,
    remove
}

export default commentsApi;