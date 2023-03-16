---
title: 剑指Offer-面试题篇-Day02
date: '2023-03-15'
tags: ['java', 'offer']
draft: false
summary: For Job
---

# 基础篇 day02

## 1. fanal 的用法

- 被 final 修饰的方法**不能被继承**
- 被 final 修饰的方法**不能被重写**
- 被 final 修饰的变量**不能被改变**。如果修饰引用，那么引用不可变，引用指向的内容可变。

```java
package com.zhu;

/**
 * @description: TestFinal
 * @date: 2023/3/15 22:32
 * @author: zdp
 * @version: 1.0
 */
public class TestFinal {
    public static void main(String[] args) {
        final int x = 6;

        // 这句话会导致编译报错，因为 x 是 final 的， 不能被重新赋值
        // x = 10;
        final String str = "hello";
        System.out.println(str);
        // str对象本身中的内容可以被修改
        str.toLowerCase();
        System.out.println(str);
        // str是final的， 不能再指向其他对象
//        str = "hi";
    }
}

```

- 被 final 修饰的方法，在编译阶段会存入常量池

- 被 final 修饰的方法，jvm 会尝试将其内联，提高运行效率

  内联是指在编译时将函数调用直接替换为函数体，以减少函数调用的开销。这种优化技术可以消除函数调用的开销，因为调用函数会导致程序跳转到另一个地址执行代码，然后返回到原来的位置。如果函数内联，则函数体的代码将直接嵌入到调用它的位置，而不需要跳转和返回，从而可以提高程序的性能。

  简单通俗的来讲，就是方法内部调用其他方法的逻辑，直接替换为被调用的方法，这样之后就不用再调用方法了，提高了性能，不过并不是所有的都是和内联的

## 2. 3 \* 0.1 == 0.3 返回值是什么

**返回 false. 因为有些浮点数不能完全精确的表示出来**

```java
/**
 * @description: TestFloat
 * @date: 2023/3/15 22:52
 * @author: zdp
 * @version: 1.0
 */
public class TestFloat {
    public static void main(String[] args) {
        System.out.println(3 * 0.1);
        System.out.println(3 * 0.1 == 0.3);
    }
}

```

运行结果

```java
0.30000000000000004 // 这里确实没有表示出来
false
```

## 3. a = a + b 和 a += b 的区别

a += b 如果 a 和 b 的类型不一致的话， 会进行隐式的强制类型转换

```java
short s1 = 1;

s1 = s1 + 1;
```

short 类型在进行运算时会自动提升为 int 类型,也就是说 s1+1 的运算结果是 int 类型,而 s1 是

short 类型,此时编译器会报错

## 4. try catch finally 如果 try 里有 return finally 里的内容还会执行吗？

- 会执行， 并且执行顺序在 return 之前，所以 finally 代码块中最好不要包含 return，这样程序会提前退出，返回值不是 try 或者 catch 中的内容

- 不管有没有出现异常，finally 代码块中的代码都会执行
- try 和 catch 中出现 return ，finally 仍然会执行
- return 的值实在 finally 之前确定的，先把返回的值保存起来

## 5. static 有哪些用法

所有的人都知道 static 关键字这两个基本的用法:**静态变量和静态方法**.**也就是被 static 所修饰的变量/**

**方法都属于类的静态资源,类实例所共享.**

除了静态变量和静态方法之外,static 也用于静态块,多用于初始化操作，Mybatis 中 SqlSessionFactory 的创建的时候，我们并不需要频繁创建，初始化一次就行。

```java
package com.zhu.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

/**
 * @description: utils
 * @date: 2023/3/11 13:39
 * @author: zdp
 * @version: 1.0
 */
public class MybatisUtils {
    private static SqlSessionFactory factory;

