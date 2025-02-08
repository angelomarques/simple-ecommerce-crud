import { useAddToCartAnimation } from "@/hooks/use-add-to-cart-animation";
import { formatPrice } from "@/lib/utils";
import { ProductType } from "@/service/products/types";
import { useUserStore } from "@/store/user";
import { render, screen } from "@testing-library/react";
import { ProductCard } from ".";

jest.mock("@/store/user");
jest.mock("@/hooks/use-add-to-cart-animation");

const mockProduct: Partial<ProductType> = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  thumbnail: "/test-thumbnail.jpg",
  price: 1000,
};

describe("ProductCard", () => {
  beforeEach(() => {
    // (useUserStore as jest.Mock).mockReturnValue({ view: "customer" });
    (useAddToCartAnimation as jest.Mock).mockReturnValue({
      elementToAnimate: { current: null },
      elementClasses: "",
      animate: jest.fn(),
    });
  });

  it("renders product details correctly", () => {
    render(<ProductCard ref={() => {}} product={mockProduct as ProductType} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText(formatPrice(1000))).toBeInTheDocument();
  });
});
