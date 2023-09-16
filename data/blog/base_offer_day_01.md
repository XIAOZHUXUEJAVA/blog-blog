---
title: 剑指Offer-面试题篇-Day01
date: '2023-03-13'
tags: ['java', 'offer']
draft: false
summary: For Job
---

在开始复习之前，我也应该多考虑一些平时经常忽略的问题。

## 1、Java 语言有哪些特点

1、简单易学，面向对象，库比较丰富

2、面向对象（重要特性）

3、跨平台（号称是一次编译，到处运行，compile once, run anywhere）

4、可靠安全，支持多线程

## 2、什么是面向对象和面向过程

OOP（Object-Oriented-Programming）面向对象编程

PP（Procedural Programming）面向过程编程

**面向过程**就是分析解决问题的步骤，然后用具体的函数把这些步骤一步一步实现，优点是性能高

面向对象是把事务分成各个对象，建立对象也不是为了完成一个一个步骤，而是描述对象在整个事务中所发生的行为。

**封装 、继承、多态**是面向对象的特征。

容易维护、易扩展、易复用、可以设计出低耦合的系统。

**计算器例子**

例如，我们要编写一个计算器程序，那么在面向过程的设计中，我们可以先定义一个函数用来实现加法、一个函数用来实现减法、一个函数用来实现乘法、一个函数用来实现除法等等。然后，我们可以通过按照特定的顺序调用这些函数来完成计算器程序的功能。

继续以计算器程序为例，我们可以在面向对象的设计中，定义一个 Calculator 对象，该对象内部包含加、减、乘、除等各种运算方法，还包含一个 result 属性，表示当前计算的结果。我们可以通过创建 Calculator 对象并调用其方法来完成计算器程序的功能。

**制作蛋糕的例子**

在面向过程的编程思想下，我们可以将制作蛋糕的过程看作是一系列任务的组合，**比如准备材料、打蛋糊、烤蛋糕等等，每个任务都可以看做是一个函数，而整个制作蛋糕的过程就是按照一定的顺序执行这些函数**。

在面向对象的编程思想下，我们可以**将制作蛋糕看作是一个对象，这个对象有一些属性，比如材料、温度等等，还有一些方法，比如打蛋糊、烤蛋糕等等。我们可以创建一个 Cake 对象，然后使用该对象的方法来完成制作蛋糕的过程**。

相对于面向过程的编程思想，面向对象的编程思想更加注重对象的属性和方法，将它们组织在一起，以实现更加灵活、可扩展、易于维护的程序设计。在日常生活中，我们也可以将某些事物看作是一个对象，并应用面向对象的思想来进行设计和操作。

## 3、 八种基本类型

| 基本类型 | 大小(字节) | 默认值       | 封装类    |
| -------- | ---------- | ------------ | --------- |
| byte     | 1          | (byte)0      | Byte      |
| short    | 2          | (short)0     | Short     |
| int      | 4          | 0            | Integer   |
| long     | 8          | 0L           | Long      |
| float    | 4          | 0.0f         | Float     |
| double   | 8          | 0.0d         | Double    |
| boolean  | -          | false        | Boolean   |
| char     | 2          | \u0000(null) | Character |

**话说 boolean 类型没有精确的定义大小**：

java 虚拟机规范你中 ： java 虚拟机没有任何供 boolean 值专用的字节码指令，boolean 在编译之后，使用 int 替代，而 boolean 数组在编译之后会被编码成 byte 数组，每个 boolean 元素占 8 位，也就是 1 个字节。

总结：数组 1 个字节，单独使用 4 个字节，但这个好像也是根据不同的 java 虚拟机实现来决定的

**java 类的属性使用包装类的优点**：

1. 支持 null 值：使用基本数据类型作为类的属性时，如果属性的值为空，则无法使用 null 表示。但是，使用包装类作为类的属性，可以使用 null 表示属性的值为空。这样可以更好地区分属性为空和属性为 0 的情况。
2. 提供了更多的功能：包装类不仅可以存储基本数据类型的值，还提供了很多有用的方法，例如 valueOf()、parseXxx()、toString()等方法，这些方法可以方便地进行类型转换和操作。
3. 与泛型的兼容性：在使用泛型时，只能使用引用类型，不能使用基本数据类型。因此，如果类的属性是基本数据类型，就无法使用泛型对其进行操作。但是，如果使用包装类作为类的属性，则可以与泛型兼容，方便地进行操作

