import { useEffect, useRef } from "react"

const Animation = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Atom {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = Math.random() * 2 + 1
        this.dx = (Math.random() - 0.5) * 2
        this.dy = (Math.random() - 0.5) * 2
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(49, 100, 196, 0.5)" // Using #3164C4 with 50% opacity
        ctx.fill()
      }

      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy
        }

        this.x += this.dx
        this.y += this.dy

        this.draw()
      }
    }

    class ChemicalStructure {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 60 + 40
        this.type = ["molecule", "bond", "orbital"][Math.floor(Math.random() * 3)]
      }

      draw() {
        if (!ctx) return
        ctx.strokeStyle = `rgba(49, 100, 196, 0.2)`
        ctx.lineWidth = 2

        switch (this.type) {
          case "molecule":
            this.drawMolecule()
            break
          case "bond":
            this.drawBond()
            break
          case "orbital":
            this.drawOrbital()
            break
        }
      }

      drawMolecule() {
        const angleStep = (Math.PI * 2) / 6
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = i * angleStep
          const x = this.x + (Math.cos(angle) * this.size) / 2
          const y = this.y + (Math.sin(angle) * this.size) / 2
          ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
      }

      drawBond() {
        ctx.beginPath()
        ctx.moveTo(this.x - this.size / 2, this.y)
        ctx.lineTo(this.x + this.size / 2, this.y)
        ctx.moveTo(this.x, this.y - this.size / 4)
        ctx.lineTo(this.x, this.y + this.size / 4)
        ctx.stroke()
      }

      drawOrbital() {
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.size / 2, this.size / 4, Math.PI / 4, 0, Math.PI * 2)
        ctx.moveTo(this.x, this.y - this.size / 2)
        ctx.lineTo(this.x, this.y + this.size / 2)
        ctx.stroke()
      }
    }

    const atoms = []
    for (let i = 0; i < 50; i++) {
      atoms.push(new Atom(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    const chemicalStructures = []
    for (let i = 0; i < 15; i++) {
      chemicalStructures.push(new ChemicalStructure(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw chemical structures
      chemicalStructures.forEach((structure) => structure.draw())

      // Draw and update atoms
      atoms.forEach((atom) => atom.update())
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
}

export default Animation
