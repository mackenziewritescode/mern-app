import * as api from "../api/index.js";

export const getReplies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchReplies();
    dispatch({ type: "FETCH_REPLIES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createReply = (reply) => async (dispatch) => {
  try {
    const { data } = await api.createReply(reply);
    dispatch({ type: "CREATE_REPLY", payload: data });
  } catch (error) {
    console.log(error);
  }
};
