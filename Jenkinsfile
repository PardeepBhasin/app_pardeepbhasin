pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    environment {
        scannerHome = tool 'SonarQubeScanner'
        dockerImage = ''
        registryCredential = 'dockerhubcredentials'
        imagename = 'pardeepbhasin123/i-pardeepbhasin-master'
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
                    dockerImage = docker.build imagename
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
        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push("$BUILD_NUMBER")
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }
}
