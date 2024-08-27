# Vite Package Version Checker Plugin

## Why This Plugin?

In collaborative development environments, especially in large companies with multiple team members working on the same project, package version mismatches can cause significant issues. These problems often arise when:

1. A colleague pushes updates with new package versions.
2. Other team members are unaware of these updates and continue working with outdated dependencies.
3. This leads to inconsistencies across development environments, causing unexpected bugs and conflicts.

This plugin was developed to address these challenges by:

- Automatically checking for version mismatches between your `package.json` and installed dependencies.
- Providing immediate feedback during development and build processes.
- Ensuring all team members are working with the correct and up-to-date package versions.

By integrating this plugin into your Vite project, you can:

- Prevent version-related issues before they cause problems in production.
- Improve collaboration by keeping all developers in sync with dependency versions.
- Save time and reduce frustration caused by hard-to-trace version mismatch bugs.

Whether you're working in a large team or just want to ensure consistency across different development environments, this plugin helps maintain the integrity of your project's dependencies.

A Vite plugin that checks for version mismatches between your package.json and installed dependencies.

## Installation

```bash
pnpm add vite-plugin-package-version-checker -D
```

## Usage

```ts
import { defineConfig } from 'vite'
import versionChecker from 'vite-plugin-package-version-checker'

export default defineConfig({
  plugins: [versionChecker()],
})
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `onlyCheckScope` | `boolean` | `false` | If set to `true`, only checks packages with the specified scope prefix. |
| `scope` | `string` | `undefined` | Specifies the package name prefix to check when `onlyCheckScope` is `true`. |
| `allowMismatch` | `boolean` | `false` | If set to `true`, allows version mismatches and only logs warnings instead of throwing errors. |

## Example

```ts
export default defineConfig({
  plugins: [versionChecker({
    onlyCheckScope: true,
    scope: '@my-scope',
  })],
})
```
