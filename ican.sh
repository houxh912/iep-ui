#!/bin/bash
echo "Start Build New Release Branch!"

git reset --hard origin/i-can \
&& git merge origin/feature/atms/back \
&& git merge origin/feature/govdata/dev 

echo "Success!"