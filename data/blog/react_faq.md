---
title: React 每日一练
date: '2023-03-10'
tags: ['typescript', 'react']
draft: false
summary: React Daily Exercise
---

```tsx
export function Question({ questions }: QuestionsProps) {
  const [isOpenMap, setIsOpenMap] = useState<{ [key: number]: boolean }>({})

  const toggleOpen = (id: number) => {
    setIsOpenMap({ ...isOpenMap, [id]: !isOpenMap[id] })
  }

  return (
    <section>
      {questions.map((question) => (
        <div className={isOpenMap[question.id] ? 'open' : 'closed'} key={question.id}>
          <h4>{question.title}</h4>
          <button onClick={() => toggleOpen(question.id)}>
            {isOpenMap[question.id] ? '-' : '+'}
          </button>
          {isOpenMap[question.id] && <p>{question.info}</p>}
        </div>
      ))}
    </section>
  )
}
```
