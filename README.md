# Restful Forum

See it in action [here](https://www.sunkenworld.com/restful-forum).

This app is a personal project I made in order to explore REST APIs with React, Redux, MongoDB, Node and React Router. It's designed to have the basic functionality of a traditional web forum but with a more modern aesthetic. It takes the typical MERN (MongoDB, Express, React, Node) message board project and adds a layer of depth by allowing a thread of replies for each main post. This small addition increases the complexity considerably. All of the code was written by hand and is tailored to this specific project.

I'll do a little breakdown to describe how it works.

Firstly, there's the server made with Node.js and Express, and it's hosted on Heroku. It connects to a database on MongoDB and is comprised of routes for Posts and Replies. The models for Posts and Replies are very similar, execpt that Posts have a "title" propery and Replies have a "parent" property, which is the ID of its parent Post. I could have stored the replies in an array as a propery of Posts, but I kept them seperate as a means of practicing writing API requests. Speaking of which, for each route the server has the ability to make GET, POST, PATCH and DELETE requests. In this article, we'll look at the request to update Posts, since it's the most complex one.

In the React front-end, we use Axios to make HTTP requests from Node. The `updatePost` looks like this:
```
const postUrl = "https://restful-forum.herokuapp.com/posts";

export const updatePost = (id, updatedPost) =>
  axios.patch(`${postUrl}/${id}`, updatedPost);
```
This is imported as `api.updatePost` in postsActions.js, which contains the Redux actions for Posts. This is where asyncronous requests are made to the API, such as:
```
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
```
This dispatched data is used by the postsReducer.js reducer as `action.payload` to modify the state with the updated posts:
```
case "UPDATE_POST":
  return posts.map((post) =>
    post._id === action.payload._id ? action.payload : post
  );
```
There the posts...
