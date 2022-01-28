export const timeout = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/"
    }, 4000);
});