# Clifer Project Instructions

## Publishing Workflow

After shipping changes to `main`, always follow this publish workflow:

1. **Bump version** in `package.json` (minor for features, patch for fixes)
2. **Build**: `npm run build`
3. **Publish to npm**: `npm publish` (may require `--otp=<code>` or `--token=<token>` for 2FA)
4. **Commit version bump**: commit `package.json` and push to `main`
5. **Create GitHub release**: `gh release create v<version>` with release notes summarizing changes

## Branch & Release Config

- Default branch: `main`
- semantic-release configured in `package.json` under `"release": { "branches": ["main"] }`
- CI uses `npm` (not yarn) — see `.github/workflows/release.yml`

## Build & Test

- Build: `npm run build` (runs `tsc` + `bun build`)
- Test: `bun test`
- Lint: `npm run lint`

## Tech Stack

- TypeScript library published to npm
- Uses `enquirer` for interactive prompts
- Uses `chalk` for terminal colors
- Uses `name-util` for name transformations
