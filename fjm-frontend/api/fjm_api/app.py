# -*- coding: utf-8 -*-
"""
    fjm_api.app
    ~~~~~~~~~~~

    Main Flask application.

"""

from functools import partialmethod
from os.path import dirname
from pathlib import Path
from typing import Optional

import yaml
from flask import (
    current_app, make_response, redirect, send_file, url_for, Flask, Response
)
from flask_cors import CORS, cross_origin
from werkzeug.exceptions import HTTPException
from werkzeug.contrib.cache import SimpleCache

from . import __contact__, utils as u
from .routes import bp


class API(Flask):

    """FJM API Flask application."""

    get = partialmethod(Flask.route, methods=["GET"])
    post = partialmethod(Flask.route, methods=["POST"])
    put = partialmethod(Flask.route, methods=["PUT"])
    patch = partialmethod(Flask.route, methods=["PATCH"])
    delete = partialmethod(Flask.route, methods=["DELETE"])

    def cors(self, func, *args, **kwargs):
        """Helper method for defining CORS on specific endpoints."""
        methods = sorted({
            m.upper()
            for m in kwargs.pop("methods", ["GET"]) + ["OPTIONS", "HEAD"]
        })
        return cross_origin(methods=methods, *args, **kwargs)(func)


def create_app(settings: Optional[str]=None) -> API:
    """Instantiates the main API application.

    :raises RuntimeError: when configuration fails.

    """
    app = API("fjm_api", static_folder=None)
    app.url_map.strict_slashes = False
    app.config.from_object("fjm_api.config.Prod")
    mount_routes(app)

    cors = CORS()
    cors.init_app(app)

    return app


def mount_routes(app: API) -> None:
    """Mounts the endpoints."""

    app.register_blueprint(bp)

    @app.get("/", strict_slashes=True)
    @app.cors
    def index() -> Response:
        """Root endpoint."""
        return redirect(url_for("about"), 301)

    @app.get("/about")
    @app.cors
    def about() -> Response:
        """Endpoint for general API information."""
        content = {
            "contact": __contact__,
            "description": "FJM public HTTP API",
            "name": "fjm-api",
            "timezone": app.config["TIMEZONE"].zone,
            "specsURI": url_for(
                "specs_json",
                _scheme=app.config["SERVER_SCHEME"],
                _external=True
            ),
            "version": {
                "name": "0.1.0",
                "major": 0,
                "minor": 1,
                "patch": 0,
                "isRelease": True,
            }
        }
        return u.json_rep(content)

    # Super simple in-memory cache for storing specs.
    cache = SimpleCache()
    yaml_specs_path = (
        Path(dirname(__file__)).resolve().joinpath("specs.yaml")
    )
    assert yaml_specs_path.exists()

    @app.route("/specs.yaml", strict_slashes=True)
    @app.cors
    def specs_yaml():
        """YAML specs endpoint."""
        rep = make_response(
            send_file(str(yaml_specs_path), as_attachment=False)
        )
        return rep

    @app.route("/specs.json", strict_slashes=True)
    @app.cors
    def specs_json():
        """JSON specs endpoint."""
        cache_key = "json_specs"
        if not cache.has(cache_key):
            with app.open_resource(yaml_specs_path, "r") as src:
                yaml_specs = yaml.load(src)
            cache.set(cache_key, yaml_specs, timeout=0)
        return u.json_rep(cache.get(cache_key))

    @app.errorhandler(HTTPException)
    def handle_http_exception(exc) -> Response:
        """Handler for :py:class:`werkzeug.exceptions.HTTPException`.

        This function ensures we always respond with a JSON payload when any
        :py:class:`werkzeug.exceptions.HTTPException is thrown.

        """
        # Only create new error response if the exception does not already have
        # its own response defined.
        if exc.response is not None:
            return exc

        if exc.code == 500:
            current_app.logger.exception(exc)

        return u.err_rep(exc)

    @app.errorhandler(Exception)
    def handle_exception(exc):
        """Handler for generic exceptions.

        In addition to ensuring JSON response, this function also turns any
        uncaught exceptions to HTTP 500 errors.

        """
        current_app.logger.exception(exc)
        return u.err_rep(500)
