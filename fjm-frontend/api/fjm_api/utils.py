# -*- coding: utf-8 -*-
"""
    fjm_api.utils
    ~~~~~~~~~~~~~

    Various utilities.

"""

from typing import Any, Callable, Dict, Optional, Union

import pytz
from flask import current_app, json, Response
from iso8601 import parse_date, ParseError
from werkzeug.exceptions import default_exceptions, HTTPException


__all__ = ["default_error_messages", "json_rep", "err_rep"]


# Replacement for Flasks' error messages by HTTP status code.
# This takes priority over Flasks' messages.
default_error_messages: Dict[int, str] = {  # noqa

    400: "The client sent a request that this server could not understand."
    " Please ensure your URL parameters and request body are well-formed.",

    404: "The server could not find the requested resource."
    " Please ensure that you have entered the correct URL.",

    403: "You do not have permission to perform the requested operation."
}


def get_error_message(exc: HTTPException) -> Optional[str]:
    """Helper method for retrieving a custom HTTP error message."""
    code = exc.code

    if code == 405:
        return (
            f"The method is not allowed for the requested resource."
            f" Allowed methods are: {', '.join(sorted(exc.valid_methods))}."
        )
    elif code == 500:
        # TODO: Add request-specific identifier to email subject.
        return "Unexpected server error."
    return default_error_messages.get(code)


def json_rep(
    payload: dict,
    status: int=200,
    headers: Optional[Dict[str, Any]]=None,
    ser_func: Callable[[Any], str]=json.dumps
) -> Response:
    """Creates a JSON response."""
    return current_app.response_class(
        ser_func(payload),
        status=status,
        headers=headers,
        mimetype="application/json"
    )


def err_rep(
    error: Union[int, HTTPException],
    message: Optional[str]=None,
    hints: Optional[dict]=None,
    param_hints: Optional[dict]=None,
    payload_hints: Optional[dict]=None,
    headers=None,
    exc_mapping: Dict[int, HTTPException]=default_exceptions
) -> HTTPException:
    """Creates an :py:exc:`werkzeug.exceptions.HTTPException` with the given
    status code, with the message and hints as a JSON payload."""

    error_code, exc_instance = (
        (error, exc_mapping[error]())
        if isinstance(error, int) else
        (error.code, error)
    )

    assert error_code in default_exceptions, \
        f"unrecognized error code: {error_code}"
    assert error_code > 399, "error code less than 400"

    payload = {
        "message": (
            message or
            get_error_message(exc_instance) or
            exc_instance.description.replace("  ", " ")
        )
    }

    all_hints = {
        key: arg
        for key, arg in
        ((".", hints), ("param", param_hints), ("payload", payload_hints))
        if arg is not None
    }

    if all_hints:
        payload["hints"] = all_hints

    rep = json_rep(payload, error_code, headers=headers)
    exc_instance.response = rep
    return exc_instance


def make_filter_func(since, before, tz):

    def pd(raw: str, name: str):
        try:
            dto = parse_date(raw, default_timezone=None)
        except ParseError:
            raise err_rep(400, param_hints=f"Invalid {name} parameter.")
        else:
            if dto.tzinfo is None:
                return dto.astimezone(pytz.utc)
            return tz.localize(dto).astimezone(pytz.utc)

    def ffunc(item: dict) -> bool:
        sincef, beforef = lambda ts: True, lambda ts: True
        if since is not None:
            sincef = lambda ts: ts >= pd(since, "submittedSince")
        if before is not None:
            beforef = lambda ts: ts < pd(before, "submittedBefore")
        subm_ts = item["timestamps"]["submitted"]
        return sincef(subm_ts) and beforef(subm_ts)

    return ffunc
