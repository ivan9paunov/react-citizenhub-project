import requester from "./requester.js";

const BASE_URL = 'http://localhost:3030/data/likes';

const create = (reportId) => requester.post(BASE_URL, { reportId });

const getAll = (reportId) => {
    const params = new URLSearchParams({
        where: `reportId="${reportId}"`,
        load: `author=_ownerId:users`
    });

    return requester.get(`${BASE_URL}?${params.toString()}`);
};

const remove = (likeId) => requester.del(`${BASE_URL}/${likeId}`);

const likesAPI = {
    create,
    getAll,
    remove
};

export default likesAPI;