const button = document.querySelector(".heart-like-button");
var bookid = 1;
var episodeid = null;
var userseq = 1;

button.addEventListener("click", async () => {
  var response;
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    deleteBookmark(button.id);
  } else {
    button.classList.add("liked");
    response = await postBookmark(bookid, userseq);
    button.id = response.id;
  }
});

/*댓글 삭제(서버) */
async function deleteBookmark(commentid) {
  const response = fetch(
    "http://localhost:9090/api/comment/delete/" + commentid,
    {
      method: "DELETE",
    }
  );
}

/*댓글 생성(서버)*/
async function postBookmark(id, userseq) {
  const response = fetch("http://localhost:9090/api/comment/createComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_seq: userseq,
      content: null,
      book_id: id,
    }),
  });

  return response.then((res) => res.json());
}
