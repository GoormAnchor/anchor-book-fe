console.log(location.href);

temp = location.href.split("?");
data = temp[1].split("=");
token = data[1];
localStorage.accessToken = token;
document.write("data = " + data);

/*로그인 서버에서 받아오는 유저 정보 api*/
function getLoginUerInfo(token) {
  console.log(token);
  var bearer = "Bearer " + token;
  const response = fetch("http://k8s-default-backendi-a3ad399a4e-1150466428.ap-northeast-2.elb.amazonaws.com/api/v1/users", {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });
  //console.log("response- commentlist");
  return response.then((res) => res.json());
}

async function execGetLoginUserInfo(token) {
  var userInfo;
  try {
    userInfo = await getLoginUerInfo(token);
    console.log(userInfo);
    if (userInfo.header.message == "SUCCESS") {
      console.log(userInfo.header.message);
      //마이페이지 리다이렉트
      location.href = "../mypage.html?userseq=" + userInfo.body.user.userSeq;
    }
  } catch (error) {
    console.log(error);
  }
}

execGetLoginUserInfo(token);

/*
chatChannelName = data[1];
videoChatName = data[2];
document.writｅ(chatChannelId + " " + chatChannelName + " " + videoChatName); //페이지에 전달받은 값 띄워서 확인하기
console.log(
  "TAGTAG : " + chatChannelId + ", " + chatChannelName + ", " + videoChatName
); //콘솔에 전달받은 값 띄워서 확인하기
*/
