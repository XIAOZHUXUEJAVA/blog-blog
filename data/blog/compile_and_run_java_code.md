---
title: Compile and Run Java Code
date: '2023-08-31'
tags: ['java']
draft: false
summary: prepare for interview
---

# Complie & Run Java Code

Why I sometimes compile and run java code manually than using IDE ?

To improve the level of my whiteboard programming.

Let's get started!

Assuming your code file structure is as follows:

```
/path/to/code
    └── sorts
        └── BubbleSort.java
```

1. **Navigate to Code Folder**

   ```bash
   cd /path/to/code
   ```

2. **Compile Code**: Compile your Java code with the package statement using the `javac` command:

   ```bash
   javac sorts/BubbleSort.java
   ```

3. **Run Code**: Run your compiled Java code

   ```bash
   java -cp . sorts.BubbleSort
   ```

   - `-cp .` sets the classpath to the current folder.

   * `sorts.BubbleSort` is your complete class name, including the package.

For instance:

- My code file structure

```bash
/e/workspace/code/vscode_projects/java-algo-ds
```

- create a directory in `java-algo-ds`, create a Java file named BubbleSort.java in `sorts` directory

```bash
mkdir sorts
vim BubbleSort.java
```

- write code like the follows

```java
package sorts;

import java.util.*;
public class BubbleSort {
    public static void main(String[] args) {
        int[] unorderedArray = {2, 3, 1, 1, 4, 3, 5, 3};
        System.out.println("unordered array: " + Arrays.toString(unorderedArray));
        bubbleSort(unorderedArray);
        System.out.println("ordered array: " + Arrays.toString(unorderedArray));
    }


    public static void swapElementInArray(int[] array, int firstIndex, int secondIndex) {
        if (array == null || array.length == 0) {
            throw new IllegalArgumentException("The input array cannot be null or empty");
        }
        if (firstIndex < 0 || firstIndex >= array.length || secondIndex < 0 || secondIndex >= array.length) {
            throw new IndexOutOfBoundsException("Invalid index values");
        }
        if (firstIndex != secondIndex) {
            int tempElement = array[firstIndex];
            array[firstIndex] = array[secondIndex];
            array[secondIndex] = tempElement;
        }

    }

    public static void bubbleSort(int[] array) {
        if (array == null) {
            throw new IllegalArgumentException("The input array cannot be null");
        }
        if (array.length < 2) {
            return;
        }
        int length = array.length;
        for (int i = length - 1; i > 0; i--) {
            boolean hasSwapped = false;
            for (int j = 0; j < i; j++) {
                if (array[j] > array[j + 1]) {
                    swapElementInArray(array, j, j + 1);
                    hasSwapped = true;
                }
            }
            if (!hasSwapped) {
                break;
            }
        }
    }
}
```

- Compile and run the code

```bash
➜ java-algo-ds (master) pwd
/e/workspace/code/vscode_projects/java-algo-ds

➜ java-algo-ds (master) javac sorts/BubbleSort.java


➜ java-algo-ds (master) java -cp . sorts.BubbleSort
unordered array: [2, 3, 1, 1, 4, 3, 5, 3]
ordered array: [1, 1, 2, 3, 3, 3, 4, 5]
```
