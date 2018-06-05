#!/bin/sh

npm build-dev
npm version patch
git commit -a
git push