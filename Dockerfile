# Usamos una imagen ligera de Nginx
FROM nginx:alpine

# Borramos la configuración por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiamos nuestros archivos a la ruta de Nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto por defecto de Nginx
EXPOSE 80
