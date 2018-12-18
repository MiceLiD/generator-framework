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
    this.log('Start building...')
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        validate: (name) => {
          if (name.includes(' ')) {
            this.log(' cannot contain spaces！')
            return
          }
          return true
        },
        default: this.appname
      },
      {
        type: 'input',
        name: 'version',
        message: 'Your project version',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        default: 'This is an fullstack project'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Your project author',
        default: ''
      },
      {
        type: 'input',
        name: 'appPrefix',
        message: 'Your project app-prefix and static folder name',
        default: 'framework',
        validate: (appPrefix) => {
          if (appPrefix.includes(' ')) {
            this.log(' cannot contain spaces！')
            return
          }
          return true
        }
      },
      {
        type: 'list',
        name: 'feStack',
        message: 'Choose front-end technology stack',
        choices: ['vue', 'react'],
        default: 0
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Do you need automatic installation dependencies?',
        default: true
      }
    ]).then(answers => {
      this.appname = answers.name
      this.version = answers.version
      this.description = answers.description
      this.author = answers.author
      this.feStack = answers.feStack
      this.install = answers.install
      this.appPrefix = answers.appPrefix
    })
  }

  default() {
    let dirName = this.appname
    
    if (fs.existsSync(dirName)) {
      dirName = dirName + '_' + new Date().getTime()
      this.log('The current folder already exists and a timestamped folder has been created for you：' + chalk.yellow(dirName))
    } 
    mkdirp(dirName)
    this.destinationRoot(this.destinationPath(dirName))
    this.appname = dirName
  }

  writing() {
    /* 拷贝所需的文件. */
    let flag = this.feStack === 'vue'

    this.fs.copy(
      this.templatePath(flag ? "_build_vue" : "_build_react"),
      this.destinationPath("build")
    );
    this.fs.copy(
      this.templatePath(flag ? "_client_vue" : "_client_react"),
      this.destinationPath("client")
    );
    this.fs.copyTpl(
      this.templatePath("_config"),
      this.destinationPath("config"),
      {
        appPrefix: this.appPrefix
      }
    );
    this.fs.copy(
      this.templatePath("_extensions"),
      this.destinationPath("extensions")
    );
    this.fs.copy(
      this.templatePath("_server"),
      this.destinationPath("server")
    );
    this.fs.copy(
      this.templatePath("_shared"),
      this.destinationPath("shared")
    );
    this.fs.copy(
      this.templatePath("_public"),
      this.destinationPath("public")
    );
    this.fs.copy(
      this.templatePath(flag ? ".babelrc_tpl_vue" : ".babelrc_tpl_react"),
      this.destinationPath(".babelrc")
    );
    this.fs.copyTpl(
      this.templatePath("_README_TPL.md"),
      this.destinationPath("README.md"),
      {
        appname: this.appname,
        appPrefix: this.appPrefix
      }
    );
    this.fs.copy(
      this.templatePath(".gitignore_tpl"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("_start.sh"),
      this.destinationPath("start.sh")
    );
    this.fs.copy(
      this.templatePath("_stop.sh"),
      this.destinationPath("stop.sh")
    );
    this.fs.copy(
      this.templatePath("_restart.sh"),
      this.destinationPath("restart.sh")
    );
    this.fs.copyTpl(
      this.templatePath(flag ? "_package_vue.json" : "_package_react.json"),
      this.destinationPath("package.json"),
      {
        appname: this.appname,
        version: this.version,
        description: this.description,
        author: this.author
      }
    );
  }
  end() {
    fs.unlinkSync(path.join(__dirname, `../../../${this.appname}/public/gitkeep`))
    fs.writeFileSync(path.join(__dirname, `../../../${this.appname}/public/.gitkeep`), '')
    fs.readdir(path.join(__dirname, `../../../${this.appname}/shared/`), (err, result) => {
      if (err) {
        if (err) {
          console.log(err)
        }
        return
      }
      result.forEach(r => {
        fs.unlinkSync(path.join(__dirname, `../../../${this.appname}/shared/${r}/gitkeep`))
        fs.writeFileSync(path.join(__dirname, `../../../${this.appname}/shared/${r}/.gitkeep`), '')
      })
    })
    this.log('Build completed!')
    this.log("Your project folder named " + chalk.yellow(this.appname) + '.')
    this.log(`bash: run 'cd ./${this.appname} && ${!this.install ? 'npm install && npm run dev' : 'npm run dev'}' you will see the page at: http://localhost:8000/${this.appPrefix}`)
  }

  install() {
    if (this.install) {
      this.installDependencies({ bower: false })
    }
  }
}