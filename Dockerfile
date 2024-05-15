## ---------------------------------------------------------------------
## ---------------------------------------------------------------------
## This Dockerfile is to setup app in only ONE Container 
## ---------------------------------------------------------------------
## ---------------------------------------------------------------------

# -------------------
# BUILD - Frontend
# -------------------
FROM node:20.11.1-bullseye-slim AS build-frontend

WORKDIR /app/frontend

COPY frontend/package*.json .

RUN npm install

COPY frontend/ .
RUN npm run build

# -----------------------------
# BUILD AND RUNNER - Backend
# -----------------------------
FROM node:20.11.1-bullseye-slim AS backend

WORKDIR /app/backend

COPY backend/package*.json ./


RUN npm install

COPY backend/ .

RUN npm run build

COPY --from=build-frontend /app/frontend/dist client/

EXPOSE 8080

CMD ["npm","run", "start:prod"]
