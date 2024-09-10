FROM node

WORKDIR /home/napp

ENV APP_PORT=4000 \
    ENVIRONMENT=local \
    JWT_SECRET=AFdsAgpYORWe4GMJQleK2sXFO349Dte89YQzQgUWRNGN3TC1ZfBfjW3U5NUj3sRpo \
    ACCESS_TOKEN_EXPIRES_IN_MS=5m \
    REFRESH_TOKEN_EXPIRES_IN_MS=7d \
    REFRESH_TOKEN_PREFIX=tkn: \
    REFRESH_TOKEN_LENGTH=32 \
    DEFAULT_RANDOM_STRING_CHARACTERS=ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789 \
    TOKEN_ENCRYPTION_KEY=^F*d4[m)xip?RN3)6>w87d<q!&=>2Y \
    DEFAULT_RANDOM_STRING_LENGTH=16 \
    COOKIE_SECRET=^F*d4[m)xip?RN3)6>w87d<q!&=>2YFF \
    COOKIE_NAME=Auth \
    COOKIE_EXPIRES_IN_MS=300000 \
    POSTGRES_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test" \
    I18N_FALLBACK_LANGUAGE=en

COPY ./nodeapp /home/napp

RUN npm cache clean --force
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
