# pi

A devtool improve your pakage manager use experience

no more care about what package manager is this repo use;

one line, try all.


## Stargazers over time

[![Stargazers over time](https://starchart.cc/TickHeart/pi.svg)](https://starchart.cc/TickHeart/pi)


## 安装
  
```bash
pnpm add @tickh/pi -g
```

## 注意
pi 0.9.2 版本起发生巨大改变
1. 放弃了原来的调度系统采用了更智能的脑图
2. add -> ad
3. addf -> adf
4. addw -> adw
5. bb -> pb

脑图功能介绍
  * 在你第一次进入一个新的项目时，请执行类似于 `pi -Y` 或 `pi -P` 或 `pi -N` 这样的命令为你的当前项目指定一个包管理器，pi就生成脑图，在后续的使用指令时就不需要加入 `-Y` 或 `-P` 或 `-N` 这样的标识符限制使用的包管理器了。
  * 这样 pi 就会记住你在项目中所使用的的包管理器。

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

windows 用户设置全局配置文件需要两个步骤
  * 执行 `pi --set-config {path}` {path} 则是你的配置文件路径 
  * 执行 `pi --get-config` 查看是否配置成功

还可以设置项目的单独配置文件，设置的方就是在在您的项目的根目录下创建一个 `.pirc` 文件。

配置的使用权重是 项目配置文件 > 全局配置文件 > 默认配置文件
  
```bash
# .pirc

# default: false
skipVersionTesting=true // 这会跳过工具内置的版本检测

```

## 拦截脚本

```bash
pi list # 展示pi所有的指令

pi uv # 自动更新 pi 版本

pi -v # 显示当前的 pi 版本
```

## 特殊指令

+ `ec`: https://github.com/TickHeart/ec

+ `poo`: https://github.com/TickHeart/oomoo