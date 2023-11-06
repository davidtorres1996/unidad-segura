FROM node:18-bullseye-slim as builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY packages ./packages 
RUN npm install --global pnpm
RUN pnpm install --only=production
COPY . .

# Etapa de producción
FROM node:18-bullseye-slim
WORKDIR /app
COPY --from=builder /app ./
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT
CMD ["npm", "start"]