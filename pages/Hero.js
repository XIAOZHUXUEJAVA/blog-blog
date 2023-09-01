// import React, { useEffect, useRef } from 'react';
// import { renderCanvas } from './renderCanvas';

// export default function Hero({ welcome }) {
//   const ref = useRef(null);

//   useEffect(() => {
//     renderCanvas();
//     if (ref.current) {
//       ref.current.classList.add('transition-in');
//     }
//   }, []);

//   return (
//     <div>
//       <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
//       <div className="relative z-10 flex h-[calc(100vh_-_135px)] items-center justify-center">
//         <div ref={ref} className="px-4 text-3xl md:text-4xl">
//           {/* {welcome} */}

//           {/* {welcome.split('').map((letter, index) => (
//             <span
//               style={{ transitionDelay: 0.2 * (index + 1) + 's' }}
//               className="opacity-0 transition-opacity"
//               key={index}
//             >
//               {letter}
//             </span>
//           ))} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from 'react';
// import { renderCanvas } from './renderCanvas';

// export default function Hero({ welcome }) {
//   const ref = useRef(null);
//   const [displayText, setDisplayText] = useState('');

//   useEffect(() => {
//     renderCanvas();
//     if (ref.current) {
//       ref.current.classList.add('transition-in');
//     }

//     // 通过延时逐个显示字母
//     const delay = 75; // 每个字母的延时时间（毫秒）
//     let currentIndex = 0;

//     const timer = setInterval(() => {
//       if (currentIndex < welcome.length) {
//         setDisplayText(welcome.substring(0, currentIndex + 1));
//         currentIndex++;
//       } else {
//         clearInterval(timer);
//       }
//     }, delay);

//     return () => {
//       clearInterval(timer); // 清除定时器以防止内存泄漏
//     };
//   }, [welcome]);

//   return (
//     <div>
//       <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
//       <div className="relative z-10 flex h-[calc(100vh_-_135px)] items-center justify-center">
//         <div ref={ref} className="px-4 text-3xl md:text-4xl">
//           {displayText}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react'
import { renderCanvas } from './renderCanvas'

export default function Hero({ welcome }) {
  const ref = useRef(null)
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    renderCanvas()
    if (ref.current) {
      ref.current.classList.add('transition-in')
    }

    // 通过 requestAnimationFrame 来逐个显示字母
    let animationFrameId = requestAnimationFrame(animateText)

    function animateText() {
      if (currentIndex < welcome.length) {
        setDisplayText(welcome.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
        animationFrameId = requestAnimationFrame(animateText) // 继续下一帧动画
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId) // 清除动画帧以防止内存泄漏
    }
  }, [welcome, currentIndex])

  return (
    <div>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
      <div className="relative z-10 flex h-[calc(100vh_-_135px)] items-center justify-center">
        <div ref={ref} className="px-4 text-3xl md:text-4xl">
          {displayText}
        </div>
      </div>
    </div>
  )
}
