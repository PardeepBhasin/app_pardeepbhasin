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
                bat "npm install"
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage(''Sonarqube Analysis) {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    bat "npm install"
                    withSonarQube('sonar') {
                        bat "npm install sonar-scanner"
                        bat "npm run sonar"
                    }
                }
            }
        }
    }
}
