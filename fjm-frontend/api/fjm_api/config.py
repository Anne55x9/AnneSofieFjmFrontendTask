# -*- coding: utf-8 -*-
"""
    fjm_api.config
    ~~~~~~~~~~~~~~

    Configuration settings.

"""

from os import environ
from typing import Any, Callable, Optional

import pytz


ENV_NAMESPACE = "FJM_API"


def getenv(
    key: str,
    default: Any=None,
    castf: Callable[[str], Any]=str,
    ns: str=ENV_NAMESPACE
) -> Any:
    """Returns the namespaced environment variable."""
    value = environ.get(f"{ENV_NAMESPACE}_{key}", None)
    return castf(value) if value is not None else default


class Base(object):

    """Base configuration values."""

    DEBUG: bool = False
    TESTING: bool = False
    SECRET_KEY: str = getenv("SECRET_KEY")
    SESSION_COOKIE_DOMAIN: str = getenv("SESSION_COOKIE_DOMAIN", "localhost")

    SERVER_SCHEME: str = getenv("SERVER_SCHEME", "http")
    SERVER_NAME: Optional[str] = getenv("SERVER_NAME", "localhost:5000")
    AUTH_SCHEME: str = getenv("AUTH_SCHEME", "Bearer")
    TIMEZONE: pytz.tzinfo.DstTzInfo = getenv(
        "TIMEZONE", pytz.utc, castf=pytz.timezone
    )


class Prod(Base):

    """Production configuration values."""

    DEBUG = False
    TESTING = False
