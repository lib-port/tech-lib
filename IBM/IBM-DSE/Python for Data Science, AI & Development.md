# Python for Data Science, AI & Development
## Python Basics
### Python and its community
Python is a high-level, general-purpose language with readable syntax and a broad ecosystem. It supports web development, automation, data analysis, scientific computing, machine learning, natural language processing, and connected devices. Its standard library supplies core facilities for files, text, networking, databases, and other common tasks. Third-party packages add specialised capabilities. NumPy, pandas, SciPy, and Matplotlib support scientific and analytical work, while scikit-learn, TensorFlow, PyTorch, and NLTK support machine learning and language processing.

Python 3 provides the supported language line. The Python community ended official support for Python 2 on 1 January 2020, although old systems may still run it. The Python Software Foundation supports development and community infrastructure, applies a code of conduct across official spaces, and promotes inclusive participation. PyLadies advances the participation and leadership of women in the Python open-source community through mentoring, education, events, and outreach.

Readable syntax, extensive documentation, and a large user community make Python accessible to beginners and productive for experienced programmers. The same language can connect exploratory analysis, production services, teaching materials, and hardware projects, although each field relies on its own tools and engineering practices.
### JupyterLab and notebooks
Project Jupyter develops free, open-source tools for interactive computing across many programming languages. Its name refers to Galileo's notebooks and plays on Julia, Python, and R. A Jupyter notebook combines executable code, Markdown prose, equations, visualisations, and rich output in one document. A kernel runs the code and retains variables between cell executions.

JupyterLab arranges notebooks and other activities in movable tabs. The launcher creates or opens files, while the menu, toolbar, and command palette expose cell and kernel actions. `Shift+Enter` runs the selected cell and selects the next one, `Ctrl+Enter` runs it without advancing, and `Alt+Enter` runs it and inserts a cell below. Users can add, move, change, or delete cells, and they can place several notebooks side by side.

Markdown cells give code a clear narrative through headings, explanations, equations, and links. Code cells produce results, tables, plots, images, or error messages. Running all cells from a fresh kernel helps expose hidden dependencies on an earlier execution order. Closing a notebook tab does not necessarily stop its kernel. The Running panel shuts down kernels and releases their resources.

Saved notebooks can retain code, Markdown, metadata, and output, which supports sharing and review. Reproducibility still requires the necessary data, package versions, execution order, and environment. A user can rename a notebook, arrange several documents in one workspace, and pair charts with the calculations that produced them. Some Jupyter front ends or extensions can turn cells into slides. Available controls and presentation features vary by version, front end, and configuration.
### First code, comments, and errors
The `print()` function sends a value to standard output.

```python
print("Hello, Python!")
```

The `sys` module reports the active Python version.

```python
import sys
print(sys.version)
```

Outside a string literal, `#` starts a comment that continues to the end of the physical line. Useful comments explain intent, assumptions, or a non-obvious choice. They do not restate clear code.

Python parses a complete module or notebook cell before executing it. An unclosed quotation mark therefore raises `SyntaxError` before that unit runs. An undefined name such as `frint` raises `NameError` only when execution reaches it. An uncaught runtime exception stops the remaining statements in that execution. A traceback identifies the exception type and the location that triggered it, which helps a programmer diagnose the cause.
### Core types and conversion
Every Python value is an object with a type. The built-in `type()` function reveals that type.

| Value | Type | Key property |
| --- | --- | --- |
| `11` | `int` | Arbitrary-precision integer, limited by available memory |
| `2.14` | `float` | Usually a finite-precision binary approximation |
| `"Hello"` | `str` | Immutable sequence of Unicode code points |
| `True` | `bool` | One of exactly two Boolean values |

Constructors convert compatible values. `float(2)` returns `2.0`, `int("1001")` returns `1001`, `float("1234.56")` returns `1234.56`, and `str(1.2)` returns `"1.2"`. Converting a float to an integer discards its fractional part by truncating towards zero, so `int(1.9)` returns `1` and `int(-1.9)` returns `-1`. An incompatible string such as `"one"` raises `ValueError` when passed to `int()`.

