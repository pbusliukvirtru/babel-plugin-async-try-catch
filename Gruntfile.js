module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMaps: 'inline',
                presets: [ 'es2015', 'es2016', 'es2017', 'stage-0' ],
                plugins: [ 'transform-strict-mode', 'transform-runtime' ]
            },
            src: {
                expand: true,
                src: 'src/**/*.js',
                dest: 'target'
            },
            test: {
                options: {
                    plugins: [
                        'babel-plugin-espower'
                    ],
                },
                expand: true,
                src: 'test/src/**/*.js',
                dest: 'target',
            }
        },
        clean: [ 'target' ],
        mochaTest: {
            src: 'target/test/src/**/*.js'
        }
    });

    grunt.registerTask('compile:src', [ 'babel:src' ]);
    grunt.registerTask('compile:test', [ 'babel:test' ]);
    grunt.registerTask('compile', [ 'compile:src' ]); //, 'compile:test'
    grunt.registerTask('test', [ 'compile', 'mochaTest' ]);
    grunt.registerTask('default', [ 'test' ]);
};
