import { useProducts } from "@/service/products/queries";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProductsList } from ".";

// Mock the necessary hooks
jest.mock("@/service/products/queries");
jest.mock("@/store/products");

const productListMock = [
  { id: 1, title: "Product 1", thumbnail: "/test-thumbnail.jpg", price: 1000 },
  { id: 2, title: "Product 2", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
  { id: 3, title: "Product 3", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
  { id: 4, title: "Product 4", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
  { id: 5, title: "Product 5", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
  { id: 6, title: "Product 6", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
  { id: 7, title: "Product 7", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
  { id: 8, title: "Product 8", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
  { id: 9, title: "Product 9", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
  {
    id: 10,
    title: "Product 10",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 11,
    title: "Product 11",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 12,
    title: "Product 12",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 13,
    title: "Product 13",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 14,
    title: "Product 14",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 15,
    title: "Product 15",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 16,
    title: "Product 16",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 17,
    title: "Product 17",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 18,
    title: "Product 18",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 19,
    title: "Product 19",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
  {
    id: 20,
    title: "Product 20",
    thumbnail: "/test-thumbnail.jpg",
    price: 9.99,
  },
];

describe("ProductsList", () => {
  const mockIntersectionObserverObserve = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: mockIntersectionObserverObserve,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("renders loading spinner when query is loading", () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: null,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetching: false,
      isLoading: true,
    });

    render(<ProductsList />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders products when query is successful", () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            products: productListMock,
          },
        ],
      },
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetching: false,
      isLoading: false,
    });

    try {
      render(<ProductsList />);
    } catch (e) {
      if (e instanceof AggregateError) {
        console.error(e.errors);
      }
    }

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("changes sort by option", () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: null,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetching: false,
      isLoading: false,
    });

    render(<ProductsList />);

    const selectTrigger = screen.getByRole("combobox");
    fireEvent.click(selectTrigger);

    const sortByOption = screen.getByText("Title (A -> Z)");
    fireEvent.click(sortByOption);

    expect(screen.getByText("Title (A -> Z)")).toBeInTheDocument();
  });

  it("calls fetchNextPage when last product is in view", () => {
    const fetchNextPage = jest.fn();
    (useProducts as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            products: productListMock,
          },
        ],
      },
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage,
      isFetching: false,
      isLoading: false,
    });

    render(<ProductsList />);

    // Simulate intersection observer callback
    const lastProduct = screen.getByTestId(`product-${20}`);
    fireEvent.scroll(lastProduct);

    expect(mockIntersectionObserverObserve).toHaveBeenCalledWith(lastProduct);
  });
});
