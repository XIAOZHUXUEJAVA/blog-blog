---
title: git分支的使用和如何回滚你的代码
date: '2022-12-18'
tags: ['github', 'git']
draft: false
summary: git branch and roll back your code
---

## Create a new repository on github

- new repository

![image-20221218182610663](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181826700.png)

just complete the relevant information of the remote repository and click the button **Create repository**

![image-20221218183012334](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181830404.png)

## Initialize the local repository

create a local git repository and create a file

```shell
# make a dictionary
mkdir test
# enter the dir
cd test
# initialize a local git repository
git init
# create a new file by vim
vim lesson1.txt
```

add content to lesson1.txt, just like "hello lesson1"

![image-20221218182242259](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181822349.png)

```shell
# put all files in the current dir into version version control
git add .
# save your changes to the local repository
git commit -m "lesson1"
```

## connect to remote repository on github and push

```shell
# create a new branch named "lesson1"
git branch -M lesson1
# connet to remote repo
# replace xiaozhu with you own github username and replace test with your remote repo name
git remote add origin https://github.com/xiaozhu/test.git

# push changes to github
git push -u origin lesson1
```

now your github repo have a new branch named "lesson1", and in the branch you can find the "lesson1.txt" that we pushed

![image-20221218192530231](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181925285.png)

## new a branch

```shell
# create a new file named "lesson2.txt" and add content to it
vim lesson2.txt

git add .

git commit -m "lesson2"
# new a branch
git branch -M lesson2
git push -u origin lesson2
```

now we can see that two branches on our github, lesson1 and lesson2

![image-20221218193503415](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181935458.png)

![image-20221218194136842](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181941882.png)

![image-20221218194215389](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181942428.png)

## roll back

firstly, we can change branch into "lesson1", and use the following commad

```shell
#  change branch into "lesson1"
git checkout lesson1
```

you can modify the file "lesson1.txt"

before

![image-20221218195916592](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181959642.png)

after

![image-20221218195811720](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212181958761.png)

We were looking at a bug today. The version of the previous branch was normal. We added a lot of logs to the new branch and couldn’t find the reason. We hope to go back to the previous version , but we don’t want to save now changes(you have modified some code) to the local repository, and don't want to see the current modified version on Git. **So we can use the following commands.**

```shell
git stash
git pull
# or
git pull origin lesson1
```

now we open "lesson1.txt" and find our modifications are gone

![image-20221218200249488](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212182002525.png)

If we have saved changes to the local repository, just like this:

modify the "lesson.txt" file

![image-20221218200736629](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212182007680.png)

```shell
git add lesson1.txt
git commit -m "test commit roll back"
git push
```

now we want to roll back the version before our modified the "lesson1.txt", we can use the following commands:

```shell
# find the commit id that we want to roll back
git log

# roll back
git reset --hard commitId
```

we can open the "lesson1.txt"

![image-20221218201928990](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212182019026.png)

```shell
# roll back the previous version
git reset --hard HEAD^
# roll back two version
git reset --hard HEAD^^
# roll back three version
git reset --hard HEAD^^^
```
