import dedent from "dedent";
import { unified } from "unified";
import RemarkParse from "remark-parse";
import RemarkRehype from "remark-rehype";
import RehypeFormat from "rehype-format";
import RehypeStringify from "rehype-stringify";

import type { VFileCompatible } from "vfile";

import RemarkTextDecoration from ".";

describe("within a markdown content", () => {
  describe("with default options", () => {
    const compiler = unified()
      .use(RemarkParse)
      .use(RemarkTextDecoration)
      .use(RemarkRehype)
      .use(RehypeFormat)
      .use(RehypeStringify);

    const process = async (
      content: VFileCompatible
    ): Promise<VFileCompatible> => {
      return compiler.process(content).then((result) => result.toString());
    };

    it("works without arguments", async () => {
      const input = dedent`
  # Hello, World

  This is a ==marked== content.
  This is a **==marked content with bold==**.
      `;

      const output = await process(input);
      expect(output).toMatchInlineSnapshot(`
  "
  <h1>Hello, World</h1>
  <p>
    This is a <span class=\\"text-decoration\\">marked</span> content.
    This is a <strong><span class=\\"text-decoration\\">marked content with bold</span></strong>.
  </p>
  "`);
    });

    it("work with arguments", async () => {
      const input = dedent`
  # Hello, World

  This is a =a=marked== content.
  This is a **=b=marked content with bold==**.
      `;

      const output = await process(input);
      expect(output).toMatchInlineSnapshot(`
  "
  <h1>Hello, World</h1>
  <p>
    This is a <span class=\\"text-decoration-a\\">marked</span> content.
    This is a <strong><span class=\\"text-decoration-b\\">marked content with bold</span></strong>.
  </p>
  "`);
    });
  });

  describe("with custom options", () => {
    const compiler = unified()
      .use(RemarkParse)
      .use(RemarkTextDecoration, {
        marker: "++",
        markerWithOptions: "+",
        markedAcceptedOptionsPattern: ".*",
        markerClassNames: () => undefined,
        markerProperties(options) {
          return options ? { color: options } : undefined;
        },
      })
      .use(RemarkRehype)
      .use(RehypeFormat)
      .use(RehypeStringify);

    const process = async (
      content: VFileCompatible
    ): Promise<VFileCompatible> => {
      return compiler.process(content).then((result) => result.toString());
    };

    it("works without arguments", async () => {
      const input = dedent`
  # Hello, World

  This is a ++marked++ content.
  This is a **++marked content with bold++**.
      `;

      const output = await process(input);
      expect(output).toMatchInlineSnapshot(`
  "
  <h1>Hello, World</h1>
  <p>
    This is a <span>marked</span> content.
    This is a <strong><span>marked content with bold</span></strong>.
  </p>
  "`);
    });

    it("work with arguments", async () => {
      const input = dedent`
  # Hello, World

  This is a +color:red+marked++ content.
  This is a **+b+marked content with bold++**.
      `;

      const output = await process(input);
      expect(output).toMatchInlineSnapshot(`
  "
  <h1>Hello, World</h1>
  <p>
    This is a <span style=\\"color:a\\">marked</span> content.
    This is a <strong><span style=\\"color:b\\">marked content with bold</span></strong>.
  </p>
  "`);
    });
  });
});
