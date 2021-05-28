# Restful Forum

See it in action [here](https://www.sunkenworld.com/restful-forum).

This app is a personal project I made in order to explore REST APIs with React, Redux, MongoDB and Node. It's designed to have the basic functionality of a traditional web forum but with a more modern aesthetic. It takes the typical MERN (MongoDB, Express, React, Node) message board project and adds a layer of depth by allowing a thread of replies for each main post. This small addition increases the complexity considerably. All of the code was written by hand and is tailored to this specific project.

I'll do a little breakdown to describe how it works.

Firstly, there's the server made with Node.js and Express. It connects to a database on MongoDB and is comprised of routes for Posts and Replies. The models for Posts and Replies are very similar, execpt that Posts have a "title" propery and Replies have a "parent" property, which is the ID of its parent Post. I could have stored the replies in an array as a propery of Posts, but I kept them seperate as a means of practicing writing API requests. Speaking of which, for each route the server has the ability to make GET, POST, PATCH and DELETE requests.

In the React front-end, we use Axios to make HTTP requests from Node. 
