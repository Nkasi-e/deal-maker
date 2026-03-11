export const SLIDE_OFFSET = 56;
export const ANIMATION_DURATION = 0.35;

export function getSlideVariants(direction: number) {
  return {
    enter:
      direction === 0
        ? { opacity: 1, x: 0 }
        : { opacity: 0, x: direction >= 0 ? SLIDE_OFFSET : -SLIDE_OFFSET },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction >= 0 ? -SLIDE_OFFSET : SLIDE_OFFSET },
  };
}

export const slideTransition = {
  duration: ANIMATION_DURATION,
  ease: [0.32, 0.72, 0, 1] as const,
};
