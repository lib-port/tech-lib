"use strict";

const form = document.getElementById("emotion-form");
const analyzeButton = document.getElementById("analyze-button");
const systemResponse = document.getElementById("system_response");
const textInput = document.getElementById("textToAnalyze");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    analyzeButton.disabled = true;
    systemResponse.textContent = "Analyzing...";

    const query = new URLSearchParams({textToAnalyze: textInput.value});

    try {
        const response = await fetch(`/emotionDetector?${query.toString()}`);
        systemResponse.textContent = await response.text();
    } catch (error) {
        systemResponse.textContent = "Unable to contact the application. Please try again!";
    } finally {
        analyzeButton.disabled = false;
    }
});

