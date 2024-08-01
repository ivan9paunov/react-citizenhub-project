import requester from "./requester.js";

const BASE_URL = 'http://localhost:3030/data/comments';

const create = (reportId, comment) => requester.post(BASE_URL, { reportId, comment });

const getAll = (reportId) => {
    const params = new URLSearchParams({
        where: `reportId="${reportId}"`,
        load: `author=_ownerId:users`
    });

    return requester.get(`${BASE_URL}?${params.toString()}`);
};

const remove = (commentId) => requester.del(`${BASE_URL}/${commentId}`);

const commentsAPI = {
    create,
    getAll,
    remove
}

export default commentsAPI;