举个例子说一下：

```java
public class Person {
    private int age;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

```

在上述代码中，age 属性的类型为 int，无法使用 null 值表示属性为空的情况。因此，我们需要使用一个特殊的值来表示属性为空，例如-1 或 0 等。

但是，如果我们使用包装类 Integer 来定义 age 属性，就可以使用 null 值表示属性为空的情况（这里便表示年龄未知）。例如：

```java
public class Person {
    private Integer age;

    public Integer getAge() {
        return age;
    }


    public void setAge(Integer age) {
        this.age = age;
    }
}
```

## 4、 instanceof 关键字的作用

用来测试一个对象是否是一个类的实例

```java
Integer i = new Integer(3);
boolean result = i instanceof Integer;
System.out.println(result);
```

```java
int j = 2;
//编译失败，因为j是基本类型，不是一个具体的实例
System.out.println(j instanceof Integer);
// 规范 如果 为null 返回false
System.out.println(null instanceof Object);
```

## 5、java 自动装箱和拆箱

装箱：int->Integer `Integer.valueOf(int)`

拆箱：Integer->int `

Java5 之前创建一个 Integer 对象

```java
Integer i = new Integer(10);
```

之后，事实上是自动装箱了，调用了`Integer.valueOf()`

```java
Integer i = 10;
```

相互转化

```java
Integer i = 10;
// 将Integer转化为int
int j = i.intValue();
System.out.println(j);
// 将int转化为Integer
Integer k = Integer.valueOf(j);
System.out.println(k);
```

**面试题 1**

```java
/**
 * @description: IntegerAndInt
 * @date: 2023/3/13 13:51
 * @author: zdp
 * @version: 1.0
 */
public class IntegerAndInt {
    public static void main(String[] args) {

        Integer i1 = 64;
        Integer i2 = 64;

        Integer i3 = 129;
        Integer i4 = 129;

        System.out.println(i1 == i2);
        System.out.println(i3 == i4);

    }
}


```

运行结果：

```java
true
false
```

上述例子中我们使用了自动装箱的方式创建了几个对象，所以直接看`Integer.valueOf()`方法的源码就可以得到结论

```java
 public static Integer valueOf(int i) {
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }
```

```java
private static class IntegerCache {
        static final int low = -128;
        static final int high;
        static final Integer cache[];

        static {
            // high value may be configured by property
            int h = 127;
            String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
            if (integerCacheHighPropValue != null) {
                try {
                    int i = parseInt(integerCacheHighPropValue);
                    i = Math.max(i, 127);
                    // Maximum array size is Integer.MAX_VALUE
                    h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
                } catch( NumberFormatException nfe) {
                    // If the property cannot be parsed into an int, ignore it.
                }
            }
            high = h;

            cache = new Integer[(high - low) + 1];
            int j = low;
            for(int k = 0; k < cache.length; k++)
                cache[k] = new Integer(j++);

            // range [-128, 127] must be interned (JLS7 5.1.7)
            assert IntegerCache.high >= 127;
        }

        private IntegerCache() {}
    }

```

在通过 valueOf()方法创建对象的时候，如果数值在[-128, 127] 之间，便会返回指向 Integer.Cache.cache 中已经存在的对象引用，否则创建一个新的引用。

**面试题 2**

```java
package com.zhu;

import com.sun.org.apache.xml.internal.utils.res.IntArrayWrapper;

/**
 * @description: IntegerAndInt
 * @date: 2023/3/13 13:51
 * @author: zdp
 * @version: 1.0
 */
public class IntegerAndInt {
    public static void main(String[] args) {

        Integer i5 = new Integer(64);
        Integer i6 = new Integer(64);

        Integer i7 = new Integer(129);
        Integer i8 = new Integer(129);

        System.out.println(i5 == i6);
        System.out.println(i7 == i8);
    }
}

