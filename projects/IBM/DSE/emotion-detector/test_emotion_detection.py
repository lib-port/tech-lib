"""Unit and route tests for the emotion detection application."""

import unittest
from unittest.mock import AsyncMock, patch

import EmotionDetection.emotion_detection as detector_module
from EmotionDetection import EmotionDetectionError, emotion_detector
from server import app

# The parser is private. These focused tests verify its trust boundary.
# pylint: disable=protected-access


def _scores_with_dominant(dominant_emotion: str) -> dict[str, float]:
    """Create predictable scores for a mocked Copilot response."""
    scores = {emotion: 0.05 for emotion in detector_module.EMOTION_NAMES}
    scores[dominant_emotion] = 0.8
    return scores


class TestEmotionDetector(unittest.TestCase):
    """Test the package-level emotion_detector function."""

    @patch(
        "EmotionDetection.emotion_detection._request_scores",
        new_callable=AsyncMock,
    )
    def test_required_dominant_emotions(self, mock_request: AsyncMock) -> None:
        """Return the required dominant emotion for all five assignment texts."""
        cases = (
            ("I am glad this happened", "joy"),
            ("I am really mad about this", "anger"),
            ("I feel disgusted just hearing about this", "disgust"),
            ("I am so sad about this", "sadness"),
            ("I am really afraid that this will happen", "fear"),
        )

        for statement, expected in cases:
            with self.subTest(statement=statement):
                mock_request.return_value = _scores_with_dominant(expected)
                result = emotion_detector(statement)
                self.assertEqual(result["dominant_emotion"], expected)
                self.assertEqual(
                    set(result),
                    {*detector_module.EMOTION_NAMES, "dominant_emotion"},
                )

    @patch(
        "EmotionDetection.emotion_detection._request_scores",
        new_callable=AsyncMock,
    )
    def test_blank_input_does_not_call_copilot(self, mock_request: AsyncMock) -> None:
        """Return the all-None result for empty or whitespace-only text."""
        for statement in ("", "   ", None):
            with self.subTest(statement=statement):
                result = emotion_detector(statement)  # type: ignore[arg-type]
                self.assertTrue(all(value is None for value in result.values()))
        mock_request.assert_not_awaited()

    @patch(
        "EmotionDetection.emotion_detection._request_scores",
        new_callable=AsyncMock,
    )
    def test_runtime_failure_uses_package_exception(
        self,
        mock_request: AsyncMock,
    ) -> None:
        """Translate SDK failures into the package's stable exception."""
        mock_request.side_effect = RuntimeError("RPC unavailable")
        with self.assertRaises(EmotionDetectionError):
            emotion_detector("I am happy")


class TestCopilotResponseParser(unittest.TestCase):
    """Test strict parsing of untrusted model output."""

    def test_valid_json_and_optional_code_fence(self) -> None:
        """Accept a bare or fenced object containing exactly five scores."""
        content = (
            '{"anger": 0.1, "disgust": 0.2, "fear": 0.3, '
            '"joy": 0.8, "sadness": 0.4}'
        )
        expected = {
            "anger": 0.1,
            "disgust": 0.2,
            "fear": 0.3,
            "joy": 0.8,
            "sadness": 0.4,
        }
        self.assertEqual(detector_module._parse_scores(content), expected)
        self.assertEqual(
            detector_module._parse_scores(f"```json\n{content}\n```"),
            expected,
        )

    def test_invalid_model_responses_are_rejected(self) -> None:
        """Reject invalid JSON, schemas, types, and score ranges."""
        invalid_responses = (
            "not JSON",
            '{"anger": 0.1}',
            (
                '{"anger": 0.1, "disgust": 0.2, "fear": 0.3, '
                '"joy": 0.8, "sadness": 0.4, "extra": 1}'
            ),
            (
                '{"anger": true, "disgust": 0.2, "fear": 0.3, '
                '"joy": 0.8, "sadness": 0.4}'
            ),
            (
                '{"anger": -0.1, "disgust": 0.2, "fear": 0.3, '
                '"joy": 0.8, "sadness": 0.4}'
            ),
            (
                '{"anger": 0.1, "disgust": 0.2, "fear": 0.3, '
                '"joy": 1.1, "sadness": 0.4}'
            ),
        )

        for content in invalid_responses:
            with self.subTest(content=content):
                with self.assertRaises(EmotionDetectionError):
                    detector_module._parse_scores(content)


class TestFlaskRoutes(unittest.TestCase):
    """Test the Flask interface without starting a live server."""

    @classmethod
    def setUpClass(cls) -> None:
        """Create a Flask test client for the route tests."""
        app.config.update(TESTING=True)
        cls.client = app.test_client()

    def test_homepage(self) -> None:
        """Render the provided web interface."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"NLP - Emotion Detection", response.data)

    @patch("server.emotion_detector")
    def test_success_response_format(self, mock_detector) -> None:
        """Return the exact customer-facing emotion sentence."""
        mock_detector.return_value = {
            "anger": 0.01,
            "disgust": 0.02,
            "fear": 0.03,
            "joy": 0.9,
            "sadness": 0.04,
            "dominant_emotion": "joy",
        }
        response = self.client.get(
            "/emotionDetector",
            query_string={"textToAnalyze": "I love my life"},
        )

        expected = (
            "For the given statement, the system response is "
            "'anger': 0.01, 'disgust': 0.02, 'fear': 0.03, "
            "'joy': 0.9 and 'sadness': 0.04. The dominant emotion is joy."
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_data(as_text=True), expected)

    def test_blank_input(self) -> None:
        """Return the required error message for a blank entry."""
        response = self.client.get(
            "/emotionDetector",
            query_string={"textToAnalyze": "   "},
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.get_data(as_text=True),
            "Invalid text! Please try again!",
        )

    @patch("server.emotion_detector", side_effect=EmotionDetectionError("offline"))
    def test_service_failure(self, _mock_detector) -> None:
        """Keep Copilot failures distinct from invalid customer text."""
        response = self.client.get(
            "/emotionDetector",
            query_string={"textToAnalyze": "I am happy"},
        )
        self.assertEqual(response.status_code, 503)
        self.assertEqual(
            response.get_data(as_text=True),
            "Emotion analysis is temporarily unavailable. Please try again!",
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
