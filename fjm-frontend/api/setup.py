#!/usr/bin/env python
# -*- coding: utf-8 -*-
# (c) 2018 Computerome -- Danmarks Tekniske Universitet

from setuptools import find_packages, setup


with open("README.md") as src:
    readme = src.read()

with open("requirements.txt") as src:
    requirements = [line.strip() for line in src if not line.startswith("-e")]

with open("requirements-build.txt") as src:
    build_requirements = [line.strip() for line in src]

with open("runtime/requirements-deploy.txt") as src:
    deploy_requirements = [line.strip() for line in src]


setup(
    name="fjm-api",
    version="0.1.0",
    description="FJM public HTTP API",
    long_description=readme,
    packages=find_packages(
        exclude=[
            "*.tests", "*.tests.*", "tests.*", "tests"
        ]
    ),
    include_package_data=True,
    install_requires=requirements,
    license="BSD",
    zip_safe=False,
    keywords="service",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: BSD License",
        "Operating System :: POSIX",
        "Programming Language :: Python :: 3.7",
        "Topic :: Utilities",
        "Topic :: Internet",
    ]
)
