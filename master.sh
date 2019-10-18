#!/bin/bash
echo "Start Build New Master Branch!"

git reset --hard origin/develop \
&& git merge origin/feature/govdata/dev \
&& git merge origin/feature/mcms/dev

echo "Success!"