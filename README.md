<img src="https://capsule-render.vercel.app/api?type=cylinder&color=auto&height=180&text=Kiosk_KNU&animation=twinkling&fontColor=ffffff&fontSize=90" />
    </div>
    <div align= "center"> 
    	<h2 style="border-bottom: 1px solid #21262d; color: #c9d1d9;"> 2023 경북대 종합설계프로젝트1, 오픈소스 기반의 사이니지 솔루션 개발 </h2>  
    	<div style="font-weight: 700; font-size: 15px; text-align: center; color: #c9d1d9;"> 
		사용자 얼굴을 인식하여 메뉴 추천 및 메뉴 목록을 실시간으로 변경해 주는 사용자 맞춤형 키오스크 개발 
	</div> 
    </div>
    <div align= "center">
    	<h2 style="border-bottom: 1px solid #21262d; color: #c9d1d9;"> 🛠️ Tech Stacks </h2> <br> 
    	<div style="margin: 0 auto; text-align: center;" align= "center"> 
	  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white">
          <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white">
          <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
          <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
          <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
          <br/><img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
          <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
          <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
          <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
          <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
          <br/><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
          <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
	  <img src = "https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
	  <img src = "https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
	  <img src = "https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white" />
	  <br/><img src = "https://img.shields.io/badge/LG-A50034?style=for-the-badge&logo=LG&logoColor=white"/>
	  <img src = "https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg" />
	  <img src = "https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
          </div>
	    <h2 style="border-bottom: 1px solid #21262d; color: #c9d1d9;"><br> 
    </div>

## Customized Next Generation Kiosks
		    
