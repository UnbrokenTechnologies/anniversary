import confetti from 'canvas-confetti';

/**
 * Romantic Confetti & Fireworks Engine
 * Triggers bursts of gold, rose, champagne, and heart shapes
 */

export const triggerRomanticFinale = () => {
  const duration = 6 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 35,
    spread: 360,
    ticks: 120,
    zIndex: 9999,
  };

  const romanticColors = ['#d4af37', '#f6e6b4', '#ea638c', '#e27396', '#ffffff', '#ffccd5'];

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.1, y: 0.7 },
      colors: romanticColors,
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Right cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.9, y: 0.7 },
      colors: romanticColors,
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Center starburst
    if (Math.random() > 0.4) {
      confetti({
        particleCount: 30,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.8 },
        colors: ['#d4af37', '#ea638c', '#ffffff'],
        scalar: 1.4,
        drift: 0,
      });
    }
  }, 350);
};

export const triggerHeartBurst = (x: number = 0.5, y: number = 0.5) => {
  confetti({
    particleCount: 40,
    spread: 80,
    origin: { x, y },
    colors: ['#ea638c', '#d4af37', '#ffffff', '#ff9ebb'],
    ticks: 100,
    gravity: 0.8,
    scalar: 1.3,
    startVelocity: 25,
  });
};
