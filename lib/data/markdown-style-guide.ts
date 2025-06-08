// Markdown style guide data structure
export type MarkdownStyleGuide = {
  title: string
  introduction: {
    text: string
    source: {
      document: string
      paragraph: string
      wordCount: number
    }
  }
  sections: Array<{
    title: string
    content: string
    source: {
      document: string
      paragraph: string
      wordCount: number
    }
  }>
  conclusion: {
    text: string
    source: {
      document: string
      paragraph: string
      wordCount: number
    }
  }
}

// Export the markdown style guide content
export const markdownStyleGuide: MarkdownStyleGuide = {
  title: "Markdown Style Guide",
  introduction: {
    text: "This document serves as a comprehensive guide to Markdown formatting elements and how they are rendered in our application. Use this as a reference for creating properly formatted documents.",
    source: {
      document: "Markdown Documentation",
      paragraph: "1",
      wordCount: 32,
    },
  },
  sections: [
    {
      title: "Headings",
      content:
        "# Heading Level 1\n\n## Heading Level 2\n\n### Heading Level 3\n\n#### Heading Level 4\n\n##### Heading Level 5\n\n###### Heading Level 6\n\nHeadings are created using the hash symbol (#), with the number of hashes corresponding to the heading level. Always include a space after the hash symbols.",
      source: {
        document: "Markdown Syntax Guide",
        paragraph: "3-9",
        wordCount: 45,
      },
    },
    {
      title: "Paragraph Spacing",
      content:
        "This is the first paragraph.\n\nThis is the second paragraph. In Markdown, paragraphs are separated by a blank line.\n\nThis is the third paragraph. Without a blank line, text will appear on the same line in the rendered output.",
      source: {
        document: "Markdown Syntax Guide",
        paragraph: "12-14",
        wordCount: 52,
      },
    },
    {
      title: "Text Formatting",
      content:
        "**Bold text** is created with double asterisks.\n\n*Italic text* is created with single asterisks.\n\n***Bold and italic text*** is created with triple asterisks.\n\n~~Strikethrough text~~ is created with double tildes.\n\n<u>Underlined text</u> requires HTML tags as it's not standard in Markdown.",
      source: {
        document: "Markdown Formatting Guide",
        paragraph: "5-9",
        wordCount: 63,
      },
    },
    {
      title: "Block Quotes",
      content:
        "> This is a blockquote. It is often used to quote text from another source.\n>\n> Blockquotes can span multiple paragraphs when each paragraph starts with a > symbol.\n\n> Nested blockquotes are also possible\n>> by using additional > symbols.",
      source: {
        document: "Markdown Syntax Guide",
        paragraph: "17-19",
        wordCount: 48,
      },
    },
    {
      title: "Monospace Font",
      content:
        "`This is inline code` using backticks.\n\n```\nThis is a code block.\nIt preserves whitespace and line breaks.\nIt's useful for displaying code snippets.\n```\n\n```javascript\n// This is a code block with syntax highlighting\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```",
      source: {
        document: "Markdown Code Guide",
        paragraph: "3-7",
        wordCount: 57,
      },
    },
    {
      title: "Unordered Lists",
      content:
        "* Item 1\n* Item 2\n* Item 3\n\n- Item 1\n- Item 2\n  - Nested item 1\n  - Nested item 2\n- Item 3\n\n+ Item 1\n+ Item 2\n+ Item 3\n\nUnordered lists can use asterisks (*), hyphens (-), or plus signs (+) as list markers.",
      source: {
        document: "Markdown Lists Guide",
        paragraph: "2-6",
        wordCount: 62,
      },
    },
    {
      title: "Ordered Lists",
      content:
        "1. First item\n2. Second item\n3. Third item\n\n1. First item\n1. Second item (the actual numbers don't matter)\n1. Third item\n\n1. First item\n   1. Nested item 1\n   2. Nested item 2\n2. Second item",
      source: {
        document: "Markdown Lists Guide",
        paragraph: "8-12",
        wordCount: 54,
      },
    },
    {
      title: "Links",
      content:
        '[Basic link](https://www.example.com)\n\n[Link with title](https://www.example.com "Example Website")\n\n<https://www.example.com> - Automatic links\n\n[Reference link][1]\n\n[1]: https://www.example.com "Reference Example"\n\n[Link to heading](#headings)',
      source: {
        document: "Markdown Links Guide",
        paragraph: "3-8",
        wordCount: 46,
      },
    },
    {
      title: "Horizontal Rules",
      content:
        "Three or more hyphens create a horizontal rule:\n\n---\n\nAsterisks also work:\n\n***\n\nAs do underscores:\n\n___\n\nHorizontal rules are useful for separating sections of a document.",
      source: {
        document: "Markdown Syntax Guide",
        paragraph: "22-26",
        wordCount: 42,
      },
    },
  ],
  conclusion: {
    text: "This style guide covers the most common Markdown formatting elements. By using these elements consistently, you can create well-structured and readable documents that render beautifully in our application.",
    source: {
      document: "Markdown Documentation",
      paragraph: "42",
      wordCount: 35,
    },
  },
}
