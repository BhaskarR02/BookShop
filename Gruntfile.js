/*
*/

module.exports = function(grunt){
grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'),
             
             
            /* Used to watch changes in the files and run the relevant task*/
              watch:{
                     lessFiles:{
                        files:["less/*.less"],
                        //tasks:["less","concat","cssmin"]
                        tasks:["less"]
                     }
              },
             /* Convert less files to css files*/
	          less:{
	          	development:{
	          		options:{
	          			path:['WebContent/styleSheets/less/'],
	          			yuicompress:true
	          		},
	          		files:{
	          			"css/main.css":"less/main.less"
	          		}	
	          	},
	          	

	          },

            /*Concat multiple css files to a single file*/
              concat:{
				dist:{
              		src:['WebContent/styleSheets/css/default/*.css','WebContent/styleSheets/css/header/*.css'],
              		dest:'WebContent/styleSheets/minified/main.css'
              	}
              },   

           /* minifying css files*/
				cssmin:{
                      target:{
                      	files:[{
                      		expand:true,
                      		cwd:'WebContent/styleSheets/minified',
                      		src:['*.css','!*-min.css'],
                      		dest:'WebContent/styleSheets/minified',
                      		ext:'-min.css'
                      	}]
                      }
				
				}
});

grunt.registerTask('watchLessFiles',['watch:lessFiles']);
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
//grunt.registerTask('default',['less','concat','cssmin']);
grunt.registerTask('default',['watch']);
};
