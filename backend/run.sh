#!/bin/bash

npm install && npm run
echo "ENV=DEV" > .env.dev && echo "PORT=5001" >> .env.dev
echo "ENV=TEST" > .env.test && echo "PORT=5002" >> .env.test
env=dev npm run start
