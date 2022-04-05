## User Auth API - hapi framework

hapi framework 학습 목적으로 구현한 사용자 인증 REST API 서비스.



### 지원 기능

* 사용자 데이터의 mongoose 스키마
* 사용자 데이터 CRUD (생성,조회,수정,삭제)
* API 요청 payload 유효성 검사
* 로그인시 JWT(access, refresh)발급
* 인가가 필요한 요청에 대해 request header의 token 검증



### 프로젝트 구조

* src/
  * controllers/
  * models/
  * services/
  * utils/
* .env
* index.js



### 프로젝트 시작

>  .env파일 작성 & 연결 가능한 mongodb 서버 필요

``` shell
git clone https://github.com/devju94/hapijs-user-auth-api
cd hapijs-user-auth-api
npm install
npm start
```



### .env 파일 작성 ex)

``` 
# server 설정
SERVER_HOST=localhost
SERVER_PORT=3000
ROUTE_PREFIX=/api/users

# mongoDB URL
MONGO_URL=${MONGO_URL}

# JWT 설정
JWT_SECRET=${JWT_SECRET}
ACCESS_JWT_EXP=7200
REFRESH_JWT_EXP=1209600

# api payload 유효성 옵션
USER_ID_MIN=6
USER_ID_MAX=20
USER_PW_MIN=10
USER_PW_MAX=50
USER_NAME_MIN=2
USER_NAME_MAX=20
```



### 패키지 의존성

``` 
hapi/hapi		- hapi 프레임워크
dotenv			- 환경변수 관리 패키지
joi			- 데이터 유효성 검사 패키지
hapi-auth-jwt2	        - jwt 인증을 위한 hapi 플러그인
jsonwebtoken	        - jwt 생성을 위한 패키지
mongoose		- mongoDB ODM
```



### 지원 API

* **[POST]** **${ROUTE_PREFIX}/user**
  * desc: 사용자 데이터 생성 (회원가입)
  * auth: false
* **[GET]** **${ROUTE_PREFIX}/user**
  * desc: 사용자 데이터 조회
  * auth: 요청 헤더의 `Authorization` 값 (JWT)
* **[PUT]** **${ROUTE_PREFIX}/user**
  * desc: 사용자 데이터 수정
  * auth: 요청 헤더의 `Authorization` 값 (JWT)
* **[DELETE]** **${ROUTE_PREFIX}/user**
  * desc: 사용자 데이터 삭제
  * auth: 요청 헤더의 `Authorization` 값 (JWT)
* **[POST]** **${ROUTE_PREFIX}/login**
  * desc: 로그인 (access, refresh Token 발급)
  * auth: false
* **[POST]** **${ROUTE_PREFIX}/verify**
  * desc: 사용자 아이디+암호 유효 여부 확인
  * auth: false