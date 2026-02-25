/**
 * Lightweight scroll-triggered animations for Handoff.ai
 * Replaces GSAP with a tiny IntersectionObserver — zero dependencies.
 */

export function initScrollAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -15% 0px" },
  );

  document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
    observer.observe(el);
  });
}
