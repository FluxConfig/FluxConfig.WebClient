FROM node:23-alpine AS build

WORKDIR /app
COPY ["package.json", "."]
COPY [".", "."]

RUN npm install && npm run build

FROM nginx:alpine AS final
COPY --from=build /app/dist /usr/share/nginx/html
COPY entrypoint.sh /entrypoint.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]