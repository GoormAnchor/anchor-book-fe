# 앵커 프론트엔드

## book.html

책정보 페이지

## mypage.html

마이페이지(유저가 작성한 코멘트 확인)

## login.html

소셜 로그인 페이지

### :memo: 기능

- [x] 댓글 최신순으로 보이도록
- [x] 새로 추가한 댓글 좋아요 되도록
- [x] http 요청해서 책 정보 받아오기
- [x] 책 이름, 사진 url 받아와서 html에 집어넣기
- [x] 댓글 api 적용
- [ ] Node.js에 포함시키기

---

## :gem: TODO

- [x] _코멘트 삭제 버튼 꾸미기_
- [ ] _좋아요 api_
- [x] 북마크 버튼 → 생성 api는 필요없음
- [x] 삭제 버튼 꾸미기
- [ ] 메인 페이지 js => 마이페이지
- [x] **댓글 폼 꾸미기**
- [ ] 진행률 api 개발되면 적용하기
- [ ] 댓글 추천순 시간순 정렬
- [ ] 헤더 꾸미기
- [x] 헤더에 로고 추가
- [ ] 헤더 정렬 수정
- [x] 댓글 폼 수정

---

## live-server 사용법

프론트 개발중 실시간으로 결과 확인 가능 (실시간 서버)

1. VSCode에서 live-server 확장 설치
2. 아래 파란줄 오늘쪽에 "Go Live" 클릭
3. localhost:5500으로 접속

---

## Docker image 만들기 & 컨테이너 실행

```bash
docker build -t sydsh19/anchor-nginx:[태그명] .
docker run --name some-nginx -d -p 3000:80 sydsh19/anchor-nginx
```

anchor-nginx 이미지로 nginx 서버가 실행된다.