Most Python implementations store `float` values as double-precision binary floating-point numbers. They cannot represent every decimal fraction exactly, so calculations such as `0.1 + 0.2` can show a small rounding difference. `sys.float_info` reports implementation details such as precision and finite range. Python integers avoid a fixed machine-word range and grow until available memory or another implementation limit intervenes.

Boolean conversion follows truth-value rules. Zero and empty containers convert to `False`, while most non-zero numbers and non-empty containers convert to `True`. Phone numbers containing hyphens belong in strings because they function as identifiers rather than quantities.

The names `True` and `False` require their initial capital letters, and `bool` subclasses `int`, so numeric conversion maps them to `1` and `0`. String literals may use matching single or double quotation marks. Choosing one form can reduce escaping when the text contains the other quotation mark.
### Expressions, operators, and names
An expression combines operands with operators and produces a value. Python uses `+`, `-`, `*`, and `/` for basic arithmetic. With integer operands, `/` returns a float. The `//` operator applies floor division, so `25 // 6` returns `4`, while `-5 // 2` returns `-3`. It does not round to the nearest integer. Standard precedence evaluates multiplication and division before addition and subtraction. Parentheses override that order.

Assignment binds a name to an object. Reassigning the name changes the binding, while any previously created object follows its own lifetime. Meaningful `snake_case` names make calculations easier to follow.

```python
total_minutes = 43 + 42 + 57
total_hours = total_minutes / 60
whole_hours, remaining_minutes = divmod(total_minutes, 60)
```

The calculation binds `total_minutes` to `142` and `total_hours` to approximately `2.3667`. The `divmod()` call produces `2` whole hours and `22` remaining minutes.

Expressions may also compare values. Operators such as `==`, `!=`, `<`, and `>` return Boolean results. The `type(6 / 2)` expression returns `float`, whereas `type(6 // 2)` returns `int`. A programmer should select true division or floor division according to the required result rather than according to display preference.
### Strings
A string stores text as an immutable sequence of Unicode code points. Single, double, or triple ASCII quotation marks can delimit a string, subject to Python's literal syntax. Indexing starts at zero. For `name = "The BodyGuard"`, `name[0]` returns `"T"`, `name[-1]` returns the final `"d"`, and `name[-13]` returns the first character. The string contains 13 code points, so `len(name)` returns `13`.

A slice uses the form `start:stop:step`, and it excludes the stop index. Thus, `name[0:4]` returns `"The "`, `name[8:12]` returns `"Guar"`, and `name[::2]` selects every second code point. Omitting a boundary extends the slice to that end of the string.

Because strings are immutable, concatenation, repetition, and methods create new strings. The `+` operator concatenates, while `3 * "Go"` returns `"GoGoGo"`. Methods such as `upper()`, `lower()`, `replace()`, and `split()` transform or divide text without changing the original string. `find()` returns the first matching index or `-1` when it finds no match.

Assignment does not alter an existing string. In `name = name + " album"`, Python builds a new string and binds `name` to it. `split()` without an argument treats runs of whitespace as separators and returns a list of non-empty fields. `replace(old, new)` returns a new string with matching substrings changed, while `upper()` and `lower()` return case-converted strings.

Escape sequences represent characters that are awkward to enter directly. `\n` represents a newline, `\t` represents a tab, and `\\` represents one backslash in an ordinary string literal. A raw-string prefix preserves most backslashes for patterns and paths, but a raw string cannot end with an odd number of backslashes.

```python
print("line one\nline two")
print("\\")
print(r"\d{10}")
```
### Regular expressions
The standard-library `re` module matches and transforms text with regular-expression patterns. Raw strings usually make patterns easier to read. `re.search()` finds the first match, `re.findall()` returns all non-overlapping matches, `re.split()` divides text at matches, and `re.sub()` replaces matches.

```python
import re

text = "Phone: 1234567890"
match = re.search(r"\d{10}", text)
if match:
    print(match.group())
```

For Python 3 string patterns, `\d` matches a Unicode decimal digit, `\w` matches a Unicode alphanumeric character or underscore, and `\s` matches Unicode whitespace. The `re.ASCII` flag narrows those classes to ASCII behaviour. `\b` marks a word boundary, while `\B` marks a position that is not a word boundary. Ordinary string methods remain clearer for simple literal searches and replacements.
## Python Data Structures