```

运行结果：

```java
false
false
```

因为这是使用`new`的方式创建的四个对象实例，`==`是用来比较两个对象实例的地址是否相同的，显然这是四个不同的对象，地址不相同，所以是 false

**面试题 3**

```java
package com.zhu;

import com.sun.org.apache.xml.internal.utils.res.IntArrayWrapper;

/**
 * @description: IntegerAndInt
 * @date: 2023/3/13 13:51
 * @author: zdp
 * @version: 1.0
 */
public class IntegerAndInt {
    public static void main(String[] args) {
        Double d1 = 64.0;
        Double d2 = 64.0;
        Double d3 = 128.0;
        Double d4 = 128.0;

        System.out.println(d1 == d2);
        System.out.println(d3 == d4);

    }
}


```

运行结果：

```java
false
false
```

Java 虚拟机会缓存-128 到 127 之间的整数对象，但是每当创建一个 Double 对象时，Java 会为其分配内存空间。由于 Double 类型的范围较大，因此如果 Java 为每一个可能的 Double 值都缓存一个对象，将会占用大量的内存空间，这对于 Java 应用程序来说是不可接受的。

## 6、equals 和==的区别

`==`**判断两个对象的地址是否相同，即是否指向同一个对象，比较的是真正意义上的指针。**

`equals`**判断两个对象的内容是否相同**，因为所有类都继承 java.lang.Object 类，所以适用于所有对象，如果没有对这个方法进行覆盖的话，调用的仍然是 Object 类中的方法，但是 Object 中的 equal 方法返回的确实==的判断。

```java
/**
 * @description: TestEquals
 * @date: 2023/3/13 14:31
 * @author: zdp
 * @version: 1.0
 */
public class TestEquals {
    public static void main(String[] args) {
        // 这是两个简单的字面量的比较，不是两个对象，true
        System.out.println("s1" == "s1");
        // false 比较的内容
        System.out.println("s1".equals("s1"));

        String s1 = "s1";
        String s2 = "s1";


        // 因为这是放在公共池中的，所以相等, true
        System.out.println(s1 == s2);


        // 这相当于创建了两个字符串对象，在堆中创建的， false
        String s3 = new String("s3");
        String s4 = new String("s4");
        System.out.println(s3 == s4);
    }
}

```

默认情况下，从`Object`类继承的`equals`方法与“==”完全等价，比较的都是对象的内存地址。但我们可以重写`equals`方法，使其按照需要进行比较，如`String`类重写了`equals`方法，比较的是字符的序列，而不再是内存地址。

## 7、重载和重写的区别

**重写**：重写顾名思义，重新写一遍，子类把继承父类本身的方法重新写一遍，子类继承父类的方法，但是有时候子类并不不想完全原封不动的继承。在**方法名**、**参数列表**、**返回类型**(当然子类的方法返回值可以是是父类方法返回值中的子类)都相同的情况下，子类的访问修饰权限不能少于父类。

总结：

- 发生在子类和父类之间
- 方法名、参数类型、返回类型相同
- 重写方法不能抛出新的返回异常
- private、static、final 方法不能被重写
- public > protected > default > private 子类的访问 比如父类是 public 但子类不可以是 default， 子类大于父类，可以看以下例子

```java
package com.zhu;

/**
 * @description: Human
 * @date: 2023/3/14 10:19
 * @author: zdp
 * @version: 1.0
 */
public class Human {
    public static void main(String[] args) {
        Worker worker = new Worker();
        worker.sayHi("xiaozhu");
        Human h1 = new Worker();
        h1.sayHi("xiaoduo");
    }
    public void sayHi(String name) {
        System.out.println(name);
    }

}

class Worker extends Human {
    @Override
    void sayHi(String name) {
        System.out.println(name + name);
    }
}


```

正确的写法

```java
package com.zhu;

/**
 * @description: Human
 * @date: 2023/3/14 10:19
 * @author: zdp
 * @version: 1.0
 */
public class Human {
    public void sayHi(String name) {
        System.out.println(name);
    }
    public static void main(String[] args) {
        Worker worker = new Worker();
        worker.sayHi("xiaozhu");
        Human h1 = new Worker();
        h1.sayHi("xiaoduo");
    }
}

