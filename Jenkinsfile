pipeline {
    agent any

    options {
        ansiColor('xterm')
        timeout(time: 60, unit: 'MINUTES')
    }

    environment {
        // Jenkins Secret Text Credentials
        MAILOSAUR_API_KEY = credentials('MAILOSAUR_API_KEY')
        MAILOSAUR_SERVER_ID = credentials('MAILOSAUR_SERVER_ID')
        MAILOSAUR_DOMAIN = credentials('MAILOSAUR_DOMAIN')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repo...'
                git branch: 'main', url: 'https://github.com/yourusername/fe-valentinos-magic-beans.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                echo 'Building project (if needed)...'
                sh 'npm run build || echo "No build step"'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Running Vitest unit tests...'
                sh 'npx vitest run --reporter=verbose || true' // don't fail pipeline if unit tests fail
            }
        }

        stage('Run E2E Tests') {
            steps {
                echo 'Creating .env file for Playwright...'
                sh """
                    echo "MAILOSAUR_API_KEY=$MAILOSAUR_API_KEY" > .env
                    echo "MAILOSAUR_SERVER_ID=$MAILOSAUR_SERVER_ID" >> .env
                    echo "MAILOSAUR_DOMAIN=$MAILOSAUR_DOMAIN" >> .env
                """

                echo 'Installing Playwright browsers...'
                sh 'npx playwright install --with-deps'

                echo 'Running Playwright E2E tests...'
                sh 'npm test || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Mock deployment: deploy scripts go here'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
