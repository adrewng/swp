FROM node:22.19.0 AS build


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .


RUN npm run build


# -------------------------------
# NGINX PHASE
# -------------------------------
FROM nginx:alpine


# Xóa default config
RUN rm /etc/nginx/conf.d/default.conf


# Copy nginx.conf của bạn vào container
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copy build React/Vite vào Nginx
COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]