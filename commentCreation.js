const instaForm = document.querySelector("#instaForm");
const commentsContainer = document.querySelector("#comments");
instaForm.addEventListener("submit", function (e) {
  e.preventDefault();
 // const usernameInput = instaForm.elements.username;
  const commentInput = instaForm.elements.comment;
  addComment("Seyeon", commentInput.value);
 // usernameInput.value = "";
  commentInput.value = "";
});
/*댓글 생성*/
const addComment = (username, comment) => {
    const divImg = document.createElement('div');
    divImg.className = "profile-img";
    const newImg = document.createElement('img')
    newImg.src = "https://lh3.googleusercontent.com/a/AATXAJyL7DTh3BXTifLQPj2W_KotPWk2lLRoeKTIfU5l=s96-c"
    divImg.append(newImg);

    const divCommentView = document.createElement("div");
    divCommentView.className = "comment-view";
  const newComment = document.createElement("div");
  newComment.className = "comment";
  const bTag = document.createElement("b");
  bTag.append(username);
  newComment.append(divImg);
  divCommentView.append(bTag);
  const brTag = document.createElement("br");
  divCommentView.append(brTag)
  divCommentView.append(`${comment}`);
  newComment.append(divCommentView);
  const heartTag = document.createElement("div");
  heartTag.className = "button";
  heartTag.id = "heart";
  newComment.append(heartTag);
commentsContainer.append(newComment);
};