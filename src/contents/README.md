# Contents Addition

The content structure is,
```
Course(dir) -> Chapter(dir) -> Lesson(dir) -> Pages(file)
```

- Only .tsx(TypeScript) files are supported. 
- Page files are the ones that will be shown in a single screen. There will be a "Next" button at the end of the first page's content, on clicking which the next page content will be shown along with the already completed first page, and so on.
- Refer the "Utils Component Documentation" below to get an idea of the different components that can be used inside the pages. 


# Utils Component Documentation

This file contains a collection of reusable components that can be used across different parts of your application.

## Installation

To use these components, you need to have the following dependencies installed: (TODO)

## Usage

### Heading

The Heading component is used to render a heading with a specific font size and font weight.

```tsx
import { Heading } from "@/contents/utils";

// Usage
<Heading>This is a heading</Heading>
```

### Paragraph

The Paragraph component is used to render a paragraph with a specific font size and line height.

```tsx
import { Paragraph } from "@/contents/utils";

// Usage
<Paragraph>This is a paragraph</Paragraph>
```

### Simulation

The Simulation component is used to wrap content that represents a simulation or interactive element.

```tsx
import { Simulation } from "@/contents/utils";

// Usage
<Simulation>
  <p>This is a simulation</p>
</Simulation>
```

### Quiz

The Quiz component is used to render a quiz with multiple choice questions.

```tsx
import { Quiz } from "@/contents/utils";

// Usage
<Quiz
  question="What is the capital of France?"
  choices={["London", "Paris", "Berlin"]}
  correctAnswer="Paris"
  explanations={["Paris is the capital of France."]}
/>
```

### CodeBlock

The CodeBlock component is used to render code blocks with a specific background color and font style.

```tsx
import { CodeBlock } from "@/contents/utils";

// Usage
<CodeBlock>
  {`const greeting = "Hello, world!";
  console.log(greeting);`}
</CodeBlock>
```

### ImageBlock

The ImageBlock component is used to render an image with a specific source and alt text.

```tsx
import { ImageBlock } from "@/contents/utils";

// Usage
<ImageBlock src="/path/to/image.jpg" alt="Description of the image" />
```
