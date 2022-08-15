pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    environment {
        dockerImage = ''
        registryCredential = 'dockerhubcredentials'
        registry = 'pardeepbhasin123/next-app'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/PardeepBhasin/app_pardeepbhasin.git']]])
            }
        }
        stage('Install Packages') {
            steps {
                sh "npm install"
            }
        }
    }
}
