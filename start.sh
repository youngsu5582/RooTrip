#!/bin/bash
while ! nc -z db 5432; do sleep 3; done

npx prisma migrate dev
npm run start