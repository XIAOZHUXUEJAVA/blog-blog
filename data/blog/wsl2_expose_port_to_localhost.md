---
title: WSL2暴露端口给主机，在主机的浏览器中访问该端口
date: '2023-02-22'
tags: ['linux', 'wsl2']
draft: false
summary: WSL2 Expose Port To Localhost
---

1. 在 WSL2 中启动您的应用程序，并监听 9090 端口。您可以在 WSL2 终端中使用命令行启动您的应用程序，例如：

   ```
   $ go run server.go
   ```

   这个命令将启动一个 Python Web 应用程序，监听 9090 端口。如果您的应用程序使用其他语言或框架，需要相应地进行调整。

2. 在 WSL2 中获取您的 WSL2 IP 地址。您可以在 WSL2 终端中使用以下命令来获取 IP 地址：

   ```
   $ ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
   ```

   这个命令将返回 WSL2 中的 IP 地址。请将该 IP 地址记录下来，稍后会用到。

3. 在 Windows 10 中启动 PowerShell，以管理员身份运行。在 PowerShell 或者 CMD 中，使用以下命令来开放 WSL2 的 9090 端口：

   ```
   netsh interface portproxy add v4tov4 listenport=9090 listenaddress=0.0.0.0 connectport=9090 connectaddress=<wsl2_ip_address>
   ```

   将 `<wsl2_ip_address>` 替换为您在上一步中获取的 WSL2 IP 地址。

4. 在 Windows 10 中启动浏览器，并输入以下地址：

   ```
   http://localhost:9090
   ```
