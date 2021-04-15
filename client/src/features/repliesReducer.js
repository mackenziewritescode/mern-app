const repliesReducer = (replies = [], action) => {
  switch (action.type) {
    case "FETCH_REPLIES":
      return action.payload;
    case "CREATE_REPLY":
      return [...replies, action.payload];
    default:
      return replies;
  }
};

export default repliesReducer;
