# Copyright 2016, 2023 John J. Rofrano. All Rights Reserved.
# Modified for this completed project. Licensed under Apache-2.0; see LICENSE.
"""Configure a real headless browser for the Behave scenarios."""
import os
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.firefox.service import Service as FirefoxService


def before_all(context):
    """Start Chrome or Firefox once for this feature suite."""
    load_dotenv()
    context.base_url = os.getenv("BASE_URL", "http://localhost:8080").rstrip("/")
    context.wait_seconds = int(os.getenv("WAIT_SECONDS", "10"))
    browser = os.getenv("DRIVER", "chrome").lower()
    headless = os.getenv("HEADLESS", "true").lower() == "true"
    executable = os.getenv("BROWSER_BINARY")

    if browser == "chrome":
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument("--headless")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1280,1000")
        if os.getenv("CHROME_NO_SANDBOX", "false").lower() == "true":
            options.add_argument("--no-sandbox")
        if executable:
            options.binary_location = executable
        service = ChromeService(os.getenv("CHROMEDRIVER_PATH", "chromedriver"))
        context.driver = webdriver.Chrome(service=service, options=options)
    elif browser == "firefox":
        options = webdriver.FirefoxOptions()
        if headless:
            options.add_argument("--headless")
        if executable:
            options.binary_location = executable
        service = FirefoxService(os.getenv("GECKODRIVER_PATH", "geckodriver"))
        context.driver = webdriver.Firefox(service=service, options=options)
    else:
        raise ValueError("DRIVER must be chrome or firefox")

    context.driver.set_page_load_timeout(30)
    context.config.setup_logging()


def after_all(context):
    """Always close the browser when the scenarios finish."""
    if hasattr(context, "driver"):
        context.driver.quit()
