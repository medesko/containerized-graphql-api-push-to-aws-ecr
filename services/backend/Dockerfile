FROM node:14-alpine AS build
WORKDIR /app
COPY services/backend/ ./services/backend
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn workspace @slabs-starter-ecs/backend build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/services/backend/dist services/backend/dist
COPY services/backend/package.json /app/services/backend/package.json
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile
EXPOSE 8000
CMD ["node", "services/backend/dist"]