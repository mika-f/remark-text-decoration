# @natsuneko-laboratory/remark-text-decoration

[remark-text-decoration](https://www.npmjs.com/package/@natsuneko-laboratory/remark-text-decoration) is a remark plugin to add text decoration syntax.

## Installation

```bash
$ yarn add @natsuneko-laboratory/remark-text-decoration
```

## Usage

Add `@natsuneko-laboratory/remark-text-decoration` to your remark plugins.

```typescript
import remark from "remark";
import RemarkTextDecoration from "@natsuneko-laboratory/remark-text-decoration";

const result = await remark()
  .use(RemarkTextDecoration, {
    marker: "==",
    markerWithOptions: "=",
    markerClassName: undefined,
    markerTag: "mark",
    markerProperties: (options) => {
      return {
        color: options ? `#${options}` : "yellow",
      };
    },
  })
  .process("==Hello==, =cccccc=World==");

// result is
// <mark style="color:yellow">Hello</mark>, <mark style="color:#cccccc">World</mark>
```

## Options

All options are described as follows:

```typescript
type TextDecorationOptions = {
  marker?: string;
  markerWithOptions?: string;
  markedAcceptedOptionsPattern?: string;
  markerTag?: string;
  markerClassNames?:
    | ((options: string) => string | undefined)
    | string
    | undefined;
  markerProperties?:
    | ((options: string) => Record<string, string> | undefined)
    | Record<string, string>
    | undefined;
};
```

### `marker`

A marker to decorate text.

### `markerWithOptions`

A marker to decorate text with options. If you want to decorate text with options, you should use this marker.  
For example, if you want to decorate text with arguments, you can use this marker like `={some args here}=Hello`.

### `markedAcceptedOptionsPattern`

A pattern to accept options. If you want to accept options, you should use this option.  
For example, if you want to accept options like `={some args here}=Hello`, you can use this option like `markedAcceptedOptionsPattern: "some args here"`.  
This value is used as `new RegExp(markedAcceptedOptionsPattern, "g")`, so you must use a valid regular expression.

### `markerTag`

A tag name to decorate text. If you want to decorate text with tag name, you should use this option.  
For example, if you want to decorate text with tag name, you can use this option like `markerTag: "span"`.

### `markerClassName`

A class name to decorate text. If you want to decorate text with class name, you should use this option.  
For example, if you want to decorate text with class name, you can use this option like `markerClassName: "some-class-name"`.  
If you want to decorate text with arguments, you can use this option like `markerClassName: (options) => options ? "some-class-name" : "another-class-name"`.

### `markerProperties`

A properties to decorate text. If you want to decorate text with properties, you should use this option.  
For example, if you want to decorate text with properties, you can use this option like ``markerProperties: (options) => { return { color: options ? `#${options}` : "yellow" } }``.

## License

MIT by [@6jz](https://twitter.com/6jz)
