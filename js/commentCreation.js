const instaForm = document.querySelector("#instaForm");
const commentsContainer = document.querySelector("#comments");
var userseq = 1;
var id = 1;
instaForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  /*
  post 코멘트 생성 요청 전송
  */
  const commentInput = instaForm.elements.comment;
  var newComment;
  //json object
  newComment = await postComment(id, userseq, commentInput.value);

  // const usernameInput = instaForm.elements.username;
  var imgUrl = newComment.user.profileImageUrl;
  var created_at = newComment.created_at;
  addComment(newComment.user.username, commentInput.value, imgUrl, created_at);
 // usernameInput.value = "";
  commentInput.value = "";

});

/*댓글 생성(서버)*/
async function postComment(id, userseq, content){
  var data = new Object();
  data.user_seq = userseq;
  data.content = content;
  data.book_id = id;

  const response = fetch("http://localhost:8080/api/comment/createComment", {
    method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_seq: userseq,
      content: content,
      book_id: id,
    })
  });
  
  return response.then(res => res.json());
 
}

/*댓글 생성(프론트)*/
const addComment = (username, comment, profileImageUrl, created_at) => {
  
  const divImg = document.createElement('div');
  divImg.className = "profile-img";
  
  const newImg = document.createElement('img')
  newImg.src = profileImageUrl;
  
  divImg.append(newImg);

  const divCommentView = document.createElement("div");
  divCommentView.className = "comment-view";

  const newComment = document.createElement("div");
  newComment.className = "comment";
  
  //이름
  const bTag = document.createElement("b");

  bTag.append(username);
  newComment.append(divImg);
  divCommentView.append(bTag);

  //생성 시간
  const date = '  ' + created_at.split('.')[0].replace('T',' ');
  //console.log(date);

  divCommentView.append(date);
  
  //댓글 내용
  const brTag = document.createElement("br");
  divCommentView.append(brTag)
  divCommentView.append(`${comment}`);
  
  newComment.append(divCommentView);

  const heartTag = document.createElement("div");
  heartTag.className = "button";
  heartTag.id = "heart";
  
  newComment.append(heartTag);
  
  commentsContainer.prepend(newComment);

};
/*조회*/
function getCommentList(id){
  const response = fetch("http://localhost:8080/api/comment/find?bookId="+id);
  //console.log("response- commentlist");
  //json 배열인데 제대로 될지 모르겠음
  return response.then(res => res.json());
  /*
  return response.then(function(res) {
      for (var i in res){
          i=i.json();
      }
      return res;
  });
  */
}

async function execGetCommentList(id){
  var commentList;
  try {
      commentList = await getCommentList(id);
      //console.log("json array");
      //console.log(commentList);
      /** inner text로 text 바꾸기 */
      const commentListView = document.querySelector(".comment-list");
      for (var i in commentList){
          
          /*댓글 리스트 html 생성 */
          //console.log(commentList[i]);
          addComment(commentList[i].user.username, commentList[i].content, commentList[i].user.profileImageUrl, commentList[i].created_at);

      }
  }
  catch(error){
      console.log(error);
  }
}

execGetCommentList(id);