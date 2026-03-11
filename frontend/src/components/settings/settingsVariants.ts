export const TAB_CONTENT_VARIANTS = {
  enter: { opacity: 0, x: 6 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -6 },
};

export const STAGGER_VARIANTS = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
};

export const ITEM_VARIANT = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } };
