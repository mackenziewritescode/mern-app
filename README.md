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
This is imported as `api.updatePost` in postsActions.js, which contains the Redux actions for Posts. This is where asyncronous requests are made to the API and actions are dispatched, such as:
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
We can see here that if the ID of the post that was edited matches the ID of a post in the state, then that post should be replaced with the updated data.

So, how do we edit and update a post on the client-side? First we need to click on the menu drop-down on the post we want to edit, then click "Edit post." Doing this stores the ID of that post to the propery of `currentPostId` with React's `useState` and is stored at the root of the application in App.js and shared with `createContext`. This property is accessed in the PostForm.js component with `useConext.` In PostForm.js, if `currentPostId` exists, it will populate the form fields with the state properties for that post: 
```
useEffect(() => {
  if (currentPostId) {
    setTitle(existingPost.title);
    setAuthor(existingPost.author);
    setContent(existingPost.content);
  }
  // eslint-disable-next-line
}, [currentPostId]);
```
