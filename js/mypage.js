console.log(location.href);

temp = location.href.split("?");
data = temp[1].split("=");
userseq = data[1];

//var userseq = 1;
/*책 리스트 조회(서버)*/
function getUserBookList(id) {
  const response = fetch(
    "http://10.100.2.80:9090/api/book/commentedBook?userSeq=" + id
  );
  //console.log("response- commentlist");
  return response.then((res) => res.json());
}

async function execGetUserBookList(userseq) {
  var bookList;
  try {
    bookList = await getUserBookList(userseq);

    const userInfoContainer = document.querySelector("#library-info");
    userInfoContainer.append(`지금까지 ${bookList.length}권을 읽으셨어요!`);

    const bookListView = document.querySelector(".mylib");
    for (var i in bookList) {
      /*html 생성하기 */
      const figureTag = document.createElement("figure");
      /*
      const dateTag = document.createElement("div");
      dateTag.append(bookList[i].created_at.split("T")[0]);

      const figCaptionTag = document.createElement("figcaption");
      figCaptionTag.append(commentList[i].content);

      figCaptionTag.append(dateTag);
      */
      const aTag = document.createElement("a");

      console.log(
        "./book.html?userSeq=" + userseq + "&bookId=" + bookList[i].id
      );
      //책링크 추가
      aTag.href = "book.html?userSeq=" + userseq + "&bookId=" + bookList[i].id;
      const imgTag = document.createElement("img");
      imgTag.src = bookList[i].book_image;

      aTag.append(imgTag);

      figureTag.append(aTag);

      const figCaptionTag = document.createElement("figcaption");
      figCaptionTag.append(bookList[i].name);

      figureTag.append(figCaptionTag);
      /*클릭시 새 창 생성*/
      // figureTag.setAttribute(
      //   "onclick",
      //   `document.location.href=./book.html?userSeq=${userseq}&bookId=${bookList[i].id}`
      // );

      bookListView.append(figureTag);
    }
  } catch (error) {
    console.log(error);
  }
}

execGetUserBookList(userseq);
