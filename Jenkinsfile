pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    environment {
        scannerHome = tool 'SonarQubeScanner'
        dockerImage = ''
        registryCredential = 'dockerhubcredentials'
        registry = 'pardeepbhasin123/i-BUILD_USER-BRANCH_NAME'
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
                    dockerImage = 'pardeepbhasin123/i-$BUILD_USER-$BRANCH_NAME' + ":latest"
                    echo ${dockerImage}
                    bat 'docker build -t ${dockerImage} .'
                }
            }
        }
        stage('Sonarqube Analysis') {
            steps {
                withSonarQubeEnv('Test_Sonar') {
                    bat "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
    }
}
