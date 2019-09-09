#!/bin/bash
echo "Start Build New Release Branch!"

git reset --hard origin/develop \
&& git merge origin/feature/govdata/dev \
&& git merge origin/feature/pg-big-data/dev \
&& git merge origin/fams/inverment \
&& git merge origin/feature/cfms/dev

echo "Success!"