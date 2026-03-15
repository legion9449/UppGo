FROM php:8.4-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    zip \
    curl \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy project
COPY . .

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Fix permissions
RUN chmod -R 775 storage bootstrap/cache

# Create Laravel storage link (VERY IMPORTANT for images)
RUN php artisan storage:link || true

# Clear caches so Cloud Run env variables work
RUN php artisan config:clear || true
RUN php artisan cache:clear || true

# Run Laravel
CMD php -S 0.0.0.0:${PORT} -t public