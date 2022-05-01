pipeline {
    agent any

    environment {
        imagename = "custom-nginx"
        registryCredential = 'anchor-ecr-credentials'
        dockerImage = ''
    }

    stages {
        // git에서 repository clone
        stage('Prepare') {
            steps {
                echo 'Clonning Repository'
                git url:'https://github.com/GoormAnchor/anchor-book-fe', branch:'Seyeon', credentialsId: 'anchor-repo-credentials';
            }
            post {
                success {
                    echo 'Successfully Cloned Repository'
                }
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        // docker build
        stage('Bulid Docker') {
            steps {
                sh "docker build . -t 438282170065.dkr.ecr.ap-northeast-2.amazonaws.com/custom-nginx:${currentBuild.number}"
                sh "docker build . -t 438282170065.dkr.ecr.ap-northeast-2.amazonaws.com/custom-nginx:latest"
            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        // docker push
        stage('Push Docker') {
            steps {
                script {
                    docker.withRegistry('https://438282170065.dkr.ecr.ap-northeast-2.amazonaws.com/anchor-book-be', 'ecr:ap-northeast-2:anchor-ecr-credentials') {
                        app.push("${currentBuild.number}")
                        app.push("latest")
                }
            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }
    }
}