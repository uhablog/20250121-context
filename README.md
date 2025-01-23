# useContextについて学んだ

コンテキストを使うメリット

- propsなどを使って、深い階層に値を渡すようなことがなくなる

## Contextの作り方

- `createContext`を使って、コンテキストを宣言
  - 初期値の設定やコンテキストの型を指定することも可能
  - 初期値はProviderで値を提供しない場合に適応される
- コンテキストにはオブジェクトや状態と状態を変更する関数を持たせることが可能

```typescript
'use client';
import { createContext, ReactNode, useState } from "react";

/**
 * コンテキストで扱う型の指定
 * 状態(count)と状態を変更する関数(increment, decrement)を持たせることができる
 */
type CounterContextType = {
  count: number;
  increment: () => void;
  decrement: () => void;
}

/**
 * createContextでコンテキストの宣言
 * コンテキストに対する型の指定と初期値の設定を行っている
 * 初期値はProviderで値を提供しない場合に利用される
 * Providerについては後述
 */
const CounterContext = createContext<CounterContextType>({
  count: 0,
  increment: () => {},
  decrement: () => {}
});

export default CounterContext;
```

## Provider

- ProviderはContextに値を提供する役割
- valueプロパティに状態や関数を渡す

```typescript
'use client';
import { createContext, ReactNode, useState } from "react";

type CounterContextType = {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const CounterContext = createContext<CounterContextType>({
  count: 0,
  increment: () => {},
  decrement: () => {}
});

/**
 * プロバイダーの作成
 * コンテキストに持たせる状態と関数を宣言
 * valueプロパティで宣言した状態と関数を設定してreturn
 */
export const CounterProvider = ({ children }: { children: ReactNode }) => {

  // 状態の宣言
  const [ count, setCount ] = useState(0);

  // 関数の宣言
  const increment = () => setCount((prev) => prev + 1);

  // 関数の宣言
  const decrement = () => setCount((prev) => prev - 1);

  return (
    // valueプロパティで状態と関数を設定
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterContext;
```

## コンテキストの利用

作成したコンテキストは、プロバイダーの中で利用することができる。

1. layout.tsxなどで、プロバイダーをアプリケーション全体に適応する

```typescript
import { CounterProvider } from "@/context/MyContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        // プロバイダーで囲まれているコンポーネントの中で利用することができる
        <CounterProvider>
          {children}
        </CounterProvider>
      </body>
    </html>
  );
}
```

2. コンテキストを使って、状態・関数を利用する

```typescript
'use client';

import CounterContext from "@/context/MyContext";
import { useContext } from "react";

export default function Home() {

  // useContextを使って、作成したコンテキストを利用する
  const { count, increment, decrement } = useContext(CounterContext);

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}
```
