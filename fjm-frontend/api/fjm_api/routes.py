# -*- coding: utf-8 -*-
"""
    fjm_api.api
    ~~~~~~~~~~~

    API routes.

"""
# (c) 2018 Computerome -- Danmarks Tekniske Universitet

from collections import Counter
from functools import partial, partialmethod

from flask import current_app as ca, jsonify, request, Blueprint
from flask_cors import cross_origin

from . import db
from .utils import err_rep, make_filter_func


class APIBlueprint(Blueprint):

    """FJM API blueprint."""

    get = partialmethod(Blueprint.route, methods=["GET"])
    post = partialmethod(Blueprint.route, methods=["POST"])
    put = partialmethod(Blueprint.route, methods=["PUT"])
    patch = partialmethod(Blueprint.route, methods=["PATCH"])
    delete = partialmethod(Blueprint.route, methods=["DELETE"])

    @staticmethod
    def create_name_for(
        resource_name: str,
        api_version: int
    ) -> str:
        """Creates the blueprint name for a given resource and version."""
        return f"{resource_name}_v{api_version}"

    @classmethod
    def create_for(
        cls,
        resource_name: str,
        api_version: int,
        **kwargs
    ) -> "APIBlueprint":
        """Creates a blueprint for the given resource name in the given API
        version."""
        kwargs["static_folder"] = None
        kwargs["url_prefix"] = f"/v{api_version}"
        return cls(
            cls.create_name_for(resource_name, api_version), "fjm", **kwargs
        )

    def cors(self, func=None, *args, **kwargs):
        """Helper method for defining CORS on specific endpoints."""
        if func is None:
            return partial(self.cors, *args, **kwargs)

        methods = sorted({
            m.upper()
            for m in kwargs.pop("methods", ["GET"]) + ["OPTIONS", "HEAD"]
        })
        return cross_origin(methods=methods, *args, **kwargs)(func)


bp = APIBlueprint.create_for("jobs", 0)


@bp.get("/jobs", endpoint="jobs/get")
@bp.cors(methods=["GET"])
def get_jobs():
    try:
        limit = int(request.args.get("limit", 500))
        if limit > 500 or limit < 0:
            raise ValueError("Invalid value.")
    except (TypeError, ValueError):
        raise err_rep(400, param_hints="Invalid 'limit' argument.")

    try:
        offset = int(request.args.get("offset", 0))
        if offset < 0:
            raise ValueError("Invalid value.")
    except (TypeError, ValueError):
        raise err_rep(400, param_hints="Invalid 'offset' argument.")

    ffunc = make_filter_func(
        request.args.get("submittedSince"),
        request.args.get("submittedBefore"),
        ca.config["TIMEZONE"],
    )

    items = db.get_items(ca, ffunc)
    rep = [
        {k: d[k] for k in ("ID", "URI", "timestamps", "state", "name")}
        for d in items[offset:limit]
    ]
    return jsonify(rep)


@bp.get("/jobs/<job_id>", endpoint="jobs/job_id/get")
@bp.cors(methods=["GET"])
def get_jobs_job_id(job_id: str):
    items = db.get_items(ca)
    rep = next((d for d in items if d["ID"] == job_id), None)
    if rep is None:
        raise err_rep(404)
    return jsonify(rep)


@bp.get("/stats", endpoint="stats/get")
@bp.cors(methods=["GET"])
def get_stats():
    items = db.get_items(ca)
    counts = {k: v for k, v in Counter([d["state"] for d in items]).items()}
    for state in (
        "submitted", "unknown", "running", "failed", "terminated", "successful",
    ):
        counts.setdefault(state, 0)
    rep = {"count": counts}
    return jsonify(rep)
