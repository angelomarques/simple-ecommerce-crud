import { useRef } from "react";

export function useAddToCartAnimation() {
  const elementToAnimateRef = useRef<HTMLDivElement>(null);

  function animate() {
    if (!elementToAnimateRef.current || !document) return;

    const cartLinkButton = document.querySelector(
      "header #cart-link"
    ) as HTMLButtonElement;

    if (!cartLinkButton) return;

    const cartLinkButtonRect = cartLinkButton.getBoundingClientRect();
    const cartLinkButtonPositionX =
      cartLinkButtonRect.left + cartLinkButtonRect.width / 2;
    const cartLinkButtonPositionY =
      cartLinkButtonRect.top + cartLinkButtonRect.height / 2;

    const elementToAnimateRect =
      elementToAnimateRef.current.getBoundingClientRect();
    const elementToAnimatePositionX =
      elementToAnimateRect.left + elementToAnimateRect.width / 2;
    const elementToAnimatePositionY =
      elementToAnimateRect.top + elementToAnimateRect.height / 2;

    const translateX = cartLinkButtonPositionX - elementToAnimatePositionX;
    const translateY = cartLinkButtonPositionY - elementToAnimatePositionY;

    elementToAnimateRef.current.style.setProperty("--pos-x", `${translateX}px`);
    elementToAnimateRef.current.style.setProperty("--pos-y", `${translateY}px`);

    elementToAnimateRef.current.classList.add(
      "animate-add-to-cart",
      "fill-mode-forwards"
    );
  }

  return {
    elementToAnimate: elementToAnimateRef,
    animate,
  };
}
