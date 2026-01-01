pipeline {
    agent any

    options {
        ansiColor('xterm')                // Colored logs
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

                echo 'Running Playwright E2E tests...'
                sh 'npx playwright test --reporter=list'
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
