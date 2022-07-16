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
添加完成后只需运行 `pnpm run auto`他会生成配置所需的后续文件，生成完毕后你就可以提pr了。就是如此简单。

一句话来说就是，你只管配置，代码自动生成。

## 运行时指定包管理器

当你照常去运行指令时，当一个包管理器出错我们会询问您是否使用下一个包管理器。 默认的顺序是 `pnpm > yarn > npm`。

但是如果遇到了我就想用 `npm` 时，这个流程就会变得非常无聊且烦躁。

举个例子：

如果你想运行 `npm` , 你只需要在你命令中加入 `-N` 或者 `--npm` 参数即可。
<br />
如果你想运行 `yarn` , 你只需要在你命令中加入 `-Y` 或者 `--yarn` 参数即可。
<br />
如果你想运行 `pnpm` , 你只需要在你命令中加入 `-P` 或者 `--pnpm` 参数即可。


## 配置

mac 用户可以在`~/.pirc`设置全局配置文件。
  
```bash
# .pirc

# default: false
skipVersionTesting=true // 这会跳过工具内置的版本检测

# default：pnpm|yarn|npm
schedulingSequence="pnpm|npm|yarn" 切换默认的调度顺序
```