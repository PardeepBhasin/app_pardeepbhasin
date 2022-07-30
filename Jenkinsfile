pipeline {
    agent {
        label jenkins-slave
    }

    environment {
        dockerhubcredentials = 'dockerhubcredentials'
    }

    tools{
        nodejs "node"
    }

    stage('Build & Push docker image') {
        steps{
            script {
                dockerImage = docker.build 'pardeepbhasin123/myapp:1.0.4'
                docker.withRegistry('',dockerhubcredentials) {
                    dockerImage.push('1.0.4')
                }
            }
        }
    }
}