#!/bin/bash

if [ -e /home/node/app/package.json ] && [ -e /home/node/app/src/App.vue ]; then
  echo -e "\n\e[33;1m Warning - The project already exists \e[0m\n"

else
  echo -e "\n\e[32;1m No project found \e[0m"
  echo -e "\e[32;1m Starting the creation of a Vue project using the official Vue project scaffolding tool - 'create-vue' \e[0m"

  cd /home/node

  echo -e "\n\e[33;1m *** Warning - The 'project name' should always be\e[0m \e[32;1m'app'\e[0m \e[33;1m***\e[0m\n"
  npm create vue@latest
  if ! [ -e /home/node/app/package.json ] || ! [ -e /home/node/app/src/App.vue ]; then
    echo -e "\n\e[33;1m *** Script execution canceled *** \e[0m\n"
    exit 1
  fi
  echo -e "\n\e[32;1m Project created - Finishing the installation, PLEASE WAIT! \e[0m"

  cd app

  echo -e "\e[32;1m Installing dependencies \e[0m\n"
  npm install
  echo -e "\n\e[32;1m Dependencies installed \e[0m"

  if [ -e /home/node/app/.prettierrc.json ] && [ -e /home/node/app/.eslintrc.cjs ]; then
    echo -e "\n\e[32;1m Formatting the project with Prettier \e[0m"
    npm run format
    echo -e "\n\e[32;1m Project formatted \e[0m"
  fi

  echo -e "\e[33;1m
  *** Warning - To access the project in the browser ***
  In the vite.config.ts file, add the 'server' configuration option \e[0m
  \e[32;1m
    export default defineConfig({
      ...
      server: {
        host: true
      }
    })
  \e[0m"


  echo -e "\e[32;1m Starting server \e[0m"
  npm run dev
fi