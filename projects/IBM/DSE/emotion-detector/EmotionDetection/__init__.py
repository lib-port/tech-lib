# pylint: disable=invalid-name
"""Public interface for the assignment EmotionDetection package."""

from .emotion_detection import EmotionDetectionError, emotion_detector

__all__ = ["EmotionDetectionError", "emotion_detector"]
