# -*- coding: utf-8 -*-
"""
    fjm_api.db
    ~~~~~~~~~~

    DB contents.

"""

from datetime import datetime as dt
from typing import Callable, List

from flask import Flask
import pytz


ITEMS = [
    {
        "ID": "59a2bcbe-58e7-4493-be48-9a31dfb976ac",
        "dir": "/home/bbunny/jobs/1",
        "name": "Job 1",
        "numRetried": 2,
        "projectName": "Project Q",
        "state": "successful",
        "submitterName": "bbunny",
        "stateReason": None,
        "timestamps": {
            "submitted": dt(2018, 1, 1, 16, 0, 0, tzinfo=pytz.utc),
            "started": dt(2018, 1, 1, 16, 10, 0, tzinfo=pytz.utc),
            "ended": dt(2018, 1, 1, 17, 15, 0, tzinfo=pytz.utc),
            "lastModified": dt(2018, 1, 1, 17, 15, 0, tzinfo=pytz.utc),
        },
    },
    {
        "ID": "dfdc2557-a69d-494a-b869-a02433be705d",
        "dir": "/home/dduck/jobs/214",
        "name": "Job 214",
        "numRetried": 0,
        "projectName": "Project D",
        "state": "running",
        "submitterName": "dduck",
        "stateReason": "triggered automatically",
        "timestamps": {
            "submitted": dt(2018, 1, 10, 6, 0, 0, tzinfo=pytz.utc),
            "started": dt(2018, 1, 10, 7, 0, 0, tzinfo=pytz.utc),
            "ended": None,
            "lastModified": dt(2018, 1, 10, 7, 0, 0, tzinfo=pytz.utc),
        },
    },
    {
        "ID": "5e01d101-4ca0-4fed-99de-ae920db2e632",
        "dir": "/home/ysam/jobs/81",
        "name": "Job 81",
        "numRetried": 9,
        "projectName": "Project Q",
        "state": "submitted",
        "submitterName": "ysam",
        "stateReason": None,
        "timestamps": {
            "submitted": dt(2018, 9, 22, 5, 10, 0, tzinfo=pytz.utc),
            "started": None,
            "ended": None,
            "lastModified": dt(2018, 9, 22, 5, 10, 0, tzinfo=pytz.utc),
        },
    },
    {
        "ID": "73e9fdd2-8c02-4c3a-8b61-1246145a3e53",
        "dir": "/home/dduck/jobs/204",
        "name": "Job 204",
        "numRetried": 1,
        "projectName": "Project D",
        "state": "successful",
        "submitterName": "dduck",
        "stateReason": None,
        "timestamps": {
            "submitted": dt(2018, 1, 4, 9, 42, 0, tzinfo=pytz.utc),
            "started": dt(2018, 1, 5, 12, 0, 0, tzinfo=pytz.utc),
            "ended": dt(2018, 1, 5, 20, 37, 0, tzinfo=pytz.utc),
            "lastModified": dt(2018, 1, 5, 20, 37, 0, tzinfo=pytz.utc),
        },
    },
]


def augment_uri(jobd: dict, app: Flask) -> dict:
    scheme = f"{app.config['SERVER_SCHEME']}"
    name = f"{app.config['SERVER_NAME']}"
    jobd["URI"] = f"{scheme}://{name}/v0/jobs/{jobd['ID']}"
    return jobd


def normalize_timestamps(jobd: dict, app: Flask) -> dict:

    tz = app.config["TIMEZONE"]

    def normalize(obj):
        if obj is None:
            return
        target_dt = obj.astimezone(tz)
        return tz.normalize(target_dt).isoformat()

    jobd["timestamps"] = {
        k: normalize(v) for k, v in jobd["timestamps"].items()
    }

    return jobd


def prep_item(item: dict, app: Flask) -> dict:
    return normalize_timestamps(augment_uri(item, app), app)


def get_items(
    app: Flask,
    ffunc: Callable[[dict], bool]=None,
    items: List[dict]=ITEMS
) -> List[dict]:
    ffunc = ffunc or (lambda d: True)
    return [
        prep_item({**item}, app)
        for item in items
        if ffunc(item)
    ]
