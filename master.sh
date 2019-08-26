#!/bin/bash
echo "Start Build New Master Branch!"

git reset --hard origin/develop \
&& git merge origin/feature/atms/back \
&& git merge origin/feature/govdata/dev

echo "Success!"