/**
 * GSAP animation utilities for Handoff.ai
 * Import and use in Astro <script> blocks or React islands.
 */

export function initScrollAnimations(): void {
  // Lazy-load GSAP + ScrollTrigger only when needed
  Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      // Fade-in-up for elements with data-animate="fade-up"
      gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      // Stagger children for elements with data-animate="stagger"
      gsap.utils.toArray<HTMLElement>("[data-animate='stagger']").forEach((el) => {
        gsap.from(el.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    }
  );
}
