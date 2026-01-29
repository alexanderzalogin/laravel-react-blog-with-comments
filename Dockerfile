FROM php:8.3-fpm-alpine

# Установка зависимостей
RUN apk update && apk add \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    oniguruma-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Установка Node.js и npm
RUN apk add --update nodejs npm

# Копирование проекта
COPY src /var/www

# Установка прав
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

WORKDIR /var/www

# Копирование env файла (опционально)
# COPY src/.env.example /var/www/.env

EXPOSE 9000

CMD ["php-fpm"]