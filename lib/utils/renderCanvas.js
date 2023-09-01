class Wave {
  constructor(e) {
    this.phase = 0
    this.offset = 0
    this.frequency = 0.001
    this.amplitude = 1

    this.phase = e.phase || 0
    this.offset = e.offset || 0
    this.frequency = e.frequency || 0.001
    this.amplitude = e.amplitude || 1
  }

  update() {
    this.phase += this.frequency
    return this.offset + Math.sin(this.phase) * this.amplitude
  }
}

class Node {
  constructor() {
    this.x = 0
    this.y = 0
    this.vy = 0
    this.vx = 0
  }
}

class Line {
  constructor(e, pos) {
    this.spring = 0.1
    this.friction = 0.01
    this.nodes = []
    this.pos = pos // 初始化 pos 属性

    this.spring = e.spring + 0.1 * Math.random() - 0.05
    this.friction = E.friction + 0.01 * Math.random() - 0.005
    this.nodes = []
    for (let i = 0; i < E.size; i++) {
      const t = new Node()
      t.x = this.pos.x // 使用 this.pos.x 初始化 x 属性
      t.y = this.pos.y // 使用 this.pos.y 初始化 y 属性
      this.nodes.push(t)
    }
  }

  update() {
    let spring = this.spring
    let node = this.nodes[0]

    node.vx += (this.pos.x - node.x) * spring
    node.vy += (this.pos.y - node.y) * spring

    let prevNode
    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i]

      if (i > 0) {
        prevNode = this.nodes[i - 1]
        node.vx += (prevNode.x - node.x) * spring
        node.vy += (prevNode.y - node.y) * spring
        node.vx += prevNode.vx * E.dampening
        node.vy += prevNode.vy * E.dampening
      }

      node.vx *= this.friction
      node.vy *= this.friction
      node.x += node.vx
      node.y += node.vy
      spring *= E.tension
    }
  }

  draw(ctx) {
    let currNode,
      nextNode,
      x = this.nodes[0].x,
      y = this.nodes[0].y

    ctx.beginPath()
    ctx.moveTo(x, y)

    let i
    for (i = 1; i < this.nodes.length - 2; i++) {
      currNode = this.nodes[i]
      nextNode = this.nodes[i + 1]
      x = 0.5 * (currNode.x + nextNode.x)
      y = 0.5 * (currNode.y + nextNode.y)
      ctx.quadraticCurveTo(currNode.x, currNode.y, x, y)
    }
    currNode = this.nodes[i]
    nextNode = this.nodes[i + 1]
    ctx.quadraticCurveTo(currNode.x, currNode.y, nextNode.x, nextNode.y)

    ctx.stroke()
    ctx.closePath()
  }
}

const E = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
}

export const renderCanvas = function () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  let lines = []
  const pos = { x: 0, y: 0 }
  const wave = new Wave({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  })
  let running = true
  let frame = 1

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
  }

  resizeCanvas()

  function animate() {
    if (running) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = 'hsla(' + Math.round(wave.update()) + ',90%,50%,0.25)'
      ctx.lineWidth = 1

      for (var i = 0; i < E.trails; i++) {
        var line = lines[i]
        line.update()
        line.draw(ctx)
      }
      frame++
      window.requestAnimationFrame(animate)
    }
  }

  function bindMouseMove(event) {
    function drawLine() {
      lines = []
      for (var i = 0; i < E.trails; i++)
        lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }, pos))
    }
    function move(e) {
      e.touches
        ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
        : ((pos.x = e.clientX), (pos.y = e.clientY))
      e.preventDefault()
    }
    function start(e) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX
        pos.y = e.touches[0].pageY
      }
    }
    document.removeEventListener('mousemove', bindMouseMove)
    document.removeEventListener('touchstart', bindMouseMove)
    document.addEventListener('mousemove', move)
    document.addEventListener('touchmove', move)
    document.addEventListener('touchstart', start)
    move(event)
    drawLine()
    animate()
  }

  document.addEventListener('mousemove', bindMouseMove)
  document.addEventListener('touchstart', bindMouseMove)
  document.body.addEventListener('orientationchange', resizeCanvas)
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('focus', () => {
    if (!running) {
      running = true
      animate()
    }
  })
  window.addEventListener('blur', () => {
    running = true
  })
}
