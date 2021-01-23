

pipeline {

    agent any

    parameters {
        string(name: "dzulfikar", defaultValue: 'Test Params', description: 'Trying Jenkinsfile')
        booleanParam(name: "TEST", defaultValue: 'false', description: 'Trying Jenkinsfile')
        choice(name: "DEPLOY", choices: ["Yes", "No"], description: 'Trying Jenkinsfile')

    }

    stages {

        stage ("Build"){
            steps {
                echo "Hello from build"
            }
        }

        stage ("Testing"){
            when {
                expression {
                    params.TEST
                }
            }
            steps {
                echo "Hello from Testing"
            }
        }

        stage ("Deploy"){
             when {
                expression {
                    params.DEPLOY == "Yes"
                }
            }
            steps {
                echo "HelLo from deploy"
            }
        }
    }
}