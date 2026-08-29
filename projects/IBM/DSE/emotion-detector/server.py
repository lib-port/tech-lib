"""Flask web application for the GitHub Copilot emotion detector."""

from flask import Flask, render_template, request

from EmotionDetection import EmotionDetectionError, emotion_detector

app = Flask(__name__)


@app.get("/")
def render_homepage() -> str:
    """Render the emotion detector interface."""
    return render_template("index.html")


@app.get("/emotionDetector")
def analyze_emotion() -> str | tuple[str, int]:
    """Analyze the textToAnalyze query parameter and format its result."""
    text_to_analyze = request.args.get("textToAnalyze", "")

    try:
        result = emotion_detector(text_to_analyze)
    except EmotionDetectionError:
        return "Emotion analysis is temporarily unavailable. Please try again!", 503

    if result["dominant_emotion"] is None:
        return "Invalid text! Please try again!", 400

    response = (
        "For the given statement, the system response is "
        f"'anger': {result['anger']}, "
        f"'disgust': {result['disgust']}, "
        f"'fear': {result['fear']}, "
        f"'joy': {result['joy']} and "
        f"'sadness': {result['sadness']}. "
        f"The dominant emotion is {result['dominant_emotion']}."
    )
    return response


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
