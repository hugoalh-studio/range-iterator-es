# Range Iterator (Deno)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/range-iterator-deno?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/range-iterator-deno)

|  | **Heat** | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/range-iterator-deno) | [![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/range-iterator-deno?label=&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/range-iterator-deno/stargazers) \| ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/range-iterator-deno/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/range-iterator-deno?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/range-iterator-deno?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/range-iterator-deno?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/range-iterator-deno?label=&style=flat-square "GitHub Latest Pre-Release Date")) |

A Deno module to iterate between range.

> **🔗 Other Edition:**
>
> - [NodeJS](https://github.com/hugoalh-studio/range-iterator-nodejs)

## 📓 Documentation

### Getting Started

- Deno >= v1.34.0

```ts
/* Either */
import { ... } from "<URL>";// Named Import
import * as rangeIterator from "<URL>";// Namespace Import
import rangeIterator from "<URL>";// Default Import (Function `rangeIterator`)
```

| **Domain / Registry** | **URL** |
|:-:|:--|
| [Deno Land](https://deno.land/x/range_iterator) | `https://deno.land/x/range_iterator[@<Tag>]/mod.ts` |
| DenoPKG | `https://denopkg.com/hugoalh-studio/range-iterator-deno[@<Tag>]/mod.ts` |
| GitHub Raw **\*** | `https://raw.githubusercontent.com/hugoalh-studio/range-iterator-deno/<Tag>/mod.ts` |
| Pax | `https://pax.deno.dev/hugoalh-studio/range-iterator-deno[@<Tag>]/mod.ts` |

**\*:** Must provide a tag.

### API

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

### Example

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
