---
title: 每日小知识点(六) - Git冲突解决方案
date: '2023-05-13'
tags: ['daily']
draft: false
summary: Daily Little Knowledge Points
---

## 问题

当我们在使用 Git 向远程仓库提交代码时，可能会遇到如下所述的错误提示：

```sh
To https://github.com/xxxxx/gitmerge.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/xxxxx/gitmerge.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

![image-20230512095606622](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202305120956707.png)

这种情况出现的原因是当前本地分支的一些提交被其它开发者推送到了远程仓库，导致远程仓库的最新代码已经超过了当前本地分支的代码状态，因此在将本地代码推送到远程仓库时出现了冲突。此时需要手动合并远程仓库的最新代码并提交代码。

## 场景一

```sh
$ git pull
```

然后再 push 到远程仓库即可。

适用场景：冲突比较简单、容易解决，可以尝试使用 `git pull `命令来合并最新代码，并进行必要的手动部分解决和合并操作。

**举个例子：**

我在 github 的远程仓库上创建了一个 README 文件，而我本地仓库中没有这个 README 文件，所以当我在本地没有这个 README 文件的基础之上在 push 的话，就会出现冲突。恰好我们又想在本地编辑一下 README 文件，这样其实可以直接使用`git pull`，因为冲突比较简单。

1. 首先在 github 上创建一个远程仓库，并且在初始化仓库的时候选择**不添加 README.md 文件**，如果选择添加的话，github 会自动帮你创建一个分支。
2. 然后在本地初始化一个仓库：

```sh
$ mkdir test_git_merge
$ cd test_git_merge
$ git init
$ echo "这是本地仓库" >> hello.txt
$ git add .
$ git commit -m "test"
$ git remote add origin https://github.com/<your_username>/<your_repo_name>.git
$ git push -u origin <your_branch>
```

3. 在 github 上的远程仓库新建一个 README.md 文件，修改或添加一定的内容到 README.md 文件

​ ![image-20230513192539002](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202305131925098.png)

![image-20230513192659775](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202305131926844.png)

4. 此时我们在本地修改`hello.txt`, 然后尝试将其推送到远程

```sh
$ echo "修改本地仓库" >> hello.txt
$ git add .
$ git commit -m "test2"
$ git push
```

此时会出现文章开头时的错误, 我们直接使用以下命令：

```sh
$ git pull
```

我们会看到如下：

```sh
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 715 bytes | 102.00 KiB/s, done.
From https://github.com/xxxxx/testgitmerge
   2c6c00c..466227d  master     -> origin/master
Merge made by the 'ort' strategy.
 README.md | 3 +++
 1 file changed, 3 insertions(+)
 create mode 100644 README.md
```

此时我们会发现本地仓库中多了远程仓库中的 README.md 文件，然后我们执行：

```sh
$ git add .
$ git commit -m "test3"
$ git push
```

这次我们顺利的 push 了！

## 场景二

假设你在本地更新 hello.txt 文件，并将其推送到远程分支，并且在此期间，远程分支也发生了变化（如在 GitHub 上通过在线编辑在 hello.txt 文件中添加了一些内容）。此时你从远程分支 pull 代码将会产生冲突，需要手动解决冲突并进行代码合并。

以下是一个手动解决代码合并冲突的示例：

1. 在远程分支上编辑了 hello.txt 文件，增加一个新行 “修改远程仓库”

```
这是本地仓库
修改本地仓库
修改远程仓库
```

2. 推送远程修改

3. 在本地编辑 hello.txt 文件，增加一个新行 “helloworld”

```
这是本地仓库
修改本地仓库
helloworld
```

4. 提交并推送修改，将其应用到远程仓库

```sh
$ git add hello.txt
$ git commit -m "add helloworld to hello.txt"
$ git push
```

出现错误：

```sh
To https://github.com/xxxxx/testgitmerge.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/Xxxxxx/testgitmerge.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

5. 然后，本地分支尝试 pull 远程仓库的修改，这时候 Git 将会自动合并尝试。发现 hello.txt 文件存在冲突，如下所示(原因是同一行中的内容不同)：

```
Auto-merging hello.txt
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

6. 打开 hello.txt. 文件，可以看到冲突的内容：

```
这是本地仓库
修改本地仓库
<<<<<<< HEAD
helloworld
=======
修改远程仓库
>>>>>>> 6963a862d66fed43ccd87dad21b0dae8b7105c0b
```

在这个示例中，Git 将本地和远程更改放在两个不同的区块中，中间分隔符 `<<<<<<< HEAD` 和 `=======` 标记着来自两个源的冲突，本地更改在上方，远程更改在下方，之后远程更改的 ID 用 `>>>>>>>` 标识出来。

7. 然后，可以手动审查并解决冲突，如删除一个 区块来保留所需代码，或使用编辑器等工具进行更高级的合并操作。在这种情况下，我们可以手动将两个内容合并到一起(删除对应的分隔符即可)：

```
这是本地仓库
修改本地仓库
helloworld
修改远程仓库
```

8. 手动解决后，使用 `git add` 命令添加文件。

```sh
$ git add hello.txt
```

9. 最后，使用 `git commit` 命令提交更改，`git push` 推送到远程仓库即可。

```sh
$ git commit -m "Merge the hello.txt from remote and local"
$ git push origin master
```

通过以上步骤，你已经手动解决了冲突并合并了代码。需要注意的是，在手动解决代码冲突时，要进行谨慎操作，确保代码的质量和准确性。

## 场景三

多个开发者分别在不同的分支上修改同一个文件，然后尝试合并分支，由于分支之间的代码修改冲突，导致合并失败。

1. 在 GitHub 上创建一个新的空仓库。

2. 将该仓库克隆到本地，并在本地仓库上创建一个新分支。

```sh
$ git clone https://github.com/<your_github_username>/<your_repo>.git
$ cd <your_repo>
$ git checkout -b test
```

3. 修改并提交文件，将本地分支 push 到远程仓库。

```sh
# 编辑文件
$ echo "line1" >> test.md
echo "line2" >> test.md

# 添加修改后的文件
$ git add test.md

# 提交修改
$ git commit -m "Add line1 and line2"

# 向远程仓库推送本地分支
$ git push origin test
```

4. 切换到另一个本地分支，并修改相同文件中的相同行代码。

```sh
# 切换到另一个分支
$ git checkout -b another_branch

# 编辑 test.md
$ sed -i '' 's/line1/line11/' test.md

# 添加修改后的文件
$ git add test.md

# 提交修改
$ git commit -m "Change line1 to line11"
```

5. 此时尝试使用 git pull 命令将远程分支的修改拉取到本地分支进行合并，即可触发合并冲突。例如，执行以下命令：

```sh
# 从远程仓库拉取最新的代码
$ git fetch origin

# 在当前分支上将远程分支合并到本地分支
$ git merge origin/test
```

此时，由于两个分支都修改了 test.md 文件的同一行代码，Git 将无法自动合并这两个本地分支，会提示冲突，并让你解决这些冲突。你需要手动解决这些冲突，合并文件中的代码，然后提交更改并完成该操作。
