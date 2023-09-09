---
title: List<Integer> list = new ArrayList<>(); 和 ArrayList<Integer> list = new ArrayList<>();这两者有什么区别
date: '2023-09-09'
tags: ['java']
draft: false
summary: List学习过程中引出的思考
---

### `List<Integer> list = new ArrayList<>();` 和 `ArrayList<Integer> list = new ArrayList<>();`这两者有什么区别

**类型不同**

这一点是最明显的这两个不属于同一个类

- `List<Integer> list` 的类型是 List 接口
- `ArrayList<Integer> list` 的类型是`ArrayList`类
- `ArrayList` 是`List` 接口的一个具体实现。这意味着`ArrayList` 是`List` 接口的一个子类，它实现了`List` 接口中定义的所有方法和功能。

![image-20230909160151781](https://xiaozhublog.oss-cn-qingdao.aliyuncs.com/myblogimg/image-20230909160151781.png)

**可见性不同**

- `List<Integer> list` 只能调用 List 接口定义的方法,比如`add()`, `remove()`等。

- `ArrayList<Integer> list` 既可以调用 List 接口的方法,也可以调用`ArrayList`类特有的方法,比如`trimToSize()`, `ensureCapacity()`等。

  当然我们也可以从 Java 文档里看出这两者的区别，可以明显看到`ArrayList`比`List`多一些方法：

  https://docs.oracle.com/javase/8/docs/api/java/util/List.html

  https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html

**扩展性不同**

- `List<Integer> list` 可以换成其他 List 实现类,比如`List<Integer> list = new LinkedList<>();` 以下代码不会出错

  ```java
  List<Integer> list = new ArrayList<>();
  list = new LinkedList<>();
  ```

- `ArrayList<Integer> list` 固定了必须为`ArrayList`实现类。以下代码会出错！

  ```java
  ArrayList<Integer> list = new ArrayList<>();
  list = new LinkedList<>();
  ```

### ArrayList 的扩容机制

相比较于`List`，`ArrayList`类特有的方法有一个`ensureCapacity()`方法，这里我们也可以联想到所谓的`ArrayList`的扩容机制:

- `ArrayList` 默认初始容量为 10。当添加元素时,如果需求超过当前容量,它会进行扩容。

- 我们可以通过构造函数指定更大的初始容量,降低扩容的次数:

```java
ArrayList<Integer> list = new ArrayList<>(100);
```

- 如果知道确切元素个数,也可以用 `ensureCapacity()` 方法提前设置容量:

```java
ArrayList<Integer> list = new ArrayList<>();
list.ensureCapacity(100);
```

- `ArrayList` 每次扩容都是当前容量的 1.5 倍。这种扩容机制比较省内存,但扩容次数多了也会影响效率。

### 多态和转型

其实如果学过 Java 的同学可以明白，其实`List<Integer> list = new ArrayList<>();` 是一种**向上转型**的写法，因为我们**正在使用一个更具一般性的接口来引用一个更具体的类的对象。**

在明白什么是向上转型之前，我们简单了解一下多态的含义：

**多态表示同一个方法或函数调用可以在不同的对象上产生不同的行为。**

我简单借助这个 Animal 类的例子说明一下多态和向上转型：

```java
public class Test1 {
    public static void eat(Animal animal)
    {
        animal.eat();
    }
    public static void main(String[] args) {
        Animal animal1 = new Animal("动物",3);
        Animal animal2 = new Cat("加菲猫",2);
        Animal animal3 = new Dog("哈士奇",1);

        eat(animal1);
        eat(animal2);
        eat(animal3);
    }
}


```

对于上面这个代码示例,使用向上转型具有以下几个好处:

- 多态实现：`eat()` 方法接受 `Animal` 类型参数，可以处理 `Animal` 或其子类的实例，不同的 Animal 或者其子类的`eat()`方法实现不同，从而实现不同的 `eat()` 行为。

- 提高扩展性：新增动物类只需继承 `Animal`，无需修改 `eat()` 方法。

- 简化签名：`eat()` 方法的签名只需声明为 `Animal` 类型，不需要为每个动物类单独定义。

- 提高复用：`Animal` 的字段和方法可以被子类继承，无需重新实现。

- 规范接口：`eat()` 方法建立了规范接口，外部只需关注参数为 `Animal` 类型。

- 依赖抽象：`eat()` 方法依赖于抽象类 `Animal`，不依赖具体实现，减少耦合。

- 保证安全：`eat()` 方法内部处理的都是 `Animal` 类型的方法，即使传入子类也不出错。

回到我们的`List<Integer> list = new ArrayList<>();` 例子中, `ArrayList`和`LinkedList`中的`add()` 方法的实现肯定不同(毕竟一个是数组的形式，另一个是链表的形式)，所以只有在在运行时确定使用的是哪个具体类的实例，从而实现不同的行为。

```java
List<Integer> list = new ArrayList<>();
// 或者 List<Integer> list = new LinkedList<>();

// 多态行为
list.add(1);
```

`ArrayList`的`add()` 实现：

```java
public boolean add(E e) {
     ensureCapacityInternal(size + 1);  // Increments modCount!!
     elementData[size++] = e;
     return true;
}
```

`LinkedList`的`add()` 实现:

```java
 public boolean add(E e) {
        linkLast(e);
        return true;
 }

void linkLast(E e) {
        final Node<E> l = last;
        final Node<E> newNode = new Node<>(l, e, null);
        last = newNode;
        if (l == null)
            first = newNode;
        else
            l.next = newNode;
        size++;
        modCount++;
}
```

既然都已经了解了多态和向上转型了，也可以了解一下向下转型！

**向下转型：向下转型是将一个引用从其基类类型转换为其派生类类型的过程。**

我们继续上面 Animal 的例子,假设我们要在 `eat` 方法中访问派生类独有的属性或方法，这时候向下转型就派上用场了：

```java
public class Test1 {
    public static void eat(Animal animal) {
        animal.eat();

        // 向下转型并访问派生类独有属性和方法
        if (animal instanceof Cat) {
            Cat cat = (Cat) animal;
            cat.purr();
        } else if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();
        }
    }

    public static void main(String[] args) {
        Animal animal1 = new Animal("动物", 3);
        Animal animal2 = new Cat("加菲猫", 2);
        Animal animal3 = new Dog("哈士奇", 1);

        eat(animal1);
        eat(animal2);
        eat(animal3);
    }
}
```

一想到`ArrayList`的扩容机制，则我们容易想到另一个类`HashMap`的扩容机制；一想到多态，我们又会想到面向对象的另外的特点封装和继承，篇幅有点过长了，下次慢慢钻研！
