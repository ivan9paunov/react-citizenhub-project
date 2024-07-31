import { act, useEffect, useReducer } from "react";
import commentsApi from "../api/comments-api.js";

export function useCreateComment() {
    const createHandler = (reportId, comment, username) => commentsApi.create(reportId, comment, username);

    return createHandler;
};

function commentsReducer(state, action) {
    switch (action.type) {
        case "GET_ALL":
            return action.payload.slice();
        case "ADD_COMMENT":
            return [...state, action.payload];
        default: return state;
    }
};

export function useGetAllComments(reportId) {
    const [comments, dispatch] = useReducer(commentsReducer, []);

    useEffect(() => {
        (async () => {
            const result = await commentsApi.getAll(reportId);

            dispatch({ type: 'GET_ALL', payload: result });
        })();
    }, [reportId, comments]);

    return [comments, dispatch];
}