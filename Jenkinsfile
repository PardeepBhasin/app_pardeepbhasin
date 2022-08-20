pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    environment {
        scannerHome = tool 'SonarQubeScanner'
        dockerImage = ''
        registryCredential = 'dockerhubcredentials'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/'+env.BRANCH_NAME]], extensions: [], userRemoteConfigs: [[url: 'https://github.com/PardeepBhasin/app_pardeepbhasin.git']]])
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    echo "Branch name is "+env.BRANCH_NAME
                    dockerImage = docker.build 'pardeepbhasin123/i-pardeepbhasin-'+env.BRANCH_NAME
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
        stage('Kubernetes Deployment') {
		    steps {
                echo "Kubernetes deployment"
		        bat "kubectl --kubeconfig=C:\\Users\\pardeepbhasin\\.kube\\Config apply -f deployment.yaml"
		    }
		}
    }
}
