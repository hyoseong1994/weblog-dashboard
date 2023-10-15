# 프로젝트 실행 방법

## 실행 환경

- nodejs: 18.7.0
- npm: 8.15.0
- yarn: 1.22.19
- 웹 브라우저: chrome 117.0.5938.149

## 설치

- yarn 설치

```sh
npm install -g yarn@1.22.19
```

- 패키지 설치

```sh
yarn install
```

## 실행

`yarn start`실행 후, 웹 브라우저에서 localhost:3000로 실행 결과물을 확인

```sh
yarn start
```

# 최종 스크린샷

![Screenshot](image/screenshot.png)

# 사용한 기술과 선택한 이유

> recharts : 최근까지도 업데이트되면서도 문서화가 잘되어있습니다.

## 프로젝트 구조

- components : 반복되는 요소 분리하여 구성

```bash
├── public
├── src
│   ├── app
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── types
│   └── utils
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── weblog.csv
└── yarn.lock
```
