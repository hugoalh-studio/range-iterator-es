# Range Iterator (ES)

[**⚖️** MIT](./LICENSE.md)

[![Deno: range_iterator](https://img.shields.io/badge/dynamic/json?label=range_iterator&labelColor=000000&logo=deno&logoColor=ffffff&style=flat&url=https%3A%2F%2Fapiland.deno.dev%2Fv2%2Fmodules%2Frange_iterator&query=%24.latest_version)](https://deno.land/x/range_iterator)
[![GitHub: hugoalh-studio/range-iterator-es](https://img.shields.io/github/v/release/hugoalh-studio/range-iterator-es?label=hugoalh-studio/range-iterator-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/range-iterator-es")](https://github.com/hugoalh-studio/range-iterator-es)
[![JSR: @hugoalh/range-iterator](https://img.shields.io/jsr/v/@hugoalh/range-iterator?label=JSR%20@hugoalh/range-iterator&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/range-iterator")](https://jsr.io/@hugoalh/range-iterator)
[![NPM: @hugoalh/range-iterator](https://img.shields.io/npm/v/@hugoalh/range-iterator?label=@hugoalh/range-iterator&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/range-iterator")](https://www.npmjs.com/package/@hugoalh/range-iterator)

An ES (JavaScript & TypeScript) module to iterate between range.

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.34.0 / >= v1.41.1 (For JSR Only)
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v16.13.0

## 🔰 Usage

### Via JSR With `node_modules`

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - Bun
      ```sh
      bunx jsr add @hugoalh/range-iterator[@${Tag}]
      ```
    - NPM
      ```sh
      npx jsr add @hugoalh/range-iterator[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/range-iterator[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn dlx jsr add @hugoalh/range-iterator[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/range-iterator";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via JSR With Specifier

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    import ... from "jsr:@hugoalh/range-iterator[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With `node_modules`

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - NPM
      ```sh
      npm install @hugoalh/range-iterator[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm add @hugoalh/range-iterator[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn add @hugoalh/range-iterator[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/range-iterator";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script:
    ```ts
    import ... from "npm:@hugoalh/range-iterator[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via Remote Import

> **🎯 Supported Target**
>
> - Deno

1. Import at the script via:
    - Deno Land
      ```ts
      import ... from "https://deno.land/x/range_iterator[@${Tag}]/mod.ts";
      ```
    - GitHub Raw (Require Tag)
      ```ts
      import ... from "https://raw.githubusercontent.com/hugoalh-studio/range-iterator-es/${Tag}/mod.ts";
      ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.
> - It is recommended to import the module with tag for immutability.

## 🧩 API

- ```ts
  function rangeIterator(start: bigint, end: bigint, options?: RangeIteratorOptions<bigint>): Generator<bigint>;
  function rangeIterator(start: number, end: number, options?: RangeIteratorOptions<number>): Generator<number>;
  function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<string>): Generator<string>;
  function rangeIterator(start: bigint, end: bigint, step: RangeIteratorIndexType<bigint>): Generator<bigint>;
  function rangeIterator(start: number, end: number, step: RangeIteratorIndexType<number>): Generator<number>;
  function rangeIterator(start: string, end: string, step: RangeIteratorIndexType<string>): Generator<string>;
  ```
- ```ts
  interface RangeIteratorOptions<T extends RangeIteratorAcceptType> {
    /**
     * Whether to exclusive end.
     * @default false
     */
    endExclusive?: boolean;
    /**
     * Step of the decrement/increment of the iterate.
     * @default 1n // Big integer.
     * @default 1 // Number/String.
     */
    step?: RangeIteratorIndexType<T>;
  }
  ```
- ```ts
  type RangeIteratorAcceptType = bigint | number | string;
  ```
- ```ts
  type RangeIteratorIndexType<T extends RangeIteratorAcceptType> = T extends bigint ? bigint : number;
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [Deno Land](https://deno.land/x/range_iterator)
> - [JSR](https://jsr.io/@hugoalh/range-iterator)

## ✍️ Example

- ```ts
  Array.from(rangeIterator(1, 9));
  //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```
- ```ts
  Array.from(rangeIterator(1n, 9n, { endExclusive: true }));
  //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]
  ```
- ```ts
  Array.from(rangeIterator(1, 9, { step: 0.5 }));
  //=> [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]
  ```
- ```ts
  Array.from(rangeIterator("a", "z"));
  //=> ["a", "b", "c", ... +20 ..., "x", "y", "z"]
  ```
- ```ts
  Array.from(rangeIterator(9, 1));
  //=> [9, 8, 7, 6, 5, 4, 3, 2, 1]
  ```
- ```ts
  Array.from(rangeIterator(9n, 1n, { endExclusive: true }));
  //=> [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n]
  ```
- ```ts
  Array.from(rangeIterator(9, 1, { step: 0.5 }));
  //=> [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1]
  ```
- ```ts
  Array.from(rangeIterator("z", "a"));
  //=> ["z", "y", "x", ... +20 ..., "c", "b", "a"]
  ```
