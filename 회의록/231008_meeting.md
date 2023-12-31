## ❓여러 가지 이슈에 대한 해결 방안 모색❓

1. **메뉴 필터링을 어떤 식으로 진행할지?**
   - 재료 700개
   - 카테고리 별로 알러지와 연관시키기, 예를 들어 대두 같은 경우 → 두류
   - 카테고리별로 연관시킬 수 없는 경우에는 예외문 처리해서 식품명으로 연관시키기
   - “아황산 포함식품” 같이 데이터가 애매한 경우 → 공식문서를 활용해 처리하는 방법..
   - 새우 고등어 홍합 전복 굴 게 오징어 → 전부 어패류
   - 조개류도 → 어패류 → 이에 대한 중복 및 예외처리도 필요함.
   - 언제? → 10/12일 전까지 끝내보기 (일단 데이터 저장부터)
   - 알러지/비건/종교 여부로 필터링 할 듯 함
2. **얼굴인식 기능을 이식하는 작업 구체적인 계획?**
   a. 회원가입 1. 회원의 얼굴 정보를 저장→ **백엔드에다가 벡터값으로 저장**하고
   b. 로그인 1. 키오스크에서 얼굴인식 디비에서 찾아내서 **가장 거리가 짧은 벡터값을 디비에서 찾아낸다** 2. **거리가 일정치 미만이면 아이디 입력해서 로그인하는 창으로** 넘어가기
   - 프론트에서 카메라 띄우고
     - 프론트가 보낼 정보 → 웹캠 혹은 휴대폰으로 찍은 사진 → 사진 받아오면 AI 서버에서 벡터값으로 변환 후 → DB 에 저장(회원가입 시) / DB 값이랑 대조( 로그인 시 )
   - 수요일 후에 학과사무실에 물어보고, 웹캠을 받아와야 진행 가능할 듯.
   - 다훈이가 라즈베리파이 언제 오는지랑 / 웹캠 언제 빌릴 수 있는지 물어보기
3. **사용자 특이사항(사용자 정보) 어떤 걸 추가할지?**
   - 나이(10대, 20대, 30대 … )
   - 성별(남성, 여성)
   - 더 있으면 좋을거 같다. 뭘 넣을진 모르겠다.
   - 주문 하고 나서 다양한 데이터를 저장하면 좋을 거 같다.
     - 주문 시간대, 주문한 음식 종류?
   - 메뉴 추천 알고리즘에 쓰일 데이터를 더 수집하기 위함.
4. **메뉴 추천 알고리즘 개발 구체적인 계획?**
   - 로그인 했을 때
     1. 회원정보 갖고와서 가중치들 다 책정하고
     2. 메뉴들 중에서 가장 가까운 순으로/값이 가장 작은 순으로 백엔드에서 json타입으로 메뉴리스트를 출력해주면 될듯함
   - 협업 필터링
     - 나이, 성별, 종교, 비건, 알러지 정보로 가중치를 부여하고 다른 사용자와 유사도 측정
     - 가까운 사용자의 주문 내역에서 랜덤 2개 메뉴 보여줌
5. **키오스크 관리자(점주)가 메뉴 관리할 수 있는 기능 추가**
   - **검색 기능으로 재료를 찾아 추가**하면 좋을 듯
   - **점주에게 알러지/ 종교/ 비건 에 따라 제한되는 재료가 있는지 묻고, 있다면 해당 물질 체크하기**
   - 예를 들어 점주가 메뉴를 추가하고자 한다.
     - 점주는 디비에있는 ingredient 테이블에 있는 재료들중 들어가 있는 것들을 체크를 해
     - 체크된 재료들이 어디에 속하는지는 백엔드에서 필터링한다.
       - 예를 들면 돼지고기다. → 알러지, 비건, 이슬람교에 속해있는 재료임을 백엔드에서 ‘필터링’한다.
     - 만약 이슬람을 믿는 사용자가 주문할때 로그인하면
       - 돼지고기가 있는 메뉴들은 제외하거나 아래쪽에 표시하거나 해서 보여주기만 하면 된다.
6. **로그인/ 회원가입/ 메뉴화면 연결 로직 개발 계획?**
   - 이번 스프린트 안에 하기
   - 관리자 페이지 만들 계획임 → 프론트 / 백
7. **10/11 발표 대비 피피티 내용 써야함**

   - 시스템 모델링 (대략적인 구조 및 동작)
     - 프론트엔드
     - 백엔드
     - AI
       프론트로부터 받은 사진에서 얼굴을 검출한 후 이를 deepface 프레임워크에서 제공하는 pre-trained model인 Facenet512에 통과시켜 feature map을 얻는다.
       feature map을 DB에 저장하거나 이미 저장되어 있는 feature map과 비교하여 사용자를 특정한다.
   - 진행 상황

     - 프론트엔드

       1. 키오스크 기능(메뉴 불러오기 및 장바구니, 결제를 할 때 사용자가 담았던 메뉴들을 서버로 POST)

       2. 사용자 등록페이지 얼굴인식 제외 구현 완료.

     - 백엔드
     - AI
       1. deepface를 통해 feature map을 추출함으로써 얼굴 식별 기능 구현함

   - 이슈 상황 및 해결 방안

     - 프론트

       1. 백 연동 오류

          - 백엔드와 프론트 엔드의 json 파일 형식이 맞지 않아 자료를 정확히 받지 못하는 문제가 남. 이후 파일 형식을 맞춰 해결했음.

       2. 사용자 핸드폰의 카메라 이용 오류

          - 해당 문제는 웹 서버와 브라우저 간의 통신을 암호화하여 중간자 공격을 방지하기 위해 웹 애플리케이션을 HTTPS로 서비스해야 함. 그렇기 위해선 SSL 인증서가 필요. 서버에 SSL 인증서를 발급받아 설치필요.

     - 백엔드

     - AI

       1. 안경, 마스크 등 여러 요인에 의해 정확도가 많이 차이 남

          - 등록할 때 안경이나 마스크를 착용한 경우, 진행도 70%부터는 벗고 등록하도록 유도할 것임

     - ets…

   - 향후 일정

     - 프론트

       - 키오스크 로그인 페이지 만들기. (얼굴인식이 실패하여 휴대폰 번호로 로그인 하는 페이지)

       - 사용자 등록페이지 카메라 연동하기.

       - 키오스크 페이지 내 얼굴인식 로그인 연동하기.

       - 키오스크 관리자(점장) 페이지 만들기 (새로운 메뉴를 등록하는 페이지)

       - 새로운 메뉴를 등록할 땐 메뉴이름, 메뉴사진, 메뉴에 들어가는 재료정보가 필요함. 등록을 하면 서버로 POST

       - 메뉴 삭제기능. (생각해봐야함)

     - 백엔드

       - 메뉴 필터링 기능 구현하기

       - AI 서버 구축하기

       - 메뉴 등록 기능 구현

     - AI

       - 안경, 마스크 착용 여부를 판단하는 모델이 필요하고 개발 중

       - 정확도를 높이기 위해 로그인할 때마다 추가적인 feature map을 디비에 저장하도록 로직 변경 중
