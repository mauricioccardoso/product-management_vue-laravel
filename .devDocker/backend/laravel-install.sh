#!/bin/bash

if [ -e /home/php/backend/composer.json ] && [ -e /home/php/backend/public/index.php ]; then
  echo -e "\n\e[33;1m Warning - The project already exists \e[0m\n"

else
  echo -e "\n\e[35;1m No project found \e[0m"
  echo -e "\e[35;1m Starting the creation of a Laravel project \e[0m\n"

  rm -rf /home/php/backend/.gitignore
  cd /home/php

  composer create-project laravel/laravel backend
  if ! [ -e /home/php/backend/composer.json ] || ! [ -e /home/php/backend/public/index.php ]; then
    echo -e "\e[33;1m *** Script execution canceled *** \e[0m\n"
    exit 1
  fi
  echo -e "\e[35;1m Project created \e[0m"

  cd backend

  # echo -e "\n\e[35;1m Running the server on port 8081 \e[0m"
  # php artisan serve --host=0.0.0.0 --port=8081
fi