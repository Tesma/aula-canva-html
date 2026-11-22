const canvas = []
const colors = ["red", "blue", "yellow", "black"]

class Canva {
    constructor(id) {
        this.element = document.getElementById(id)
        this.ctx = this.element.getContext("2d")
        this.color = "black"
        this.onAnim = false;
        this.cindex = 3;
        this.mult = 1;
        canvas.push(this)

        this.element.addEventListener("mouseenter", () => {
            if (!this.onAnim) {
                easeOut(500, (value) => {
                    this.mult = 1 + (0.25 * value)
                    this.setSize(this.baseWidth * this.mult, this.baseHeight * this.mult)
                })
            }
        }) 

        this.element.addEventListener("mouseleave", () => {
            if (!this.onAnim) {
                easeOut(500, (value) => {
                    this.mult = 1 + (0.25 * (1 - value))
                    this.setSize(this.baseWidth * this.mult, this.baseHeight * this.mult)
                })
            }
        })

        this.click = () => {
            this.cindex++;
            if (this.cindex > 3) { this.cindex = 0; }
            const color = colors[this.cindex]
            this.changeColor(color)
        }

        this.element.addEventListener('click',this.click)
    }

    setSize(width,height,base = false) { //largura, altura e se é o tamanho basico
        this.width = this.element.width = width;
        this.height = this.element.height = height;
        if (this.draw !== undefined) {
            this.draw();
        } 

        if (base) {
            this.baseWidth = width;
            this.baseHeight = height;
        }
    }

    changeColor(color) {
        this.color = color;
        this.draw()
    }
}

//circulo
const circulo = new Canva("circulo")
circulo.draw = () => {
    circulo.ctx.beginPath();
    circulo.ctx.arc(circulo.width / 2,circulo.width / 2,circulo.width / 2,0,2 * Math.PI)
    circulo.ctx.fillStyle = circulo.color
    circulo.ctx.fill()
}

//retangulo
const retangulo = new Canva("retangulo")

retangulo.draw = () => {
    retangulo.ctx.fillStyle = retangulo.color
    retangulo.ctx.fillRect(0,0,retangulo.width,retangulo.height)
}

//triangulo
const triangulo = new Canva("triangulo")
triangulo.draw = () => {
    triangulo.ctx.beginPath();
    triangulo.ctx.moveTo(triangulo.width / 2,0)
    triangulo.ctx.lineTo(0,triangulo.height)
    triangulo.ctx.lineTo(triangulo.width,triangulo.height)
    triangulo.ctx.closePath()
    triangulo.ctx.fillStyle = triangulo.color
    triangulo.ctx.fill();
}

circulo.setSize(200,200,true)
retangulo.setSize(300,200,true)
triangulo.setSize(200,200,true)

//anima de forma usando o ease out, duração em milisegundos
function easeOut(length, onUpdate, onEnd) {
  const start = performance.now();

  function frame(now) {
    // progresso linear
    const t = Math.min((now - start) / length, 1);

    // ease out
    const value = Math.max(1 - (1 - t) ** 3,0)

    onUpdate(value);

    if (t < 1) {
      requestAnimationFrame(frame);
    } else if (onEnd) {
      onEnd();
    }
  }

  requestAnimationFrame(frame);
}


circulo.setSize(0,0,false)
retangulo.setSize(0,0,false)
triangulo.setSize(0,0,false)

//cada canva tem um delay na apresentação
let atual = 0;
function delayAnim(index,type,time) {
    const canva = canvas[index]
    easeOut(time, (value) => {
        switch (type) {
            case "start":
                canva.setSize(canva.baseWidth * value, canva.baseHeight * value)
                canva.onAnim = true;
            break;
        }
    },() => {
        canva.onAnim = false;
        if (atual < 2) {
            switch (type) {
                case "color": canva.click(); break;
            } 
            atual++;
            delayAnim(atual,type,time)
        } else {
            atual = 0;
            if (type === "color") { canva.click(); }
            delayAnim(atual,"color",1000)
        }
    })
}

delayAnim(0,"start",500)