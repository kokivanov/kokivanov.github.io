window.addEventListener("load", () => {
  const rectangleButton = document.getElementById("rectangle-button");
  const elipseButton = document.getElementById("elipse-button");
  const lineButton = document.getElementById("line-button");
  const textButton = document.getElementById("text-button");
  const triangleButton = document.getElementById("triangle-button");
  const imageButton = document.getElementById("image-button");

  const canvas = document.getElementById("area");
  const ctx = canvas.getContext("2d");

  const imgInput = document.getElementById("img-input");
  const textInput = document.getElementById("text-input");

  rectangleButton.addEventListener("click", () => drawRect());
  elipseButton.addEventListener("click", () => drawElipse());
  lineButton.addEventListener("click", () => drawLine());
  triangleButton.addEventListener("click", () => drawTriangle());
  textButton.addEventListener("click", () => drawText());
  imageButton.addEventListener("click", () => drawImage());

  function drawElipse() {
    const color1 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;
    const color2 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;

    const x = Math.ceil(Math.random() * canvas.clientWidth);
    const y = Math.ceil(Math.random() * canvas.clientHeight);
    const xr = Math.ceil(Math.random() * 300);
    const yr = Math.ceil(Math.random() * 300);
    const angle = Math.ceil(Math.random() * Math.PI);

    ctx.fillStyle = color1;
    ctx.strokeStyle = color2;

    console.log({ color1, color2, x, y, xr, yr, angle });

    ctx.beginPath();
    ctx.ellipse(x, y, xr, yr, angle, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawRect() {
    const color1 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;
    const color2 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;

    const x = Math.ceil(Math.random() * canvas.clientWidth);
    const y = Math.ceil(Math.random() * canvas.clientHeight);
    const h = Math.ceil(Math.random() * 300);
    const w = Math.ceil(Math.random() * 300);

    ctx.fillStyle = color1;
    ctx.strokeStyle = color2;
    ctx.fillRect(x, y, h, w);
    ctx.strokeRect(x, y, h, w);
  }

  function drawLine() {
    const color1 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;

    const x1 = Math.ceil(Math.random() * canvas.clientWidth);
    const y1 = Math.ceil(Math.random() * canvas.clientHeight);
    const x2 = Math.ceil(Math.random() * canvas.clientWidth);
    const y2 = Math.ceil(Math.random() * canvas.clientHeight);

    ctx.strokeStyle = color1;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawTriangle() {
    const color1 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;
    const color2 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;

    const x1 = Math.ceil(Math.random() * canvas.clientWidth);
    const y1 = Math.ceil(Math.random() * canvas.clientHeight);
    const x2 = Math.ceil(Math.random() * canvas.clientWidth);
    const y2 = Math.ceil(Math.random() * canvas.clientHeight);
    const x3 = Math.ceil(Math.random() * canvas.clientWidth);
    const y3 = Math.ceil(Math.random() * canvas.clientHeight);

    ctx.fillStyle = color1;
    ctx.strokeStyle = color2;

    const path = new Path2D();
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    path.lineTo(x3, y3);
    path.closePath();
    ctx.stroke(path);
    ctx.fill(path);
  }

  function drawText() {
    const color1 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;
    const color2 = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)})`;

    const x = Math.ceil(Math.random() * canvas.clientWidth);
    const y = Math.ceil(Math.random() * canvas.clientHeight);
    const text = textInput.value;

    ctx.fillStyle = color1;
    ctx.strokeStyle = color2;

    ctx.font = `${Math.ceil(Math.random() * 140)}px serif`;
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
  }

  function drawImage() {
    const img = new Image()
    const [imgSrc] = imgInput.files
    if (imgSrc) {
        img.src = URL.createObjectURL(imgSrc)
    } else {
        alert("No image selected.")
        return
    }

    img.addEventListener("load", () => {
        const x = Math.ceil(Math.random() * canvas.clientWidth);
        const y = Math.ceil(Math.random() * canvas.clientHeight);
        const scaleFactor = Math.random()
        const height = Math.ceil(img.height * scaleFactor)
        const width = Math.ceil(img.width * scaleFactor)

        ctx.drawImage(img, x, y, width, height)
    })

  }
});
