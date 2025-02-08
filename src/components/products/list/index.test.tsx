import { useProducts } from "@/service/products/queries";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProductsList } from ".";

// Mock the necessary hooks
jest.mock("@/service/products/queries");
jest.mock("@/store/products");

const productListMock = [
  { id: 1, title: "Product 1", thumbnail: "/test-thumbnail.jpg", price: 1000 },
  { id: 2, title: "Product 2", thumbnail: "/test-thumbnail.jpg", price: 9.99 },
];

describe("ProductsList", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
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

  // it("calls fetchNextPage when last product is in view", () => {
  //   const fetchNextPage = jest.fn();
  //   (useProducts as jest.Mock).mockReturnValue({
  //     data: {
  //       pages: [
  //         {
  //           products: productListMock,
  //         },
  //       ],
  //     },
  //     isFetchingNextPage: false,
  //     hasNextPage: true,
  //     fetchNextPage,
  //     isFetching: false,
  //     isLoading: false,
  //   });

  //   render(<ProductsList />);

  //   // Simulate intersection observer callback
  //   const lastProduct = screen.getByText("Product 2");
  //   fireEvent.scroll(lastProduct);

  //   expect(fetchNextPage).toHaveBeenCalled();
  // });
});
