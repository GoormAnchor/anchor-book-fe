/* fetch로 책 정보 받아오기 */
let url = 'http://localhost:8080/api'


function getBook(){
    const response = fetch("http://localhost:8080/api/book/find/id?id=2");
    return response.then(res => res.json());
}
  
async function exec(){
    var text;
    try {
        text = await getBook();
        console.log(text);
        /** inner text로 text 바꾸기 */
        const bookContainer = document.querySelector(".book-content");
        
        const img = bookContainer.querySelector("img");
        img.src = text.book_image;
        console.log(img.src);

        const title = bookContainer.querySelector("h3");
        title.innerText = text.name;
        console.log(title);

        const info = bookContainer.querySelector(".book-info");
        console.log(info);

        const bookDate = text.created_at.split('T')[0].split('-');
        console.log(bookDate);
        info.innerText = `작가 : ${text.author}
        출판일 : ${bookDate[0]}.${bookDate[1]}.${bookDate[2]}
        출판사 : ${text.publisher}
        가격 : ${text.price}원
        `;
        console.log(text.author);

        const aladinLink = bookContainer.querySelector("a");
        aladinLink.href = text.book_url;
      

    }
    catch(error){
        console.log(error);
    }
}

exec();