# Build Process
The development strategy is following the models as described here:
[GitFlow](http://nvie.com/posts/a-successful-git-branching-model/)
[Gitflow at github](https://github.com/nvie/gitflow)
[Pipeline: ](GitFlowIdea.pdf)
[Sample Data flow](https://danielkummer.github.io/git-flow-cheatsheet/index.html)
## Installation
A few options to build from:

1. Production Version [Currently Failing!]
go to your console  
` git clone https://github.com/TheFindersKeepers/OnlineMarketplace-Frontend.git`  
`npm install`  
`npm run test`  

If it passes:  
`npm run start`

### 2. Release
` git clone https://github.com/TheFindersKeepers/OnlineMarketplace-Frontend.git`  
` git fetch`  
` git checkout v[VersionNumber]`  
`npm install`  
`npm run test` 

If it passes:  
`npm run start`

### 3. Development 
` git clone https://github.com/TheFindersKeepers/OnlineMarketplace-Frontend.git`  
` git fetch`  
` git checkout dev`   
`npm install`  
`npm run test`  

## To start a new feature
When: New code from a planned feature in Asana

`git checkout -b <myfeature> dev`
`git branch --set-upstream-to=origin/dev <myfeature>`
`git pull`
`npm version minor`

Commits are:
`git commit -a`
`npm version patch`
`git push`

## Complete a feature and make pull request
Without gitflow (requires git > 2.16 )
NB: This is ideally done against a milestone in Github
`git request-pull [-p] <start> <url> [<end>]`

Otherwise
Got to github and follow instructions here: https://help.github.com/articles/about-pull-requests/

* Important: Make sure you run `npm run build-dev` before submitting a pull request
* Important: Make sure you run `npm run test-dev` before submitting a pull request. This will be checked before approval.
* An approved pull request will initiate a build cycle on AWS EC2 with code from the dist file created from the local build.
* dev url: http://dev.thefinderskeepersmarketplace.com/

## Create a release
`git checkout -b <myRelease> dev`
* Important: Make sure you run `npm run build-prod` before submitting a pull request
* Important: Make sure you run `npm run start-prod` before submitting a pull request
* Important: Make sure you run `npm run test-prod` before submitting a pull request
* An approved pull request will initiate a build cycle on AWS S3/Codebuild with `npm run build-prod`
* release url: TBA


## Complete a release
* Pull request to master
`git request-pull [-p] <start> <url> [<end>]`
* tag version
`git tag <version>`

* Published releases will be merged by pull request on the Master Branch which can be prepared for manual deployment to production.

## Something is broken on production. Create a hotfix like so:
`git checkout -b <hotFix> master`
then finish as so:
npm version
`git request-pull [-p] <start> <url> [<end>]`
or By GitHub pull rquest


## What goes where?
1. New code/view on a feature? Checkout a feature branch
2. Fixing something already merged and part of a release? Checkout the release branch and fix
3. Switching between feature branch (performing a code review for instance) - use git checkout.

## Gitflow cheat sheet
[Commands](https://github.com/nvie/gitflow/wiki/Command-Line-Arguments)


