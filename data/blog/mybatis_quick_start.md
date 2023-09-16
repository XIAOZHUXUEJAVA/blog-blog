---
title: Mybatis Quick Start
date: '2023-03-12'
tags: ['java', 'mybatis']
draft: false
summary: Mabaits Simple Demo
---

## 初始化

### 创建 maven 项目

![image-20230311131559030](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202303111315173.png)

正式开始之前，先看一下项目结构

![image-20230312104348980](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202303121043102.png)

### 引入相关依赖

在`pom.xml`文件中引入相关的依赖

```xml
<dependencies>
        <!--mybatis依赖-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>

        <!--mysql驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.18</version>
            <scope>runtime</scope>
        </dependency>


        <!--单元测试依赖-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.26</version>
            <scope>provided</scope>
        </dependency>
</dependencies>
```

重新加载 maven 工程

![image-20230311232416694](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202303112324759.png)

### 编写工具和相关配置文件

#### Mybatis 配置相关

注意修改为你的对应的数据库名、用户名和密码

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC" />
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver" />
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis_demo?serverTimezone=Asia/Shanghai" />
                <property name="username" value="root" />
                <property name="password" value="123456" />
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mapper/ProviderMapper.xml" />
    </mappers>
</configuration>

```

MybatisUtils.java

```java
public class MyBatisUtil {
    private static SqlSessionFactory factory;

