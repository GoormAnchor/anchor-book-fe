# 앵커 프론트엔드

## book.html

책정보 페이지

## mypage.html

마이페이지(유저가 작성한 코멘트 확인)

## index.html

**_nginx 브랜치는 login.html ➡ index.html로 변경_**

소셜 로그인 페이지

### :memo: 기능

- [x] 댓글 최신순으로 보이도록
- [x] 새로 추가한 댓글 좋아요 되도록
- [x] http 요청해서 책 정보 받아오기
- [x] 책 이름, 사진 url 받아와서 html에 집어넣기
- [x] 댓글 api 적용
- [x] nginx에 포함시키기
- [x] 책 이름 검색 기능 추가

---

## :gem: TODO

- [ ] _좋아요 api_
- [ ] 진행률 api 개발되면 적용하기
- [ ] 댓글 추천순 시간순 정렬

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

## bash에서 임시 환경변수 설정

```bash
export AWS_REGION=ap-northeast-2

export ACCOUNT_ID=438282170065
$ echo $ACCOUNT_ID
438282170065
```

---

1. ecr 레포지토리 만들기

   ```bash
   aws ecr create-repository \
   --repository-name achor-nginx \
   --image-scanning-configuration scanOnPush=true \
   --region ${AWS_REGION}
   ```

   아니면 aws gui로 생성

2. 도커 빌드하기

   ```bash
   docker build -t custom-nginx .

   docker tag custom-nginx:latest 438282170065.dkr.ecr.ap-northeast-2.amazonaws.com/custom-nginx:latest
   ```

3. ecr로 푸시

   ```bash
   docker push 438282170065.dkr.ecr.ap-northeast-2.amazonaws.com/custom-nginx:latest
   ```

4. 배포
   k8s/manifest에서 생성

   ```bash
   cat <<EOF> custom-nginx-deployment.yaml
   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
   name: custom-nginx
   namespace: default
   spec:
   replicas: 3
   selector:
       matchLabels:
       app: custom-nginx
   template:
       metadata:
       labels:
           app: custom-nginx
       spec:
       containers:
           - name: custom-nginx
           image: $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/custom-nginx:latest
           imagePullPolicy: Always
           ports:
               - containerPort: 80
   EOF

   cat <<EOF> custom-nginx-service.yaml
   ---
   apiVersion: v1
   kind: Service
   metadata:
   name: custom-nginx
   annotations:
       alb.ingress.kubernetes.io/healthcheck-path: "/"
   spec:
   selector:
       app: custom-nginx
   type: NodePort
   ports:
       - protocol: TCP
       port: 3000
       targetPort: 80
   EOF

   ```

   ingress.yaml도 수정

   ```bash
   kubectl apply -f custom-nginx-deployment.yaml
   kubectl apply -f custom-nginx-service.yaml
   kubectl apply -f ingress.yaml
   ```
