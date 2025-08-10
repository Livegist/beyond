const tg = window.Telegram.WebApp;

document.getElementById("exit-btn").addEventListener("click", () => {
  tg.close(); // Closes the mini app in Telegram
});
