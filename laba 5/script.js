    const counter = document.getElementById("counter");
    const plusBtn = document.getElementById("plus");
    const minusBtn = document.getElementById("minus");
    const resetBtn = document.getElementById("reset");

    let minutes = 0;
    let seconds = 0;

    function updateCounter() {
      counter.textContent = 
        String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }

    plusBtn.addEventListener("click", () => {
      document.body.style.backgroundColor = "lightgreen";
      counter.style.color = "lightcoral"; // светло-красные цифры
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      updateCounter();
    });

    minusBtn.addEventListener("click", () => {
      document.body.style.backgroundColor = "lightcoral";
      counter.style.color = "lightgreen"; // светло-зелёные цифры
      if (seconds > 0 || minutes > 0) {
        seconds--;
        if (seconds < 0 && minutes > 0) {
          seconds = 59;
          minutes--;
        }
      }
      updateCounter();
    });

    resetBtn.addEventListener("click", () => {
      minutes = 0;
      seconds = 0;
      document.body.style.backgroundColor = "gray";
      counter.style.color = "black";
      updateCounter();
    });

    updateCounter(); // начальное отображение