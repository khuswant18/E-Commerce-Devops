# ---------- Stage 1 (builder) ----------
FROM node:20-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
# install dev deps so prisma (dev) is available
RUN npm ci

COPY . .
# generate prisma client (schema is in ./prisma)
RUN npx prisma generate

# ---------- Stage 2 (runtime) ----------
FROM node:20-bullseye-slim AS runtime
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
WORKDIR /app

COPY --from=builder /app/package*.json ./
# install only production deps
RUN npm ci --omit=dev

# copy generated prisma client, prisma schema (optional), and source
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src

RUN chown -R appuser:appgroup /app
USER appuser

ENV NODE_ENV=production
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["node", "src/index.js"]