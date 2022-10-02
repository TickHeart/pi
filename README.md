# pi

Make your package management tools easy

## Stargazers over time

[![Stargazers over time](https://starchart.cc/TickHeart/pi.svg)](https://starchart.cc/TickHeart/pi)


## installation
  
```bash
pnpm add @tickh/pi -g
```

## warning
Destructive changes have occurred since version 0.9.2 or above
1. Ditching the original scheduling system for a smarter brain map
2. add -> ad
3. addf -> adf
4. addw -> adw
5. bb -> pb

Brain map function introduction
  * When you first enter a new project, execute commands like `pi -Y` or `pi -P` or `pi -N` to specify a package manager for your current project，PI generates a brain map.
  * MAC users do not need to be any redundant configuration, but win in the global configuration file users need to join ` piBranchPath ` configuration items, such as ` D: / piSetting /. PiBranchPath. Yaml `, specifies the directory in which the PI maps generated, I know this is really troublesome, but there is no other good way for WIN users. If you know a better way, please let me know.
  * When you want to switch a package manager for your project, run the `pi -Y` or `pi -P` or `pi -N` command again.
  * `pi brain` You can look at the brain map 


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

MAC users can set the global configuration file at `~/.pirc`

There are two steps for a Windows user to set up a global profile
  * Running `pi --set-config {path}` {path} is the path to your configuration file
  * Run the `pi --get-config` command to check whether the configuration is successful

You can also set a separate configuration file for your project by creating a `.pirc`file in the root directory of your project.

The weight of the configuration is `Project > Global > Default`
  
```bash
# .pirc

# default: false
skipVersionTesting=true // This skips the tool is built-in version checking

piBranchPath='' // This is the catalog of brain map generation

```

## Intercept the script

```bash
pi list # Show all the instructions of PI

pi uv # Automatically update the PI version

pi -v # Displays the current PI version
```

## Specifies elevations of existing package versions
``` bash
pi -u vue next # Update the VUE version to the next version
pi -u vue n # Shorthand for the above

pi -u vue 3.2.3 # Update the VUE version to the specified version
pi -u vue v3.2.3
pi -u vue V3.2.3
```

## Special instructions

+ `ec`: https://github.com/TickHeart/ec

+ `poo`: https://github.com/TickHeart/oomoo

## thanks

灵感来自于 antfu 大佬的 [ni](https://github.com/antfu/ni)，非常感谢！希望大家给 pi 点 star 前先给 ni 点star .
