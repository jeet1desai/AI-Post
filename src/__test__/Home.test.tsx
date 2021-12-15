import { queryByAttribute, render, waitFor, act } from "@testing-library/react";
import service from "../services/post.service";
import Home from "../pages/Home";

test("renders posts table data", async () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<Home />);
  const table = getById(dom.container, "detail-table");
  expect(table).toBeDefined();
});

test("input elements are rendered properly", async () => {
  const { getByTestId } = render(<Home />);
  const inputElement = getByTestId("search");
  expect(inputElement).toBeInTheDocument();
});

test("should be called api once only on component render", async () => {
  const mockApiFunction = jest.spyOn(service, "getPostsData");
  await act(async () => {
    render(<Home />);
    await waitFor(async () => {
      expect(mockApiFunction).toHaveBeenCalledTimes(1);
    });
  });
});
