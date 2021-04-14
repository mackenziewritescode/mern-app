import * as api from "../api/index.js";

export const getReplies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchReplies();

    dispatch({ type: "FETCH_REPLIES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
