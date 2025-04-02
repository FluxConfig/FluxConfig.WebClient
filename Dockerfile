FROM node:23-alpine AS build

WORKDIR /app
COPY ["package.json", "."]
COPY [".", "."]

RUN npm install && npm run build

FROM node:23-alpine AS final

WORKDIR /app
COPY --from=build /app/dist /app/dist

RUN npm i -g serve

CMD ["serve", "-s", "dist", "-p", "3000"]