# image2ascii
A simple cli to convert images into a beautiful ascii art.

<!-- TODO:: Add cover photo here -->
<!-- ![template-cli](assets/project-template-cli.png) -->

## Features

- Convert any image to ascii art
- Save ouput to a sepcified file
- Specify ascii letters to be used

## Install

```bash
npm i -g image2ascii
```

## Usage

```bash
image2ascii -s path/to/image.jpeg
```

```text
Usage: image2ascii -s path/to/image [options]

Options:
  
  [Required]
  -s, --src                   specify the input image
  
  [Optional]
  -o, --out                   specify ouput file
  -a, --ascii                 specify ascii letters


```
