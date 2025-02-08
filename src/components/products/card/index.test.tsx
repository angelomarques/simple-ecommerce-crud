import { useAddToCartAnimation } from "@/hooks/use-add-to-cart-animation";
import { formatPrice } from "@/lib/utils";
import { useDeleteProductMutation } from "@/service/products/mutations";
import { ProductType } from "@/service/products/types";
import { useUserStore } from "@/store/user";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProductCard } from ".";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock("@/service/products/mutations");
jest.mock("@/store/user", () => ({
  useUserStore: jest.fn(),
}));
jest.mock("@/hooks/use-add-to-cart-animation");
const useUserStoreMock = jest.mocked(useUserStore);

const mockProduct: Partial<ProductType> = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  thumbnail: "/test-thumbnail.jpg",
  price: 1000,
};

describe("ProductCard", () => {
  const mockDeleteProduct = jest.fn();

  beforeEach(() => {
    useUserStoreMock.mockReturnValue("admin");

    (useAddToCartAnimation as jest.Mock).mockReturnValue({
      elementToAnimate: { current: null },
      elementClasses: "",
      animate: jest.fn(),
    });

    (useDeleteProductMutation as jest.Mock).mockReturnValue({
      mutate: mockDeleteProduct,
      isPending: false,
    });
  });

  it("renders product details correctly", () => {
    render(<ProductCard ref={() => {}} product={mockProduct as ProductType} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText(formatPrice(1000))).toBeInTheDocument();
  });

  it("shows the delete button", () => {
    render(<ProductCard ref={() => {}} product={mockProduct as ProductType} />);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("successfully deletes a product", async () => {
    render(<ProductCard ref={() => {}} product={mockProduct as ProductType} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(mockDeleteProduct).toHaveBeenCalled();
  });
});
