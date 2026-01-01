pipeline {
    agent any

    options {
        ansiColor('xterm')                  // Colored logs
        timeout(time: 60, unit: 'MINUTES') // Max time for the pipeline
    }

    environment {
        NODE_HOME = "/opt/homebrew/opt/node@22/bin"
        PATH = "$NODE_HOME:$PATH"
    }

    stages {
        stage('Install & Build') {
            steps {
                echo 'Node version:'
                sh 'node -v'
                echo 'NPM version:'
                sh 'npm -v'

                echo 'Installing dependencies...'
                sh 'npm ci'

                echo 'Building project...'
                sh 'npm run build'
            }
        }

        stage('Unit Tests') {
            steps {
                echo 'Running unit tests with Vitest...'
                sh 'npx vitest run --reporter=verbose'
            }
        }

        stage('E2E Tests') {
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
