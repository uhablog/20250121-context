import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./page";

describe('Home', () => {
  it('render home', () => {
    render(<Home/>);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    const incrementButton = screen.getByText(/Increment/i);
    fireEvent.click(incrementButton);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});