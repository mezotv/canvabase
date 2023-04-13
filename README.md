# Canvabase

Canvabase is a simple and easy to use yet powerful image manipulation library. Canvabase is built on top of [@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas) to ensure fast image building speeds.

[![install size](https://packagephobia.com/badge?p=canvabase)](https://packagephobia.com/result?p=canvabase)
[![Downloads](https://img.shields.io/npm/dm/canvabase?sanitize=true)](https://npmcharts.com/compare/canvabase?minimal=true)
[![CodeFactor](https://www.codefactor.io/repository/github/mezotv/canvabase/badge)](https://www.codefactor.io/repository/github/mezotv/canvabase)

## Installation

Installing Canvabase

```bash
$ npm install canvabase
```

## Usage

```js
const canvabase = require("canvabase");

const welcomer = new canvabase.Welcomer()
  .setName("Dominik")
  .setTitle("Welcome!")
  //.addBackgrounds(["https://wallpapercave.com/wp/wp5128415.jpg", "https://wallpapercave.com/wp/wp11735586.jpg"])
  .addBackground("https://wallpapercave.com/wp/wp5128415.jpg")
  .setAvatar(
    "https://cdn.discordapp.com/avatars/347077478726238228/3b77f755fa8e66fd75d1e2d3fb8b1611.png?size=512",
    "rounded"
  )
  .setPosition("left")
  .setColor("#ffff");

welcomer.build().then((img) => {
  canvabase.write("./test/welcomercard.png", img);
});
```

### Output

![WelcomeCard](https://cdn.discordapp.com/attachments/624285531580399650/1076665956241260605/welcomercard.png)

## Features

- Object Oriented
- Fully documented
- Unique Features
- Easy to customize
- Utilizes @napi-rs/canvas
