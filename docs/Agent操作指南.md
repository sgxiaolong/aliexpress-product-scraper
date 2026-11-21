# Agent 操作指南

编码协作约定见 [CLAUDE.md](../CLAUDE.md)。

## 环境准备

- 使用 Node 24 或以上版本，统一开发基线为 Node 24。
- 使用 pnpm 管理依赖。

```bash
nvm use 24
pnpm install
npx puppeteer browsers install chrome
```

## 检查命令

```bash
pnpm run lint
pnpm run test
ALIX_SMOKE=1 pnpm run smoke
```

## Ralph 循环与并行协作

在已安排并行协作时，每个分支使用独立 worktree，每个 Agent 聚焦一个阶段。例如：

```bash
git worktree add ../aliexpress-product-scraper-test-harness codex/test-harness
```

## 注意事项

- 端到端冒烟会访问真实网络，必须显式启用。
- 新行为通过显式选项启用，不改变既有默认行为。
