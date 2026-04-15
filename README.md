# Sparkkit-CLI

Sparkkit-CLI is a powerful and easy-to-use command-line interface for the Sparkkit developer kit. It streamlines the process of setting up local projects and databases, allowing developers to get started quickly and customize their environment as needed.

## Intro
Sparkkit-CLI is the command line interface for the sparkkit tool. Sparkkit-CLI is to help developers get local projects and databases setup in an easy and streamline way. Sparkkit-CLI uses Javascript and allows you the developer to make any updates and changes you feel necessary.

## Features

- **Project Creation**: Quickly scaffold Vite and Node.js projects.
- **Database Management**: Easy setup for PostgreSQL databases.
- **Customizable**: Built with JavaScript, Sparkkit-CLI is easy to extend and adapt to your workflow.

## Installation

To install Sparkkit-CLI globally, run:

```bash
npm install -g sparkkit-cli
```

Alternatively, you can link it locally for development:

```bash
cd sparkkit-cli
npm link
```

## Usage

Once installed, the `spark` command will be available in your terminal.

### General Usage

```bash
spark [ACTION] [PROJECT_NAME] [OPTIONS] [TEMPLATE]
```

### Actions

#### `create`

Creates a new project or database.

- **Vite Project**:
  ```bash
  spark create my-vite-app --vite [template]
  ```
  *(Example templates: vanilla, react, vue, svelte, etc.)*

- **Node Project**:
  ```bash
  spark create my-node-app --node
  ```

- **PostgreSQL Database**:
  ```bash
  spark create my_db --psql
  ```

#### `delete`

Deletes an existing project or database.

- **Project**:
  ```bash
  spark delete my-vite-app --project [template]
  ```

- **Database**:
  ```bash
  spark delete my_db --database
  ```

#### `help` or `--h`

Displays the help information.

```bash
spark help
# or
spark --h
```

## Contributing

Sparkkit-CLI is open to contributions. Feel free to modify the source code to fit your needs and submit pull requests for any improvements.

## License

This project is licensed under the [ISC License](package.json).
