---
title: Navicat Premium Connect Windows Docker Container
date: '2023-08-15'
tags: ['docker']
draft: false
summary: Host machine access to service running in docker container
---

1. First of all， we go to the Docker official website and find a database image: https://hub.docker.com/_/postgres .For instance, I use PostgreSQL image.

![image-20230815151106314](https://xiaozhublog.oss-cn-qingdao.aliyuncs.com/myblogimg/image-20230815151106314.png)

2. Run a container

```shell
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres
```

`-p 5432:5432` : The option maps the 5432 port of host machine to 5432 port of the container. Because PostgreSQL uses the default port 5432 for communication, this option allows host machine access to PostgreSQL service running in container.

3. Navicat connect container

Just like this:

![image-20230815151332468](https://xiaozhublog.oss-cn-qingdao.aliyuncs.com/myblogimg/image-20230815151332468.png)