class Worker extends Human {
    @Override
    public void sayHi(String name) {
        System.out.println(name + name);
    }
}

```

**重载**：

在同一个类中，同名方法的不同的参数列表不同、返回类型也可以不同

```java
package com.zhu;

/**
 * @description: Teacher
 * @date: 2023/3/14 10:32
 * @author: zdp
 * @version: 1.0
 */
public class Teacher {

    public static void main(String[] args) {
        Teacher teacher = new Teacher();
        teacher.sayHi("xiaoduo");
        teacher.sayHi();
    }
    public void sayHi(String name) {
        System.out.println(name);
    }

    public void sayHi() {
        System.out.println("hi");
    }
}

```

## 8、HashCode 的作用

java 的集合有两类，一类是 List，还有一类是 Set。前者有序可重复，后者无序不重复。当我们在 set

中插入的时候怎么判断是否已经存在该元素呢，可以通过 equals 方法。但是如果元素太多，用这样

的方法就会比较满。

于是有人发明了哈希算法来提高集合中查找元素的效率。 这种方式将集合分成若干个存储区域，每

个对象可以计算出一个哈希码，可以将哈希码分组，每组分别对应某个存储区域，根据一个对象的

哈希码就可以确定该对象应该存储的那个区域。

hashCode 方法可以这样理解：**它返回的就是根据对象的内存地址换算出的一个值。这样一来，当**

**集合要添加新的元素时，先调用这个元素的 hashCode 方法，就一下子能定位到它应该放置的物理**

**位置上。如果这个位置上没有元素，它就可以直接存储在这个位置上，不用再进行任何比较了；如**

**果这个位置上已经有元素了，就调用它的 equals 方法与新元素进行比较，相同的话就不存了，不相**

**同就散列其它的地址**。这样一来实际调用 equals 方法的次数就大大降低了，几乎只需要一两次。

理解一下这里

**当重写`equals`方法后有必要将`hashCode`方法也重写，这样做才能保证不违背`hashCode`方法中“相同对象必须有相同哈希值”的约定。`hashCode`方法实际上必须要完成的一件事情就是，为`equals`方法认定为相同的对象返回相同的哈希值**。

## 9、String、StringBuilder、StringBuffer 的区别

String 是只读字符串，它并不是基本的数据类型，而是一个对象。从底层源码看来是一个**final 类型的字符数组**，所引用的字符串不能被改变，一旦定义，就无法增删改，所以每次对 String 的操作就是生成新的 String 对象。

每次+操作：其实就是 new 了一个跟原字符串相同的 Stringbuilder 对象，再调用 append 方法，拼接。

StringBuilder 和 StringBuffer 都继承了 AbstractStringBuilder 抽象类，底层都是**可变的字符数组**，频繁的进行字符串操作的话，建议使用 StringBuilder 和 StringBuffer。

两者的区别：

**StringBuffer 对方法加了同步锁，所以是线程安全的，StringBuilder 没有对方法加同步锁，所以是非线程安全的**

## 10、ArrayList 和 LinkedList 认识 和两者之间的区别

ArrayList 和 LinkedList 都是 Java 中常用的集合类，它们都实现了 List 接口，但是底层实现有所不同，因此它们在性能和使用方面有一些区别。

ArrayList 是基于动态数组实现的，它可以动态地增长和缩小内部数组的大小，因此可以高效地随机访问元素，但在插入和删除元素时需要移动大量的元素，因此其效率较低。因此，ArrayList 适用于需要随机访问元素的场景，如需要频繁查询元素的操作。

LinkedList 是基于双向链表实现的，每个节点都保存了对前后节点的引用，因此在插入和删除元素时只需要改变前后节点的引用即可，而不需要移动元素。但是由于需要在链表中进行遍历来访问元素，因此在随机访问元素时效率较低。因此，LinkedList 适用于需要频繁插入和删除元素的场景。

综上所述，ArrayList 适用于需要随机访问元素的场景，而 LinkedList 适用于需要频繁插入和删除元素的场景。但是在选择使用哪种集合时，还需要考虑数据量的大小和其他方面的因素。

待补充：什么是多态 什么是线程安全 什么是锁 什么是同步锁
