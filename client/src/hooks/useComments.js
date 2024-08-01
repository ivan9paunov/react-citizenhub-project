import { useEffect, useReducer } from "react";
import commentsAPI from "../api/comments-api.js";

export function useCreateComment() {
    const createHandler = (reportId, comment) => commentsAPI.create(reportId, comment);

    return createHandler;
};

function commentsReducer(state, action) {
    switch (action.type) {
        case "GET_ALL":
            return action.payload.slice();
        case "ADD_COMMENT":
            return [...state, action.payload];
        case "DELETE_COMMENT":
            return state.filter((c) => c._id != action.payload);
        default: return state;
    }
};

export function useGetAllComments(reportId) {
    const [comments, dispatch] = useReducer(commentsReducer, []);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAll(reportId);

            dispatch({ type: 'GET_ALL', payload: result });
        })();
    }, [reportId]);

    return [comments, dispatch];
}