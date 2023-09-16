---
title: React 每日一练
date: '2023-03-12'
tags: ['typescript', 'react']
draft: false
summary: React Daily Exercise
---

计算 BMI 的简单 demo

![image-20230312172636362](C:\Users\xiaoz\AppData\Roaming\Typora\typora-user-images\image-20230312172636362.png)

App.tsx

```tsx
import React, { useMemo, useState } from 'react'
import './styles.css'
const DEFAULT_WEIGHT = 50
const DEFAULT_HEIGHT = 150

function App() {
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT)
  const [weight, setWeight] = useState<number>(DEFAULT_WEIGHT)

  function onHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputHeight = e.target.value
    setHeight(Number(inputHeight))
  }

  function onWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputWeight = e.target.value
    setWeight(Number(inputWeight))
  }

  const output = useMemo(() => {
    const calculatedHeight = height / 100
    return (weight / (calculatedHeight * calculatedHeight)).toFixed(1)
  }, [weight, height])

  return (
    <main>
      <h1>BMI CALCULATOR</h1>
      <div className="input-section">
        <p className="slider-output">Weight: {weight}</p>
        <input
          className="input-slider"
          type="range"
          step="1"
          min="40"
          max="220"
          onChange={onWeightChange}
          value={weight}
        />
        <p className="slider-output">Height: {height}</p>
        <input
          className="input-slider"
          type="range"
          min="140"
          max="220"
          value={height}
          onChange={onHeightChange}
        />
      </div>
      <div className="output-section">
        <p>Your BMI is</p>
        <p className="output">{output}</p>
      </div>
    </main>
  )
}

export default App
```

`useMemo`的第一个参数是一个函数，这个函数的返回值是需要缓存的值，这个值只有在依赖项（即第二个参数）发生变化时才会重新计算。

`useMemo`的依赖项是`weight`和`height`，也就是说只有当体重或身高发生变化时才会重新计算 BMI。`useMemo`会将计算得到的值缓存起来，下一次调用时如果依赖项未发生变化，则直接返回缓存的值，从而提高应用程序的性能。

因为计算 BMI 可能比较耗费计算资源，如果每次渲染都重新计算，会对性能产生不良影响，因此使用`useMemo`来缓存计算结果。

styles.css

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #e0e8ff;
}

main {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 90vw;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  padding-bottom: 20px;
}

h1 {
  background-color: #1b1096;
  color: white;
  width: 100%;
  margin-bottom: 10px;
  font-size: 2rem;
  padding: 20px 10px;
}

.output {
  padding: 10px 5px;
  border-radius: 9999px;
  background-color: #1b1096;
  color: white;
  margin-top: 10px;
}

.output-section {
  margin-top: 20px;
}

.input-section {
  width: 70%;
}

.input-slider {
  width: 100%;
  margin-top: 5px;
}

.slider-output {
  text-align: left;
  margin-top: 10px;
}
```
