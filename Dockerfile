FROM node:20-alpine AS client-dev

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM node:20-alpine AS server-dev

WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npx prisma generate

EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]