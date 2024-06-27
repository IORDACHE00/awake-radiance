FROM oven/bun:latest

WORKDIR /app/server

COPY . .

RUN bun install

CMD ["bun", "start"]
