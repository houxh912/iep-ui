#!/bin/bash
echo "Start Build New Release Branch!"

git reset --hard origin/i-can \
&& git merge origin/develop \
&& git push \
&& git checkout deploy-i-can \
&& git push

echo "Success!"