def dockerhub = "dzulfikarindzar/jenkins"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {

    agent any

    parameters {
        string(name: "dzulfikar", defaultValue: 'Test Params', description: 'Trying Jenkinsfile')
        booleanParam(name: "TEST", defaultValue: 'true', description: 'Trying Jenkinsfile')
        choice(name: "DEPLOY", choices: ["Yes", "No"], description: 'Trying Jenkinsfile')

    }

    stages {

        stage ("Install depedencies"){
            steps {
                nodejs("nodever14"){
                    sh 'npm install'
                }
            }
        }

        stage ("Build Docker"){
            when {
                expression {
                    params.TEST
                }
            }
            steps {
                script{
                    builder = docker.build("${dockerhub}:${BRANCH_NAME}")
                }
            }
        }
        
        stage ("Testing"){
            when {
                expression {
                    params.TEST
                }
            }
            steps {
                 script{
                    builder.inside {
                        sh 'echo passed'
                    }
                }
            }
        }

        stage ("Push Image"){
            steps {
                 script{
                    builder.push()
                }
            }
        }

          stage ("Deploy"){
            steps {
                 script{
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'develop',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        remoteDirectory: 'app',
                                        execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd ./app/app; docker-compose stop; docker-compose up -d --force-recreate",
                                        execTimeout: 1200000
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}