    static {//在静态代码块下，factory只会被创建一次
        System.out.println("===============static factory===============");
        try {
            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
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

静态导包

```java
package com.zhu;

import static java.lang.Math.*;
/**
 * @description: TestStatic
 * @date: 2023/3/16 9:43
 * @author: zdp
 * @version: 1.0
 */
public class TestStatic {
    public static void main(String[] args) {
        System.out.println(max(10, 12));
        // 正常情况下我们需要使用的是Math.max();
    }
}

```

## 6. java 创建对象的几种方式

- new 创建新对象

```java
Person person = new Person();
```

- 通过反射机制
- 采用 clone 机制

​ 类需要实现 Clonable 接口，重写 clone 方法

- 通过反序列化的方式

```java
package com.zhu;

import org.apache.commons.lang3.SerializationUtils;

/**
 * @description: TestCreateObject
 * @date: 2023/3/16 9:07
 * @author: zdp
 * @version: 1.0
 */
public class TestCreateObject {
    public static void main(String[] args) {

        // 1、 通过反射机制创建对象
        Class<Teacher> teacherClass = Teacher.class;
        Teacher teacher = null;
        try {
            teacher = teacherClass.newInstance();
            teacher.setName("xiaoduo");
        } catch (InstantiationException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        System.out.println("teacher " + teacher);

//        2、 通过克隆的方式创建对象
        Teacher teacher1 = new Teacher();

        teacher1.setName("xiaoduoge");
        System.out.println("teacher1 " + teacher1);

        Teacher teacher2 = null;
        try {
            teacher2 = teacher1.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException(e);
        }

        System.out.println("teacher2 " + teacher2);
        System.out.println(teacher1 == teacher2);
        System.out.println(teacher2.equals(teacher1));
        // clone出来的是一个全新的对象

//        3、通过反序列化的机制创建一个对象

        Teacher teacher3 = new Teacher();
        teacher3.setName("xiaozhu");
        System.out.println("teacher3 " + teacher3);

        // 引入common lang 工具依赖
        byte[] bytes = SerializationUtils.serialize(teacher3);
        Teacher teacher4 = SerializationUtils.deserialize(bytes);
        System.out.println("teacher4 " + teacher4);
        System.out.println(teacher3 == teacher4);

    }
}

```

## 7、深拷贝和浅拷贝的区别

浅拷贝（shallowCopy）只是增加了一个指针指向已存在的内存地址，

深拷贝（deepCopy）是增加了一个指针并且申请了一个新的内存，使这个增加的指针指向这个新的内存，相当于复制了一个新的对象

使用深拷贝的情况下，释放内存的时候不会因为出现浅拷贝时释放同一个内存的错误。

## 8、用过 ArrayList 了吗 有什么特点？

Java 集合框架中的一种存放相同类型的元素数据，是一种变长的集合类，基于定长数组实现，当加

入数据达到一定程度后，会实行自动扩容，即扩大数组大小。底层是使用数组实现，添加元素。

如果 add(o)，添加到的是数组的尾部，如果要增加的数据量很大，应该使用 ensureCapacity()

方法，该方法的作用是预先设置 ArrayList 的大小，这样可以大大提高初始化速度。

如果使用 add(int,o)，添加到某个位置，那么可能会挪动大量的数组元素，并且可能会触发扩

容机制。

高并发的情况下，线程不安全。多个线程同时操作 ArrayList，会引发不可预知的异常或错误。

ArrayList 实现了 Cloneable 接口，标识着它可以被复制。注意：**ArrayList 里面的 clone() 复制其实**

**是浅复制。**

## 9、有了 Array 为什么还要使用 ArrayList 呢

通常我们在使用的时候，如果在不明确要插入多少数据的情况下，普通数组就很尴尬了，因为你不知道需要初始化数组大小为多少，而 ArrayList 可以使用默认的大小，当元素个数到达一定程度后，会自动扩容。

可以这么来理解：**我们常说的数组是定死的数组，ArrayList 却是相当于动态数组**

## 10、获取类的 class 对象的方法

什么是 Class 对象

定义：Class 对象是 jvm 生成用来保存对象的类的信息的。

java 程序执行前需要经过编译、加载、链接和初始化这几个阶段，编译阶段，会将源文件编译为.class 文件，编译器同时会在 class 文件中生成 class 对象；加载阶段，通过 jvm 类的加载机制，将 class 对象加载到内存中。在创建对象实例前，jvm 会先检查 Class 对象是否在内存中，如果不存在，则加载 Class 对象，然后再创建对象实例。如果存在，则直接根据 Class 对象创建对象实例。

获取的方法：

- getClass()方法 是 Object 类中
- 静态成员直接获取，**每个类都有隐含的静态成员 class**
- 通过 Class 类的静态方法 forName()方法获取

```java
package com.zhu;

/**
 * @description: TestClass
 * @date: 2023/3/16 9:55
 * @author: zdp
 * @version: 1.0
 */
public class TestClass {
    public static void main(String[] args) {

        // 1. getClass() 方法
        Teacher teacher = new Teacher();
        Class<?> clazz = teacher.getClass();
        System.out.println(clazz);

        // 2. 静态成员

        Class<?> teacherClazz = Teacher.class;
        System.out.println(teacherClazz);

        // 3. Class类静态方法
        try {
            Class<?> clazz3 = Class.forName("com.zhu.Teacher");
            System.out.println(clazz3);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }
}

```

通过上面的复习（包括 java 创建对象的中的反射机制创建对象），不难得出相关的结论啊，再去复习之前看不懂的代码

实战：

Bean 拷贝类

```java
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 拷贝工具类
 * @author xiaozhu
 * @date 2022年05月22日 16:25                          $
 */
public class BeanCopyUtils {


    private BeanCopyUtils(){

    }

    /*
     * 单个的拷贝方法
     * @author xiaozhu
     * @date 2022/5/22 16:30
     * @param source
     * @param clazz
     * @return V
     */
    public static <V> V copyBean(Object source, Class<V> clazz) {

        V result = null;
        try {
            // 通过反射机制创建一个V类型的对象， 将Source对象的属性复制到result中返回即可
            result = clazz.newInstance();
            BeanUtils.copyProperties(source, result);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    /*
     * List集合的拷贝方法
     * @author xiaozhu
     * @date 2022/5/22 16:38
     * @param list
     * @param clazz
     * @return java.util.List<V>
     */
    //第一个<O, V>是方法使用泛型, List<V>是返回类型
    public static <O, V> List<V> copyBeanList(List<O> list, Class<V> clazz){
        return list.stream()
                //先将的单个转化为拷贝的，然后直接收集程集合
                .map(o -> copyBean(o, clazz))
                .collect(Collectors.toList());
    }
}
```
