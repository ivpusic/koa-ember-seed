'use strict';
var path = require('path');

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			dev: {
				files: {
					'public/css/main.css': 'client/less/main.less'
				}
			}
		},

		'ember_handlebars': {
			compile: {
				options: {
					processName: function(filePath) {
						var pieces = filePath.split('/');
						return pieces[pieces.length - 1].split('.')[0];
					},
					processPartialName: function (filePath) { 
						var pieces = filePath.split('/');
						return pieces[pieces.length - 1].split('.')[0];
					}
				},
				files: {
					'public/js/templates.js': 'client/app/**/*.hbs'
				}
			}
		},

		'compile-handlebars': {
			index: {
				template: 'client/index.hbs',
				templateData: '',
				output: 'public/index.html'

			}
		},

		nodemon: {
			dev: {
				script: 'server/main.js',
			}
		},

		watch: {
			options : {
				livereload: true,
				spawn: false
			},

			css: {
				files: ['client/less/*.less'],
				tasks: ['less'],
			},

			handlebars: {
				files: ['client/app/**/*.hbs'],
				tasks: ['ember_handlebars']
			},

			appjs: {
				files: [
					'client/app/*.js',
					'client/app/**/*.js'
				],
				tasks: ['neuter']
			},

			index: {
				files: [
					'client/index.hbs'
				],
				tasks: ['compile-handlebars']
			}
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		concat: {
			'dev_vendor_js': {
				src: [
					'bower_components/jquery/jquery.js',
					'bower_components/bootstrap/dist/js/bootstrap.js',
					'bower_components/handlebars/handlebars.runtime.js',
					'bower_components/ember/ember.js',
					'bower_components/ember-data/ember-data.js'
				],
				dest: 'public/js/vendor.js',
			},
			'dev_vendor_css': {
				src: [
					'bower_components/bootstrap/dist/css/bootstrap.css'
				],
				dest: 'public/css/vendor.css'
			}
		},

		neuter: {
			dev: {
				src: [
					'client/app/*.js',
					'client/app/**/*.js'
				],
				dest: 'public/js/main.js'
			}
		}
	});

	grunt.registerTask('build:dev', ['neuter:dev', 'concat:dev_vendor_js', 'concat:dev_vendor_css', 'less:dev', 'compile-handlebars', 'ember_handlebars']);
	grunt.registerTask('default', ['build:dev', 'concurrent']);
};
