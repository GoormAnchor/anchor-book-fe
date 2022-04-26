var userseq = 1;
/*댓글 리스트 조회(서버)*/
function getUserCommentList(id) {
  const response = fetch(
    "http://localhost:9090/api/comment/find/userseq?userSeq=" + id
  );
  //console.log("response- commentlist");
  return response.then((res) => res.json());
}

async function execGetUserCommentList(userseq) {
  var commentList;
  try {
    commentList = await getUserCommentList(userseq);

    const userInfoContainer = document.querySelector("#user-info");
    userInfoContainer.append(`총 ${commentList.length}개의 댓글을 작성했어요.`);

    const commentListView = document.querySelector("#columns");
    for (var i in commentList) {
      /*html 생성하기 */
      const figureTag = document.createElement("figure");

      const dateTag = document.createElement("div");
      dateTag.append(commentList[i].created_at.split("T")[0]);

      const figCaptionTag = document.createElement("figcaption");
      figCaptionTag.append(commentList[i].content);

      figCaptionTag.append(dateTag);

      const imgTag = document.createElement("img");
      imgTag.src = commentList[i].book.book_image;

      figureTag.append(imgTag);

      figureTag.append(figCaptionTag);
      /*클릭시 새 창 생성*/
      figureTag.setAttribute("onclick", "document.location.href=`./book.html`");

      commentListView.append(figureTag);
    }
  } catch (error) {
    console.log(error);
  }
}

execGetUserCommentList(userseq);
