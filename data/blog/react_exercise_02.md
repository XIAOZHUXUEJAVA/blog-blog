---
title: React 每日一练
date: '2023-03-10'
tags: ['typescript', 'react']
draft: false
summary: React Daily Exercise
---

App.tsx

```tsx
import { Question } from './Question'
import { QuestionData } from './QuestionData'
import './styles.css'

function App() {
  return (
    <>
      <h1>FAQ</h1>
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="questions">
          {questionsList.map((question) => (
            <Question key={question.id} question={question}></Question>
          ))}
        </div>
      </div>
    </>
  )
}
export default App
const questionsList: QuestionData[] = [
  {
    id: 1,
    title: 'hello',
    info: 'hello',
  },
  {
    id: 2,
    title: 'hi',
    info: 'hi',
  },
  {
    id: 3,
    title: 'hah',
    info: 'hah',
  },
]
```

Question.tsx

```tsx
import { useState } from 'react'
import { QuestionData } from './QuestionData'

// 最好写在Quesiton.tsx文件下，因为这是react组件的参数类型
type QuestionProps = {
  question: QuestionData
}

enum SwichState {
  OPEN = 'open',
  CLOSED = 'closed',
}

export function Question({ question }: QuestionProps) {
  const [isOpen, setOpen] = useState<boolean>(false)
  return (
    <section>
      <div className={isOpen ? SwichState.OPEN : SwichState.CLOSED}>
        <h4>{question.title}</h4>
        <button onClick={() => setOpen(!isOpen)}>{isOpen ? 'close' : 'open'}</button>
      </div>
      {isOpen && <p>{question.info}</p>}
    </section>
  )
}
```

QuestionData.ts

```ts
export type QuestionData = {
  id: number
  title: string
  info: string
}
```

styles.css

```css
html {
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  background-color: rgb(10, 27, 184);
  max-width: 600px;
  padding: 10px 20px 20px;
  border-radius: 12px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

.container h2 {
  margin: 0 auto;
  text-align: center;
  padding: 10px 0 20px 0;
  color: white;
}

button {
  background: rgb(211, 216, 253);
  color: rgb(10, 27, 184);
  border: 2px solid rgb(10, 27, 184);
  border-radius: 5px;
  font-size: 20px;
}

section div,
section p {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 0px;
}

section p {
  padding-bottom: 20px;
}

section > div.closed {
  margin-bottom: 20px;
}
```

在父组件`App`中，首先使用了`import`语句导入了`Question`组件和`QuestionData`类型，并且导入了样式文件`styles.css`。然后，使用了`questionsList`数组存储了一些问题的数据，其中每个问题都包括一个`id`、一个`title`和一个`info`。

在`App`组件中，首先渲染了一个标题和一个包含问题的容器。在问题容器中，使用了`questionsList.map()`方法遍历了所有问题数据，并将每个问题的`id`、`title`和`info`作为属性传递给`Question`组件，渲染出所有问题。

子组件`Question`定义了一个接口类型`QuestionProps`，用于指定传入该组件的参数类型。接着使用了一个枚举类型`SwitchState`表示问题的状态，包括`open`和`closed`两种状态。

在`Question`组件中，首先使用了`useState`钩子函数创建了一个`isOpen`状态，并将初始值设置为`false`。然后根据问题的状态渲染了一个包含标题和按钮的`div`元素，其中按钮的文字根据问题的状态进行切换。当按钮被点击时，使用了`setOpen`函数改变了问题的状态，并在问题打开时渲染了一个包含问题描述信息的`p`元素。

效果图：

![image-20230311094550963](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202303110945096.png)
