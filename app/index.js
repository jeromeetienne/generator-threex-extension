'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ThreejsGenerator = module.exports = function ThreejsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ThreejsGenerator, yeoman.generators.Base);

ThreejsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'extensionName',
    message: 'Which name would you give it ?',
    default: 'SuperExtension'
  }];

  this.prompt(prompts, function (props) {
    this.extensionName = props.extensionName;

    cb();
  }.bind(this));
};

ThreejsGenerator.prototype.app = function app() {

  this.copy('Makefile', 'Makefile');
  this.template('README.md', 'README.md');

  this.mkdir('examples');
  this.mkdir('examples/vendor');
  this.mkdir('examples/vendor/three.js');
  this.mkdir('examples/vendor/three.js/build');
  this.copy( 'examples/vendor/three.js/build/three.js', 'examples/vendor/three.js/build/three.js');

  this.copy('examples/basic.html', 'examples/basic.html');   
  this.template('threex.sample.js', 'threex.'+this.extensionName.toLowerCase()+'.js');   
};

ThreejsGenerator.prototype.projectfiles = function projectfiles() {
  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
};
