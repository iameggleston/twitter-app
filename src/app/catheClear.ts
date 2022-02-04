export const catheClear = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/"
    }, 600000);
    // 10分間キャッシュを維持
});