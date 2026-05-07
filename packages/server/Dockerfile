FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 strapi
RUN adduser --system --uid 1001 strapi

COPY --from=builder --chown=strapi:strapi /app .

USER strapi
EXPOSE 1337

CMD ["npm", "start"]
