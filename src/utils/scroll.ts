export function scrollToResult() {
  setTimeout(() => {
    const el = document.getElementById('calc-result');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}
