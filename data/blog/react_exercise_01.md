---
title: React 每日一练
date: '2023-03-09'
tags: ['typescript', 'react']
draft: false
summary: React Daily Exercise
---

# React-Exercise-day-01

```tsx
import { useState } from 'react'
import './styles.css'

const images = [
  'https://images.pexels.com/photos/3836292/pexels-photo-3836292.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/2792157/pexels-photo-2792157.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
]

export default function App() {
  const [current, setCurrent] = useState<number>(0)

  // 我们通过控制current进一步决定是否显示图片
  function nextSlide() {
    setCurrent(current === images.length - 1 ? 0 : current + 1)
  }
  function prevSlide() {
    setCurrent(current === 0 ? images.length - 1 : current - 1)
  }

  return (
    <div>
      <h2>Project 1: Carousel</h2>
      <div className="slider">
        <div className="left-arrow" onClick={prevSlide}>
          prev
        </div>
        <div className="right-arrow" onClick={nextSlide}>
          next
        </div>

        {images.map(
          (image, index) =>
            current === index && (
              <div key={image} className="slide">
                <img src={image} alt="images" />
              </div>
            )
        )}
      </div>
    </div>
  )
}
```

```tsx
{
  images.map(
    (image, index) =>
      current === index && (
        <div key={image} className="slide">
          <img src={image} alt="images" />
        </div>
      )
  )
}
```

这个回调函数使用了两个参数：当前遍历到的元素 image 和其在数组中的下标 index。回调函数首先使用条件语句检查当前图片是否是应该被渲染的那一张图片。具体地，这个条件语句的判断条件是 `current === index`，也就是说只有当 current 和 index 相等时，才会执行下面的代码块(返回一个 div)。

参数(image) -> key(image) -> img src(image)

styles.css

```css
html,
body {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}

.slider {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.slide {
  min-width: 50%;
  height: 60vh;
  font-size: 50px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.left-arrow,
.right-arrow {
  position: absolute;
  z-index: 1;
  font-size: 20px;
  top: 46%;
  color: white;
  background: black;
  border-radius: 9999px;
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
}

.left-arrow {
  left: 5%;
}

.right-arrow {
  right: 5%;
}
```

效果图：

![image-20230309230702946](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202303092307153.png)
