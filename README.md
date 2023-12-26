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
     - [Sequence Diagram](#2-4-sequence-diagram)
     - [시스템 아키텍처](#2-5-시스템-아키텍처)
   - [과제 추진 일정 및 예산 활용 계획](#과제-추진-일정-및-예산-활용-계획)
   - [기대효과 및 활용방안](#기대효과-및-활용방안)
   - [예상되는 주요 과제성과](#예상되는-주요-과제성과)
   - [참여인력 세부](#참여인력-세부)
   - [GitHub 정보](#github-정보)
2. [Development environment setting](#prepare-the-target-device)
   - [Raspberry pi](#raspberry-pi)
   - [Touch display](#touch-display)
   - [Camera](#camera)
   - [Building a CLI Environment](#building-a-cli-environment)
   - [How to set up a server](#how-to-set-up-a-server)
3. [Install the App](#install-the-app)
4. [How to use](#how-to-use)
5. [Code Implementation](#code-implementation)

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
![image](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/009bc817-b219-42c8-b98b-a43276d88e74)

# 2-4 Sequence Diagram
* 회원가입
* ![image](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/4f50aa8b-d14a-4f5d-80fb-b69c8fbabbdb)

* 로그인
* ![image](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/dcfa47c4-5148-4a2c-b05b-6c00db2595e6)

* 메뉴 추천 및 필터링
* ![image](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/1695706a-0e47-42ad-aa0e-565fc1ef630b)

* 메뉴/카테고리/옵션 추가 및 삭제
* ![image](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a832bfaf-214b-4f3e-a780-0596674ea7d5)



# 2-5 시스템 아키텍처
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

# Prepare the Target device

You must have a target device (RPi 4) with webOS OSE. Please refer to the [Building webOS](https://www.webosose.org/docs/guides/setup/building-webos-ose/)

> [!NOTE] 
> Both Windows and Linux environments are possible, but we recommend Linux environments.

The hardware, Software we used {<br />
Raspberry Pi : Raspberry Pi 4 Model B 8GB <br />
OS : webos ose 2-24-0<br />
Camera : ROYCHE RPC-20F FHD webcam<br />
Touch display : Raspberry Pi Display 10.1-Inch Touch Screen LCD
}

## Raspberry Pi
* HardWare : [Raspberry Pi 4 Model B 8GB](https://smartstore.naver.com/eleparts/products/4799825062?n_media=11068&n_query=%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B44&n_rank=4&n_ad_group=grp-a001-02-000000007238914&n_ad=nad-a001-02-000000229608972&n_campaign_type=2&n_mall_id=ncp_1nlzbo_01&n_mall_pid=4799825062&n_ad_group_type=2&n_match=3&NaPm=ct%3Dlpihmmrs%7Cci%3D0Au0003H1knzI6qsyfp7%7Ctr%3Dpla%7Chk%3D9ad14e585bbe9eea74201d2e1f1481527ed653e7)

* OS : [webos ose](https://github.com/webosose/build-webos/releases)

1. Download webos image from [webos ose](https://github.com/webosose/build-webos/releases)
 
     <img width="899" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/1f147666-4f88-4db0-bac5-4f7d88631648">

> [!NOTE] 
> We have installed version 2-24-0 as of December 2023.


2. Extracting image files
    * Uncompressed using the [7-zip](https://www.7-zip.org/) program
        
        ![1](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/ed374a79-e867-4a87-a388-56b2023ef70f)

    * You can decompress it.

        ![2](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/03555465-ac71-4b42-b756-ee4412a94e8d) 

    * A folder called webos-ose-2-24-0-raspberrypi4-64.tar is created.

        ![3](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/f8e1629b-020f-422a-8267-04e1c93c48ce)

    * If you enter the folder, there is a .tar file, and you can proceed with decompressing it.

        ![4](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a863fbc4-99cc-4150-bea7-ab89cae26c73)
        ![5](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/d80c904e-979f-46ca-8dd1-951add57e53c) 

    * Uncompressed creates a folder called webos-ose-2-24-0-raspberrypi4-64.

        ![6](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/be9e14e9-4aeb-4eb9-adc4-3fb449fbf6d5) 
        
    * When you enter the folder, you'll find a .mic file, which means the Image file is ready.


3. Formatting SD Cards
    * You can refer to it and format the SD card. - [Flashing webOS Open Source Edition](https://www.webosose.org/docs/guides/setup/flashing-webos-ose/) 
    * Windows 10 default format doesn't matter!


4. Image flushing to sd card
    * Image flushing to sd card using program : [Win 32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) 
    * Please select the .mic file obtained above, select the SD card you formatted, and press the Write button.

        ![8](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/2c0252ba-a718-4e1b-9857-593a12b6f12a)

    * It's taking some time.

        ![9](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/2cf967ab-8a65-4c13-8abd-a0cec6607281)

    * Done! Now when you insert the SD card into the bottom of the Raspberry Pi and boot it up, WebOs will boot normally!
> [!NOTE] 
  > If you insert the sd card into the sd reader and insert it into USB on its own, it will not boot! Make sure you remove the sd card separately and insert it into the bottom of the Raspberry Pi!

   ![10](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/5015e33f-8ff7-44e4-8ad6-8976d0befe53)
    
* If Writing Successful appears, you have successfully flushing the image on the sd card.

## Touch display

* HardWare : [Raspberry Pi Display 10.1-Inch Touch Screen LCD](https://smartstore.naver.com/mcuboard/products/5006590307?NaPm=ct%3Dlpihmuhk%7Cci%3D2d0b272112d74fa2c41384d2a3b0e4a94ff945f5%7Ctr%3Dsls%7Csn%3D186400%7Chk%3D991293f6377b661f14470419dc8bc00fa26ea908)

    ![11](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/3f2edb87-7a3c-4c05-8dd7-0b0c24286da1)
    
 * If you assemble the components well on the touch display and power the Raspberry Pi, you can see that the screen is coming out well.

## Camera
* HardWare : [ROYCHE RPC-20F FHD webcam](https://prod.danawa.com/info/?pcode=13386197)

* Webos is only available on cameras that support V4L2(Vedio for Linux 2).
* In version 2.23, the camera didn't work, and in version 2.24, it worked normally.
* You can use it right away by connecting the camera to the Raspberry Pi usb.


## Building a CLI Environment
> [!NOTE] 
> if there is something like Korean in the file path, you have to change it to English.


1. Install Node.js [Link](https://nodejs.org/en)
    * If the installation is successful, you can check the version by executing the command below.
        
            node -v

2. Install npm and React
   	* npm is included in Node.js, so if Node.js is installed successfully, npm is already available.
   	* You can check if the npm is installed well through the command below.
    * React are required when you build a project later and sign up.


            npm -v

            npm install -g create-react-app

3. Git clone our project. [link](https://github.com/Cheetah-19/Kiosk_KNU.git)
    * Once you have cloned, please run the following command

    * from Kiosk_KNU/frontend/kiosk_page

            npm install react-scripts
            npm install axios
            npm install react-bootstrap bootstrap

    * from Kiosk_KNU/frontend/register

            npm install react-scripts
            npm install axios
    

4. CLI Installation
    *  Use the -g option to run the following command on the terminal to install the CLI globally.

	        npm install –g @webosose/ares-cli

## How to set up a server
1. (Recommended) Virtual Environment Settings
    * We recommend that you set the Python version to version 3.11 using anaconda, etc.
    * You can choose between the two methods below.
        1) Anaconda
            * Create a virtual environment.

                    conda create -n 'virtual environment name' python=3.11

                ![21](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/cf385c44-85ad-4d40-9d00-ec09664961bd)

            * Enable the virtual environment.

                    conda activate 'virtual environment name'

                ![22](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/8e5d8bab-61c6-46f4-8657-57a9af8227ac)

        2) Virtualenv enabled version (simple)

                    pip install virtualenv
                    virtualenv 'virtual environment name'
                    --python=<Python version>
                
            * (For linux) Enable the virtual environment with source 'virtual environment name'/bin/activate.

            * (For window cmd) Navigate to the directory where the virtual environment is installed.

            * It will be in the directory where you created the virtualenv command.
            * Run .\'Virtual Environment Name’\Scripts\activate to activate the virtual environment.

2. The server code was written in Django. Install Django and restframework.
    * If the installation does not work well in the next installation, I recommend turning off and off the terminal.

            pip install django 
            pip install djangorestframework django-cors-headers 
            pip install drf-yasg 

    * The following is the installation of a library related to face recognition and menu recommendations.

            pip install scikit-learn
            pip install deepface

    * Go to the backend folder on the terminal and run python manage.py run server 0.0.0.0:'port number'

            python manage.py runserver 0.0.0.0:'port number'
        * At this time, please enter the port number you want to use
        * If you see the screen below after running, it's a success.
        
            ![23](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/dca1a421-7fa4-4a4b-81b0-aea5c67b6244)

3. Setting Port-Forwarding & Changing variables for Server Connections
    * Verify the local ip address of the server running with ipconfig
        * Verify the IPv4 address of the wireless LAN.

            ![24](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/ed02c030-48c5-42fc-8d17-0c790f01a739)

        * Port forwarding on your router settings page.
    * Saves the port number port forwarded from 
        * frontend/kiosk_page/src/constant/Url.js
        * frontend/register/src/constant/Url.js 
        * with the public IP (https://www.findip.kr/) in the BASE_URL variable.
        ![25](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/1ff4c30c-ef76-4376-99ba-f0ac43d96a00)
        ![26](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/e562a9d9-524e-4985-b159-ee51c19aed8c)


If you're done so far, your server is ready! Now it's time to start the app.

# Install the App

Install the app on the target device by using the webOS OSE CLI from your local PC.

On your local PC, follow these steps:

1. SSH Settings
    * Device settings are required for ssh connections.

	        ares-setup-device 
 
        <img width="566" alt="12" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/17ff7663-0290-433c-8a12-016ea5cc8487">

    * If you look at the picture above, you can see that a new device has been added.

    - Add : Add Mode
    - Name : Please name the device.
    - IP address : You can write down the IP address of the Raspberry Pi.
    - Port : I set the port number as 22. (When I used another port, I got a package error.)
    - User : You can set it to root.
    - Description : You can skip it. (skip = Enter)
    - Authentication : Choose whether you want to use the password or ssh key as the permission setting. I chose the password because the password is simpler than the ssh key.
    - Password : You can set the password. (skip = Enter)
    - Default : It's N in the picture, but it's more convenient to choose Y.
    - Save : Please save it as Y.

2. Installing the webOS OSE app
    * You must create an app using template.
    * You can change only the part of 'sampleApp' from the code below to the project name you want. (sampleApp = folder name)

	        ares-generate -t webapp sampleApp

        <img width="483" alt="13" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/620b1604-5726-481b-a2fb-6f9afef7f91a">
 
        * If it's Success, it's Success.
   
    * It becomes Success, creates a folder, and you can see that it contains the settings.

        <img width="789" alt="14" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/6cbb0492-6400-4927-b2b6-de58753b5f09">

        * app id : You can omit the app as an id that distinguishes it.
        * title : The title of the application.
        * version : You can specify a version.

    * You must allow camera permission to do face recognition in appinfo.json.
    
        <img width="300" alt="14" src="https://github.com/baegopababjo/website/assets/95912522/05a07ec1-f80e-466f-95f5-feeff382cf2d">


  3. Overwrite the built content over the folder you created (in this case 'sampleApp').
> [!NOTE] 
> You must navigate to the folder you want to build and run it (frontend/kiosk_page in this case)
	```
	npm run build
	```
  * If you get an error such as Can't resolve 'react-dom', please execute the command below and try again.
	```
	npm install
	```  
  * If you get an error such as Can't save 'bootstrap/dist/css/bootstrap.css', please execute the following command from the ./Kiosk_KNU location.
	```
	npm install react-bootstrap bootstrap
	```

    * When you build a project, a build file will be created.
        
        <img width="737" alt="스크린샷 2023-12-06 오후 10 06 55" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a133af50-dc41-4e2e-8313-7c5688a0622f">

        * You can see that a 'build' folder has been created.
        * You can 'overlay' the contents of the file inside the sampleApp folder created above.


  4. Packaging
     - You can change only the part of 'sampleApp' from the code below to the project name you want. (sampleApp = folder name)
    
	        ares-package ./sampleApp

        <img width="418" alt="15" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/395c1cc3-c671-4e50-923e-6c146c8b21f2">

        * If it's Success, it's Success.
        * If you look at the picture above, there is com.domain.app_0.0.1.ipk.
        * This ipk file is the app you install on Raspberry Pi's webOS.

  5. Installation
        * In the code below, 'Raspberry' is the Devide name set by ssh set above.
	    * For 'com.domain.app_0.0.1_all.ipk', write the name of the completed ipk file after packaging.
     
	            ares-install —device Rasberry com.domain.app_0.0.1_all.ipk

        * if it becomes Success, it is Success, and the application will work successfully.
  
        ![18](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/5feb04b8-7d20-4f4c-b350-64afc260aaa6)

# How to use
1. Connect the camera to the Raspberry Pi.
2. Connecting Raspberry Pi to the Internet.
3. Change your unique server address (Please refer to the Url.js part of Code Implementation)
4. Run the installed application.
5. You must go to the frontend/register file and proceed with membership registration using the command below to log in.

        npm start

6. When the membership registration page is launched, you can register your information to sign up.

> [!NOTE] 
> The face model is downloaded from the server when you first do face recognition. I recommend you turn the server back on when you see the cmd window and see that the face model has been downloaded from the server.
> Please note that downloading files before signing up for membership is fast, and the model downloading after signing up for membership is large, so it takes time.

* <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/bad5d665-65c0-41f3-839a-73a2b35dae78">
* This page allows you to register your face.
* <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/9f5c919f-e630-4d0f-a7f3-45de15f5ada1">
* This page allows you to register your name.
* <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/f95fc192-a1fc-42a4-a2eb-70603a42dd83">
* This page allows you to register your mobile phone number.
* <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/53e8d30c-6617-4c80-a175-03cce27cac87">
* This page allows you to register whether you are vegan or religious.
* <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/7ceba5d5-22c9-4ba9-9908-bc8afc0d9c2c">
* This page allows you to register whether you are allergic.
* When you press the Finish button on the Allergy Check page, the face model is downloaded, which may take time to sign up for the first time. Check the server to see what is downloaded.
* <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/145134a1-5461-4e90-b6a1-969298c50eb9">
* This page tells you that your payment has been completed.

    * If registered, you can log in with your face information and cell phone number.
    

7. Log in with your registered face information or cell phone number.
* If you press the login button above, you will automatically attempt to log in through facial recognition.

    <img width="50%" alt="31" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/96006ef1-7b7f-4ea8-b8b6-716abd60ff44">

* You can log in with your cell phone number by pressing the button below.

    <img width="50%" alt="32" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/385cee9e-9116-4d71-a9eb-f9a3565a558e">

* If you successfully log in, you can use the kiosk with a menu tailored to your information!

    <img width="50%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/fcae8dfa-07fb-4cf9-905b-b39231a4a340">


# Code Implementation
* If you want to see the source code, please click the [Git link](https://github.com/Cheetah-19/Kiosk_KNU)

### Url.js
* This file can set the server address at once.
* You can put your personal server address inside.
* You can change it from the file in the two paths below.
    * frontend/kiosk_page/src/constants/Url.js ( Server setup address for kiosk page )
    * frontend/register/src/constants/Url.js ( Server setup address for user registration page )

```
    export const BASE_URL = 'http://127.0.0.1:8000';
```

### face_recognition/extractor.py
* You must specify a pre-training model name for facial recognition.

```
    # recognizer
    model_name = 'VGG-Face'
    target_size = functions.find_target_size(model_name)
```
* homomorphic_filter()

* This is a function that controls image illumination.
```
    def homomorphic_filter(img):
    try:
        # Only the calculation for Y with YUV color space
        img_YUV = cv2.cvtColor(img, cv2.COLOR_BGR2YUV)
        y = img_YUV[:, :, 0]

        rows = y.shape[0]
        cols = y.shape[1]

        # Logs are taken to separate illumination elements and reflection elements
        imgLog = np.log1p(np.array(y, dtype='float') / 255)

        M = 2 * rows + 1
        N = 2 * cols + 1

        # Generate gaussian mask, sigma = 10
        sigma = 10
        (X, Y) = np.meshgrid(np.linspace(0, N - 1, N), np.linspace(0, M - 1, M))
        Xc = np.ceil(N / 2)
        Yc = np.ceil(M / 2)
        gaussianNumerator = (X - Xc) ** 2 + (Y - Yc) ** 2

        # Create low pass filter and high pass filter
        LPF = np.exp(-gaussianNumerator / (2 * sigma * sigma))
        HPF = 1 - LPF

        LPF_shift = np.fft.ifftshift(LPF.copy())
        HPF_shift = np.fft.ifftshift(HPF.copy())

        # The image covered with Log is FFTed and multiplied by LPF and HPF to divide the LF and HF components.
        img_FFT = np.fft.fft2(imgLog.copy(), (M, N))
        img_LF = np.real(np.fft.ifft2(img_FFT.copy() * LPF_shift, (M, N)))
        img_HF = np.real(np.fft.ifft2(img_FFT.copy() * HPF_shift, (M, N)))

        # The lighting and reflection values are controlled by multiplying each LF and HF component by the scaling factor.
        gamma1 = 0.3
        gamma2 = 0.7
        img_adjusting = gamma1 * img_LF[0:rows, 0:cols] + gamma2 * img_HF[0:rows, 0:cols]

        # The adjusted data is now made into an image through exp operations.
        img_exp = np.expm1(img_adjusting)
        img_exp = (img_exp - np.min(img_exp)) / (np.max(img_exp) - np.min(img_exp))
        img_out = np.array(255 * img_exp, dtype='uint8')

        # YUV replaces Y space with a filtered image and converts it to RGB space.
        img_YUV[:, :, 0] = img_out
        result = cv2.cvtColor(img_YUV, cv2.COLOR_YUV2BGR)

        return result
    except:
        pass
```
* resize_with_padding()

* This function adjusts the image size to the model target_size.
```
    def resize_with_padding(image, target_size):
        height, width = image.shape[:2]
        target_height, target_width = target_size

        # Calculate the image ratio.
        aspect_ratio = width / height
        target_aspect_ratio = target_width / target_height

        # Resize according to the image ratio.
        if aspect_ratio > target_aspect_ratio:
            new_width = target_width
            new_height = int(new_width / aspect_ratio)
        else:
            new_height = target_height
            new_width = int(new_height * aspect_ratio)

        # Resize the image.
        resized_image = cv2.resize(image, (new_width, new_height))

        # Fill the margins with black
        padding_top = (target_height - new_height) // 2
        padding_bottom = target_height - new_height - padding_top
        padding_left = (target_width - new_width) // 2
        padding_right = target_width - new_width - padding_left
        padded_image = cv2.copyMakeBorder(resized_image, padding_top, padding_bottom, padding_left, padding_right, cv2.BORDER_CONSTANT, value=(0, 0, 0))

        return padded_image
```
* extractor()

* This function converts base64 to embedding.
    1. base64 -> image
    2. image -> face
    3. face -> embedding
```
    def extractor(base64):
    try:
        # 1. base64 -> image
        img = functions.loadBase64Img(base64)

        # 2. image -> face (Face Area Extracted)
        face = DeepFace.extract_faces(img_path=img, target_size=target_size, detector_backend='ssd')[0]['facial_area']
        x, y, w, h = face['x'], face['y'], face['w'], face['h']
        face = img[y:y + h, x:x + w]

        # Adjusting lighting
        face = homomorphic_filter(face)

        # Resizing an image
        face = resize_with_padding(face, target_size)

        # 3. face -> embedding
        embedding_img = DeepFace.represent(img_path=face, model_name=model_name, detector_backend='skip')[0]['embedding']

        return embedding_img
    except:
        return None
```

### face_recognition/identification.py
* findCosineDistance()

* This function is a function that calculates the distance between a user's face info and the embedding of a photo taken from the front in the cosine similarity method.

```
    def findCosineDistance(db_list, target):
        a = np.dot(db_list, target)
        b = np.linalg.norm(db_list, axis=1)
        c = np.sqrt(np.sum(np.multiply(target, target)))

        return 1 - (a / (b * c))
```
* identification()

* This function returns the shortest distance between a user's face info and the embedding of a photo taken from the front.

```
    def identification(db_embedding_list, target_embedding):
        return np.min(findCosineDistance(db_embedding_list, target_embedding))
```

### face_recognition/base2vector.py
* base_to_vector()

* This function converts a base64 list received from the front into an embedding list.

```
    def base_to_vector(face_bases: list) -> list:
        embedding_list = []

        for base in face_bases:
            # base64 -> embedding
            input_embedding = extractor(base)

            if input_embedding is not None:
                embedding_list.append(input_embedding)
        return embedding_list
```

### face_recognition/checker.py
* Input size must be specified according to Keras CNN model (150 x 150)

```
    target_size = (150, 150)
    model = load_model('./face_recognition/mask_model.h5')
```
* isFace()
* This function determines whether your face is well detected or whether you are wearing a mask.
```
    def isFace(base64):
        try:
            # 1. base64 -> image
            img = functions.loadBase64Img(base64)

            # 2. image -> face (Extracting Face Areas)
            face = DeepFace.extract_faces(img_path=img, target_size=target_size, detector_backend='ssd')[0]['facial_area']
            x, y, w, h = face['x'], face['y'], face['w'], face['h']
            face = img[y:y + h, x:x + w]

            # Adjusting lighting
            face = homomorphic_filter(face)

            # Resizing an image
            face = resize_with_padding(face, target_size)

            # Image preprocessing
            face = face[:, :, ::-1]
            face = face.astype(np.float64) / 255.0

            # Determining whether or not to wear a mask
            face = np.expand_dims(face, axis=0)
            value = model.predict(face)

            print(value)
            if value <= 0.5:
                return False
            else:
                return True
        except:
            return False
```

### login/views.py
* post()

* This function provides an indication of how facial recognition logins work.
    1. 5 base64 files POST via Front Face.js
    2. base64 -> image -> embedding
    3. Get information from all users
    4. Calculate the face info distance between embedding and user at number 2
    5. Returns the user's mobile phone number whose distance was less than the threshold and the shortest distance.

```
    class FaceLoginView(APIView):
        def post(self,request):
            # 1. 5 base64 files POST (list) via Front Face.js
            if request.method == 'POST':
                try:
                    face_bases = request.data.get('imageData')
                except:
                    return Response('')

                # 2. base64 -> image -> vector
                target_embedding_list = base_to_vector(face_bases)
                print("Received face data from front")

                # 3. vector-> embedding
                embedding_array =  np.array(target_embedding_list)
                # 3. Get information from all users
                user_table = User.objects.all()

                min_dist = 1e9
                phonenum = None
                name = None

                for user in user_table:
                    try:
                        user_face_list = np.array(eval(user.user_face_info))

                        # 4. Calculate the vector and user's face info distance at number 2
                        distance = 1e9
                        for target in embedding_array:
                            distance = min(distance, identification(user_face_list, target))

                        #print(f"{user.user_name}: {distance}")

                        if distance < min_dist:
                            min_dist = distance

                            # Pull only when the distance is lower than the threshold.
                            if min_dist <= 0.15:
                                phonenum = user.user_phonenum
                                name = user.user_name
                    except:
                        pass

                if phonenum is not None:
                    print(f"Success\nname: {name}, phonenum: {phonenum}")
                else:
                    print("None")

                # 5. Returns the user's mobile phone number whose distance was below the threshold and the shortest distance
                return Response({"phone_number": phonenum, "name": name})
```
### signup/views.py
* post()
* This function checks if it is a suitable face photo during the membership registration process.
```
    class FaceCheckView(APIView):
        def post(self, request):
            face_base = request.data.get('imageData')

            # Face extracted
            if isFace(face_base):
                print("No mask")
                return Response({'result': True})
            # Face not extracted
            else:
                print("mask")
                return Response({'result': False}, status=400)
```


### menu/recommendation.py
* get_recommended()
* This function recommends menus to users based on their past order information and ingredient information in the menu.
* Don't recommend ingredients that users can't eat

```
    def get_recommended(user_id):
        # Menu and ingredients
        menus_db = Menu.objects.all()
        # Importing User Instances
        user_instance = User.objects.get(user_phonenum = user_id)             

        try:
            user_preprocessed_data = PreprocessedData.objects.get(user=user_instance)
            exclude_ingredient_str = user_preprocessed_data.excluded_ingredients
        except PreprocessedData.DoesNotExist:
            exclude_ingredient_str = ""


        # Process of changing String to Set
        # Split into commas after removing brackets
        if exclude_ingredient_str == "empty":
            excluded_ingredients = set() 
        else :
            exclude_ingredient_list = exclude_ingredient_str[1:-1].split(',')
            #String -> Create set after integer conversion
            excluded_ingredients = set(int(item.strip()) for item in exclude_ingredient_list)

        menus = {}
        for menu in menus_db:
            ingredients = [ingredient.id for ingredient in menu.menu_ingredient.all()]
            # Skip menus with excluded ingredients
            if any(ingredient in excluded_ingredients for ingredient in ingredients):
                continue
            ingredients_str = " ".join([ingredient.ingredient_name for ingredient in menu.menu_ingredient.all()])
            menus[menu.menu_name] = ingredients_str

        # Order data: {Order number: {'user': User ID, 'menus': [Order menu list]}}
        orders_db = Order.objects.filter(user=user_instance)

        orders = {}
        for order in orders_db:
            ordered_items = Ordered_Item.objects.filter(order=order)
            orders[order.order_num] = {'user': order.user.user_phonenum, 'menus': [item.menu.menu_name for item in ordered_items]}

        # TF-IDF conversion
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(menus.values())
        tfidf_features = np.array(tfidf_matrix.todense())

        # Calculate cosine similarity
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # Extract menus from a user's past orders
        past_orders = []
        for order in orders.values():
            if order['user'] == user_id:
                past_orders.append(order['menus'])
        
        past_menus = []
        for order in past_orders:
            for menu in order:
                past_menus.append(menu)           # ex) ["Salmon Salad", "Salmon Salad", "Psyburger", "Rice Noodles", and "Rice Noodles"] It comes out as "Salmon Salad", and the more you come out twice, the higher the weight.
        

        # Find menus similar to those ordered in the past
        similar_menus = np.zeros(len(menus))
        for menu in past_menus:
            index = list(menus.keys()).index(menu)
            similar_menus += cosine_sim[index]

        # Functions to obtain indexes for similarity calculations
        def get_index(menu):
            menu_keys = list(menus.keys())
            index = menu_keys.index(menu)
            return similar_menus[index]

        # Creating a Menu List
        menu_list = list(menus.keys())

        # Sorts menus in order of high similarity
        sorted_menus = []
        for menu in menu_list:
            sorted_menus.append((menu, get_index(menu)))

        sorted_menus.sort(key=lambda x: x[1], reverse=True)

        # Extract only menu names
        sorted_menus = [menu[0] for menu in sorted_menus]
        recommended_menus = []
        for recom in sorted_menus:
            this_menu = Menu.objects.get(menu_name=recom)
            this_serial = MenuSerializer(this_menu)
            recommended_menus.append(this_serial.data)
        # # Sort menus in order of high similarity
        # sorted_menus = sorted(list(menus.keys()), key=lambda x: similar_menus[list(menus.keys()).index(x)], reverse=True)

        # Previous orders are excluded from the recommendation list
        #  recommended_menus = []
        #  for menu in sorted_menus:
        #      if menu not in past_menus:
        #         recommended_menus.append(menu)
        recommended_menus = recommended_menus[0:3]
        return recommended_menus
```
