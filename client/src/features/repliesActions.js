import * as api from "../api/index.js";

export const getReplies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchReplies();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
