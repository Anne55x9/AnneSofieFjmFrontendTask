#!/bin/bash

# Runner script for fjm-api.

set -uexo pipefail

# Resolve directories and paths.
DIR="$(realpath "$(dirname "$0")")"
CONFIG=${DIR}/gunicorn.conf

# Run the service.
exec gunicorn '--config' "${CONFIG}" '-b' '0.0.0.0:5000' 'fjm_api.app:create_app()'
