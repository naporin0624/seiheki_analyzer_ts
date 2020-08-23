FROM node:14
WORKDIR /usr/src/app

# Install utilities
RUN apt-get update --fix-missing && apt-get -y upgrade

# Japanese
RUN apt-get install -y locales task-japanese
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:jp
ENV LC_ALL ja_JP.UTF-8

COPY package.json .
COPY yarn.lock .

RUN yarn install
COPY . . 


CMD yarn start
