const repliesReducer = (replies = [], action) => {
  switch (action.type) {
    case "FETCH_REPLIES":
      return action.payload;
    case "CREATE_REPLY":
      return [...replies, action.payload];
    case "DELETE_REPLY":
      return replies.filter((reply) => reply._id !== action.payload);
    case "DELETE_CHILDREN":
      return replies.filter((reply) => reply.parent !== action.payload);
    default:
      return replies;
  }
};

export default repliesReducer;
