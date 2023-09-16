---
title: Sorting Algorithms
date: '2023-09-13'
tags: ['algorithm', 'java']
draft: false
summary: common sorting algorithms and implementation in java
---

# 排序算法

1. 简单介绍一下排序算法

2. 具体写一下 Java 实现排序

3. 算法复杂度：时间复杂度和空间复杂度

4. 是否为稳定排序

## 选择排序

### 介绍

SelectSort: 每轮从未排序区间选择最小的元素，将其放到已排序区间的末尾。

### 实现

```java

import java.util.*;


public class SelectSort {


  public static void selectSort(int[] array) {
    if (array == null) {
      throw new IllegalArgumentException("The input array cannot be null");
    }
    if (array.length <= 1) {
      return;
    }
    int n = array.length;
    for (int i = 0; i < n - 1; i++) {
      int minValueIndex = i;
      for (int j = i + 1; j < n; j++) {
        if (array[minValueIndex] > array[j]) {
          minValueIndex = j;
        }
      }
      swapElementInArray(array, i, minValueIndex);
    }
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


  public static void main(String[] args) {
    int[] unorderedArray = {2, 1, 1, 9, 8, 5};
    System.out.println(Arrays.toString(unorderedArray));
    selectSort(unorderedArray);
    System.out.println(Arrays.toString(unorderedArray));
  }
}
```

### 算法复杂度

- 时间复杂度： O(n^2)
- 空间复杂度： O(1) 原地排序

### 稳定性

非稳定排序，初始的两个相等的元素的相对位置发生了变化

## 冒泡排序

### 介绍

冒泡排序是一种简单的比较排序算法，它的基本思想是通过多次遍历待排序的元素，依次比较相邻的两个元素，如果它们的顺序不符合排序要求（例如，如果要升序排序，那么左边的元素比右边的元素大），就交换它们的位置。这样，每一轮遍历都会将当前未排序序列中的最大元素“冒泡”到最后的位置，因此得名“冒泡排序”。

具体步骤如下：

1. 从数组的第一个元素开始，比较相邻的两个元素。
2. 如果左边的元素大于右边的元素（如果是升序排序），则交换它们的位置。
3. 继续比较下一对相邻元素，重复步骤 2，直到遍历到数组的倒数第二个元素。
4. 重复上述步骤，每次遍历都会将未排序序列中的最大元素“冒泡”到最后的位置。
5. 每一轮遍历都会减少未排序序列的长度，直到整个数组都有序为止。

冒泡排序的时间复杂度为 O(n^2)，其中 n 是待排序元素的数量。虽然它不是效率最高的排序算法，但它的实现非常简单，适用于小规模数据或已经基本有序的数据集。然而，在大规模数据集上使用冒泡排序会很慢，更高效的排序算法如快速排序和归并排序通常更适合处理大型数据集。

### 实现

```java

import java.util.*;

public class BubbleSort {

  public static void bubbleSort(int[] array) {
    if (array == null) {
      throw new IllegalArgumentException("The input array cannot be null");
    }
    if (array.length <= 1) {
      return;
    }
    int n = array.length;
    for (int i = n - 1; i > 0; i--) {
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



  public static void main(String[] args) {
    int[] unorderedArray = {2, 1, 1, 9, 8, 5};
    System.out.println(Arrays.toString(unorderedArray));
    bubbleSort(unorderedArray);
    System.out.println(Arrays.toString(unorderedArray));

  }
}
```

### 算法复杂度

- 时间复杂度：O(n^2)

- 空间复杂度：O(1) 原地排序

### 稳定性

```java
 if (array[j] > array[j + 1]) {
      swapElementInArray(array, j, j + 1);
      hasSwapped = true;
 }
```

稳定排序：`array[j] > array[j + 1]` 遇到相等的元素不交换

## 插入排序

### 介绍

将待排序的数据分为已排序和未排序两部分，初始时已排序部分只包含第一个元素，然后逐步将未排序部分的元素插入到已排序部分中的适当位置，直到所有元素都被排序为止。

### 实现

```java
import java.util.*;

public class InsertSort {


  public static void insertSort(int[] array) {
    if (array == null) {
      throw new IllegalArgumentException("The input array cannot be null");
    }
    if (array.length <= 1) {
      return;
    }
    int n = array.length;
    for (int i = 1; i < n; i++) {
      int baseElement = array[i];
      int j = i - 1;
      while (j >= 0 && array[j] > baseElement) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = baseElement;
    }
  }



  public static void main(String[] args) {
    int[] unorderedArray = {2, 1, 1, 9, 8 ,5};
    System.out.println(Arrays.toString(unorderedArray));
    insertSort(unorderedArray);
    System.out.println(Arrays.toString(unorderedArray));
  }
}
```

