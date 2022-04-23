/* 책 id로 댓글 리스트 받아오기 */
let url = 'http://localhost:8080/api'

import {addComment} from './js/commentCreation.js'

function getCommentList(id){
    const response = fetch("http://localhost:8080/api/comment/find?bookId="+id);
    console.log("response- commentlist");
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
  
async function exec(id){
    var commentList;
    try {
        commentList = await getCommentList(id);
        console.log(commentList);
        /** inner text로 text 바꾸기 */
        const commentContainer = document.querySelector(".comment-list");
        const commentListView = commentContainer.querySelector(".comments");
        for (var json in commentList){
            /*유저 이미지 불러오기: 나중에 구현 */
            /*댓글 리스트 html 생성 */
            commentListView.append(addComment(json.user.username, json.content, json.user.profileImageUrl, json.created_at));

        }
    }
    catch(error){
        console.log(error);
    }
}

exec(1);