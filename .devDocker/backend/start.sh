#!/bin/bash

echo -e "\e[32m Running Start Script \e[0m"

cd /home/php/backend

if [ -e /home/php/backend/composer.json ] && [ -e /home/php/backend/.env ]; then
  echo -e "\e[32m Project found \e[0m"

  echo -e "\e[32m Installing dependencies \e[0m\n"
  composer install
  echo -e "\n\e[32m Dependencies installed \e[0m"

  echo -e "\e[32m Generating key \e[0m"
  php artisan key:generate
  echo -e "\e[32m Key generated \e[0m"

  echo -e "\e[32m Running migrations \e[0m"
  php artisan migrate --seed
  echo -e "\e[32m Migrations completed \e[0m"

  # echo -e "\n\e[32;1m Keeping the container up \e[0m"
  # tail -f /dev/null

  echo -e "\e[32m Running the server on port 8080 \e[0m"
  php artisan serve --host=0.0.0.0 --port=8080

elif [ -e /home/php/backend/composer.json ] && ! [ -e /home/php/backend/.env ]; then
  echo -e "\n\e[33;1m *** Warning - File .env does not exist \e[0m"
  echo -e "\e[33;1m Please create the '.env' file from '.env.example' and configure the database connection variables \e[0m"

  echo -e "\n\e[32;1m Keeping the container up \e[0m"
  tail -f /dev/null

else
  echo -e "\e[33;1m *** Warning - Project or file composer.json does not exist \e[0m"

  echo -e "\e[32;1m Keeping the container up \e[0m"
  tail -f /dev/null
fi