### 算法复杂度

- 时间复杂度：O(n^2)

- 空间复杂度：O(1) 原地排序

### 稳定性

```java
while (j >= 0 && array[j] > baseElement) {
     array[j + 1] = array[j];
     j--;
}
array[j + 1] = baseElement;
```

从上面的代码可以看出这是稳定排序，遇到相等的元素了，插入到这一元素的右边。

## 快速排序

### 介绍

它基于分而治之的思想，通过将待排序的数组分割成两个子数组，分别排序后再合并，从而实现整个数组的排序。快速排序的特点是平均情况下性能非常好，通常比其他常见的排序算法（如冒泡排序和插入排序）更快。

以下是快速排序的基本思想和步骤：

1. 选择一个元素作为枢轴（pivot），通常选择数组中的第一个元素或随机选择。枢轴的选择是快速排序的关键，它将数组分为两个子数组。
2. 划分阶段：将数组中小于枢轴的元素移动到枢轴的左边，将大于枢轴的元素移动到枢轴的右边。这一过程称为分区（partitioning）。可以使用两个指针来遍历数组，一个从左边开始，一个从右边开始，直到它们相遇。在这个过程中，小于枢轴的元素被交换到左边，大于枢轴的元素被交换到右边。
3. 递归排序：将左右两个子数组分别递归地应用快速排序算法。这将继续划分和排序子数组，直到每个子数组只包含一个元素或为空。
4. 合并：已排序的子数组会被合并成一个完整的有序数组。

### 实现

```java
package sorts7;

import java.util.*;


public class QuickSort {

  public static void quickSort(int[] array, int leftIndex, int rightIndex) {
    if (leftIndex >= rightIndex) {
      return;
    }
    int pivotIndex = partition(array, leftIndex, rightIndex);
    quickSort(array, leftIndex, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, rightIndex);
  }

  public static int partition(int[] array, int leftIndex, int rightIndex) {
    int i = leftIndex;
    int j = rightIndex;
    while (i < j) {
      while (i < j && array[j] >= array[leftIndex]) {
        j--;
      }
      while (i < j && array[i] <= array[leftIndex]) {
        i++;
      }
      swapElementInArray(array, j, i);
    }
    swapElementInArray(array, i, leftIndex);
    return i;
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




  public static void main(String[] args) {

    int[] unorderedArray = {2, 1, 1, 9, 8, 5};
    System.out.println(Arrays.toString(unorderedArray));
    quickSort(unorderedArray, 0, unorderedArray.length - 1);
    System.out.println(Arrays.toString(unorderedArray));
  }
}
```

### 算法复杂度

- 时间复杂度：O(nlogn) 递归层数为 log n ，循环次数为 n， 时间复杂度为 O(nlogn)

- 空间复杂度：O(n) 最坏的情况下，使用的是 O(n)的栈帧空间

### 稳定性

不稳定排序

## 归并排序

### 介绍

归并排序的核心思想是将待排序的数组分割成若干个小数组，然后逐个合并这些小数组，最终得到一个有序的数组。归并排序的特点是稳定且具有一定的性能优势，尤其在大型数据集上表现良好。

以下是归并排序的基本思想和步骤：

1. 分割阶段：将待排序的数组分割成两个相等或近似相等的子数组，通常采用递归方式进行分割，直到每个子数组只包含一个元素或为空。
2. 合并阶段：逐个合并已分割的子数组，同时保持它们的有序性。合并过程中，将两个有序子数组合并成一个更大的有序数组。这一过程将一直进行，直到所有子数组都被合并成一个完整的有序数组。
3. 递归排序：递归地对子数组进行归并排序，直到整个数组都有序。

### 实现

