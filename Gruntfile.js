'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */' +
                        '\n',
            },
            pub: {
                src: './dist/jquery.smint.js',
                dest: './dist/jquery.smint.min.js'
            }
        },
        jshint: {
            files: ['*.js'],
            beforeconcat: ['.js'],
            afterconcat: ['<%= pkg.name %>.js'],
            options: {
                ignores: ['jquery.*']
            }
        },
        uglify: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */' +
                        '\n',
            },
            pub: {
                files: {
                    './dist/jquery.smint.min.js': ['./dist/jquery.smint.min.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // test task(s)
    grunt.registerTask('test', ['jshint', 'concat']);
    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};
