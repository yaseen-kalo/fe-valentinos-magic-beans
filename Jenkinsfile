pipeline {
    agent any

    options {
        ansiColor('xterm')                 // Colored logs
        timeout(time: 60, unit: 'MINUTES') // Max time for the entire pipeline
    }

    stages {
        stage('Install & Build') {
            agent {
                docker { image 'node:22-bullseye' } // Node environment for build
            }
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
                
                echo 'Building project...'
                sh 'npm run build'
            }
        }

        stage('Unit Tests') {
            agent {
                docker { image 'node:22-bullseye' }
            }
            steps {
                echo 'Running unit tests with Vitest...'
                sh 'npx vitest run --reporter=verbose'
            }
        }

        stage('E2E Tests') {
            agent {
                docker { image 'mcr.microsoft.com/playwright:v1.44.0-focal' } // Playwright-ready
            }
            steps {
                echo 'Installing Playwright browsers...'
                sh 'npx playwright install --with-deps'

                // Inject Mailosaur secrets and create .env file dynamically
                withCredentials([
                    string(credentialsId: 'MAILOSAUR_API_KEY', variable: 'MAILOSAUR_API_KEY'),
                    string(credentialsId: 'MAILOSAUR_SERVER_ID', variable: 'MAILOSAUR_SERVER_ID'),
                    string(credentialsId: 'MAILOSAUR_DOMAIN', variable: 'MAILOSAUR_DOMAIN')
                ]) {
                    echo 'Creating .env file for Playwright tests...'
                    sh '''
                        echo "MAILOSAUR_API_KEY=$MAILOSAUR_API_KEY" > .env
                        echo "MAILOSAUR_SERVER_ID=$MAILOSAUR_SERVER_ID" >> .env
                        echo "MAILOSAUR_DOMAIN=$MAILOSAUR_DOMAIN" >> .env
                    '''

                    echo 'Running Playwright E2E tests...'
                    sh 'npx playwright test --reporter=list'
                }
            }
        }

        stage('Deploy') {
            agent {
                docker { image 'node:22-bullseye' } // Use Node image if deploy scripts need Node
            }
            steps {
                echo 'Mock deployment: deploy scripts go here.'
                // Example: sh 'bash deploy.sh'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