```java
package sorts7;

import java.util.*;

public class MergeSort {



  public static int[] mergeSort(int[] array) {
    if (array.length <= 1) {
      return array;
    }
    int midIndex = array.length >> 1;
    int[] leftArray = Arrays.copyOfRange(array, 0, midIndex);
    int[] rightArray = Arrays.copyOfRange(array, midIndex, array.length);
    return merge(mergeSort(leftArray), mergeSort(rightArray));
  }

  public static int[] merge(int[] leftArray, int[] rightArray) {
    if (leftArray == null || leftArray.length == 0) {
      return rightArray;
    }
    if (rightArray == null || rightArray.length == 0) {
      return leftArray;
    }
    int leftIndex = 0;
    int rightIndex = 0;
    int mergedIndex = 0;
    int[] mergedArray = new int[leftArray.length + rightArray.length];

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      if (leftArray[leftIndex] < rightArray[rightIndex]) {
        mergedArray[mergedIndex++] = leftArray[leftIndex++];
      } else {
        mergedArray[mergedIndex++] = rightArray[rightIndex++];
      }
    }
    while (leftIndex < leftArray.length) {
      mergedArray[mergedIndex++] = leftArray[leftIndex++];
    }


    while (rightIndex < rightArray.length) {
      mergedArray[mergedIndex++] = rightArray[rightIndex++];
    }
    return mergedArray;

  }



  public static void main(String[] args) {
    int[] unorderedArray = {2, 1, 1, 9, 8, 5};
    System.out.println(Arrays.toString(unorderedArray));
    int[] mergedArray = mergeSort(unorderedArray);
    System.out.println(Arrays.toString(mergedArray));
  }
}
```

### 算法复杂度

- 时间复杂度：O(nlogn) 递归的深度为 log n ，合并的时间复杂度为 O(n)， 时间复杂度为 O(nlogn)

- 空间复杂度：O(n) 最坏的情况下，使用的是 O(n)的栈帧空间

### 稳定性

稳定排序

## 堆排序

### 介绍

堆排序（Heap Sort）是一种基于二叉堆数据结构的排序算法，它的核心思想是将待排序的数组看作是一个二叉堆，通过构建最大堆（Max Heap）或最小堆（Min Heap）来实现排序。在堆排序中，首先将数组转换成一个二叉堆，然后不断从堆中移出最大（或最小）元素，放入已排序部分，直到整个数组有序。

### 实现

```java
package sorts7;

import java.util.*;

public class HeapSort {


  public static void heapSort(int[] array) {
    if (array == null) {
      throw new IllegalArgumentException("The input array cannot be null");
    }
    if (array.length <= 1) {
      return;
    }
    int n = array.length;
    for (int i = n / 2 - 1; i >= 0; i--) {
      heapify(array, i, n);
    }
    for (int i = n - 1; i > 0; i--) {
      swapElementInArray(array, 0, i);
      heapify(array, 0, i);
    }
  }




  public static void heapify(int[] array, int i, int n) {
    int maxValueIndex = i;
    int leftIndex = 2 * i + 1;
    int rightIndex = 2 * i + 2;
    if (leftIndex < n && array[leftIndex] > array[maxValueIndex]) {
      maxValueIndex = leftIndex;
    }
    if (rightIndex < n && array[rightIndex] > array[maxValueIndex]) {
      maxValueIndex = rightIndex;
    }
    if (i != maxValueIndex) {
      swapElementInArray(array, i, maxValueIndex);
      heapify(array, maxValueIndex, n);
    }
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



  public static void main(String[] args) {
    int[] unorderedArray = {2, 1, 1, 9, 8, 5};
    System.out.println(Arrays.toString(unorderedArray));
    heapSort(unorderedArray);
    System.out.println(Arrays.toString(unorderedArray));
  }
}
```

### 算法复杂度

- 时间复杂度为 O(n log n)
- 空间复杂度为 O(1)

### 稳定性

不稳定排序

## 计数排序

### 介绍

计数排序（Counting Sort）是一种非比较性的整数排序算法，适用于待排序元素都是非负整数的情况。计数排序的核心思想是通过统计每个元素出现的次数，然后根据这些统计信息将元素放置在正确的位置上，从而完成排序。

以下是计数排序的关键特点和步骤：

1. 找到待排序数组中的最大值，以确定计数数组的大小。计数数组的大小为最大元素值加一。
2. 创建一个计数数组，用于存储每个元素出现的次数。初始时，计数数组的所有元素都初始化为 0。
3. 遍历待排序数组，统计每个元素出现的次数，并将统计结果存储在计数数组中。具体来说，对于数组中的每个元素 x，将计数数组中的 counts[x]加 1。
4. 根据计数数组中的统计信息，重新构建有序数组。遍历计数数组，对于每个元素 x，将 x 重复 counts[x]次放入有序数组中。
5. 完成排序后，有序数组即为排序结果。

