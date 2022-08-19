# Node.js + Expressjs + mongoDB - Building an API like Trello form scratch

## Requirements

- **nodejs >= v14.7.0**
- **npm >= v6.14.7**
- **yarn >= v1.19.1**

##### clone project and run test

```bash
$ git clone https://git_url_clone <project_dir>
$ cd <project_dir>
$ yarn install
$ yarn start
```

##### errors encountered and how to fix them

**file: pakage.json**

```bash
scripts:{
    "clean": "rd -rf build && mkdir build",
    }
```

- In Windows you should use
- `rd /s /q dist`
- rm is available in Linux and Mac.

**So, How to run rm command on windows 10?**

### [Solution](https://stackoverflow.com/questions/41451884/how-to-run-rm-command-on-windows-10/41452647)

**_OR_**

```bash
scripts:{
    "remove-build": "rmdir /s /q build",
    "create-build": "mkdir build",
    "clean": "npm run remove-build && npm run create-build",
    }
```

**file: .env**

- `doesn't work with .env files`

- Create a `.env` file
```bash
    // code environment variables here
    //examples
    PORT=3000
```

## Solution

- **[npm dotenv](https://www.npmjs.com/package/dotenv)**

## Bug

- module : [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver) doesn't work, so hope i will fix soon!

## My website Blog

** Coming soon !! **

#### Thanks for watching!
