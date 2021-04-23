FROM node:14-alpine AS build
WORKDIR /app
COPY services/api/ ./services/api
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn workspace @labs-starter-ecs/api build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/services/api/dist services/api/dist
COPY services/api/package.json /app/services/api/package.json
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile
EXPOSE 8000
CMD ["node", "services/api/dist"]