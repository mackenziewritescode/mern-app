const repliesReducer = (replies = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    default:
      return replies;
  }
};

export default repliesReducer;
