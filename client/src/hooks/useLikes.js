import { useEffect, useReducer } from "react";
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

    useEffect(() => {
        (async () => {
            const result = await likesAPI.getAll(reportId);

            dispatchLikes({ type: "GET_ALL", payload: result });
        })();
    }, [reportId]);

    return [likes, dispatchLikes];
};