pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
        EC2_USER = 'ubuntu'
        EC2_HOST = '184.73.0.79' // double-check this matches your current public IP!
        EC2_PATH = '/var/www/html'
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
                        echo "🚀 Deploying to EC2 at $EC2_HOST..."
                        
                        # Test SSH connection before trying to deploy
                        ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST "echo '✅ EC2 connection successful.'"

                        # Copy files to EC2
                        scp -o StrictHostKeyChecking=no -r dist/* $EC2_USER@$EC2_HOST:$EC2_PATH
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
