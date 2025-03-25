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
                sh 'npx vite build'
            }
        }

        stage('Test') {
            steps {
                echo 'No tests defined yet. Skipping test step.'
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
            echo '✅ Build completed successfully.'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
