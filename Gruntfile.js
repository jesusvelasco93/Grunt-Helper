module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            options: {
                sourceMap: false
            },
            built: {
                src     : ['./JavaScript/*.js'],
                dest    : './dist/',
                expand  : true,
                rename  : function (dest, src) {
                    var folder    = src.substring(0, src.lastIndexOf('/'));
                    var filename  = src.substring(src.lastIndexOf('/'), src.length);

                    filename  = filename.substring(0, filename.lastIndexOf('.'));

                    return dest + filename + '.js';
                }
            }
        },

        obfuscator: {
            task1: {
                    src     : ['./dist/*.js'],
                    dest    : './dist/',
                    expand  : true,
                    rename  : function (dest, src) {
                        var folder    = src.substring(0, src.lastIndexOf('/'));
                        var filename  = src.substring(src.lastIndexOf('/'), src.length);

                        filename  = filename.substring(0, filename.lastIndexOf('.'));

                        return dest + filename + '.js';
                }   
            },
            // tasks: ['uglify']
        },
        watch: {
            js: {
                files: ['./JavaScript/*.js'],
                tasks: ['jshint']
            },
            html: {
                files: ['./HTML/*.html'],
                tasks: ['validation']
            }
        },

        validation: {
            options: {
                reset: false,
                stoponerror: false
            },
            files: {
                src: ['./HTML/*.html']
            }
        },

        jshint: {
            all: ['Gruntfile.js', './JavaScript/*.js']
        },
      	sass: {
    		dist: {
				files: [{
					// './dist/style.css': './SASS/*.scss'
			        src: ['./SASS/*.scss'],
        			dest: './dist/style.css',
				}]
		    }
	  	}
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-obfuscator');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // default task(s).
    grunt.registerTask('default', ['jshint', 'watch']);
    grunt.registerTask('min', ['uglify']);
    grunt.registerTask('minObf', ['uglify', 'obfuscator']);
    grunt.registerTask('sassToCss', ['sass']);

};