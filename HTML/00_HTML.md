### Hyper Text Markup Language
하이퍼 텍스트를 가장 중요한 특징으로 하는 미크업이라고 하는 형식을 가진 컴퓨터 프로그래밍 언어 <br />
-> 웹 문서를 만드는 언어 (문법 오류에 관대한 편이라 닫는 태그</ >를 누락하거나 오타가 발생해도 제대로 작동하긴 한다.)

### HTML의 기본 구조
```
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8">
        <title>Document</title>
    </head>
    <body>
        
    </body>
</html>
```
1. <!DOCTYPE> : 웹 브라우저가 해당 문서가 어떤 HTML 버전을 기반으로 작성되었는지 알려주는 역할을 하는 '선언문'으로 문서의 최상단에 위치 <br />
-> <!DOCTYPE html>은 HTML5로 작성된 문서라는 뜻 (Document type declaration)

2. <html> - </html> : HTML 웹 문서의 시작과 끝을 의미하는 태그 <br />
-> lang="ko"란 이 문서가 어떤 언어로 작성되었는지 알려주는 코드 (ex. en는 영어, ko는 한국어)

3. <head> - </head> : 웹 브라우저가 웹 문서를 해석하는데에 필요한 정보들을 담은 태그 <br />
-> 가장 먼저 읽어지는 부분으로 '사용 설명서'와 같은 부분 <br />
-> <meta charset="utf-8"> : 웹 문서에 저장되어 있는 문자 정보들을 읽는 규칙에 대한 명세 <br />
-> <title> - </title> : 웹 사이트의 최상단에 이 사이트에 대한 설명&제목을 명시하는 태그 <br />
!! 이 둘은 head 태그 밑에 오도록 '약속'되어 있다.

4. <body> - </body> : 실제 웹 브라우저 화면에 나타나는 내용 (본문)