FROM node:alpine as build
WORKDIR /app

# 환경변수 설정
ARG REACT_APP_API_URL
ARG REACT_APP_FRONT_URL
ARG REACT_APP_KAKAO_REST_API_KEY
ARG REACT_APP_KAKAO_CLIENT_SECRET

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_FRONT_URL=$REACT_APP_FRONT_URL
ENV REACT_APP_KAKAO_REST_API_KEY=$REACT_APP_KAKAO_REST_API_KEY
ENV REACT_APP_KAKAO_CLIENT_SECRET=$REACT_APP_KAKAO_CLIENT_SECRET

COPY package.json package-lock.json ./
RUN npm install --force --silent

COPY . /app
RUN npm run build

FROM nginx:alpine
COPY --from=build  /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]