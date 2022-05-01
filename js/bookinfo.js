/* fetch로 책 정보 받아오기 */
function getBook(id) {
  const response = fetch("http://k8s-default-backendi-a3ad399a4e-1150466428.ap-northeast-2.elb.amazonaws.com/api/book/find/id?id=" + id);
  return response.then((res) => res.json());
}

async function exec(id) {
  var text;
  try {
    text = await getBook(id);
    //console.log(text);
    /** inner text로 text 바꾸기 */
    const bookContainer = document.querySelector(".book-content");

    const img = bookContainer.querySelector("img");
    img.src = text.book_image;
    //console.log(img.src);

    const title = bookContainer.querySelector("h2");
    title.innerText = text.name;
    //console.log(title);

    const info = bookContainer.querySelector(".book-info");
    //console.log(info);

    const bookDate = text.created_at.split("T")[0].split("-");
    //console.log(bookDate);
    info.innerText = `작가 : ${text.author}
        출판일 : ${bookDate[0]}.${bookDate[1]}.${bookDate[2]}
        출판사 : ${text.publisher}
        가격 : ${text.price}원
        `;
    //console.log(text.author);

    const aladinLink = bookContainer.querySelector("a");
    aladinLink.href = text.book_url;
  } catch (error) {
    console.log(error);
  }
}

console.log(location.href);

console.log(location.href);

temp = location.href.split("?");
querys = temp[1].split("&");
var userseq = querys[0].split("=")[1];
var bookId = querys[1].split("=")[1];

exec(bookId);
