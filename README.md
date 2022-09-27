# pi

Make your package management tools easy

## Stargazers over time

[![Stargazers over time](https://starchart.cc/TickHeart/pi.svg)](https://starchart.cc/TickHeart/pi)


## installation
  
```bash
pnpm add @tickh/pi -g
```

## warning
pi 0.9.2 以上版本起发生巨大改变
1. 放弃了原来的调度系统采用了更智能的脑图
2. add -> ad
3. addf -> adf
4. addw -> adw
5. bb -> pb

脑图功能介绍
  * 在你第一次进入一个新的项目时，请执行类似于 `pi -Y` 或 `pi -P` 或 `pi -N` 这样的命令为你的当前项目指定一个包管理器，pi就生成脑图，在后续的使用指令时就不需要加入 `-Y` 或 `-P` 或 `-N` 这样的标识符限制使用的包管理器了。
  * mac 用户不需要再有任何多余配置，但是 win 用户需要在全局配置文件中 加入 `piBranchPath` 配置项，例如`D:/piSetting/.piBranchPath.yaml`，指定 pi 脑图生成的目录，请不要再 c 盘 因为这样 node 没有读写权限，我知道这样真的很麻烦，但是没有别的什么好的办法针对 win 用户，如果您知道有更好的办法，请告诉我。
  * 当你想要为您的项目切换一个包管理器时，请再次执行 `pi -Y` 或 `pi -P` 或 `pi -N` 这样的命令。
  * `pi brain` 可以查看脑图


## alias

```bash
# try pi/add ... with `list` flag
pi list
```

<p algin="center">
<img width="925" alt="image" src="https://user-images.githubusercontent.com/66043405/190904067-6c9900e7-7270-493a-a215-ca67c3470393.png">

</p>

## Add new commands

If you want to add your favorite commands to PI.

All you need to do is find the `options` object in the `agents.ts` file and add it in the same format as above.
Once added, simply run  `pnpm run auto` and it will generate the subsequent files needed for the configuration,

In short, you just configure it and the code is automatically generated.

## Specify the package manager at runtime


If you want to run `npm`, you just need to add `-N` or `--npm` arguments to your command.
<br />
If you want to run `yarn`, you just need to add `-Y` or `--yarn` arguments to your command.
<br />
If you want to run `pnpm`, you just need to add `-P` or `--pnpm` arguments to your command.

## Intelligent operation

In the execution of `pr <alias>`, fuzzy matching will be performed on all instructions in PKG, and the instructions with high matching degree will be run.

Run the `pi sc` command to view all commands configured in the PKG

## configuration

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

piBranchPath='' // 这是脑图生成的目录

```

## Intercept the script

```bash
pi list # 展示pi所有的指令

pi uv # 自动更新 pi 版本

pi -v # 显示当前的 pi 版本
```

## Specifies elevations of existing package versions
``` bash
pi -u vue next # 将vue的版本更新至下一个版本
pi -u vue n # 上述的简写

pi -u vue 3.2.3 # 将vue的版本更新至指定版本
pi -u vue v3.2.3
pi -u vue V3.2.3
```

## Special instructions

+ `ec`: https://github.com/TickHeart/ec

+ `poo`: https://github.com/TickHeart/oomoo

## thanks

灵感来自于 antfu 大佬的 [ni](https://github.com/antfu/ni)，非常感谢！希望大家给 pi 点 star 前先给 ni 点star
