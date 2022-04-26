const instaForm = document.querySelector("#instaForm");
const commentsContainer = document.querySelector("#comments");

console.log(location.href);

temp = location.href.split("?");
querys = temp[1].split("&");
var userseq = querys[0].split("=")[1];
var id = querys[1].split("=")[1];

/*댓글 추가 이벤트*/
instaForm.addEventListener("submit", async function (e) {
  console.log("submit");
  e.preventDefault();
  /*
  post 코멘트 생성 요청 전송
  */
  const commentInput = instaForm.elements.comment;
  var newComment;
  //json object
  newComment = await postComment(id, userseq, commentInput.value);
  /**
   * 코멘트 생성(프론트)
   */
  // const usernameInput = instaForm.elements.username;
  var imgUrl = newComment.user.profileImageUrl;
  var created_at = newComment.created_at;
  addComment(
    newComment.user.username,
    commentInput.value,
    imgUrl,
    created_at,
    newComment.id,
    0
  );
  // usernameInput.value = "";
  commentInput.value = "";
});

/*댓글 생성(서버)*/
async function postComment(id, userseq, content) {
  var data = new Object();
  data.user_seq = userseq;
  data.content = content;
  data.book_id = id;

  const response = fetch("http://localhost:9090/api/comment/createComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_seq: userseq,
      content: content,
      book_id: id,
    }),
  });

  return response.then((res) => res.json());
}

/*댓글 생성(프론트)*/
const addComment = (
  username,
  comment,
  profileImageUrl,
  created_at,
  commentid,
  likes
) => {
  const divImg = document.createElement("div");
  divImg.className = "profile-img";

  const newImg = document.createElement("img");
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
  const date = "  " + created_at.split(".")[0].replace("T", " ");
  //console.log(date);

  divCommentView.append(date);

  //댓글 내용
  const brTag = document.createElement("br");
  divCommentView.append(brTag);
  divCommentView.append(`${comment}`);

  newComment.append(divCommentView);

  //좋아요 버튼
  const likeDiv = document.createElement("div");
  likeDiv.id = "container";

  const likeTag = document.createElement("div");
  likeTag.className = "heart-like-button";
  likeDiv.append(likeTag);
  //좋아요 수
  var likesDiv = document.createElement("div");
  likesDiv.id = "likes-div";
  var likesNode = document.createTextNode(likes);
  likesDiv.appendChild(likesNode);
  likeDiv.append(likesDiv);

  //  likeDiv.append(likesDiv);

  //좋아요 이벤트
  likeTag.addEventListener("click", async () => {
    //프론트
    if (likeTag.classList.contains("liked")) {
      likeTag.classList.remove("liked");
      likes = likes - 1;
    } else {
      likeTag.classList.add("liked");
      likes = likes + 1;
    }
    //새 좋아요 div
    var newlikesDiv = document.createElement("div");
    newlikesDiv.id = "likes-div";
    var newlikesNode = document.createTextNode(likes);
    newlikesDiv.appendChild(newlikesNode);

    /*이전 값 찾기*/
    //var oldlikes = likeDiv.getElementById("likes-div");

    //console.log("oldlikes = ", oldlikes);
    likeDiv.replaceChild(newlikesDiv, likesDiv);
    //likeDiv.querySelector("#text").value = likes;

    //서버
  });

  newComment.append(likeDiv);

  //삭제 버튼
  const delTag = document.createElement("button");
  delTag.className = "delButton";
  delTag.append("❌");
  delTag.addEventListener("click", async () => {
    //프론트 삭제
    commentsContainer.removeChild(newComment);
    //서버 삭제
    console.log(commentid);
    await deleteComment(commentid);
  });

  newComment.append(delTag);
  newComment.id = commentid; //코멘트 id

  commentsContainer.prepend(newComment);
};

/*댓글 삭제(서버) */
async function deleteComment(commentid) {
  const response = fetch(
    "http://localhost:9090/api/comment/delete/" + commentid,
    {
      method: "DELETE",
    }
  );
}

/*댓글 리스트 조회(서버)*/
function getCommentList(id) {
  const response = fetch("http://localhost:9090/api/comment/find?bookId=" + id);
  //console.log("response- commentlist");
  //json 배열인데 제대로 될지 모르겠음
  return response.then((res) => res.json());
  /*
  return response.then(function(res) {
      for (var i in res){
          i=i.json();
      }
      return res;
  });
  */
}

async function execGetCommentList(id) {
  var commentList;
  try {
    commentList = await getCommentList(id);
    //console.log("json array");
    //console.log(commentList);
    /** inner text로 text 바꾸기 */
    const commentListView = document.querySelector(".comment-list");
    for (var i in commentList) {
      /*댓글 리스트 html 생성 */
      //console.log(commentList[i]);
      addComment(
        commentList[i].user.username,
        commentList[i].content,
        commentList[i].user.profileImageUrl,
        commentList[i].created_at,
        commentList[i].id,
        commentList[i].likes
      );
    }
  } catch (error) {
    console.log(error);
  }
}

execGetCommentList(id);
