# Range Iterator (Deno)

[⚖️ MIT](./LICENSE.md)

|  | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/range-iterator-deno) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/range-iterator-deno?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/range-iterator-deno?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/range-iterator-deno?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/range-iterator-deno?label=&style=flat-square "GitHub Latest Pre-Release Date")) |

A Deno module to iterate between range.

## 🔰 Begin

### Deno

- **Target Version:** >= v1.34.0
- **Require Permission:** *N/A*
- **Registry:**
  - [Deno Land](https://deno.land/x/range_iterator)
    ```ts
    import ... from "https://deno.land/x/range_iterator[@<Tag>]/mod.ts";
    ```
  - DenoPKG
    ```ts
    import ... from "https://denopkg.com/hugoalh-studio/range-iterator-deno[@<Tag>]/mod.ts";
    ```
  - GitHub Raw *\[Require Tag\]*
    ```ts
    import ... from "https://raw.githubusercontent.com/hugoalh-studio/range-iterator-deno/<Tag>/mod.ts";
    ```
  - Pax
    ```ts
    import ... from "https://pax.deno.dev/hugoalh-studio/range-iterator-deno[@<Tag>]/mod.ts";
    ```

> **ℹ️ Notice:** Although it is recommended to import main module with path `mod.ts` in general, it is also able to import part of the module with sub path if available, but do not import if:
>
> - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
> - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
> - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
> These elements are not considered part of the public API, thus no stability is guaranteed for them.

## 🧩 API

- ```ts
  function rangeIterator(start: bigint, end: bigint, step?: RangeIteratorOptions<bigint>["step"]): Generator<bigint, void, unknown>;
  function rangeIterator(start: number, end: number, step?: RangeIteratorOptions<number>["step"]): Generator<number, void, unknown>;
  function rangeIterator(start: string, end: string, step?: RangeIteratorOptions<string>["step"]): Generator<string, void, unknown>;
  function rangeIterator(start: bigint, end: bigint, options?: RangeIteratorOptions<bigint>): Generator<bigint, void, unknown>;
  function rangeIterator(start: number, end: number, options?: RangeIteratorOptions<number>): Generator<number, void, unknown>;
  function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<string>): Generator<string, void, unknown>;
  ```
- ```ts
  interface RangeIteratorOptions<T> {
    /**
    * Whether to exclusive end.
    * @default false
    */
    endExclusive?: boolean;
    /**
    * Step of decrement/increment.
    * @default 1n // Big integer.
    * @default 1 // Number/String.
    */
    step?: T extends bigint ? bigint : number;
  }
  ```

> **ℹ️ Notice:** Documentation is included inside the script file, can view it via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [Deno Doc Land](https://doc.deno.land)

## ✍️ Example

- ```ts
  import { rangeIterator } from "https://raw.githubusercontent.com/hugoalh-studio/range-iterator-deno/main/mod.ts";

  Array.from(rangeIterator(1, 9));
  //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]

  Array.from(rangeIterator(1n, 9n, { endExclusive: true }));
  //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]

  Array.from(rangeIterator(1, 9, { step: 0.5 }));
  //=> [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]

  Array.from(rangeIterator("a", "z"));
  //=> ["a", "b", "c", ... +20 ..., "x", "y", "z"]

  Array.from(rangeIterator(9, 1));
  //=> [9, 8, 7, 6, 5, 4, 3, 2, 1]

  Array.from(rangeIterator(9n, 1n, { endExclusive: true }));
  //=> [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n]

  Array.from(rangeIterator(9, 1, { step: 0.5 }));
  //=> [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1]

  Array.from(rangeIterator("z", "a"));
  //=> ["z", "y", "x", ... +20 ..., "c", "b", "a"]
  ```

## 🔗 Other Edition

- [NodeJS](https://github.com/hugoalh-studio/range-iterator-nodejs)
