# Slack Bot

A Slack bot that helps users find lost items by searching through a table in the Google Sheets.

## Setup Instructions

### 1. Clone Repository

```bash
git clone git@github.com:ikojun00/Slack-bot.git
cd Slack-bot
npm install
```

### 2. Configure Slack App

Follow the documentation from the beginning to the section 'Listening and responding to a message':
https://tools.slack.dev/bolt-js/getting-started/

Create `.env.local` in the root of the project. Copy and paste your tokens:

```bash
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=123abc...
SLACK_APP_TOKEN=xapp-...
```

### 3. Set Up Google Sheets

#### 1. Create a Google Sheet with columns

- A: Item Name
- B: Location

#### 2. Enable Sheets API:

- Go to Google Cloud Console
- Create a new project or select an existing one
- Enable Google Sheets API
- Go to "Credentials" → "Create Credentials" → "Service Account"
- Fill in service account details
- Under "Keys" tab, click "Add Key" → "Create new key" → JSON
- Download the JSON file
- Name the file `credentials.json` and place it in your project

#### 3. Share your Google Sheet:

- Open your Google Sheet
- Click "Share" in top-right corner
- Add the email address from `client_email` in credentials.json
- Set permission to "Editor"

### 4. Configure Environment

```bash
# config.js
SHEET_ID="your-google-sheet-id"
```

## Running the Bot

```bash
node app.js
```
