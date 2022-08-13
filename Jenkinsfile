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
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'GitHubUsernameAndPasswordAsToken', url: 'https://github.com/PardeepBhasin/NextAppPub.git']]])
            }
        }
        stage('Install Packages') {
            steps {
                sh "npm install"
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
    }
}
