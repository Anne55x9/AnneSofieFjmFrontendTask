FROM python:3.7.0-alpine AS builder

# Set up working directory and files.
WORKDIR /src

# Install base dependencies.
RUN apk add -U \
        build-base \
        openssl-dev \
        libffi-dev

# Add app source.
COPY . /src

# Build application and its requirements.
RUN pip install -r requirements-build.txt \
    && pip wheel -r requirements.txt -r runtime/requirements-deploy.txt --wheel-dir=/wheels \
    && pip wheel . --wheel-dir=/wheels



FROM python:3.7.0-alpine

# Disable default CMD.
CMD []

# Set up working directory and files.
WORKDIR /app
COPY --from=builder /wheels /wheels
COPY --from=builder /src/runtime/ /app/

# Install app.
RUN apk add --no-cache \
        bash \
    && pip install --no-index --find-links=/wheels -r requirements-deploy.txt \
    && pip install --no-index --find-links=/wheels fjm_api \
    && rm -f requirements-deploy.txt \
    && rm -rf /wheels

# Set up user and run service.
RUN addgroup -S fjm_api && adduser -S fjm_api -G fjm_api
USER fjm_api
ENTRYPOINT ["/bin/bash", "run.sh"]
