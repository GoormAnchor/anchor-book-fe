const instaForm = document.querySelector("#instaform");
const serchResult = document.querySelector("#search-result");

console.log(location.href);

temp = location.href.split("?");
data = temp[1].split("=");
userseq = data[1];

instaForm.addEventListener("submit", async function (e) {
  console.log("submit");
  e.preventDefault();
  /**
   * 이전 책 결과 삭제
   */
  serchResult.innerHTML = "";
  /*
    검색 요청 전송
    */
  const wordInput = instaForm.elements.word;
  //json object
  execGetSearchBookList(wordInput.value);
  /**
   * 결과로 책 생성
   */
  wordInput.value = "";
});

/*책 리스트 조회(서버)*/
function getSearchBookList(word) {
  const response = fetch(
    "http://10.100.2.80:9090/api/book/find/name?containWord=" + word
  );
  //console.log("response- commentlist");
  return response.then((res) => res.json());
}

async function execGetSearchBookList(word) {
  var bookList;
  try {
    bookList = await getSearchBookList(word);

    const searchBookContainer = document.querySelector("#search-result");
    /**
     * column div 생성하기
     */
    const bookListView = document.createElement("div");
    bookListView.id = "columns";
    for (var i in bookList) {
      /*html 생성하기 */
      const figureTag = document.createElement("figure");

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

      bookListView.append(figureTag);
    }
    searchBookContainer.append(bookListView);
  } catch (error) {
    console.log(error);
  }
}
