---
title: 每日小知识点(一) - 服务器
date: '2023-03-20'
tags: ['network', 'daily']
draft: false
summary: Daily Littel Knowledge Points
---

# 每日小知识点(一) - 服务器

## Web 服务器和应用服务器的区别

Web 服务器和应用服务器是两种不同类型的服务器，它们在功能和用途上有所不同。

Web 服务器是一个基于 HTTP 协议的服务器，它**主要用于处理静态资源的请求**，如 HTML 页面、图像、视频、CSS、JavaScript 等。它通常由像 Apache、Nginx、IIS 这样的服务器软件来实现。Web 服务器接收到客户端的请求后，返回静态资源，不会对这些资源进行处理，因为它没有具备解析、编译、执行动态脚本等功能。Web 服务器主要负责 HTTP 协议的解析和响应，**用于向客户端提供访问静态资源的服务**。

应用服务器是一种**提供动态资源处理**的服务器，它通常用于处理 Web 应用程序的请求，例如 Java、PHP、Python 等 Web 应用程序。应用服务器通常由像 Tomcat、JBoss、WebLogic 这样的应用服务器软件来实现。**应用服务器的主要作用是接收客户端请求，处理请求后返回动态生成的 HTML、XML 或 JSON 等数据格式，通过应用服务器实现动态内容的生成和响应**。应用服务器还可以提供支持事务管理、并发控制、对象池等功能的应用程序运行环境，保证应用程序的稳定性和可靠性。

一句话总结就是，**Web 服务器主要负责静态资源的处理和服务，而应用服务器则提供动态资源处理的功能**，支持 Web 应用程序的运行和管理。两种服务器通常会结合使用，以提供完整的 Web 服务。

常见的 Web 服务器: Apache HTTP Server、**Nginx**、Microsoft IIS

常见的应用服务器: **Tomcat**、JBoss、WebSphere、WebLogic 等。熟悉 Java SpringBoot 框架的可能知道 SpringBoot 框架内置了 Tomcat 服务器，便于我们的开发和部署。

## Tomcat Servlet 和 JSP 的区别和联系

Tomcat、Servlet 和 JSP 是 Java Web 应用程序的三个核心组件，它们之间的关系如下：

**Tomcat 是一个 Servlet 容器，它提供了 Servlet 的运行环境和管理功能，可以接收和处理 Servlet 请求，同时也可以处理 JSP。**

Servlet 是一种 Java 程序，它可以运行在 Tomcat 这样的 Servlet 容器中，**用于接收和处理客户端的 HTTP 请求**，并生成 HTTP 响应。Servlet 通常被用来生成动态网页、处理表单提交、访问数据库等任务。

JSP（JavaServer Pages）是一种动态网页技术，**它允许开发人员将 Java 代码嵌入到 HTML 页面中**，以生成动态内容。JSP 通常被编译成 Servlet 并由 Tomcat 容器执行。

总结一下:

1. Tomcat 提供了 Servlet 容器的运行环境
2. Servlet 接收和处理客户端请求，
3. JSP 可以将 Java 代码嵌入到 HTML 页面中，以实现动态生成网页的功能。
4. 开发人员可以使用 Servlet 和 JSP 来开发动态 Web 应用程序，而 Tomcat 提供了运行和管理这些 Web 应用程序所需的基础设施。
