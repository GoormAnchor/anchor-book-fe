console.log(location.href);

temp = location.href.split("?");
data = temp[1].split("=");
userseq = data[1];

/*댓글 리스트 조회(서버)*/
function getUserInfo(userseq) {
  const response = fetch(
    "http://k8s-default-backendi-a3ad399a4e-1150466428.ap-northeast-2.elb.amazonaws.com/api/user/userinfo?userSeq=" +
      userseq
  );
  //console.log("response- commentlist");
  return response.then((res) => res.json());
}

async function execGetUserInfo(userseq) {
  var userInfo;
  try {
    userInfo = await getUserInfo(userseq);

    const userInfoContainer = document.querySelector("#user-info");

    /*html 작성*/
    var h1Tag = document.createElement("h1");
    h1Tag.prepend(`${userInfo.username}님, 반가워요!`);

    userInfoContainer.prepend(h1Tag);
  } catch (error) {
    console.log(error);
  }
}

execGetUserInfo(userseq);
