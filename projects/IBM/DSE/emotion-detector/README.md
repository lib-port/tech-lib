# Final project

This is a small Flask application that detects five emotions in customer
feedback: anger, disgust, fear, joy, and sadness. It uses the official GitHub
Copilot SDK in place of the Watson NLP endpoint from the original IBM exercise.

## Architecture

- `EmotionDetection/` contains the public `emotion_detector()` function and
  all Copilot interaction and response validation.
- `server.py` contains the two Flask routes.
- `templates/` and `static/` contain the browser interface.
- `test_emotion_detection.py` contains deterministic package and route tests.

Each valid analysis creates an isolated Copilot session with no tools, skills,
repository context, or host operations. Copilot supplies the five scores, and
Python validates them and calculates the dominant emotion. Blank input is
handled locally without making a Copilot request.

## Requirements

- Python 3.11 or newer
- A GitHub account with access to GitHub Copilot
- GitHub CLI authentication, Copilot CLI authentication, or a supported token

## Setup

Create a virtual environment and install the dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```

Download the Copilot runtime once:

```bash
python3 -m copilot download-runtime
```

For a local project, the simplest authentication option is an existing GitHub
CLI login:

```bash
gh auth login
```

The SDK can also use `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, or `GITHUB_TOKEN`, in
that order.

The application uses Copilot's `auto` model selection by default. To request a
specific model made available by your Copilot plan, set `COPILOT_MODEL` before
starting the server.

## Run the application

```bash
python3 server.py
```

Open <http://127.0.0.1:5000> in a browser. The analysis endpoint is also
available directly:

```text
GET /emotionDetector?textToAnalyze=I%20am%20glad
```

The Python package can be used without Flask:

```python
from EmotionDetection import emotion_detector

result = emotion_detector("I am glad this happened")
print(result)
```

## Test and lint

The tests mock the Copilot request boundary, so they are fast, deterministic,
and do not require authentication or consume Copilot requests.

```bash
python3 -m unittest -v
python3 -m pylint EmotionDetection server.py test_emotion_detection.py
```

After authenticating, use the package example above as the manual live-service
smoke test.

## Partial Clone

To clone only this folder and not the rest of the repository:

```bash
git clone --depth=1 --filter=blob:none --sparse https://github.com/lib-port/tech-lib.git
cd tech-lib
git sparse-checkout set projects/IBM/DSE/emotion-detector
mkdir -p ../emotion-detector
rsync -a projects/IBM/DSE/emotion-detector/ ../emotion-detector/
cd ..
rm -rf tech-lib
```
