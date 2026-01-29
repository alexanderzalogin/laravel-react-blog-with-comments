# Удалить папку
/src/node_modules

# Остановить и удалить все контейнеры
docker ps -a -q | ForEach-Object { docker rm -f $_ }

# Удалить все образы
docker images -q | ForEach-Object { docker rmi -f $_ }

# Удалить все тома
docker volume ls -q | ForEach-Object { docker volume rm $_ }

# Сборка и запуск контейнеров
docker-compose up -d --build

# Установка зависимостей Laravel
docker-compose exec app composer install

# Генерация ключа приложения
docker-compose exec app php artisan key:generate

# Запуск миграций
docker-compose exec app php artisan migrate --seed

docker-compose exec app php artisan breeze:install react

# Установить react-router-dom как dev зависимость
docker-compose exec app npm install react-router-dom --save-dev
docker-compose exec app npm install bootstrap @popperjs/core --save-dev

docker-compose exec app npm run dev -- --host

Приложение доступно по адресу: http://localhost:8000
phpmyadmin: http://localhost:8080/

Удалить файл /src/public/hot

![img.png](img.png)
