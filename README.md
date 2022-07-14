# pi

no more care about what package manager is this repo use;

one line, try all.

## 安装
  
```bash
pnpm add @tickh/pi -g
```

## 优先度

`pnpm > yarn > npm`

## alias

```bash
# try pi/add ... with `list` flag
pi list
```

## pr

如果你想要在 pi 中加上自己喜欢的命令，那么你可以提pr，pi的 pr 非常简单

你只需要找到 `agents.ts` 文件中的 `options` 对象按照以上的格式添加即可。
添加完成后只需运行 `pnpm run auto`，你就可以提pr了。就是如此简单。