### 实现

```java
package sorts7;

import java.util.*;


public class CountSort {

  public static void countSort(int[] nums) {
    if (nums == null) {
      throw new IllegalArgumentException("The input nums cannot be null");
    }
    if (nums.length <= 1) {
      return;
    }
    int maxValue = 0;
    for (int num : nums) {
      maxValue = Math.max(num, maxValue);
    }
    int[] counts = new int[maxValue + 1];
    for (int num : nums) {
      counts[num]++;
    }
    int sortedIndex = 0;

    for (int value = 0; value < counts.length; value++) {
      for (int i = 0; i < counts[value]; i++) {
        nums[sortedIndex++] = value;
      }
    }



  }



  public static void main(String[] args) {
    int[] unorderedArray = {2, 1, 1, 9, 8, 5};
    System.out.println(Arrays.toString(unorderedArray));
    countSort(unorderedArray);
    System.out.println(Arrays.toString(unorderedArray));
  }
}
```

### 算法复杂度

- 时间复杂度：计数排序的时间复杂度为 O(n + k)，其中 n 是待排序元素的数量，k 是计数数组的大小。当 k 不过于大且是常数时，计数排序的时间复杂度可以近似看作 O(n)

- 空间复杂度：计数排序的空间复杂度取决于计数数组的大小，通常为 O(k)，其中 k 是计数数组的大小。计数数组的大小取决于待排序数据中的最大元素值。如果待排序数据的范围很大，那么计数数组的大小也会很大，从而导致空间复杂度增加。

### 稳定性

稳定排序

## 桶排序

### 介绍

桶排序（Bucket Sort）是一种分布式排序算法，它将元素分散到多个桶中，然后对每个桶中的元素进行排序，最后将桶中的元素按顺序合并起来，形成有序的输出。桶排序通常用于处理具有均匀分布的输入数据。

以下是桶排序的简要介绍：

初始化桶： 首先，确定要使用的桶的数量，通常是根据输入数据的范围和分布来确定的。每个桶可以是一个容器，可以是数组、链表或其他数据结构。

分配元素到桶中： 接下来，遍历输入数组，将每个元素根据某种规则分配到相应的桶中。分配规则通常是将元素映射到特定的桶索引。这个映射可以使用一种映射函数来完成。

对每个桶进行排序： 一旦元素分配到桶中，就对每个桶中的元素进行排序。通常，桶内排序可以使用快速排序、归并排序等常见的排序算法，也可以选择其他排序方法，具体取决于应用的需要。

合并桶中的元素： 排序后，将各个桶中的元素按照桶的顺序合并起来，形成有序的输出。合并可以通过简单地按顺序访问每个桶中的元素并放入输出数组来实现。

输出结果： 最终得到一个有序的输出数组，其中包含了输入数据的有序排列。

### 实现

```java
import java.util.*;


public class BucketSort {


  public static void bucketSort(float[] nums) {
    if (nums == null) {
      throw new IllegalArgumentException("The input nums cannot be null");
    }
    if (nums.length <= 1) {
      return;
    }


    int halfLength = nums.length / 2;
    List<List<Float>> buckets = new ArrayList<>();
    for (int i = 0; i < halfLength; i++) {
      buckets.add(new ArrayList<>());
    }


    for (float num : nums) {
      int bucketIndex = (int) (num * halfLength);
      buckets.get(bucketIndex).add(num);
    }


    for (List<Float> bucket : buckets) {
      Collections.sort(bucket);
    }

    int sortedIndex = 0;
    for (List<Float> bucket : buckets) {
      for (float num : bucket) {
        nums[sortedIndex++] = num;
      }
    }
  }

  public static void main(String[] args) {
    float[] unorderedArray = {0.2f, 0.1f, 0.1f, 0.3f, 0.5f, 0.7f, 0.6f};
    System.out.println(Arrays.toString(unorderedArray));
    bucketSort(unorderedArray);
    System.out.println(Arrays.toString(unorderedArray));
  }

}
```

### 算法复杂度

- 时间复杂度: O(n), 当桶的数量比较多的时候。
- 空间复杂度: O(n + k), 需要借助 k 个桶和 List 中的 n 个元素的额外空间

### 稳定性

桶排序的稳定性取决于每个桶里面的排序算法的稳定性

```java
for (List<Float> bucket : buckets) {
    Collections.sort(bucket);
}
```
