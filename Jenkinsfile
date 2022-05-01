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
                echo 'Bulid Docker'
                sh "docker build . -t 438282170065.dkr.ecr.ap-northeast-2.amazonaws.com/custom-nginx:${currentBuild.number}"
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
                echo 'Push Docker'
                script {
                    docker.withRegistry('https://438282170065.dkr.ecr.ap-northeast-2.amazonaws.com/anchor-book-be', 'ecr:ap-northeast-2:anchor-ecr-credentials') {
                        dockerImage.push("${currentBuild.number}")
                    }
                }

            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }   
            }
        }

        // k8s manifest update
        stage('K8S Manifest Update') {
            steps {
                git credentialsId: registryCredential,
                    url: 'https://github.com/GoormAnchor/anchor-k8s-deploy',
                    branch: 'main'

                sh "sed -i 'custom-nginx:.*\$/my-app:${currentBuild.number}/g' deployment.yaml"
                sh "git add custom-nginx.yaml"
                sh "git commit -m 'UPDATE custom-nginx ${currentBuild.number} image versioning'"
                sshagent(credentials: ['anchor-repo-credentials']) {
                    sh "git remote set-url origin git@github.com:GoormAnchor/anchor-k8s-deploy.git"
                    sh "git push -u origin main"
                }
            }
            post {
                failure {
                  echo 'K8S Manifest Update failure !'
                }
            }
        }
    }
}