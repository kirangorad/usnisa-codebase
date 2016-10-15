var baseURL = 'http://localhost:3000';
//var baseURL = 'http://localhost:3000';

// Module specific configuration
angular.module('app.config',[])
  .value('app.config', {
    basePath: baseURL // Set your base path here
});
