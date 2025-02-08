import { useUpdateProductMutation } from "@/service/products/mutations";
import { useProductsById } from "@/service/products/queries";
import { useQueryClient } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import { UpdateProduct } from ".";

jest.mock("@/service/products/mutations");
jest.mock("@/service/products/queries");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("UpdateProduct", () => {
  const mockPush = jest.fn();
  const mockInvalidateQueries = jest.fn();
  const mockUpdateProduct = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
    (useProductsById as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        id: 1,
        title: "Test Product",
        description: "Test Description",
      },
    });
    (useUpdateProductMutation as jest.Mock).mockReturnValue({
      mutate: mockUpdateProduct,
      isPending: false,
    });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields", () => {
    render(<UpdateProduct />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<UpdateProduct />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith({
        title: "Test Product",
        description: "Test Description",
        price: 10,
      });
    });
  });
});