## 📌 목차
1. [산학협력 프로젝트 수행계획서](#산학협력-프로젝트-수행계획서)
   - [과제 목적 및 필요성](#과제-목적-및-필요성)
     - [목적](#목적)
     - [필요성](#필요성)
   - [과제 내용 및 추진 방법](#과제-내용-및-추진-방법)
     - [Functional requirements](#2-1-functional-requirements)
     - [Nonfunctional requirements](#2-2-nonfunctional-requirements)
     - [Use Case Diagram](#2-3-use-case-diagram)
     - [Class Diagram](#2-4-class-diagram)
     - [Sequence Diagram](#2-5-sequence-diagram)
     - [시스템 아키텍처](#2-6-시스템-아키텍처)
   - [과제 추진 일정 및 예산 활용 계획](#과제-추진-일정-및-예산-활용-계획)
   - [기대효과 및 활용방안](#기대효과-및-활용방안)
   - [예상되는 주요 과제성과](#예상되는-주요-과제성과)
   - [참여인력 세부](#참여인력-세부)
   - [GitHub 정보](#github-정보)
2. [개발환경 세팅](#개발환경-세팅)
   - [라즈베리파이](#라즈베리파이)
   - [터치 디스플레이](#터치-디스플레이)
   - [CLI 환경 구축](#cli-환경구축)
3. [패키징 및 설치](#패키징-및-설치)
4. [소스코드 설명](#소스코드-설명)

# 산학협력 프로젝트 수행계획서
## 과제 목적 및 필요성
### 목적
>* 본 프로젝트의 주요 목적은 소상공인들에게 저렴하면서도 효율적인 디지털 사이니지 솔루션을 제공하는 것입니다.
>* 이를 위해 오픈소스 기반 webOS와 저렴한 하드웨어인 라즈베리 파이를 활용하여 얼굴 인식 기능을 통한 로그인 및 사용자의 알레르기나 종교에 따라 메뉴를 필터링하여 보여주는 기능을 갖춘 키오스크 시스템을 개발하고자 합니다.
>* 이 시스템은 매장 운영의 효율성을 증가시킬 수 있고, AI 기술을 통해 기존 키오스크 시스템보다 뛰어난 경험을 사용자에게 제공할 수 있습니다. 
>* 이러한 장점들은 장기적으로 보았을 때, 고객 충성도와 가게 매출에 긍정적인 영향을 줄 수 있으며 오픈소스와 라즈베리 파이 등을 이용한 비용 절감으로 사업 창업 비용 부담을 줄일 수 있습니다.

### 필요성
>대부분의 소상공인은 비용적인 문제와 기술 장벽으로 디지털 사이니지 솔루션을 구비하기 힘든 것은 사실입니다. 하지만 너무나도 빠르게 발전하고 있는 기술 및 시장 환경 속에서 이러한 디지털 도구들을 적극적으로 활용할 수 없다면 경쟁력을 잃어버리는 것은 불가피합니다.<br/>
>현재 화두가 되고 있는 AI 기술에 어느 정도 익숙해진 소비자들은 맞춤화된 서비스에 흥미를 느낄 수밖에 없습니다. 이러한 고객의 니즈를 충족시키는 것과 디지털 사이니지 솔루션을 채택해야만 하는 소상공인들에게 저희의 시스템은 매우 중요한 도구로 작용할 수 있습니다. 또한 2020년 COVID-19로 인한 팬데믹 상황이 지금까지 이어지고 있고 언제 어디서 어떤 바이러스가 우리를 위협할지 알 수 없기에 오늘날 키오스크 서비스는 자연스럽게 우리의 일상생활에 스며들었으며 앞으로 더욱더 다양하고 발전된 키오스크가 필요할 것입니다.<br/>
><img src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202309/06/77cfcc48-09df-4c25-9749-d590a731d050.jpg" width="480px" height="480px" title="[자료 1]폭증하는 키오스크(중앙일보)"></img><br/>
위 자료에서 볼 수 있듯이 키오스크의 수요는 팬데 믹 이후 폭증하고 있습니다. 운영 비용 절감 및 업무 효율성 증가, 고객 경험 개선, 데이터 수집 및 분석 가능, 언어 선택 가능 등과 같이 키오스크의 장점이 단점보다 압도적으로 많기에 나올 수 있는 수치입니다. 하지만 키오스크의 장점과 별개로, 앞서 언급했듯이 비용적인 측면과 기술 장벽이 소상공인들에게 문제가 될 수 있습니다. 일반적으로 키오스크의 가격은 200만 원에서 1,200만 원 사이이고, 이것을 관리, 유지하는 것은 쉬운 일이 아닙니다. <br />
>**따라서** 이 프로젝트의 목표는 오픈소스를 기반으로 하는 webOS와 저렴한 라즈베리 파이를 사용하여 비용과 기술 장벽 문제를 해결하는 것입니다. 모든 소상공인에게 저렴하면서도 효율적인 디지털 사이니지 솔루션을 제공함으로써 경쟁력을 강화하고, 디지털 측면의 혜택을 누릴 수 있게 하는 것이 저희의 목표입니다.
## 과제 내용 및 추진 방법
# 2-1 Functional requirements
1. 회원가입
   - 키오스크에 제시된 회원 가입 페이지의 QR코드를 통해 회원가입을 할 수 있다.
   - 회원 가입 페이지의 QR코드는 키오스크 우측 상단에 항상 제시되어 있다.
   - 로그인하기 위해 필요한 다양한 각도의 얼굴 사진 10장을 등록해야 한다.
   - 전화번호를 입력해야 한다.

2. 회원 정보 등록 (수정필요)
   - 성별, 나이대, 종교, 채식, 알러지 종류를 선택할 수 있다.
   - 성별은 남자, 여자, 나이대는 10대/ 20대/ 30대/ 40대/ 50대 이상 이 있다.
   - 종교는 불교, 기독교, 힌두교, 개신교, 유대교, 이슬람교가 있다
   - 채식은 프루테리언, 비건, 락토, 오보, 락토오보, 페스코, 폴로가 있다
   - 알러지는 밀, 땅콩, 새우, 복숭아, 등 21가지 가 있다
   - 데이터 수집 동의 여부를 선택할 수 있다.
   - 데이터 수집에 동의하지 않는 사용자의 성별, 나이대는 저장하지 않는다.

3. 로그인
   - 키오스크에 있는 카메라를 통해 얼굴로 로그인할 수 있다.
   - 만약 얼굴 식별이 실패하면 전화번호로 로그인하거나 비회원으로 진행할 수 있다.
   - 로그인하거나, 비회원으로 진행하게 되면 매장 포장 여부를 선택할 수 있다.
   - 매장, 포장 여부를 선택하면 [메뉴 보기] 화면으로 이동한다.
     
4. 메뉴 보기
   - 로그인 여부와 상관없이 메뉴들을 보고 선택할 수 있다.
   - 각 메뉴는 이름, 사진, 가격, 짧은 설명을 포함한다.
   - 카테고리에 따라 메뉴가 나누어져 있다.
   - 추천 카테고리에서는 추천 메뉴들을 볼 수 있다.
   - 비회원인 경우 추천 메뉴는 지난달 매출 상위 5개 메뉴이다.
   - 회원인 경우 추천 메뉴는 지난달 매출 상위 2개 메뉴와 [메뉴 추천]에 의한 4개 메뉴로 총 6개 메뉴이다
   - 회원인 경우 [메뉴 필터] 가 적용된다.
   - 메뉴를 선택하면 [옵션 선택] 화면으로 이동한다.
     
5. 메뉴 추천
   - 회원인 경우에만 해당 기능으로 메뉴들을 추천받을 수 있다.
   - 최근에 주문했던 메뉴 개와 종교 채식 알러지가 비슷한 다른 사용자가 주문했던 메뉴 2개를 추천 카테고리에 보여준다.

6. 메뉴 필터
   - 회원인 경우에만 해당 기능으로 부적절한 메뉴들을 필터할 수 있다.
   - 등록되어 있는 종교 채식 알러지 정보를 이용하여 부적절한 메뉴들을 숨긴다.

7. 옵션 선택
   - 토핑 소스 부가적인 메뉴를 선택할 수 있다.
   - 각 메뉴의 옵션은 기본값으로 설정되어 있다.
   - 옵션의 기본값은 관리자(점주)가 정할 수 있다.
   - 선택이 완료되면 해당 메뉴가 장바구니에 저장된다.
   - 장바구니에 저장하거나 뒤로가기 버튼을 클릭하면 메뉴 보기 화면으로 돌아간다.

8. 장바구니 관리
   - 장바구니에는 [옵션 선택] 이 끝난 메뉴들의 이름 추가된 옵션 수량 가격과 함께 주문 금액을 볼 수 있다.
   - 장바구니에 있는 메뉴는 수량을 변경하거나 삭제할 수 있다.
   - 결제하기 버튼을 클릭하면 결제 화면으로 이동한다.

9. 결제
    - 결제 시스템은 구현 범위에 포함되어 있지 않다.

10. 주문 전달(키오스크 -> 점주)
    - 결제가 완료되면 점주의 시스템으로 장바구니 정보가 전달된다.
    - 회원인 경우 장바구니 정보가 데이터베이스에 저장된다.
    - 주문 전달이 완료되면 로그인 화면으로 이동한다.

11. 메뉴 관리
    - 관리자(점주)인 경우에만 해당 기능으로 메뉴를 관리할 수 있다.
    - 메뉴를 추가하거나 삭제할 수 있다.
    - 각 메뉴의 카테고리나 옵션을 변경할 수 있다.
   
12. 데이터 분석
    - 관리자(점주)인 경우에만 해당 기능으로 데이터 분석을 할 수 있다.
    - 매출액과 각 메뉴의 선호도를 볼 수 있다.
    - 사용자별 메뉴 선호도 매장 전체 관점에서의 메뉴 선호도 등 유의미한 데이터 분석하여 매장 운영에 도움을 줄 수 있다.
   
# 2-2 Nonfunctional requirements

1. 사용자 경험
   - 키오스크 시스템은 사용하기 쉽고 직관적인 사용자 경험을 제공해야 한다.
   - 관리자가 지정한 메뉴 카테고리에 따라 메뉴를 정렬한다.
   - 메뉴와 옵션의 사진을 제공하여 시각적인 정보를 제공한다.
   - 관리자가 메뉴와 옵션을 쉽게 추가할 수 있어야 한다.

2. 시스템 성능
   - 얼굴 인식으로 초 이내에 사용자를 식별하지 못하면 로그인 비회원 주문 선택 창으로 넘어간다.
   - 동시에 여러 대의 키오스크가 데이터베이스에 접근하더라도 성능을 보장해야 한다.
   - 페이지를 전환할 때 다음 페이지를 1초 안에 제공한다.
   - 메뉴 옵션을 선택하고 장바구니에 1.5초 안에 업데이트된 장바구니가 보이는 메뉴 선택 화면을 제공한다.
   - 장바구니에 담은 물품을 결제한 후 주문 내역을 점주에게 1.5 초 이내에 전송되어야 한다.
   - 회원가입을 완료한 후 데이터베이스에 1.5초 이내에 회원 정보가 추가 된다.

3. 보안
   - 사용자 개인정보와 결제 정보는 안전하게 보호되어야 한다.
   - 데이터베이스 접근은 인가된 사용자만 가능하도록 제한되어야 한다.
   - 사용자는 자신의 데이터만 접근할 수 있다.
   - URL에 회원의 정보가 드러나지 않게 하여 회원의 전화번호가 유출되지 않게 한다.

# 2-3 Use Case Diagram
[사진]
# 2-4 Class Diagram
[사진]
# 2-5 Sequence Diagram
[사진]
# 2-6 시스템 아키텍처
>* Hardware : Raspberry PI 4 Model B 8GB
>* OS : WebOS 2-24
>* 프론트엔드 : React Framework
   >- HTML, Js, css
>* 백엔드 : Django Framework
   >- 웹 서버 : Nginx
   >- 웹 애플리케이션 서버 : Python3.11
   >- 데이터베이스 : MySQL, SQLite3 
>* 협업 툴: Github, Notion, Figma, WebEX

* 프론트엔드
사용자가 메뉴, 수량 등을 선택할 수 있는 화면을 키오스크 화면에 출력합니다. 처음 인식한 사용자의 얼굴 정보가 데이터베이스에 저장된 얼굴 정보와 일치할 경우, 사용자의 맞춤 메뉴를 선정하여 화면에 출력하고, 일치하지 않을 경우 맞춤 메뉴 없이 전체 메뉴를 출력하여 주문을 진행할 수 있으며, 주문 후에 QR코드를 출력하여 사용자가 웹 페이지에 접속 후, 자신의 정보를 입력할 수 있습니다.<br />
사용자가 키오스크에 제공되는 QR코드를 통하여 접속한 웹 페이지를 React 개발환경에서 JavaScript와 CSS를 이용하여 제작합니다.
이 웹 페이지는 사용자의 얼굴, 정보, 이름, 전화번호,비건 여부, 종교 여부, 알레르기 여부를 입력받고, 입력받은 정보를 서버에 전송합니다.

<br />

* 백앤드
사용자가 키오스크를 편리하게 사용할 수 있도록 SQLite를 이용하여 데이터베이스(DB)를 설계하고, Django 프레임워크를 활용하여 웹 애플리케이션 서버 구축을 진행합니다. 여러 가지 도구 및 기술들을 이용하여 백엔드 시스템을 구축할 예정입니다. <br />
use-case에 따라 기능들의 API를 처리하기 위해 MVT(Model-View-Template)패턴으로 백엔드 모델을 설계할 예정입니다. 데이터베이스에 저장되는 데이터들을 객체인 Model, 로직들을 처리하는 View, UI 부분을 담당하는 Template 세 가지 관점으로 접근하여 개발합니다. 또한 사전에 학습된 머신 러닝 모델을 이용한 사용자 식별 및 사용자별 메뉴 추천 기능이 백엔드에서 동작하도록 구현할 예정입니다. <br />
위와 같은 방식으로 Django와 Django REST Framework를 활용하여 API 서버 및 관련 기능 들을 구축합니다.

<br />

* 얼굴 인식 모델
키오스크 카메라로 인식된 얼굴 사진을 딥러닝 기반 모델인 deepface에 통과시켜 임베딩을 추출합니다. 이를 데이터베이스에 있는 임베딩들과 대조하여 회원 여부를 확인합니다. <br />
deepface 프레임워크를 사용하여 파이썬으로 개발할 계획입니다.

<br />

## 과제 추진 일정 및 예산 활용 계획

[사진]

반복되는 5단계의 스프린트를 거쳐 사이니지 솔루션을 구현할 계획입니다. <br />
각 스프린트는 구축 - 기획 - 설계 - 개발 진행 - 데모 - 회고 단계를 거치며 빠르게 구현한 뒤에 피드백하는 과정을 가집니다. 또한 여러 단계의 스프린트를 거듭하여 프로젝트를 보완할 예정입니다.


## 기대효과 및 활용방안
라즈베리 파이와 오픈소스 기반 운영체제인 webOS로 개발한 키오스크는 기존의 사이니지 솔루션보다 저렴한 단가로 제작이 가능해 소상공인이 구비하는 데 부담을 줄여주어 다음과 같은 기대 효과를 얻을 수 있습니다. <br />
* 첫째, 오픈소스 기반의 사이니지 솔루션을 개발하여 소규모 상공인들의 키오스크 구비 부담을 줄일 수 있으며, 오픈소스를 이용한 다양한 기능을 제공할 수 있습니다.
* 둘째, 사용자 맞춤형 키오스크 개발로 소규모 점포 이용에 대한 만족도를 높일 수 있습니다.
* 셋째, 데이터 기반 인사이트를 제공함으로써 소상공인이 갖는 정보의 비대칭을 해결할 수 있습니다.

## 예상되는 주요 과제성과 
LG open-source software platform WebOS 의 인 기술 블로그에 기술문서를 작성하여 open-source contribution에 할 예정입니다. <br />
WebOs : [https://www.webosose.org/]
## 참여인력 세부
<img width="440" alt="17" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/eef0977c-4576-4e9f-ae79-e9abce4ad932">

## GitHub 정보
>* https://github.com/Cheetah-19/Kiosk_KNU
>* 신영재 / [Apoliasm](https://github.com/Apoliasm)
>* 김다훈 / [baegopababjo](https://github.com/baegopababjo)
>* 박준석 / [Lucerna00](https://github.com/Lucerna00)
>* 이승운 / [Usimth](https://github.com/Usimth)
>* 신동혁 / [WannaBeTop](https://github.com/WannaBeTop)

# 개발환경 세팅
## 라즈베리파이
* HardWare : [Raspberry PI 4 Model B 8GB](https://smartstore.naver.com/eleparts/products/4799825062?n_media=11068&n_query=%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B44&n_rank=4&n_ad_group=grp-a001-02-000000007238914&n_ad=nad-a001-02-000000229608972&n_campaign_type=2&n_mall_id=ncp_1nlzbo_01&n_mall_pid=4799825062&n_ad_group_type=2&n_match=3&NaPm=ct%3Dlpihmmrs%7Cci%3D0Au0003H1knzI6qsyfp7%7Ctr%3Dpla%7Chk%3D9ad14e585bbe9eea74201d2e1f1481527ed653e7)
* OS : [webos 다운로드 링크](https://github.com/webosose/build-webos/releases)
  >- 현 프로젝트는 webos-ose-2-24-0-raspberrypi4-64.tar.bz2 버전을 설치 하였습니다.
  ### 설치 방법
  1. [webos 다운로드 링크](https://github.com/webosose/build-webos/releases) 에서 image 다운로드
     <img width="899" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/1f147666-4f88-4db0-bac5-4f7d88631648">
  2. [7-zip](https://www.7-zip.org/) 프로그램을 이용하여 압축 해재
     ![1](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/ed374a79-e867-4a87-a388-56b2023ef70f) <br />
     * 압축을 해제하시면 됩니다. <br />
     	![2](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/03555465-ac71-4b42-b756-ee4412a94e8d) <br />
     * webos-ose-2-24-0-raspberrypi4-64.tar 라는 폴더가 생성됩니다. <br />
     	 ![3](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/f8e1629b-020f-422a-8267-04e1c93c48ce)<br />
     * 폴더 안에 들어오면 .tar 파일이 있는데, 압축해제를 진행하시면 됩니다. <br />
     	![4](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a863fbc4-99cc-4150-bea7-ab89cae26c73) <br />
      	![5](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/d80c904e-979f-46ca-8dd1-951add57e53c) <br />
     * 압축을 해제하면 webos-ose-2-24-0-raspberrypi4-64 라는 폴더가 생성됩니다. <br />
     	![6](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/be9e14e9-4aeb-4eb9-adc4-3fb449fbf6d5) <br />
     * 폴더 안에 들어오면 .mic 파일이 있는데, 이러면 Image 파일은 준비가 된 겁니다.
   3. SD 카드 포맷하기
      [Flashing webOS Open Source Edition](https://www.webosose.org/docs/guides/setup/flashing-webos-ose/) 참고 하여 SD카드 포맷하시면 됩니다.
      단순히 윈도우 10 기본 포맷도 상관 없습니다!
   4. [Win 32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) 프로그램을 이용하여 sd 카드에 image flashing
      * 위에서 얻은 .mic 파일을 선택하고, 포맷한 SD카드를 선택하여 Write 버튼을 눌러주세요.
        ![8](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/2c0252ba-a718-4e1b-9857-593a12b6f12a)
      * 시간이 좀 걸립니다.
	![9](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/2cf967ab-8a65-4c13-8abd-a0cec6607281)
      * 완료! 이제 SD 카드를 라즈베리 파이 하단에 삽입 후 부팅하면 WebOs가 정상적으로 부팅이 됩니다!
        <br />※주의※
        * sd카드를 sd 리더기에 삽입 후 그 자체로 USB에 삽입하면 부팅이 안됩니다! 반드시 sd카드만 따로 빼서 라즈베리파이 하단에 삽입해주세요!
      	![10](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/5015e33f-8ff7-44e4-8ad6-8976d0befe53)

## 터치 디스플레이
* HardWare : [라즈베리파이 디스플레이 10.1인치 터치스크린 LCD](https://smartstore.naver.com/mcuboard/products/5006590307?NaPm=ct%3Dlpihmuhk%7Cci%3D2d0b272112d74fa2c41384d2a3b0e4a94ff945f5%7Ctr%3Dsls%7Csn%3D186400%7Chk%3D991293f6377b661f14470419dc8bc00fa26ea908)
   - 터치 디스플레이에 구성품들을 잘 조립하고 라즈베리파이에 전원을 인가하면 화면이 잘 나오는 것을 확인 할 수 있습니다.
  ![11](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/3f2edb87-7a3c-4c05-8dd7-0b0c24286da1)
  
## CLI 환경구축
   1. Node.js 설치 [링크](https://nodejs.org/en)
      	- 설치가 잘 되었다면 아래 명령어를 실행하여 버전을 확인가능합니다.
        
	node -v

   2. npm 설치
   	- npm은 Node.js에 포함되어 있으므로 Node.js를 성공적으로 설치한 경우 이미 npm을 사용할 수 있습니다.
   	- 아래 명령어를 통해 npm이 잘 설치되어있는지 확인가능합니다.

 	npm -v

   3. CLI 설치
      	- -g 옵션을 사용하여 터미널에서 다음 명령을 실행하여 CLI를 전체적으로 설치합니다.

	npm install –g @webosose/ares-cli

# 패키징 및 설치
  1. SSH 설정
      	- ssh 연결을 위한 디바이스 설정이 필요합니다.

	ares-setup-device 
 
   <img width="566" alt="12" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/17ff7663-0290-433c-8a12-016ea5cc8487">

   위 사진을 보면 새로운 장치가 추가된 것을 확인 할 수 있습니다.

 - Add : 추가 하기
 - Name : 장치 이름을 정해주세요.
 - IP address : 라즈베리파이의 IP 주소를 적으시면 됩니다.
 - Port : port 번호는 22 로 정했습니다. (다른 포트로 하니 패키지 에러가 떴습니다.)
 - User : root로 설정하시면 됩니다.
 - Description : 생략해도 됩니다. ( 생략 = Enter )
 - Authentication : 권한 설정을 비밀번호로 할지, ssh key로 할지 선택합니다. 비밀번호가 간단하여 비밀번호를 선택하였습니다.
 - Password : 비밀번호를 설정해주시면 됩니다. ( 생략 = Enter )
 - Default : 사진에선 N 이지만 Y로 선택하시는게 편합니다.
 - Save : Y 로 저장해주세요.

  2. webOS OSE app 설치
     	- templete을 이용하여 app을 생성해야 합니다.
     	- 아래 코드에서 'sampleApp' 에 해당하는 부분만 원하는 프로젝트 명으로 바꾸시면 됩니다. (sampleApp = 폴더명)

	ares-generate -t webapp sampleApp

   <img width="483" alt="13" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/620b1604-5726-481b-a2fb-6f9afef7f91a">
 
   Success가 되면 성공입니다.
   
 - app id : app을 구분하는 id로 생략하셔도 됩니다.
 - title : 어플의 제목입니다.
 - version : 버전을 명시할 수 있습니다.

  Success가 되고 폴더가 생성되고, 설정한 내용이 들어있음을 확인 할 수 있습니다.
   
  <img width="789" alt="14" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/6cbb0492-6400-4927-b2b6-de58753b5f09">

  3. Build한 내용을 위에 생성판 폴더에 덮어 씌우기.
     	

	npm run build		

  * 프로젝트를 빌드 하시면 build 파일이 생깁니다.
  <img width="737" alt="스크린샷 2023-12-06 오후 10 06 55" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a133af50-dc41-4e2e-8313-7c5688a0622f">
  
  * build 폴더가 생겼음을 확인 할 수 있습니다.
  * 파일 내부 내용을 위에서 만든 sampleApp 폴더 내부로 '덮어씌우기' 하시면 됩니다.

  4. 패키징
     - 아래 코드에서 'sampleApp' 에 해당하는 부분만 원하는 프로젝트 명으로 바꾸시면 됩니다. (sampleApp = 폴더명)
    
	ares-package ./sampleApp

  <img width="418" alt="15" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/395c1cc3-c671-4e50-923e-6c146c8b21f2">

  Success가 되면 성공입니다.
  - 위에 사진을 보면 com.domain.app_0.0.1.ipk 가 있습니다.
  - 이 ipk파일이 라즈베리파이의 webOS에 설치하는 App 입니다.

  5. 설치
     	- 아래 코드에서 'Rasberry' 는 위에 ssh 설정해서 설정했던 Devide name 입니다.
	- 'com.domain.app_0.0.1_all.ipk' 는 패키징 후 완성된 ipk 파일 명을 쓰시면 됩니다.
     
	ares-install —device Rasberry com.domain.app_0.0.1_all.ipk

  Success가 되면 성공이며, 어플이 성공적으로 동작할 것입니다.
  ![18](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/5feb04b8-7d20-4f4c-b350-64afc260aaa6)

## How to use
1. Connect the camera to the raspberry pie.
2. Connecting Raspberry Pie to the Internet.
3. Change your unique server address (Please refer to the Url.js part of Code Implementation)
4. Run the installed application.
5. You can sign up for membership through the QR code that appeared on the first screen.
6. You need to register your face information, name, mobile phone number, vegan status, religion, and allergy by signing up for membership.

    <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/bad5d665-65c0-41f3-839a-73a2b35dae78">
    <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/9f5c919f-e630-4d0f-a7f3-45de15f5ada1">
    <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/f95fc192-a1fc-42a4-a2eb-70603a42dd83">
    <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/53e8d30c-6617-4c80-a175-03cce27cac87">
    <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/7ceba5d5-22c9-4ba9-9908-bc8afc0d9c2c">
    <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/145134a1-5461-4e90-b6a1-969298c50eb9">
    ![21](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/cf385c44-85ad-4d40-9d00-ec09664961bd)
    ![22](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/8e5d8bab-61c6-46f4-8657-57a9af8227ac)
    ![23](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/dca1a421-7fa4-4a4b-81b0-aea5c67b6244)
    ![24](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/ed02c030-48c5-42fc-8d17-0c790f01a739)
    ![25](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/1ff4c30c-ef76-4376-99ba-f0ac43d96a00)
    ![26](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/e562a9d9-524e-4985-b159-ee51c19aed8c)
![27](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/621f488c-f3df-4432-ba32-bf505dc29cbe)
![28](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/feea2cd5-10d8-4346-8232-569e00619967)

![29](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/60bdf4d0-d9a4-42a0-b5e8-1eb23dce13e8)
![30](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/87c94f6d-0792-496d-8730-ef57115b8c40)

<img width="988" alt="31" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/96006ef1-7b7f-4ea8-b8b6-716abd60ff44">

<img width="983" alt="32" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/385cee9e-9116-4d71-a9eb-f9a3565a558e">
![33](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/fcae8dfa-07fb-4cf9-905b-b39231a4a340)

![34](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/c99b7456-0c67-4878-9478-46f58a2a0301)

	

# 소스코드 설명
