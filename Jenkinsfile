pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'No tests defined yet. Skipping test step.'
                // sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment step will be added later.'
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully.'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
