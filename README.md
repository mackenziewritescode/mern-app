# Restful Forum

See it in action [here](https://www.sunkenworld.com/restful-forum).

This app is a personal project I made in order to explore REST APIs with React, Redux, MongoDB, Node and React Router. It's designed to have the basic functionality of a traditional web forum but with a more modern aesthetic. It takes the typical MERN (MongoDB, Express, React, Node) message board exercise and adds a layer of depth by allowing a thread of replies for each main post. This small addition increases the complexity considerably. All of the code was written by hand and is tailored to this specific project.

I'll do a little breakdown to describe how one aspect of it works.

Firstly, there's the server made with Node.js and Express, and it's hosted on Heroku. It connects to a database on MongoDB and is comprised of routes for Posts and Replies. The models for Posts and Replies are very similar, except that Posts have a "title" property and Replies have a "parent" property, which is the ID of its parent Post. I could have stored the replies in an array as a property of Posts, but I kept them seperate as a means of practicing writing API requests. Speaking of which, for each route the server has the ability to make GET, POST, PATCH and DELETE requests. In this article, we'll look at how Posts are updated, since it's the most complex area.

In the React front-end, we use Axios to make HTTP requests from Node. The `updatePost` function looks like this:
```
const postUrl = "https://restful-forum.herokuapp.com/posts";

export const updatePost = (id, updatedPost) =>
  axios.patch(`${postUrl}/${id}`, updatedPost);
```
Here, axios updates the post at the URL containing the post’s ID with the supplied post data. This function is imported as `api.updatePost` in postsActions.js, which contains the Redux actions for Posts. This is where asynchronous requests are made to the API and actions are dispatched, such as:
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

So, how do we edit and update a post on the client-side? First we need to click on the menu drop-down on the post we want to edit, then click "Edit post." Doing this stores the ID of that post to the property of `currentPostId` using React's `useState`. This is stored at the root of the application in App.js and it shares this piece of state with other components using the `createContext` hook. This property is accessed in the PostForm.js component with `useConext`. In PostForm.js, if `currentPostId` exists (which happens as soon as "Edit post" is clicked), it will populate the form fields with the Redux state properties for that post:
```
useEffect(() => {
  if (currentPostId) {
    setTitle(existingPost.title);
    setAuthor(existingPost.author);
    setContent(existingPost.content);
  }
}, [currentPostId]);
```
Where `existingPost` is defined as:
```
const existingPost = currentPostId
    ? posts.find((post) => post._id === currentPostId)
    : null;
```
Finally, to submit the edited post, the "Submit" button on the form is pressed and the `handleSubmit` function is run, which dispatches the new data:
```
const handleSubmit = async (e) => {
  e.preventDefault();
  if (canSave) {
    if (!existingPost) {
      //-------------------- CREATE POST
      <CREATE POST CODE OMITTED>
    } else {
      //-------------------- EDIT POST
      try {
        const updatedPost =
          image || imageRemoved
            ? { title, author, content, image }
            : { title, author, content };
        setReqStatus("pending");
        await dispatch(updatePost(currentPostId, updatedPost));
      } catch (error) {
        console.log(error);
      } finally {
        setReqStatus("idle");
        setCurrentPostId("");
        clearForm();
      }
    }
  }
};
```
This is an async/await function that dispatches the updated post along with its ID. `updatedPost` is an object that contains all of the data of a post. You can see that depending on if an image exists in the local state or if it was removed by pressing the "Remove image" button (which sets `imageRemoved` === true), the object may or may not include an image. The dispatch runs the `updatePost` action described above with the request status state property `reqStatus` set to "pending," and if it is dispatched successfully, the status is set to "idle," the `currentPostId` is removed and the form fields are cleared. This means that the post was successfully updated!

***

That was just a brief look at one aspect of how Redux is used in conjunction with Express and MongoDB to modify data on this web forum. If you're interested in seeing more code, have a look in the `client/src` and `server` folders for lots more.

Thanks for reading! Check out the rest of my work at https://www.sunkenworld.com/.


