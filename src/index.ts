import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

interface VersionCheckerOptions {
  /**
   * 是否只检查指定前缀的包, 默认检查所有包
   */
  onlyCheckScope?: boolean
  /**
   * 指定检查的包名前缀
   */
  scope?: string
  /**
   * 是否允许版本不匹配, 默认不允许
   */
  allowMismatch?: boolean
}

function versionChecker(options: VersionCheckerOptions = {}): Plugin {
  return {
    name: 'version-checker',
    buildStart() {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }
      const mismatches: string[] = []

      Object.entries(dependencies).forEach(([name, version]) => {
        if (options.onlyCheckScope && options.scope && !name.startsWith(options.scope)) {
          return // Skip packages not in the specified scope
        }

        const packagePath = path.join('node_modules', name, 'package.json')
        if (fs.existsSync(packagePath)) {
          const installedPackage = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
          const expectedVersion = (version as string).replace(/[^0-9.]/g, '')
          if (installedPackage.version !== expectedVersion) {
            mismatches.push(`${name}: expected ${version}, got ${installedPackage.version}`)
          }
        }
        else {
          mismatches.push(`${name}: not found in node_modules`)
        }
      })

      if (mismatches.length > 0) {
        const message = `Version mismatches found:\n${mismatches.join('\n')}`
        if (options.allowMismatch) {
          console.warn('\x1B[31m%s\x1B[0m', message)
        }
        else {
          throw new Error(message)
        }
      }
    },
  }
}

export default versionChecker
