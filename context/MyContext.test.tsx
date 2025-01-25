import { fireEvent, render, screen } from '@testing-library/react';
import { CounterProvider } from './MyContext';
import Home from '@/app/page';

describe("MyContextTest", () => {
  it("初期値が正しいことを確認", () => {
    render(
      <CounterProvider>
        <Home/>
      </CounterProvider>
    );

    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  it("ボタンで値が増減されることを確認", () => {
    render(
      <CounterProvider>
        <Home/>
      </CounterProvider>
    );

    const incrementButton = screen.getByText(/Increment/i);
    fireEvent.click(incrementButton);

    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

    const decrementButton = screen.getByText(/Decrement/i);
    fireEvent.click(decrementButton);

    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });
});