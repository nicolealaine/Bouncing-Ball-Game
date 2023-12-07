document.addEventListener("DOMContentLoaded", function (event) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const numCountDiv = document.querySelector(".num-count");
  const gameOver = document.querySelector(".game-over");
  const restart = document.querySelector(".restart");
  const exclamation = document.querySelector(".exclamation");
  let count = 0;
  let x = canvas.width / 2;
  let y = canvas.height - 10;
  let dx = 2;
  let ballRadius = 10;
  let dy = -2;
  let ballColor = ballColorChange();
  const paddleHeight = 10;
  const paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;
  let rightPressed = false;
  let leftPressed = false;

  function drawBall(color) {
    ctx.beginPath();
    ctx.arc(x, y - 50, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(
      paddleX,
      canvas.height - paddleHeight - 30,
      paddleWidth,
      paddleHeight
    );
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall(ballColor);
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
      ballColor = ballColorChange();
    }
    if (y - 50 < ballRadius) {
      dy = -dy;
      ballColor = ballColorChange();
    } else if (y - 15 > canvas.height - ballRadius) {
      if (x >= paddleX - 15 && x <= paddleX + paddleWidth + 15 && y === 326) {
        dy = -dy;
        count++;
        if (count > 5) {
          exclamation.style.color = "white";
        }
        dy -= 0.5;
        dx -= 0.5;
      } else {
        if (y + dy > canvas.height - ballRadius + 80) {
          gameOver.style.display = "block";
        }
      }
    }
    if (rightPressed) {
      paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
      paddleX = Math.max(paddleX - 7, 0);
    }
    x += dx;
    y += dy;
    numCountDiv.innerHTML = count;
  }

  function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    } else if (
      e.key === "Enter" ||
      e.key === "Return" ||
      e.key === " " ||
      e.key === "Space"
    ) {
      restartHandler();
    }
  }
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

  function restartHandler() {
    document.location.reload();
    clearInterval(interval);
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  restart.addEventListener("click", restartHandler);

  const interval = setInterval(draw, 10);

  function ballColorChange() {
    var colorArray = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ];

    function randomNumber() {
      return Math.floor(Math.random() * 50);
    }
    return colorArray[randomNumber()];
  }
});
