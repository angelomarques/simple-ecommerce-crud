import { useCreateProductMutation } from "@/service/products/mutations";
import { useQueryClient } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { CreateProduct } from ".";

jest.mock("@/service/products/mutations");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("CreateProduct", () => {
  const mockPush = jest.fn();
  const mockInvalidateQueries = jest.fn();
  const mockCreateProduct = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
    (useCreateProductMutation as jest.Mock).mockReturnValue({
      mutate: mockCreateProduct,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields", () => {
    render(<CreateProduct />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<CreateProduct />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalledWith({
        title: "Test Product",
        description: "Test Description",
        price: 10,
      });
    });
  });

  it("it successfully submits the form", async () => {
    render(<CreateProduct />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalled();
      expect(mockCreateProduct).toHaveBeenCalledWith({
        title: "Test Product",
        description: "Test Description",
        price: 10,
      });
    });
  });
});
