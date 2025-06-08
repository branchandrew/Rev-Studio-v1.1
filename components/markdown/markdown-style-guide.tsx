"use client"
import ReactMarkdown from "react-markdown"
import styles from "./markdown-style-guide.module.css"

const MarkdownStyleGuide = () => {
  const markdownContent = `
# Markdown Style Guide

This guide demonstrates the various Markdown formatting elements and how they are rendered.

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Paragraph Spacing

This is the first paragraph.

This is the second paragraph. In Markdown, paragraphs are separated by a blank line.

This is the third paragraph. Without a blank line, text will appear on the same line in the rendered output.

## Text Formatting

**Bold text** is created with double asterisks.

*Italic text* is created with single asterisks.

***Bold and italic text*** is created with triple asterisks.

~~Strikethrough text~~ is created with double tildes.

<u>Underlined text</u> requires HTML tags as it's not standard in Markdown.

## Block Quotes

> This is a blockquote. It is often used to quote text from another source.
>
> Blockquotes can span multiple paragraphs when each paragraph starts with a > symbol.

> Nested blockquotes are also possible
>> by using additional > symbols.

## Code Formatting

Inline code: \`const greeting = "Hello, world!"\`

Code block:

\`\`\`javascript
// This is a code block with syntax highlighting
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Unordered Lists

* Item 1
* Item 2
* Item 3

- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

+ Item 1
+ Item 2
+ Item 3

Unordered lists can use asterisks (*), hyphens (-), or plus signs (+) as list markers.

## Ordered Lists

1. First item
2. Second item
3. Third item

1. First item
1. Second item (the actual numbers don't matter)
1. Third item

1. First item
   1. Nested item 1
   2. Nested item 2
2. Second item

## Links

[Basic link](https://www.example.com)

[Link with title](https://www.example.com "Example Website")

<https://www.example.com> - Automatic links

[Reference link][1]

[1]: https://www.example.com "Reference Example"

[Link to heading](#headings)

## Horizontal Rules

Three or more hyphens create a horizontal rule:

---

Asterisks also work:

***

As do underscores:

___

Horizontal rules are useful for separating sections of a document.
`

  return (
    <div className={`prose prose-sm md:prose-base lg:prose-lg max-w-none ${styles.markdownGuide}`}>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  )
}

export default MarkdownStyleGuide
