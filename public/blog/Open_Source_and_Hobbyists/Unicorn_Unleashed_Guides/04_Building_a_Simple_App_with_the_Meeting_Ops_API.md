# Blog Post: Your First Meeting Ops Integration: A Python Transcript Viewer

**Series:** Unicorn Unleashed: A Hacker's Guide

---

## Building on Top of the Appliance

The **Meeting Ops** appliance is a powerful, self-contained system for recording and transcribing meetings. While its web interface is great for end-users, its real power for developers comes from its comprehensive, API-first design. Every action you can take in the UI is also exposed via a secure REST API.

This tutorial will show you how to tap into that API to build a simple but useful command-line tool to browse and view your meeting transcripts.

## Step 1: Get Your API Key

Before you can talk to the API, you need to authenticate. 

1.  Log in to your Meeting Ops web interface.
2.  Navigate to `Settings -> API Keys`.
3.  Generate a new key and copy it. Keep this key secure, as it grants access to your data.

(A screenshot of this UI would be placed here).

## Step 2: The Command-Line Viewer Script

We'll write a Python script that connects to the appliance, lists all available recordings, and then lets you choose one to view.

### Setup

```bash
# Make sure you have the popular 'requests' library installed
pip install requests

# Set environment variables for your appliance's address and your key
export MEETING_OPS_URL="http://192.168.1.100:9050" # Use your appliance's IP
export MEETING_OPS_API_KEY="your_api_key_here"
```

### The Code (`view_transcripts.py`)

```python
import os
import requests

# 1. Get config from environment
API_URL = os.getenv("MEETING_OPS_URL")
API_KEY = os.getenv("MEETING_OPS_API_KEY")

if not API_URL or not API_KEY:
    print("Error: Please set MEETING_OPS_URL and MEETING_OPS_API_KEY env vars.")
    exit(1)

HEADERS = {"Authorization": f"Bearer {API_KEY}"}

# 2. Fetch all recorded sessions from the API
try:
    print("Fetching recorded sessions...")
    response = requests.get(f"{API_URL}/api/recording-sessions", headers=HEADERS)
    response.raise_for_status() # Checks for HTTP errors
    sessions = response.json()
except requests.exceptions.RequestException as e:
    print(f"Error connecting to Meeting Ops: {e}")
    exit(1)

# 3. Display a menu for the user to choose from
print("\n--- Available Meetings ---")
for i, session in enumerate(sessions):
    print(f"  [{i}] - {session['created_at']} - {session.get('name', 'Untitled Session')}")

choice = int(input("\nEnter the number of the session to view: "))
selected_session_id = sessions[choice]['id']

# 4. Fetch the full details, including the transcript, for the chosen session
print(f"\nFetching transcript...")
response = requests.get(f"{API_URL}/api/recording-sessions/{selected_session_id}", headers=HEADERS)
response.raise_for_status()
session_details = response.json()

# 5. Print the formatted transcript
print("\n--- Transcript ---")
transcript = session_details.get('transcript', {})
if not transcript or not transcript.get('segments'):
    print("No transcript available for this session.")
else:
    for segment in transcript['segments']:
        speaker = segment.get('speaker', 'SPEAKER_UNKNOWN')
        start = float(segment['start'])
        text = segment['text']
        print(f"[{int(start//60):02d}:{int(start%60):02d}] {speaker}: {text}")

```

### Step 3: Run your tool!

```bash
python view_transcripts.py
```

The script will connect to your appliance, show you a list of your recordings, and print a clean, readable transcript for the one you select.

## Conclusion

This simple tool is just the beginning. Because **Meeting Ops** is API-first, you can integrate its powerful capabilities into any workflow you can imagine. You could write a script to automatically download all new transcripts to a local folder, a Slack bot that posts meeting summaries to a channel, or a custom analytics dashboard. The platform is yours to build on.