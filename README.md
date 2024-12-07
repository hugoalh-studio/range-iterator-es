# Range Iterator (ES)

[**⚖️** MIT](./LICENSE.md)

[![Deno Land: range_iterator](https://img.shields.io/badge/dynamic/json?label=range_iterator&labelColor=000000&logo=deno&logoColor=ffffff&style=flat&url=https%3A%2F%2Fapiland.deno.dev%2Fv2%2Fmodules%2Frange_iterator&query=%24.latest_version "Deno Land: range_iterator")](https://deno.land/x/range_iterator)
[![GitHub: hugoalh/range-iterator-es](https://img.shields.io/github/v/release/hugoalh/range-iterator-es?label=hugoalh/range-iterator-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/range-iterator-es")](https://github.com/hugoalh/range-iterator-es)
[![JSR: @hugoalh/range-iterator](https://img.shields.io/jsr/v/@hugoalh/range-iterator?label=@hugoalh/range-iterator&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/range-iterator")](https://jsr.io/@hugoalh/range-iterator)
[![NPM: @hugoalh/range-iterator](https://img.shields.io/npm/v/@hugoalh/range-iterator?label=@hugoalh/range-iterator&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/range-iterator")](https://www.npmjs.com/package/@hugoalh/range-iterator)

An ES (JavaScript & TypeScript) module to iterate between range.

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.42.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - Deno Land:**
  ```
  https://deno.land/x/range_iterator[@{Tag}]/mod.ts
  ```
- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/range-iterator-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/range-iterator[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/range-iterator[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  function rangeIterator(start: bigint, end: bigint, options?: RangeIteratorOptions<bigint>): Generator<bigint>;
  function rangeIterator(start: bigint, end: bigint, step: bigint): Generator<bigint>;
  function rangeIterator(start: number, end: number, options?: RangeIteratorOptions<number>): Generator<number>;
  function rangeIterator(start: number, end: number, step: number): Generator<number>;
  function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<number>): Generator<string>;
  function rangeIterator(start: string, end: string, step: number): Generator<string>;
  ```
- ```ts
  interface RangeIteratorOptions<T extends bigint | number> {
    endExclusive?: boolean;
    startExclusive?: boolean;
    step?: T;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [Deno Land](https://deno.land/x/range_iterator)
>   - [JSR](https://jsr.io/@hugoalh/range-iterator)

## ✍️ Examples

- Iterate numbers from 1 to 9
  ```ts
  Array.from(rangeIterator(1, 9));
  //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```
- Iterate big integers from 1 to 9 with exclusive end
  ```ts
  Array.from(rangeIterator(1n, 9n, { endExclusive: true }));
  //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]
  ```
- Iterate numbers from 1 to 9 with increment by 0.5 steps
  ```ts
  Array.from(rangeIterator(1, 9, { step: 0.5 }));
  //=> [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]
  ```
- Iterate characters from "a" to "z"
  ```ts
  Array.from(rangeIterator("a", "z"));
  //=> ["a", "b", "c", ... +20 ..., "x", "y", "z"]
  ```
- Iterate numbers from 9 to 1
  ```ts
  Array.from(rangeIterator(9, 1));
  //=> [9, 8, 7, 6, 5, 4, 3, 2, 1]
  ```
- Iterate big integers from 9 to 1 with exclusive end
  ```ts
  Array.from(rangeIterator(9n, 1n, { endExclusive: true }));
  //=> [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n]
  ```
- Iterate numbers from 9 to 1 with decrement by 0.5 steps
  ```ts
  Array.from(rangeIterator(9, 1, { step: 0.5 }));
  //=> [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1]
  ```
- Iterate characters from "z" to "a"
  ```ts
  Array.from(rangeIterator("z", "a"));
  //=> ["z", "y", "x", ... +20 ..., "c", "b", "a"]
  ```
