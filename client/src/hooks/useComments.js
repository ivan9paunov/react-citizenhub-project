import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

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
    const [comments, dispatchComments] = useReducer(commentsReducer, []);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await commentsAPI.getAll(reportId);

                dispatchComments({ type: 'GET_ALL', payload: result });
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

    return [comments, dispatchComments];
}