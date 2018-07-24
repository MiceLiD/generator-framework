const Generator = require('yeoman-generator')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.appname = path.basename('new_project')
  }

  initializing() {
    this.log('开始构建...')
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'You project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'version',
        message: 'You project version',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'description',
        message: 'You project description',
        default: ''
      },
      {
        type: 'input',
        name: 'author',
        message: 'You project author',
        default: ''
      }
    ]).then(answers => {
      this.appname = answers.name
      this.version = answers.version
      this.description = answers.description
      this.author = answers.author
    })
  }

  configuring() {
    let defaultSetting = this.fs.readJSON(this.templatePath('package.json'))
    let packageSetting = {
      name: this.appname,
      version: this.version,
      description: this.description,
      author: this.author,
      keyword: [],
      license: 'ISC',
      main: 'index.js',
      scripts: defaultSetting.scripts,
      dependencies: defaultSetting.dependencies,
      devDependencies: defaultSetting.devDependencies
    }
    this.fs.writeJSON(
      this.destinationPath(`./${this.appname}/package.json`),
      packageSetting
    )
  }

  writing() {
    /* 拷贝所需的文件. */

    this.fs.copy(
      this.templatePath("build"),
      this.destinationPath("build")
    );
    this.fs.copy(
      this.templatePath("client"),
      this.destinationPath("client")
    );
    this.fs.copy(
      this.templatePath("config"),
      this.destinationPath("config")
    );
    this.fs.copy(
      this.templatePath("extensions"),
      this.destinationPath("extensions")
    );
    this.fs.copy(
      this.templatePath("server"),
      this.destinationPath("server")
    );
    this.fs.copy(
      this.templatePath("shared"),
      this.destinationPath("shared")
    );
    this.fs.copy(
      this.templatePath(".babelrc_temp"),
      this.destinationPath(".babelrc")
    );
    this.fs.copy(
      this.templatePath("README_TEMP.md"),
      this.destinationPath("README.md")
    );
    this.fs.copy(
      this.templatePath(".gitignore_temp"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("start.sh"),
      this.destinationPath("start.sh")
    );
    this.fs.copy(
      this.templatePath("stop.sh"),
      this.destinationPath("stop.sh")
    );
    this.fs.copy(
      this.templatePath("restart.sh"),
      this.destinationPath("restart.sh")
    );
  }
  default() {
    if (path.basename(this.destinationPath()) !== this.appname) {
      this.log(
        'Your app must be inside a folder named ' +
          chalk.yellow(this.appname) +
          '\n' +
          "I'll automatically create this folder."
      )
      mkdirp(this.appname)
      this.destinationRoot(this.destinationPath(this.appname))
    }
  }

  install() {
    this.installDependencies({ bower: false })
  }
}