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
        stage('Build') {
            steps {
                script {
                    echo "Branch name is "+env.BRANCH_NAME
                    dockerImage = docker.build 'pardeepbhasin123/i-pardeepbhasin-'+env.BRANCH_NAME
                    echo "Docker image build done"
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
                echo "Sonar analysis done"
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
                echo "Text execution done"
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
                echo "Image pushed successfully"
            }
        }
        stage('Kubernetes Deployment') {
		    steps {
                echo "Kubernetes deployment"
                bat "kubectl apply -f namespace.yaml"
                bat "kubectl apply -f configmap.yaml"
                bat "kubectl apply -f secret.yaml"
		        bat "kubectl apply -f deployment.yaml"
                echo "Deployment done"
		    }
		}
    }
}
