export default () => {
  // Обработка ошибок DOM
  window.onerror = function(message, source, lineno, colno, error) {
    if (message.includes("HierarchyRequestError") || (error && error.name === "HierarchyRequestError")) {
      let reloadCount = parseInt(sessionStorage.getItem('reloadCount') || '0');
      if (reloadCount < 3) {
        sessionStorage.setItem('reloadCount', reloadCount + 1);
        console.warn('HierarchyRequestError — перезагрузка #' + (reloadCount + 1));
        location.reload();
      } else {
        console.error('Слишком много HierarchyRequestError. Перезагрузка остановлена.');
      }
    }
  };

  // Promise ошибки
  window.addEventListener('unhandledrejection', function(event) {
    const message = event.reason?.message || '';
    if (message.includes("HierarchyRequestError")) {
      let reloadCount = parseInt(sessionStorage.getItem('reloadCount') || '0');
      if (reloadCount < 3) {
        sessionStorage.setItem('reloadCount', reloadCount + 1);
        console.warn('HierarchyRequestError (Promise) — перезагрузка #' + (reloadCount + 1));
        location.reload();
      }
    }
  });

  // Сброс счётчика при успешной загрузке
  window.addEventListener('load', () => {
    sessionStorage.removeItem('reloadCount');
  });
};