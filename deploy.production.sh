#!/bin/sh

rm -rf ./dist
mkdir dist

yarn install && yarn build

SUM=`md5 -q dist/index.html`
mv dist/index.html dist/index.$SUM.html

cp app.one.yaml dist/app.yaml
sed -i ''  "s/index.html/index.$SUM.html/g" dist/app.yaml || exit
cd dist && gcloud app deploy app.yaml
