#!/bin/bash
echo "Start Build New Master Branch!"

git reset --hard origin/develop \
&& git merge origin/feature/mcms/dev \
&& git merge origin/feature/tms/dev

echo "Success!"