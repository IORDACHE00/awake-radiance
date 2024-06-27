FROM oven/bun:latest

ARG VITE_APP_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

WORKDIR /app/client

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun run build

EXPOSE 4173

CMD ["bun", "run", "preview", "--host"]