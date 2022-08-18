pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    environment {
        scannerHome = tool 'SonarQubeScanner'
        dockerImage = ''
        registryCredential = 'dockerhubcredentials'
        imagename = 'pardeepbhasin123/i-pardeepbhasin-'+${GIT_BRANCH}
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/PardeepBhasin/app_pardeepbhasin.git']]])
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
            when {
                branch "develop"
            }
            steps {
                withSonarQubeEnv('Test_Sonar') {
                    bat "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
        stage('Test case execution') {
            when {
                branch "master"
            }
            steps {
                bat "npm install jest-environment-jsdom"
                bat "npm install -g jest"
                bat "npm test"
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
