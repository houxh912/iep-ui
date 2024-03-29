#!/bin/bash
echo "Start Build New Release Branch!"

git reset --hard origin/develop \
&& git merge origin/feature/pg-big-data/dev \
&& git merge origin/feature/mcms/dev \
&& git merge origin/feature/tms/dev \
&& git merge origin/hotfix/org/dev

echo "Success!"