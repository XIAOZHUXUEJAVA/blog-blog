---
title: HashMap必知必会
date: '2023-09-16'
tags: ['java']
draft: false
summary: HashMap的学习
---

`HashMap` 属于 Java 集合，实现了`Map`接口，以键值对(key-value)的方式存放数据。

## HashMap 的扩容机制

### 构造方法

我们可以先去 Oracle 的 Java 文档看看 HashMap 的构造方法：

![image-20230916151949376](https://xiaozhublog.oss-cn-qingdao.aliyuncs.com/myblogimg/image-20230916151949376.png)

- initialCapacity: HashMap 的初始容量
- loadFactor：负载因子，负载因子为 0.75，说明**元素达到 HashMap 容量的 75%的时候，HashMap 会触发扩容操作**。

我们可以看到前 3 个构造方法中，均有涉及到 HashMap 容量相关的内容：

```java
HashMap<Integer, String> map1 = new HashMap<>(); // 初始容量默认为16，负载因子默认为0.75
HashMap<Integer, String> map2 = new HashMap<>(20); // 初始容量为20， 负载因子默认为0.75
HashMap<Integer, String> map3 = new HashMap<>(20, 0.8f); // 初始容量为20，负载因子为0.8
```

如果你使用的是 IDEA 这样的 IDE，编辑器会自动提示你各个参数的含义

![](https://xiaozhublog.oss-cn-qingdao.aliyuncs.com/myblogimg/image-20230916152504261.png)

### 扩容机制

1. **扩容触发：**
   - 当 `HashMap` 中的元素数量达到负载因子乘以当前容量时（也就是 `size > loadFactor * capacity`），就会触发扩容操作。
2. **扩容策略：**
   - Java 8 中 `HashMap` 的扩容策略是以 2 的幂次方倍数进行扩容，这意味着**容量会被扩展为原来的两倍**。这个策略有助于保持哈希表的均匀性，减少哈希冲突的可能性。
3. **扩容过程：**

   - 扩容时，`HashMap` 会创建一个新的数组，容量是原来的两倍。
   - 然后，它会将原来哈希表中的元素重新分配到新数组中，这个过程需要重新计算哈希值和确定元素在新数组中的位置。
   - 重新分配后，原来的数组会被丢弃，成为垃圾对象。

4. **扩容为什么是原来的 2 倍？**

通过以 2 的幂次方倍数进行扩容，可以确保新哈希表的容量始终是 2 的幂次方。这**样可以使哈希表的哈希函数更均匀地分布键，减少了哈希冲突的概率。**如果容量不是 2 的幂次方，就会导致一些槽位被更频繁地使用，而另一些则很少被使用，增加了哈希冲突的可能性。

下面来解释一下为什么 2 的幂次方更优秀：

根据 hash 计算下标的时候：

**使用位运算`tab[hash & (x - 1)]` 代替模运算**

当我们使用位与操作 `&` 来计算哈希值的索引位置时，确保在 0 到 `x - 1` 范围内均匀分布的一个常见情况是，`x` 是 2 的幂次方。让我们通过一个具体的示例来说明这一点：

假设我们有一个哈希表，它的容量 `x` 设置为 8，也就是说 `x` 是 2 的 3 次幂。这意味着容量为 8 的哈希表具有 8 个槽位，我们希望在这些槽位中均匀分布哈希码。

现在，假设我们有三个哈希码：10、22 和 38。我们将使用位与操作来计算它们的索引位置：

1. 对于哈希码 10：
   - 二进制表示为：1010
   - `x - 1` 的值是 7，二进制表示为：0111
   - 通过执行位与操作：1010 & 0111 = 0010
   - 结果是 2，这意味着哈希码 10 被映射到槽位 2。
2. 对于哈希码 22：
   - 二进制表示为：10110
   - `x - 1` 的值是 7，二进制表示为：0111
   - 通过执行位与操作：10110 & 0111 = 0010
   - 结果仍然是 2，这意味着哈希码 22 也被映射到槽位 2。
3. 对于哈希码 38：
   - 二进制表示为：100110
   - `x - 1` 的值是 7，二进制表示为：0111
   - 通过执行位与操作：100110 & 0111 = 0010
   - 结果仍然是 2，这意味着哈希码 38 也被映射到槽位 2。

在这个示例中，我们可以看到哈希码 10、22 和 38 都被映射到了槽位 2，但**这并不是巧合**。因为哈希表容量 `x` 是 8，而 8 是 2 的 3 次幂，**因为 `x - 1` 的二进制表示中的所有位都是 1**，所以通过位与操作的结果会在 0 到 `x - 1` 的范围内均匀分布。这意味着无论哈希码的值如何，它们都有相等的机会被映射到 0 到 `x - 1` 范围内的某个索引位置。

## HashMap 的遍历方式

列举几个常用的 HashMap 的遍历方式：

- 迭代器方式

```java
HashMap<Integer, String> map1 = new HashMap<>();
        map1.put(1, "apple");
        map1.put(2, "peach");
        map1.put(3, "banana");

        Iterator<Map.Entry<Integer, String>> iterator = map1.entrySet().iterator();

        while (iterator.hasNext()) {
            Map.Entry<Integer, String> entry = iterator.next();
            Integer key = entry.getKey();
            String value = entry.getValue();
            System.out.println(key + "->" + value);
        }
```

- 循环遍历方式

```java
HashMap<Integer, String> map2 = new HashMap<>();

        map2.put(1, "apple");
        map2.put(2, "peach");
        map2.put(3, "banana");

        for (Map.Entry<Integer, String> fruitEntry : map2.entrySet()) {
            Integer key = fruitEntry.getKey();
            String value = fruitEntry.getValue();
            System.out.println(key + "->" + value);
        }
```

- Lambda 方式

```java
System.out.println("=============Lambda遍历方式=============");
        HashMap<Integer, String> map3 = new HashMap<>();

        map3.put(1, "apple");
        map3.put(2, "peach");
        map3.put(3, "banana");

        map3.forEach((key, value) -> {
            System.out.println(key + "->" + value);
        });
```

## HashCode 的作用

`hashCode()` 的作用是获取哈希码（`int` 整数），也称为散列码。

- 确定该对象在哈希表中的索引位置：哈希表（如 HashMap、HashSet、Hashtable 等）是基于哈希码来存储和检索数据的数据结构。每个对象的哈希码用作哈希表的索引，这样可以快速查找和访问对象。当你将对象存储在哈希表中时，哈希码确定了对象在表中的存储位置，从而提高了数据的检索效率。

- 去重：在使用集合类时，如 HashSet 或 LinkedHashSet，哈希码用于确定对象是否已经存在于集合中。通过计算对象的哈希码并比较它们，可以轻松实现去重的功能。

- 对象比较：`hashCode` 方法通常与 `equals` 方法一起使用，以确定两个对象是否相等。**如果两个对象的哈希码相等，那么它们可能相等（但不一定相等），但是如果两个对象相等的话，他们的 HashCode 一定相等。因此，在重写 `equals` 方法时，也应该相应地重写 `hashCode` 方法，以确保 HashCode 一致性。**

## equals 和 '==' 的区别

== 对于基本数据类型和引用数据类型的作用效果是不同的。

对于基本数据类型，== 比较的是它们的值。对于引用数据类型，== 比较的是对象的内存地址。

equals() 方法不适用于比较基本数据类型的变量，它主要用于比较两个对象是否相等。equals() 方法存在于 Object 类中，而 Object 类是所有类的直接或间接父类，因此所有的类都继承了 equals()方法。Object 类的 equals() 方法定义如下：

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

equals() 方法存在两种使用情况：

1. 类没有重写 equals() 方法：在这种情况下，通过 equals() 比较该类的两个对象等效于使用 "==" 比较这两个对象，因为默认使用的是 Object 类的 equals() 方法。
2. 类重写了 equals() 方法：一般情况下，我们会重写 equals() 方法来比较两个对象的属性是否相等。如果它们的属性相等，我们会返回 true，即认为这两个对象相等。

注意：String 类中的 equals()方法是经过重写的，比较的是两个字符串中的**内容是否相等**。

## HashMap 与 HashSet 的区别

先看一看 Oracle 的 Java 文档中的这两个类

- HashMap

![image-20230916175550247](https://xiaozhublog.oss-cn-qingdao.aliyuncs.com/myblogimg/image-20230916175550247.png)

- HashSet

![image-20230916195913575](https://xiaozhublog.oss-cn-qingdao.aliyuncs.com/myblogimg/image-20230916195913575.png)

### 异同

1. **用途**

   - `HashSet` 是一种集合，**用于存储一组唯一的对象**，它不保存键值对。
   - `HashMap` 是一种键值对存储结构，用于将键映射到值。它允许你通过键来检索值。

2. **存储方式**

   - `HashSet` 使用哈希表（或哈希桶）来存储元素。**它根据元素的哈希码来确定元素在集合中的位置。**

   - `HashMap` 也使用哈希表来存储键值对，但它需要同时存储键和值。**它根据键的哈希码来确定键值对在映射中的位置。**

3. **元素属性**

- `HashSet` 不允许元素重复
- `HashMap` 允许元素重复
