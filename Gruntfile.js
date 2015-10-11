/*global module*/
module.exports = function(grunt) {

  // require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    wiredep: {
      task: {
        src: ['index.html']
      }
    },
    uglify: {
      my_target: {
        files: {
          'dest/output.min.js': ['src/input1.js', 'src/input2.js']
        }
      },
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "js/app.js": "js/index.js"
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      },
      build: ['Gruntfile.js', 'src/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/homepage.css": "css/homepage.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['css/homepage.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      },
      bower_components: {
        files: ['bower_components/*'],
        tasks: ['wiredep']
      }
    },
    browserify: {
      '/js/index.js': ['/js/index.jsx']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');


  grunt.registerTask('default', ['jshint', 'uglify']);
  grunt.registerTask('changes', ['watch']);
  grunt.registerTask('babel', ['babel']);
  grunt.registerTask('update', ['less']);

};
