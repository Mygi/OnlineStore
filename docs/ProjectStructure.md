# File structure for Angular App
## Concept
There are two distinct apps - one is a superset of the other.

1. Front-end (the customer facing app)
2. Back-End (the store manager and admin facing app)

* Each build off a central provider for navigation, layout and potentially search.
* There are multiple pages for each app.

## Some background 
[Angular Folder Structure – Tom Cowley – Medium](https://medium.com/@motcowley/angular-folder-structure-d1809be95542)
[Style Guide](https://angular.io/guide/styleguide#!#application-structure-and-angular-modules)

## 1st Idea
Separate into three modules and inherit as a hierarchy
* Shared (module)
	* Components
	* Services
	* Models
	* Pipes
	* Routes
* Front-End (module)
	* Components
	* Directives
	* Mocks
	* Models
	* Pages
	* Pipes
	* Routes
	* Services
* Back-end (Module)
	* Components
	* Directives
	* Mocks
	* Models
	* Pages
	* Pipes
	* Routes
	* Services

Needs to be compliant with:
`ng create module` 
`ng create component`

## Commit script as part of build
As the CI for the development server works out of the dist folder - it is important to run an npm build-dev before pushing code to the remote.

A shell script for patching release candidates will be created as:
`npm build-dev`
`npm version patch`
`git commit -a`
`git push`

### On Git commits and structure
Hence a patch is used on each commit. The following semantics apply:

* All work is moved to a dev branch
* Master branch is for CI only
* Features are derived from the development branch as `git checkout -b <feature> dev`
* Then `git push --set-upstream origin <feature>`
* A feature relates to an Asana parent task (logged as time on FreeWork as well)
* All git commits on a feature branch should relate to sub-tasks/patching fo subtasks
* Version Numbering <MilestoneRelease>.<MasterRelease>.<MasterPatch>
* Initial Version is all existing views migrated into new Angular 5 structure with essential scaffolding (version 0.1)

## Naming conventions
* File names: kebab cased as in file-name.<type>.ts
* Class/Object Names: pascal cased as in ClassName
* Methods: camel cased as in this.methodName( )
* Variables: camel cased as in variableName: String and this.methodName( variableName );


## Service and data conventions
* In order to emulate http client, test data is stored in pure json
* Where A service is a simple get Request for a single component - subscribe data is defaulted to the componenet's control
* Where Read/Write occur on the same service on more than one component, data is managed by the service
* Where Read/Write are performed - test scaffolding will use the in-memory-web-api by Angular (in the mocks folder)


## SCSS thoughts
* Allowing a modular structure that pulls from a central set of mixins and variables is a little messy.
* There needs to be a way to programmatically invoke scss variable central dependencies (like a config)