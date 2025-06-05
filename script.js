let tempo = 25 * 60;
let intervalo = null;

function formatar(segundos) {
  const m = String(Math.floor(segundos / 60)).padStart(2, '0');
  const s = String(segundos % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function atualizarTela() {
  document.getElementById('timer').textContent = formatar(tempo);
}

function startPomodoro() {
  if (intervalo) return;
  intervalo = setInterval(() => {
    tempo--;
    atualizarTela();
    if (tempo <= 0) {
      clearInterval(intervalo);
      intervalo = null;
      notificar("Pomodoro finalizado! Hora de descansar.");
      tempo = 5 * 60;
      atualizarTela();
    }
  }, 1000);
}

function resetPomodoro() {
  clearInterval(intervalo);
  intervalo = null;
  tempo = 25 * 60;
  atualizarTela();
}

function notificar(msg) {
  if (Notification.permission === "granted") {
    new Notification(msg);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permissao => {
      if (permissao === "granted") {
        new Notification(msg);
      }
    });
  }
}

atualizarTela();