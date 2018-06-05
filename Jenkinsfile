pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test Karma') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Build Dist') {
      steps {
        echo 'Build Dist'
      }
    }
    stage('Send to s3') {
      steps {
        echo 'Send to s3'
      }
    }
    stage('Acceptance Test') {
      steps {
        echo 'Acceptance Test'
      }
    }
    stage('Clean Up') {
      steps {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, deleteDirs: true)
      }
    }
  }
  environment {
    CHROME_BIN = '/usr/bin/google-chrome'
  }
}