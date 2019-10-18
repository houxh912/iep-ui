#!/bin/bash
echo "Start Build New Release Branch!"

git reset --hard origin/i-can \
&& git merge origin/develop \
&& git merge origin/feature/mcms/dev \
&& git push \
&& git checkout deploy-release-ican \
&& git reset --hard origin/i-can \
&& git push

echo "Success!"