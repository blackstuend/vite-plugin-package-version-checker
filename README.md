# Vite Package Version Checker Plugin
This Vite plugin will checks for version mismatches between your package.json and installed dependencies, ensuring consistency across development environments and preventing forget to update package version.

## Why This Plugin?

In collaborative development environments, especially in large companies with multiple team members working on the same project, package version mismatches can cause significant issues. These problems often arise when:

1. A colleague pushes updates with new package versions.
2. Other team members are unaware of these updates and continue working with outdated dependencies.
3. This leads to inconsistencies across development environments, causing unexpected bugs and conflicts.

## Installation

```bash
npm i vite-plugin-package-version-checker -D
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
