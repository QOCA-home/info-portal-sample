#!/bin/bash
sudo npm run build
cd dist
rm rf *.zip
sudo chmod -R 777 *
zip www.zip -r *
