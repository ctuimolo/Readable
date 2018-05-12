Submission: Chaiz Tuimoloau
5.11.2018
Udacity React Nanodegree Assignment #2: 'Readable'

This project was developed according to the rubric https://review.udacity.com/#!/rubrics/1017/view with Udacity's provided starter code
provided at https://github.com/udacity/reactnd-project-readable-starter for the backend server API.

INSTALLATION:
>npm install
>cd api-server
>node server

>cd frontend
>npm install
>npm start

FUNCTIONALITY:
The server api loaded will be listening on port 3001 by default, frontend/src/ServerURL.js contains the constant to point towards
Localhost:3001, but also contains the reference to `${process.env.REACT_APP_BACKEND}` which is leftover from the MyProjectWorkspace 
found in the MyProjectWorkSpace starter code.

{Root}/
Post a new post by filling out the submission form at top to submit a new post, the categories/sort bar underneath will organize
the current posts and can sort filter to a specific category. clicking a category will jump to {root}/:category. User can vote,
edit or delete posts from this page. Clicking on a 'comments/details' button will jump to a {root}/:category/:id page detailing
the post and its comments.

{Root}/:category
The same component as {Root}/but with the current posts filtered to {:category}

{Root}/:category/:id
Will load the details of a post {:id} in category {:category} along with its comments. User can vote, edit or delete the post
or listed comments. Fill out the comment form a the bottom to submit to the current post.