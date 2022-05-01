const button = document.querySelector(".heart-like-button");

console.log(location.href);

temp = location.href.split("?");
querys = temp[1].split("&");
var userseq = querys[0].split("=")[1];
var bookid = querys[1].split("=")[1];
var episodeid = null;

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

/*북마크 삭제(서버) */
async function deleteBookmark(commentid) {
  const response = fetch(
    "http://10.100.2.80/api/comment/delete/" + commentid,
    {
      method: "DELETE",
    }
  );
}

/*북마크 생성(서버)*/
async function postBookmark(id, userseq) {
  const response = fetch("http://k8s-default-backendi-a3ad399a4e-1150466428.ap-northeast-2.elb.amazonaws.com/api/comment/createComment", {
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