    static {//在静态代码块下，factory只会被创建一次
        System.out.println("===============static factory===============");
        try {
            InputStream is = Resources.getResourceAsStream("MybatisConfig.xml");
            factory = new SqlSessionFactoryBuilder().build(is);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public static SqlSession createSqlSession() {
        return factory.openSession(false);//true 为自动提交事务
    }

    public static void closeSqlSession(SqlSession sqlSession) {
        if (null != sqlSession)
            sqlSession.close();
    }
}
```

### 关于增删改查

**mapper**

ProviderMapper.java

```java
package com.zhu.mapper;

import com.zhu.entity.Provider;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @description: ProviderMapper
 * @date: 2023/3/11 13:49
 * @author: zdp
 * @version: 1.0
 */
public interface ProviderMapper {
    List<Provider> getProviderList();

    Provider findProviderById(@Param("id") Integer id);

    int add(Provider provider);

    int modify(Provider provider);

    int deleteProviderById(@Param("id") Integer delId);
}
```

`@Param` 注解是 MyBatis 框架提供的一个用于映射方法参数的注解，它用于解决方法参数名称在编译期被丢失导致 MyBatis 无法正确地识别参数名称的问题。

在 MyBatis 中，如果一个方法只有一个参数，并且这个参数是一个简单类型（如 Integer、String 等），那么 MyBatis 就可以正确地识别这个参数的名称。例如：

```java
Provider findProviderById(Integer id);
```

但是如果一个方法有多个参数，或者参数是一个复杂类型（如实体类），那么 MyBatis 就无法正确地识别参数名称，此时就需要使用 `@Param` 注解来映射参数名称，例如：

```java
Provider findProviderByNameAndAddress(@Param("name") String name, @Param("address") String address);
```

在这个例子中，由于方法有两个参数，因此需要使用 `@Param` 注解来映射参数名称，以便 MyBatis 能够正确地识别参数名称。

ProviderMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.zhu.mapper.ProviderMapper">
    <select id="getProviderList" resultType="com.zhu.entity.Provider">
        select *
        from smbms_provider;
    </select>

    <select id="findProviderById" parameterType="Integer" resultType="com.zhu.entity.Provider">
        select *
        from smbms_provider
        where id = #{id};
    </select>

    <insert id="add" parameterType="com.zhu.entity.Provider">
        insert into smbms_provider ( proCode, proName, proDesc, proContact, proPhone, proAddress, proFax, createdBy
                                   , creationDate)
        values (#{proCode}, #{proName }, #{proDesc}, #{proContact}, #{proPhone },
                #{proAddress}, #{proFax}, #{createdBy}, #{creationDate})
    </insert>


    <update id="modify" parameterType="com.zhu.entity.Provider">
        update smbms_provider
        set proCode=#{proCode },
            proName=#{proName},
            proDesc=#{proDesc},
            proContact=#{proContact},
            proPhone=#{proPhone},
            proAddress=#{proAddress},
            proFax=#{proFax},
            modifyBy=#{ modifyBy},
            modifyDate=#{modifyDate}
        where id = #{id}
    </update>

    <delete id="deleteProviderById" parameterType="Integer">
        delete from smbms_provider where id = #{id}
    </delete>

</mapper>


```

当然我们也可以提前使用映射，来避免

举个简单的例子

```xml
<resultMap type="com.zhu.entity.User" id="UserMap">
        <result property="id" column="id" jdbcType="INTEGER"/>
        <result property="username" column="username" jdbcType="VARCHAR"/>
        <result property="address" column="address" jdbcType="VARCHAR"/>
    </resultMap>

    <!--查询单个-->
    <select id="findUserById" resultMap="UserMap">
        select
          id, username, address
        from tb_user
        where id = #{id}
    </select>
```

Provider.java

```java
package com.zhu.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @description: Provider
 * @date: 2023/3/11 13:27
 * @author: zdp
 * @version: 1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Provider {

    private Integer id;
    private String proCode;
    private String proName;
    private String proDesc;
    private String proContact;
    private String proPhone;
    private String proAddress;
    private String proFax;
    private Integer createdBy;
    private Date creationDate;
    private Date modifyDate;
    private Integer modifyBy;
}

```

`@Data`注解：自动生成`getter/setter`、`toString()`方法、`equals()`方法、`hasCode()`方法；

`@AllArgsConstructor`注解：自动生成包含所有成员变量的构造函数；

`NoArgsConstructor`注解：自动生成一个无参构造方法。

去 ProjectLombok 官网查看对应的注解，一目了然

官网地址： [@Data (projectlombok.org)](https://projectlombok.org/features/Data)

**小扩展：**

`equals()`方法 和 `hasCode()`方法的作用：

在 Java 中，equals()方法和 hashCode()方法都是 Object 类的方法，用于实现对象的相等性比较和散列码计算。

**equals()方法用于判断两个对象是否相等。**当两个对象的内容相同时，equals()方法应该返回 true，否则返回 false。通常情况下，需要重写 equals()方法，以便自定义类的对象能够进行正确的相等性比较。在重写 equals()方法时，需要注意一些规则，如自反性、对称性、传递性和一致性等。

**hashCode()方法用于返回对象的散列码。**散列码是一个整数值，可以用于将对象存储到散列表（例如 HashMap）中，以便快速查找对象。在重写 hashCode()方法时，应该遵循一些规则，如**相等的对象应该具有相等的散列码，但不相等的对象却可能具有相等的散列码。通常情况下，重写 equals()方法时也需要重写 hashCode()方法，以便保证散列表的正确性。**

### 测试

- 没有整合 mybatis-guice 且使用的时 junit4 的情况下的测试类：

ProviderTest.java

```java
package com.zhu.test;

import com.zhu.entity.Provider;
import com.zhu.mapper.ProviderMapper;
import com.zhu.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mybatis.guice.transactional.Transactional;

import java.util.List;

/**
 * @description: ProviderTest
 * @date: 2023/3/11 13:50
 * @author: zdp
 * @version: 1.0
 */
public class ProviderTest {

    @Test
    public void testFindProviderById() {
        SqlSession sqlSession = MybatisUtils.createSqlSession();
        ProviderMapper providerMapper = sqlSession.getMapper(ProviderMapper.class);
        System.out.println(providerMapper.findProviderById(1));
        MybatisUtils.closeSqlSession(sqlSession);
    }


    @Test
    public void testGetProviderList() {
        SqlSession sqlSession = MybatisUtils.createSqlSession();
        ProviderMapper providerMapper = sqlSession.getMapper(ProviderMapper.class);

        List<Provider> providers = providerMapper.getProviderList();
        for (Provider provider : providers) {
            System.out.println(provider);
        }
        MybatisUtils.closeSqlSession(sqlSession);
    }

    @Test
    public void testModify() {
        SqlSession sqlSession = MybatisUtils.createSqlSession();
        ProviderMapper providerMapper = sqlSession.getMapper(ProviderMapper.class);
        Provider provider = providerMapper.findProviderById(1);
        provider.setProName("北京大学");
        providerMapper.modify(provider);
        sqlSession.commit();
        MybatisUtils.closeSqlSession(sqlSession);
    }

    @Test
    public void testAdd() {
        SqlSession sqlSession = MybatisUtils.createSqlSession();
        ProviderMapper providerMapper = sqlSession.getMapper(ProviderMapper.class);
        Provider provider = new Provider();
        provider.setProCode("GS_123131");
        provider.setProName("山东c大学");
        int count = providerMapper.add(provider);
        System.out.println(count);
        sqlSession.commit();
        MybatisUtils.closeSqlSession(sqlSession);
    }

    @Test
    public void testDeleteProviderById() {
        SqlSession sqlSession = MybatisUtils.createSqlSession();
        ProviderMapper providerMapper = sqlSession.getMapper(ProviderMapper.class);
        System.out.println(providerMapper.deleteProviderById(1));
        sqlSession.commit();
        MybatisUtils.closeSqlSession(sqlSession);
    }
}

```

可以看出有些地方还是有很多重复繁琐的代码的

- 整合`junit-jupiter`和`mybatis-guice` 后的测试类

```java
public class ProviderTest {

    private ProviderMapper providerMapper;
    private SqlSession sqlSession;

    @BeforeEach
    public void setUp() {
        sqlSession = MybatisUtils.createSqlSession();
        providerMapper = sqlSession.getMapper(ProviderMapper.class);
    }

    @AfterEach
    public void tearDown() {
        MybatisUtils.closeSqlSession(sqlSession);
    }

    @Test
    public void testFindProviderById() {
        System.out.println(providerMapper.findProviderById(12));
    }

    @Test
    public void testGetProviderList() {
        providerMapper.getProviderList().forEach(provider -> System.out.println(provider));
    }


    @Test
    @Transactional
    public void testModify() {
        Provider provider = providerMapper.findProviderById(2);
        provider.setProName("清华大学");
        int count = providerMapper.modify(provider);
        System.out.println(count);
        sqlSession.commit();
    }

    @Test
    @Transactional
    public void testAdd() {
        Provider provider = new Provider();
        provider.setProCode("GS-231312312");
        provider.setProName("山东大学");
        int count = providerMapper.add(provider);
        System.out.println(count);
        sqlSession.commit();
    }


        @Test
        public void testDeleteProviderById() {
            // 就算是没有删除成功，但是junit还是测试通过了，因为这是视为删除了0行
            System.out.println(providerMapper.deleteProviderById(21));
            sqlSession.commit();
        }
}
```

整合`junit-jupiter`和`mybatis-guice` 后的测试类，还需引入相关的依赖，这里我直接将新的`pom.xml`展示：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.zhu</groupId>
    <artifactId>mybatis-exp</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <!--mybatis依赖-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>

        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-guice</artifactId>
            <version>3.7</version>
        </dependency>
        <!--mysql驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.18</version>
            <scope>runtime</scope>
        </dependency>


        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.26</version>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>RELEASE</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

- MyBatis-Guice

`MyBatis-Guice`是一个 MyBatis 的扩展，它将 MyBatis 框架集成到 Google Guice 依赖注入框架中。我们使用这个框架之后可以更方便的进行事务管理：

`@Transactional`: 用于事务的回滚

当然这里的`@Transactional`注解和`Spring`框架中的有些不同，在整合`Spring`系列的框架的时候，我们最好还是使用`Spring`中的`@Transactional`注解

- JUnit Jupiter

`JUnit Jupiter`是 JUnit5 中的一个测试引擎，用于编写和运行 JUnit5 测试。它提供了一系列新的注解和扩展，以及对 Lambda 表达式、Java8 日期/时间 API 等新特性的支持

常见的注解使用：

- `@Test`：用于标记测试方法。
- `@ParameterizedTest`：用于执行参数化测试。
- `@BeforeEach`：在每个测试方法运行之前执行。
- `@AfterEach`：在每个测试方法运行之后执行。
- `@BeforeAll`：在所有测试方法运行之前执行，只执行一次。
- `@AfterAll`：在所有测试方法运行之后执行，只执行一次。
- `@Disabled`：用于禁用测试方法。
