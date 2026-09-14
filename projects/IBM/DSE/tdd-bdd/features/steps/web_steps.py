# Copyright 2016, 2023 John J. Rofrano. All Rights Reserved.
# Modified for this completed project. Licensed under Apache-2.0; see LICENSE.
"""Readable Selenium steps for the supplied product administration page."""
from behave import when, then
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as conditions


def field_id(name):
    """Map a field label to the ID used in the HTML form."""
    return "product_" + name.lower().replace(" ", "_")


@when('I visit the "Home Page"')
def step_impl(context):
    context.driver.get(context.base_url)


@then('I should see "{text}" in the title')
def step_impl(context, text):
    assert text in context.driver.title


@then('I should not see "{text}"')
def step_impl(context, text):
    assert text not in context.driver.find_element(By.TAG_NAME, "body").text


@when('I set the "{name}" to "{value}"')
@when('I change "{name}" to "{value}"')
def step_impl(context, name, value):
    element = context.driver.find_element(By.ID, field_id(name))
    element.clear()
    element.send_keys(value)


@when('I select "{value}" in the "{name}" dropdown')
def step_impl(context, value, name):
    element = context.driver.find_element(By.ID, field_id(name))
    Select(element).select_by_visible_text(value)


@then('I should see "{value}" in the "{name}" dropdown')
def step_impl(context, value, name):
    element = context.driver.find_element(By.ID, field_id(name))
    assert Select(element).first_selected_option.text == value


@then('the "{name}" field should be empty')
def step_impl(context, name):
    element = context.driver.find_element(By.ID, field_id(name))
    assert element.get_attribute("value") == ""


@when('I copy the "{name}" field')
def step_impl(context, name):
    element = context.driver.find_element(By.ID, field_id(name))
    context.clipboard = element.get_attribute("value")


@when('I paste the "{name}" field')
def step_impl(context, name):
    element = context.driver.find_element(By.ID, field_id(name))
    element.clear()
    element.send_keys(context.clipboard)


@when('I press the "{button}" button')
def step_impl(context, button):
    button_id = button.lower() + "-btn"
    element = WebDriverWait(context.driver, context.wait_seconds).until(
        conditions.element_to_be_clickable((By.ID, button_id))
    )
    element.click()


@then('I should see "{text}" in the results')
def step_impl(context, text):
    WebDriverWait(context.driver, context.wait_seconds).until(
        conditions.text_to_be_present_in_element((By.ID, "search_results"), text)
    )


@then('I should not see "{text}" in the results')
def step_impl(context, text):
    WebDriverWait(context.driver, context.wait_seconds).until_not(
        conditions.text_to_be_present_in_element((By.ID, "search_results"), text)
    )


@then('I should see the message "{message}"')
def step_impl(context, message):
    WebDriverWait(context.driver, context.wait_seconds).until(
        conditions.text_to_be_present_in_element((By.ID, "flash_message"), message)
    )


@then('I should see "{value}" in the "{name}" field')
def step_impl(context, value, name):
    WebDriverWait(context.driver, context.wait_seconds).until(
        lambda driver: driver.find_element(By.ID, field_id(name)).get_attribute("value") == value
    )
