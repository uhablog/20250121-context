'use client';

import CounterContext from "@/context/MyContext";
import { useContext } from "react";

export default function Home() {

  const { count, increment, decrement } = useContext(CounterContext);
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}
