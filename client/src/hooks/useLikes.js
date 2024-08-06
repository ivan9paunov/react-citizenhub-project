import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import likesAPI from "../api/likes-api.js";

export function useCreateLike() {
    const createHandler = (reportId) => likesAPI.create(reportId);

    return createHandler;
};

export function useRemoveLike() {
    const removeHandler = (likeId) => likesAPI.remove(likeId);

    return removeHandler;
}

function likesReducer(state, action) {
    switch (action.type) {
        case "GET_ALL":
            return action.payload.slice();
        case "LIKE":
            return [...state, action.payload];
        case "DISLIKE":
            return state.filter((l) => l._id != action.payload);
        default: return state;
    }
};

export function useGetAllLikes(reportId) {
    const [likes, dispatchLikes] = useReducer(likesReducer, []);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await likesAPI.getAll(reportId);

                dispatchLikes({ type: "GET_ALL", payload: result });
            } catch (err) {
                if (err.code.toString().startsWith('4')) {
                    navigate('/404');
                    throw new Error(err.message);
                }

                if (err.code.toString().startsWith('5')) {
                    navigate('/server-error');
                    throw new Error(err.message);
                }
            }
        })();
    }, [reportId]);

    return [likes, dispatchLikes];
};