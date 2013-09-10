'use strict';

module.exports = function(grunt){

  grunt.initConfig({

    meta: {
      lib: 'lib/*.js',
      test: 'test/**/*.js',
      tasks: 'tasks/*.js',
      example: 'example/*.js',
      readme: 'README.md'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      lib: {
        src: '<%= meta.lib %>'
      },
      test: {
        src: '<%= meta.test %>'
      },
      tasks: {
        src: '<%= meta.tasks %>'
      },
      example: {
        src: '<%= meta.example %>'
      }
    },

    clean: {
      docs: {
        src: '_docs'
      },
      coverage: {
        src: '_coverage'
      }
    },

    watch: {
      lib: {
        files: '<%= meta.lib %>',
        tasks: ['jshint:lib', 'test', 'docs']
      },
      test: {
        files: '<%= meta.test %>',
        tasks: ['jshint:test', 'test', 'docs']
      },
      tasks: {
        files: '<%= meta.tasks %>',
        tasks: ['jshint:tasks', 'test', 'docs']
      },
      example: {
        files: '<%= meta.example %>',
        tasks: ['jshint:example', 'docs']
      },
      readme: {
        files: '<%= meta.readme %>',
        tasks: ['docs']
      }
    },

    docker: {
      all: {
        src: [
          '<%= meta.lib %>',
          '<%= meta.test %>',
          '<%= meta.tasks %>',
          '<%= meta.example %>',
          'README.md'
        ],
        dest: '_docs',
        options: {
          onlyUpdated: true,
          colourScheme: 'default'
        }
      }
    },

    istanbul: {
      options: {
        mochaFiles: 'test/spec/*_spec.js',
        mochaReporter: 'spec',
        mochaUi: 'bdd',
        root: 'lib',
        runner: 'test/helpers/runner.js'
      },
      test: {
        options: {
          command: 'test'
        }
      },
      cover: {
        options: {
          coverageOutputDir: '_coverage',
          command: 'cover',
          reportType: 'html'
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docker');

  grunt.registerTask(
    'docs',
    'Generate documentation using docker.',
    ['docker']
  );
  
  grunt.registerTask(
    'cover',
    'Runs the unit tests and generates a code coverage report.',
    ['clean:coverage', 'istanbul:cover']
  );

  grunt.registerTask(
    'test',
    'Runs the unit tests.',
    ['istanbul:test']
  );
  
  grunt.registerTask(
    'start',
    'Re-generates the documentation then watches the relevant files, executing the appropriate tasks on change.',
    ['clean', 'docs', 'watch']
  );

};