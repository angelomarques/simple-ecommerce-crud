import { useRef, useState } from "react";

const CART_ANIMATION_DURATION_MS = 1500;

export function useAddToCartAnimation() {
  const elementToAnimateRef = useRef<HTMLDivElement>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  function animate() {
    if (!elementToAnimateRef.current || !document) return;

    const cartLinkButton = document.querySelector(
      "header #cart-link"
    ) as HTMLButtonElement;

    if (!cartLinkButton) return;

    const cartLinkButtonRect = cartLinkButton.getBoundingClientRect();
    const cartLinkButtonCenterPositionX = cartLinkButtonRect.left;
    const cartLinkButtonCenterPositionY = cartLinkButtonRect.top;

    const elementToAnimateRect =
      elementToAnimateRef.current.getBoundingClientRect();
    const elementToAnimatePositionX =
      elementToAnimateRect.left + elementToAnimateRect.width / 2;
    const elementToAnimatePositionY =
      elementToAnimateRect.top + elementToAnimateRect.height / 2;

    const translateX =
      cartLinkButtonCenterPositionX - elementToAnimatePositionX;
    const translateY =
      cartLinkButtonCenterPositionY - elementToAnimatePositionY;

    elementToAnimateRef.current.style.setProperty("--pos-x", `${translateX}px`);
    elementToAnimateRef.current.style.setProperty("--pos-y", `${translateY}px`);

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, CART_ANIMATION_DURATION_MS + 200);
  }

  return {
    elementToAnimate: elementToAnimateRef,
    animate,
    isAnimating,
  };
}
