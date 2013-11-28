'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ThreexGenerator = module.exports = function ThreexGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ThreexGenerator, yeoman.generators.Base);

ThreexGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'extensionName',
    message: 'Which name would you give it ?',
    default: 'Sample'
  },
  {
    type: 'confirm',
    name: 'withRequirejs',
    message: 'Would you like to add require.js?',
    default: false
  }];

  this.prompt(prompts, function (props) {
    this.withRequirejs  = props.withRequirejs;
    this.extensionName  = props.extensionName;

    cb();
  }.bind(this));
};

ThreexGenerator.prototype.app = function app() {

  this.template('Makefile', 'Makefile');
  this.template('README.md', 'README.md');
  this.template('LICENSE', 'LICENSE');

  this.template('examples/basic.html', 'examples/basic.html');   
  this.template('threex.sample.js', 'threex.'+this.extensionName.toLowerCase()+'.js');   

  this.mkdir('examples');
  this.mkdir('examples/vendor');
  this.mkdir('examples/vendor/three.js');
  this.mkdir('examples/vendor/three.js/build');
  this.copy( 'examples/vendor/three.js/build/three-min.js', 'examples/vendor/three.js/build/three-min.js');

  if( this.withRequirejs ){
    this.mkdir('examples/vendor/require.js');
    this.copy('examples/vendor/require.js/require.js', 'examples/vendor/require.js/require.js');

    this.template('examples/requirejs.html', 'examples/requirejs.html');
  }
};

ThreexGenerator.prototype.projectfiles = function projectfiles() {
  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
};
