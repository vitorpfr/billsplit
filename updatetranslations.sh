#!/usr/bin/env bash
pipenv run pybabel extract -F babel.cfg -o messages.pot .
pipenv run pybabel update -i messages.pot -d translations
