pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
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

        stage('Deploy to AWS EC2') {
            steps {
                sshagent(credentials: ['aws-ec2-ssh']) {
                    sh '''
                        echo "Deploying to EC2..."
                        scp -o StrictHostKeyChecking=no -r dist/* ubuntu@184.73.0.79:/var/www/html/
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and deploy completed successfully.'
        }
        failure {
            echo '❌ Something went wrong during build or deployment.'
        }
    }
}
