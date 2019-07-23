#!/bin/bash
echo "Start Build New Release Branch!"

git reset --hard origin/develop \
&& git merge origin/feature/atms/back \
&& git merge origin/feature/project/new \
&& git merge origin/feature/im/dev \
&& git merge origin/exam/fix/dev \
&& git merge origin/feature/govdata/dev \
&& git merge origin/feature/pg-big-data/dev

echo "Success!"