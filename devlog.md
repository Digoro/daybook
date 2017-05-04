* 2017.04.30(일)
    * 프로젝트 환경 구축
        * node, git 설치
        * git 및 npm 초기화
        * github 저장소 생성
    * gulp 및 태스크 학습
        * 주안점
            * 다음 디렉토리로 코드 변환: 서버 코드(server), 클라이언트 코드(src) --> 서버 코드(app), 클라이언트 코드(dist)
            * ES6 문법을 사용하려면 서버 코드는 babel을 통해 트랜스파일만 수행하면 되지만 클라이언트 코드는 브라우저가 CommonJS 스타일을 사용할 수 있도록 모듈 번들러가 필요
                * 대표적인 모듈 번들러: browserify, webpack
        * 태스크 수행 내용
            * clean-css, htmlmin, imagemin으로 리소스 크기 최소화
            * babel로 트랜스파일
            * webpack으로 클라이언트 코드 번들화, 난독화
            * brower-sync로 클라이언트 코드 변환 시 브라우저에 실시간 반영
            * gulp-watch에 각 태스크를 두어 변화된 코드에 대한 각 태스크 수행
    * TODO
        * webpack에 대한 자세한 내용은 미흡, 학습 할 것