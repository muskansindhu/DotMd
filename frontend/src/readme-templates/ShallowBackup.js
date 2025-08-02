export const sectionList = [
  {
    slug: "shallow-backup",
    name: "shallow-backup",
    markdown:
      "# shallow-backup\n\n[![Downloads](http://pepy.tech/badge/shallow-backup)](http://pepy.tech/count/shallow-backup)\n[![Build Status](https://travis-ci.com/alichtman/shallow-backup.svg?branch=master)](https://travis-ci.com/alichtman/shallow-backup)\n[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1719da4d7df5455d8dbb4340c428f851)](https://www.codacy.com/app/alichtman/shallow-backup?utm_source=github.com&utm_medium=referral&utm_content=alichtman/shallow-backup&utm_campaign=Badge_Grade)\n\n<!-- [![Coverage Status](https://coveralls.io/repos/github/alichtman/shallow-backup/badge.svg?branch=master)](https://coveralls.io/github/alichtman/shallow-backup?branch=master) -->\n\n`shallow-backup` lets you easily create lightweight backups of installed packages, applications, fonts and dotfiles, and automatically push them to a remote Git repository.\n\nI use it to manage [my dotfiles](https://github.com/alichtman/dotfiles).\n\n![Shallow Backup GIF Demo](assets/shallow-backup-demo.gif)",
  },
  {
    slug: "contents",
    name: "Contents",
    markdown:
      '# Contents\n\n- [Why?](#why)\n- [Installation](#installation)\n  - [Method 1: <a href="https://pypi.org/project/shallow-backup/" rel="nofollow">pipx</a>](#method-1-pipx)\n  - [Method 2: Install From Source](#method-2-install-from-source)\n- [Dependencies](#dependencies)\n- [Usage](#usage)\n- [Recipes](#recipes)\n  - [Maintain a separate repo for your dotfiles](#maintain-a-separate-repo-for-your-dotfiles)\n  - [Synchronize dotfiles on multiple computers](#synchronize-dotfiles-on-multiple-computers)\n  - [Reinstall dotfiles from a backup](#reinstall-dotfiles-from-a-backup)\n- [What can I back up?](#what-can-i-back-up)\n- [Configuration](#configuration)\n  - [Conditional Backup and Reinstallation](#conditional-backup-and-reinstallation)\n- [Git Integration](#git-integration)\n  - [A Word of Caution](#a-word-of-caution)\n  - [.gitignore](#gitignore)\n- [Output Structure](#output-structure)\n- [Want to Contribute?](#want-to-contribute)',
  },
  {
    slug: "why",
    name: "Why?",
    markdown:
      "### Why?\n\nI wanted a tool that allows you to:\n\n- Back up dotfiles _from where they live on the system_.\n- Back up files from _any_ path on the system, not just `$HOME`.\n- Reinstall them from the backup directory idempotently.\n- Backup and reinstall files conditionally, so you can easily manage dotfiles across multiple systems.\n- Copy files on installation and backup, as opposed to symlinking them.\n- Backup package installations in a highly compressed manner.\n- Not worry about accidentally doing something dangerous / destructive (is user-protective).\n\n`shallow-backup` checks all of those boxes.",
  },
  {
    slug: "installation",
    name: "Installation",
    markdown:
      "### Installation\n\n---\n\n> **Warning**\n> Be careful running this with elevated privileges. Code execution can be achieved with write permissions on the config file.\n\n#### Method 1: [`pipx`](https://pypi.org/project/shallow-backup/)\n\n```bash\n$ pipx install shallow-backup\n```\n\n#### Method 2: Install From Source\n\n```bash\n$ git clone https://www.github.com/alichtman/shallow-backup.git\n$ cd shallow-backup\n$ pip3 install .\n```",
  },
  {
    slug: "dependencies",
    name: "Dependencies",
    markdown:
      "### Dependencies\n\n---\n\n- `pre-commit`\n- `trufflehog`\n\nIf you are missing the dependencies, you will be guided to install them.",
  },
  {
    slug: "usage",
    name: "Usage",
    markdown:
      "### Usage\n\n---\n\n- To start the interactive program, run `$ shallow-backup`.\n- To backup your dotfiles, run `$ shallow-backup --backup-dots`.\n\n`shallow-backup` was built with scripting in mind. Every feature that's supported in the interactive program is supported with command line arguments.\n\n```shell\nUsage: shallow-backup [OPTIONS]\n\n  Easily back up installed packages, dotfiles, and more.\n  You can edit which files are backed up in ~/.shallow-backup.\n\n  Written by Aaron Lichtman (@alichtman).\n\nOptions:\n\n  --add-dot TEXT               Add a dotfile or dotfolder to config by path.\n  --backup-all                 Full back up.\n  --backup-configs             Back up app config files.\n  --backup-dots                Back up dotfiles.\n  --backup-fonts               Back up installed fonts.\n  --backup-packages            Back up package libraries.\n  --delete-config              Delete config file.\n  --destroy-backup             Delete backup directory.\n  --dry-run                    Don't backup or reinstall any files, just give\n                               verbose output.\n\n  --new-path TEXT              Input a new back up directory path.\n  --no-new-backup-path-prompt  Skip setting new back up directory path prompt.\n  --no-splash                  Don't display splash screen.\n  --reinstall-all              Full reinstallation.\n  --reinstall-configs          Reinstall configs.\n  --reinstall-dots             Reinstall dotfiles and dotfolders.\n  --reinstall-fonts            Reinstall fonts.\n  --reinstall-packages         Reinstall packages.\n  --remote TEXT                Set remote URL for the git repo.\n\n  --edit                       Open config file in $EDITOR.\n  -v, --version                Display version and author info.\n  -h, -help, --help            Show this message and exit.\n```",
  },
  {
    slug: "recipes",
    name: "Recipes",
    markdown:
      "### Recipes\n\n---\n\n#### Maintain a separate repo for your dotfiles\n\n`shallow-backup` makes this easy! After making your first backup, `cd` into the `dotfiles/` directory and run `$ git init`. Create a `.gitignore`, and a create / set up (link the upstream remote, etc) a new repo on your favorite version control platform. With operations involving the parent `shallow-backup` repo, `shallow-backup` will prompt you interactively to update the nested submodule. After that is taken care of, `shallow-backup` will move on to updating the parent. The `dotfiles` repo will be tracked as a submodule.\n\n#### Synchronize dotfiles on multiple computers\n\nRun `shallow-backup --backup-dots` on the first computer. Make a commit and push to the remote. Then pull these changes down on the second computer. Run `shallow-backup --backup-dots` on the second computer, and resolve the merge conflicts. Once you have a final version you're happy with, make a commit, push it, and run `shallow-backup --reinstall-dots`. On the first computer, pull the changes and run `shallow-backup --reinstall-dots`. Your changes are now sync'd across both computers and the remote repository.\n\n#### Reinstall dotfiles from a backup\n\nTo reinstall your dotfiles, clone your dotfiles repo and make sure your shallow-backup config path can be found at either `~/.config/shallow-backup.conf` or `$XDG_CONFIG_HOME/.shallow_backup.conf`. Set the `backup-path` key in the config to the path of your cloned dotfiles. Then run `$ shallow-backup --reinstall-dots`.\n\nWhen reinstalling your dotfiles, the top level `.git/`, `.gitignore`, `img/` and `README.md` files and directories are ignored.",
  },
  {
    slug: "zsh-completions",
    name: "`zsh` Completions",
    markdown:
      "### `zsh` Completions\n\nAvailable in [`zsh-users/zsh-completions`](https://github.com/zsh-users/zsh-completions/blob/master/src/_shallow-backup). Follow the [installation instructions here](https://github.com/zsh-users/zsh-completions/tree/master#using-zsh-frameworks).",
  },
  {
    slug: "what-can-i-back-up",
    name: "What can I back up?",
    markdown:
      "### What can I back up?\n\n---\n\nBy default, `shallow-backup` backs these up.\n\n1. Dotfiles and dotfolders\n\n   - `.bashrc`\n   - `.bash_profile`\n   - `.gitconfig`\n   - `.pypirc`\n   - `.config/shallow-backup.json`\n   - `.ssh/`\n   - `.vim/`\n   - `.zshrc`\n\n2. App Config Files\n\n   - VSCode\n   - Sublime Text 2/3\n   - Terminal.app\n\n3. Installed Packages\n\n   - `brew` and `cask`\n   - `cargo`\n   - `gem`\n   - `pip`\n   - `pip3`\n   - `npm`\n   - `macports`\n   - `VSCode` Extensions\n   - `Sublime Text 2/3` Packages\n   - System Applications\n\n4. User installed `fonts`.",
  },
  {
    slug: "configuration",
    name: "Configuration",
    markdown:
      '### Configuration\n\nIf you\'d like to modify which files are backed up, you can edit the `JSON` config file. This file is looked for in the following locations, in this order:\n\n1. `$SHALLOW_BACKUP_CONFIG_DIR/shallow-backup.json`\n2. `$XDG_CONFIG_HOME/shallow-backup.json`\n3. `~/.config/shallow-backup.json`\n\n#### Conditional Backup and Reinstallation\n\n> **Warning**\n> This feature allows code execution (by design). If untrusted users can write to your config, they can achieve code execution next time you invoke `shallow-backup` _backup_ or _reinstall_ functions. Starting in `v5.2`, the config file will have default permissions of `644`, and a warning will be printed if others can write to the config.\n\nEvery key under dotfiles has two optional subkeys: `backup_condition` and `reinstall_condition`. Both of these accept expressions that will be evaluated with `bash`. An empty string (`""`) is the default value, and is considered to be `True`. If the return value of the expression is `0`, this is considered `True`. Otherwise, it is `False`. This lets you do simple things like preventing backup with:\n\n```javascript\n// Because `$ false` returns 1\n"backup_condition": "false"\n```\n\nAnd also more complicated things like only backing up certain files if an environment variable is set:\n\n```javascript\n"backup_condition": "[[ -n \\"$ENV_VAR\\" ]]"\n```\n\nHere\'s an example config based on my [dotfiles](https://www.github.com/alichtman/dotfiles):\n\n```json\n{\n\t"backup_path": "~/shallow-backup",\n\t"lowest_supported_version": "5.0.0a",\n\t"dotfiles": {\n\t\t".config/agignore": {\n\t\t\t"backup_condition": "uname -a | grep Darwin",\n\t\t\t"reinstall_condition": "uname -a | grep Darwin"\n\t\t},\n\t\t".config/git/gitignore_global": { },\n\t\t".config/jrnl/jrnl.yaml": { },\n\t\t".config/kitty": { },\n\t\t".config/nvim": { },\n\t\t".config/pycodestyle": { },\n\t\t...\n\t\t".zshenv": { }\n\t},\n\t"root-gitignore": [\n\t\t".DS_Store",\n\t\t"dotfiles/.config/nvim/.netrwhist",\n\t\t"dotfiles/.config/nvim/spell/en.utf-8.add",\n\t\t"dotfiles/.config/ranger/plugins/ranger_devicons",\n\t\t"dotfiles/.config/zsh/.zcompdump*",\n\t\t"dotfiles/.pypirc",\n\t\t"dotfiles/.ssh"\n\t],\n\t"dotfiles-gitignore": [\n\t\t".DS_Store",\n\t\t".config/nvim/.netrwhist",\n\t\t".config/nvim/spell/en.utf-8.add*",\n\t\t".config/ranger/plugins/*",\n\t\t".config/zsh/.zcompdump*",\n\t\t".config/zsh/.zinit",\n\t\t".config/tmux/plugins",\n\t\t".config/tmux/resurrect",\n\t\t".pypirc",\n\t\t".ssh/*"\n\t],\n\t"config_mapping": {\n\t\t"/Users/alichtman/Library/Application Support/Sublime Text 2": "sublime2",\n\t\t"/Users/alichtman/Library/Application Support/Sublime Text 3": "sublime3",\n\t\t"/Users/alichtman/Library/Application Support/Code/User/settings.json": "vscode/settings",\n\t\t"/Users/alichtman/Library/Application Support/Code/User/Snippets": "vscode/Snippets",\n\t\t"/Users/alichtman/Library/Application Support/Code/User/keybindings.json": "vscode/keybindings",\n\t\t"/Users/alichtman/Library/Preferences/com.apple.Terminal.plist": "terminal_plist"\n\t}\n}\n```',
  },
  {
    slug: "git-integration",
    name: "Git Integration",
    markdown:
      "### Git Integration\n\n---\n\n#### A Word of Caution\n\nThis backup tool is git-integrated, meaning that you can easily store your backups remotely (on GitHub, for example.) Dotfiles and configuration files may contain sensitive information like API keys and ssh keys, and you don't want to make those public. To make sure no sensitive files are uploaded accidentally, `shallow-backup` creates a `.gitignore` file if it can't find one in the directory. It excludes `.ssh/` and `.pypirc` by default. It's safe to remove these restrictions if you're pushing to a remote private repository, or you're only backing up locally. To do this, you should clear the `.gitignore` file without deleting it.\n\n_If you choose to back up to a public repository, look at every file you're backing up to make sure you want it to be public._\n\n> [!NOTE]\n> As of `v6.2`, `trufflehog` is run as a required precommit hook and will detect secrets.\n\n#### .gitignore\n\nAs of `v4.0`, any `.gitignore` changes should be made in the `shallow-backup` config file. `.gitignore` changes that are meant to apply to all directories should be under the `root-gitignore` key. Dotfile specific gitignores should be placed under the `dotfiles-gitignore` key. The original `default-gitignore` key in the config is still supported for backwards compatibility, however, converting to the new config format is strongly encouraged.",
  },
  {
    slug: "output-structure",
    name: "Output Structure",
    markdown:
      "### Output Structure\n\n---\n\n```shell\nshallow_backup/\n\u251c\u2500\u2500 configs\n\u2502\u00a0\u00a0 \u251c\u2500\u2500 plist\n\u2502\u00a0\u00a0 \u2502\u00a0\u00a0 \u2514\u2500\u2500 com.apple.Terminal.plist\n\u2502\u00a0\u00a0 \u251c\u2500\u2500 sublime_2\n\u2502\u00a0\u00a0 \u2502\u00a0\u00a0 \u2514\u2500\u2500 ...\n\u2502\u00a0\u00a0 \u2514\u2500\u2500 sublime_3\n\u2502\u00a0\u00a0     \u2514\u2500\u2500 ...\n\u251c\u2500\u2500 dotfiles\n\u2502   \u251c\u2500\u2500 .bash_profile\n\u2502   \u251c\u2500\u2500 .bashrc\n\u2502   \u251c\u2500\u2500 .gitconfig\n\u2502   \u251c\u2500\u2500 .pypirc\n\u2502   \u251c\u2500\u2500 ...\n\u2502   \u251c\u2500\u2500 shallow-backup.json\n\u2502\u00a0\u00a0 \u251c\u2500\u2500 .ssh/\n\u2502\u00a0\u00a0 \u2502\u00a0\u00a0 \u2514\u2500\u2500 known_hosts\n\u2502\u00a0\u00a0 \u251c\u2500\u2500 .vim/\n\u2502   \u2514\u2500\u2500 .zshrc\n\u251c\u2500\u2500 fonts\n\u2502\u00a0\u00a0 \u251c\u2500\u2500 AllerDisplay.ttf\n\u2502\u00a0\u00a0 \u251c\u2500\u2500 Aller_Bd.ttf\n\u2502\u00a0\u00a0 \u251c\u2500\u2500 ...\n\u2502\u00a0\u00a0 \u251c\u2500\u2500 Ubuntu Mono derivative Powerline Italic.ttf\n\u2502\u00a0\u00a0 \u2514\u2500\u2500 Ubuntu Mono derivative Powerline.ttf\n\u2514\u2500\u2500 packages\n    \u251c\u2500\u2500 brew-cask_list.txt\n    \u251c\u2500\u2500 brew_list.txt\n    \u251c\u2500\u2500 cargo_list.txt\n    \u251c\u2500\u2500 gem_list.txt\n    \u251c\u2500\u2500 installed_apps_list.txt\n    \u251c\u2500\u2500 npm_list.txt\n    \u251c\u2500\u2500 macports_list.txt\n    \u251c\u2500\u2500 pip_list.txt\n    \u2514\u2500\u2500 sublime3_list.txt\n```",
  },
  {
    slug: "reinstalling-dotfiles",
    name: "Reinstalling Dotfiles",
    markdown:
      "### Reinstalling Dotfiles\n\n---\n\nTo reinstall your dotfiles, clone your dotfiles repo and make sure your shallow-backup config path can be found at either `~/.config/shallow-backup.json` or `$XDG_CONFIG_HOME/.shallow_backup.json`. Set the `backup-path` key in the config to the path of your cloned dotfiles. Then run `$ shallow-backup -reinstall-dots`.\n\nWhen reinstalling your dotfiles, the top level `.git/`, `.gitignore`, `img/` and `README.md` files and directories are ignored.",
  },
  {
    slug: "want-to-contribute",
    name: "Want to Contribute?",
    markdown:
      "### Want to Contribute?\n\n---\n\nCheck out `CONTRIBUTING.md` and the `docs` directory.",
  },
];
