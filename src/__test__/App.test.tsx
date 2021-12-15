import { render, screen } from '@testing-library/react';
import App from '../App';
import renderer from "react-test-renderer";

beforeEach(() => {
  render(<App />);
});

test('renders learn react link', () => {
  const headerEl = screen.getByText(/POST/);
  expect(headerEl).toBeInTheDocument();
});


test('should match the snapshot', () => {
  const domTree = renderer.create(<App />).toJSON();
  expect(domTree).toMatchSnapshot();
});
