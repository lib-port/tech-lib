# Python for Data Science, AI & Development
## Python Basics

## Python Fundamentals and Jupyter Notebooks
Python is a high-level, general-purpose programming language known for relatively clear syntax and a large ecosystem. It is used in fields including data analysis, machine learning, web development, automation, scientific computing, education, and embedded projects. Its extensive standard library covers common programming tasks, while third-party packages such as NumPy, pandas, SciPy, Matplotlib, scikit-learn, TensorFlow, PyTorch, and NLTK provide specialised capabilities. These packages are not part of the standard library.

Python uses dynamic typing, so a name does not need a declared data type before assignment. The language supports several programming styles, including procedural, object-oriented, and functional techniques.

Python is developed openly by a global community. An elected five-person Steering Council governs the language and the reference CPython implementation, while the Python Software Foundation supports the broader project and community. The community has a formal code of conduct, and groups such as PyLadies support women who are Python developers or aspiring developers.

Python 3 is the supported language series. Python 2 reached end of life on 1 January 2020 and receives no official improvements or security fixes, although some legacy systems may still contain Python 2 code.
### Execution and errors
In the reference CPython implementation, source code is compiled to bytecode and then executed by a virtual machine. Python is still commonly described as interpreted because normal use does not require a separate, manual compilation step. This mixed model is more accurate than a strict interpreted-versus-compiled distinction.

The `print()` function sends a value to standard output:

```python
print("Hello, Python!")
```

A `#` begins a comment outside a string, and the comment continues to the end of that physical line. Comments can explain intent or temporarily prevent a line from running.

```python
print("Hello, world!")  # Print a greeting
# print("This line does not run")
```

Python reports different categories of error. A misspelt name such as `frint` normally raises `NameError` when execution reaches it. An unclosed string raises `SyntaxError` while the code is being parsed, so that code block does not begin execution. An unhandled exception stops the current execution. In an interactive session, the interpreter or kernel generally remains available for later commands. `sys.version` reports the version and build information for the running interpreter.
### Jupyter notebooks
Project Jupyter provides free, open-source tools for interactive computing. Its name comes from Julia, Python, and R, the languages the project originally supported, but kernels now support many languages. Jupyter Notebook and JupyterLab are browser-based editors for computational notebooks.

An `.ipynb` file is a JSON document containing cells, saved outputs, and metadata. Code cells send instructions to a kernel and display returned results. Markdown cells hold formatted explanations, headings, equations, and other narrative content. Raw cells pass content through without notebook evaluation. `Shift-Enter` runs the selected cell and moves to the next one in the standard Notebook interface.

In a Python notebook, the final expression in a code cell is usually displayed without `print()`. Explicit `print()` calls remain useful when a cell needs several labelled outputs or when the same code will later run as a script.

The kernel is a separate process that holds live objects and variable bindings. Cells can therefore use results created earlier, but running cells out of order can make displayed results inconsistent with a clean run. Restarting a kernel clears its live state. Interrupting it attempts to stop a long calculation. Closing a browser tab does not necessarily stop the kernel, while shutting down the session releases its resources.

Notebook editors can open and arrange multiple documents, combine code with narrative and rich output, and export notebooks to formats such as HTML. Presentation features depend on the installed interface and tools. Sharing an `.ipynb` file preserves its code, Markdown, metadata, and saved outputs. Reproducing the computation may also require the same data, package versions, environment, and execution order.
### Objects, types, and conversions
Every Python object has a type. `type()` identifies it, and the common introductory types include:

| Type | Example | Main characteristic |
| --- | --- | --- |
| `int` | `11` | An integer with arbitrary precision, limited in practice by available memory |
| `float` | `2.14` | A finite binary floating-point approximation, usually based on C double precision |
| `str` | `"Hello"` | An immutable sequence of Unicode characters |
| `bool` | `True` | A logical value, either `True` or `False`, and a subtype of `int` |

Floats do not represent every real number or every integer exactly. For example, decimal `0.1` has no exact finite binary representation on the usual platform. `sys.float_info` describes the platform's float representation. Its `min` field is the smallest positive normalised float, not the smallest positive float of every kind.

Arithmetic can combine built-in numeric types. An integer is converted as needed when it interacts with a float, and the resulting precision is then governed by floating-point representation. Exact decimal or rational calculations may instead use the standard-library `decimal` or `fractions` modules.

Constructors such as `int()`, `float()`, `str()`, and `bool()` create values of the requested type when conversion is defined:

```python
float(2)       # 2.0
int(1.9)       # 1
int(-1.9)      # -1
int("12")      # 12
float("1.2")   # 1.2
str(12)        # "12"
```

Converting a finite float to `int` truncates towards zero. A string must use syntax accepted by the target conversion, so `int("1 or 2")` raises `ValueError`. Text such as a telephone number must remain quoted because an unquoted expression such as `123-456-7890` is parsed as subtraction.

`True` and `False` convert numerically to `1` and `0`. Zero, empty strings, empty collections, `None`, and `False` have false truth values. Most other objects have true truth values unless their class defines otherwise.
### Expressions and names
Expressions combine operands with operators. Python's basic arithmetic includes addition `+`, subtraction `-`, multiplication `*`, exponentiation `**`, true division `/`, floor division `//`, and remainder `%`. With ordinary real-number operands, `/` produces a float. Floor division rounds the mathematical quotient towards negative infinity, so `25 // 6` is `4` and `-25 // 6` is `-5`. Its result is an `int` for two integer operands and a `float` when a float operand participates.

Normal precedence rules apply. Exponentiation is evaluated before multiplication and division, which precede addition and subtraction. Parentheses make the intended grouping explicit:

```python
30 + 2 * 60    # 150
(30 + 2) * 60  # 1920
```

An assignment statement binds a name to an object. Reassigning the name changes that binding rather than altering the old object. Meaningful `snake_case` names make relationships easier to follow.

```python
total_minutes = 43 + 42 + 57
total_hours = total_minutes / 60
```

Later expressions can use these names. If `total_minutes` is rebound, `total_hours` retains its existing value until its assignment is run again.
### Strings
String literals may use matching single or double quotes. Indexing starts at zero, while negative indexes count from the end. For `artist = "Michael Jackson"`, `artist[0]` is `"M"`, `artist[-1]` is `"n"`, and `len(artist)` is `15`.

A slice `text[start:stop]` includes `start` but excludes `stop`. An optional third value is the stride, so `text[::2]` selects every second character. Omitting an endpoint uses the relevant end of the string. Indexing outside the valid range raises `IndexError`, while a slice is clipped to available bounds.

Strings are immutable. Indexing cannot replace a character in place. Concatenation with `+`, repetition with `*`, and string methods instead produce new strings. Common methods include `upper()`, `lower()`, `replace()`, `find()`, and `split()`. `find()` returns the first matching index or `-1`, `replace()` returns a new string, and `split()` returns a list.

The `in` operator tests whether a substring occurs in a string. It is often clearer than checking whether `find()` returned a non-negative index. String comparisons and case conversion follow Unicode rules, so text processing assumptions should be tested with the languages and scripts a program will handle.

Backslashes introduce escape sequences. `\n` represents a newline, `\t` a tab, and `\\` one literal backslash. A raw string prefix suppresses most escape processing, which is useful for regular expressions and Windows-style paths:

```python
path = r"C:\data\notes.txt"
```

Raw strings still follow quote-delimiting rules and cannot end with an odd number of backslashes. They are therefore not a general escape from string syntax.

Formatted string literals, or f-strings, have been available since Python 3.6. They evaluate expressions inside braces and support format specifications:

```python
name = "Amina"
score = 91.25
message = f"{name} scored {score:.1f}%"
```

`str.format()` and percent formatting remain supported, but f-strings often give direct, readable interpolation.
### Regular expressions
The standard-library `re` module provides regular-expression matching for structured text searches. Raw string literals are commonly used for patterns so that Python string escapes do not obscure regular-expression escapes.

```python
import re

text = "House number 1105"
first_digit = re.search(r"\d", text)
all_numbers = re.findall(r"\d+", text)
updated = re.sub(r"1105", "42", text)
parts = re.split(r"\s+", text)
```

`re.search()` returns the first match object or `None`. `re.findall()` returns non-overlapping matches as a list, `re.sub()` returns replaced text, and `re.split()` returns a list of pieces.

For Unicode string patterns, `\d` matches Unicode decimal digits, `\w` matches Unicode alphanumeric characters plus underscore, and `\s` matches Unicode whitespace. The `re.ASCII` flag narrows these classes to ASCII definitions. `\b` denotes a boundary between word and non-word positions, including a string edge next to a word character. `\B` denotes a position that is not such a boundary.

Regular-expression metacharacters such as `.`, `*`, `+`, `?`, brackets, and parentheses have structural meanings. `re.escape()` can protect arbitrary literal text before it is inserted into a pattern.
## Python Data Structures
Python's built-in tuples, lists, dictionaries, and sets organise multiple objects according to different rules. Tuples and lists are positional sequences. Dictionaries associate unique keys with values. Sets store distinct elements and support membership tests and mathematical set operations. Each collection can contain mixed object types, subject to the hashability rules for dictionary keys and set elements.

Python names are bound to objects. Assignment does not copy an object. If `B = A`, both names refer to the same object until either name is rebound. This behaviour is especially important for mutable collections.

| Type | Example | Access | Mutability | Typical role |
| --- | --- | --- | --- | --- |
| Tuple | `("Thriller", 1982)` | By position | Immutable | A fixed grouping |
| List | `["Thriller", 1982]` | By position | Mutable | An ordered collection that may change |
| Dictionary | `{"Thriller": 1982}` | By key | Mutable | Direct lookup from keys to values |
| Set | `{"Thriller", "Rumours"}` | By membership | Mutable | Distinct elements and group comparisons |
### Lists and tuples
Lists and tuples support zero-based indexing, negative indexing, slicing, membership tests, concatenation, and `len()`. Index `0` selects the first item, while `-1` selects the last. A slice excludes its stop bound, so `items[1:4]` selects indices `1`, `2`, and `3`. Slicing and concatenation produce new sequences.

An out-of-range index raises `IndexError`. The `in` operator tests for an equal item, and `len()` counts top-level items. The `+` operator concatenates two lists or two tuples without modifying either operand. It does not concatenate a list with a tuple. The optional step in `items[start:stop:step]` can skip positions or traverse them in reverse.

Collections can be nested. Chained indexes descend one level at a time. In `nested[2][1]`, the first index selects the third top-level item, and the second selects that item's second value. Strings are also sequences, so another index can select a character.

A tuple is an immutable sequence. Commas create a tuple, while parentheses usually group it and improve readability. Parentheses are required for an empty tuple, and a one-item tuple needs a trailing comma.

```python
empty = ()
one_item = ("disco",)
album = "Thriller", 1982, 10.0
first = album[0]
```

Tuple immutability prevents replacement, insertion, or deletion of the tuple's own element references. It does not make a contained mutable object immutable. A list inside a tuple can still change. A name can also be rebound to a different tuple.

Tuples can hold arbitrary objects, including other tuples, lists, dictionaries, and sets. Concatenating two tuples creates a third tuple. Slicing a tuple produces a tuple, while indexing selects the stored object itself.

`sorted()` accepts a tuple or another iterable and returns a new list. The original tuple remains unchanged, and the elements must support the comparisons used by the sort.

```python
ratings = (0, 9, 6, 5, 10, 8)
ratings_sorted = sorted(ratings)
```

A list is a mutable sequence created with square brackets. Item assignment, slice assignment, and mutating methods change the existing list. `append(x)` adds `x` as one item. `extend(iterable)` adds each item produced by the iterable. Both methods change the list in place and return `None`.

```python
shopping = ["Watch", "Laptop", "Shoes", "Pen", "Clothes"]
shopping.append("Football")
shopping[3] = "Notebook"
del shopping[4]
priority = shopping[1:3]
```

`del` is a statement that removes an item or slice by position. The string method `split()` returns a list of substrings. Without an explicit separator, it groups runs of whitespace. With a separator, it splits at that delimiter.

`list.remove(value)` removes the first equal value and raises `ValueError` if none exists. `list.pop(index)` removes and returns an item. Without an index, `pop()` operates on the last item.

Assignment can create aliases for a mutable list. After `B = A`, a change through either name is visible through the other. `B = A[:]` and `B = A.copy()` create a new outer list, but each is a shallow copy. Nested mutable objects remain shared. `copy.deepcopy()` is available when supported nested content also needs independent copies.
### Dictionaries
A dictionary maps unique, hashable keys to values and preserves insertion order. Strings and numbers are common keys, but any hashable object can serve as a key. A tuple is hashable only when all its elements are hashable. Lists, dictionaries, and sets are not hashable. Values can be arbitrary objects and can repeat.

```python
released = {
    "Back in Black": 1980,
    "The Dark Side of the Moon": 1973,
    "The Bodyguard": 1992,
}
released["Graduation"] = 2007
year = released["Back in Black"]
del released["Graduation"]
```

Assigning a new key inserts an entry. Assigning an existing key replaces its value. `key in released` tests for a key, not a value. Direct lookup of a missing key raises `KeyError`, while `get()` can supply a default. `keys()`, `values()`, and `items()` return dynamic views that reflect later changes.

If a dictionary display repeats a key, the last associated value wins. Updating a key does not change its position. Deleting and later reinserting it places it at the end of the insertion order.
### Sets
A set is an unordered collection of distinct, hashable objects. It does not support positional indexing or slicing. A non-empty set display uses braces without colons. Empty braces create a dictionary, so `set()` creates an empty set. `set(iterable)` converts an iterable and collapses equal duplicates.

A mutable set is not hashable and cannot be a dictionary key or an element of another set. `frozenset` provides an immutable, hashable set type when its elements are hashable.

`add()` inserts an element. Adding an existing element has no further effect. `remove()` deletes an element but raises `KeyError` if it is absent. `discard()` avoids that exception.

```python
A = {"Thriller", "AC/DC", "Back in Black"}
B = {"AC/DC", "Back in Black", "The Dark Side of the Moon"}

common = A & B
all_items = A | B
only_a = A - B
either_not_both = A ^ B
```

Intersection contains elements in both sets. Union contains elements in either set. Difference contains elements in the left set but not the right. Symmetric difference contains elements in exactly one set. `issubset()` and `issuperset()` test containment between sets. These operations return new sets and leave their operands unchanged.
### Choosing a collection
A tuple suits an ordered grouping whose top-level membership should remain fixed. A list suits ordered data that will be edited. A dictionary suits lookup through meaningful keys. A set suits duplicate removal, fast membership testing, and comparisons between groups. Nested structures can combine these roles when position, keys, uniqueness, and mutability differ across levels.
## Python Programming Fundamentals
## Python Fundamentals: Control Flow, Functions, Classes, and Exceptions
Python programs combine expressions, statements, objects, and names. Expressions produce values. Statements perform actions such as binding a name, choosing a branch, repeating a block, defining a function or class, and handling an exception. Indentation is part of the syntax, so the indented suite beneath a header belongs to that statement.

Names refer to objects rather than containing independent copies of them. Integers, floating-point numbers, strings, lists, dictionaries, functions, classes, and class instances are all objects. Their types determine which operations and methods they support. This object model links the language's control flow, functions, classes, and exception system.
### Conditions, comparisons, and branching
A comparison usually produces `True` or `False`. The principal comparison operators are:

| Operator | Meaning |
| --- | --- |
| `==` | equal in value |
| `!=` | not equal in value |
| `<` | less than |
| `<=` | less than or equal to |
| `>` | greater than |
| `>=` | greater than or equal to |
| `is` | the same object |
| `is not` | different objects |

Equality and identity answer different questions. `a == b` asks whether two objects compare as equal. `a is b` asks whether both names refer to the same object. Identity tests are appropriate for singletons such as `None`, as in `result is None`.

Numbers can normally be ordered by value, including comparisons between integers and floating-point numbers. Complex numbers do not support ordering. Strings are ordered lexicographically by the Unicode code points of their characters, not by the ASCII table alone and not by human dictionary rules. Case, accents, and alternative Unicode representations can therefore produce results that may surprise a reader. Text intended for human-language collation usually needs normalisation and a locale-aware library.

Lexicographic ordering compares corresponding characters from left to right. The first unequal pair determines the result, and a shorter string comes first when it is otherwise an exact prefix. Consequently, `"BA" > "AB"` is true because the first comparison is between `"B"` and `"A"`. The rule describes machine ordering, not cultural alphabetical order.

Membership tests use `in` and `not in`. For a list or tuple, they test whether an equal item occurs. For a dictionary, they test keys. For a string, they test whether a substring occurs. Membership is different from equality, so `"Body" in "The Bodyguard"` is true even though the two strings are not equal.

Python also permits chained comparisons. The condition `18 <= age < 65` has the effect of `18 <= age and age < 65`, while evaluating `age` once. A chain stops as soon as its outcome is known.

Conditions are not limited to comparison results. In a Boolean context, `False`, `None`, numeric zero, and empty strings or containers are false. Most other objects are true, although a class can customise truth testing. These conventions support concise checks such as `if records:` for a non-empty collection.

The operators `and`, `or`, and `not` combine or invert conditions. They use short-circuit evaluation:
- `x and y` returns `x` when `x` is false. Otherwise, it evaluates and returns `y`.
- `x or y` returns `x` when `x` is true. Otherwise, it evaluates and returns `y`.
- `not x` always returns a Boolean with the opposite truth value.

Because `and` and `or` return operands rather than always returning Boolean objects, an expression such as `display_name = supplied_name or "Anonymous"` can select a fallback. Short-circuiting also prevents an unsafe second operation when the first condition fails, as in `denominator != 0 and numerator / denominator > 2`.

The truth conditions are compact. `and` is true only when both operands are true in context. `or` is true when at least one is true. `not` reverses truth. The operand-returning behaviour becomes important when values other than `True` and `False` are combined.

An `if` statement runs its suite only when its condition is true. Any number of `elif` clauses may test alternatives in order, and an optional `else` handles the remaining cases. Only the first true branch runs.

```python
def admission_category(age):
    if age < 0:
        return "invalid"
    elif age < 18:
        return "minor"
    elif age < 65:
        return "adult"
    else:
        return "senior"
```

Parentheses around a simple condition are optional. The colon and indentation are required. Code following the whole statement at the outer indentation level runs after the selected branch finishes.

Branches often validate data before performing an operation. Validation should reflect the actual contract rather than rely on an analogy. If an age threshold is 18 and older, the condition is `age >= 18`. If it is strictly older than 18, the condition is `age > 18`. Boundary values such as 18, zero, an empty string, and the last valid index deserve explicit tests because a single operator can change their treatment.
### Loops and iteration
Loops repeat a suite. A `for` loop consumes items from an iterable, which may be a list, tuple, string, dictionary, range, file, generator, or user-defined iterable. It is not restricted to a collection whose length is known in advance.

```python
colours = ["red", "yellow", "green"]

for colour in colours:
    print(colour)
```

On each iteration, the loop target is bound to the next item. Iteration ends when the iterable is exhausted. For a dictionary, direct iteration yields keys. Methods such as `items()` can yield key-value pairs.

Python 3's `range()` returns an immutable range object, not a pre-built list. It represents an arithmetic progression efficiently. The stop value is excluded, and the optional start and step values control the progression:

```python
list(range(3))           # [0, 1, 2]
list(range(2, 8, 2))     # [2, 4, 6]
list(range(5, 0, -1))    # [5, 4, 3, 2, 1]
```

The step cannot be zero. A positive step with a start at or beyond the stop, or a negative step with a start at or below the stop, produces an empty range. Python 2's `range()` returned a list, but Python 2 is obsolete and unsupported.

Direct iteration is usually clearer than indexing with `range(len(sequence))`. When both position and value are needed, `enumerate()` yields pairs containing a counter and an item. Its counter starts at zero unless another start is supplied.

```python
for position, colour in enumerate(colours, start=1):
    print(position, colour)
```

A `while` loop checks a condition before every iteration and repeats while that condition remains true. Its body may therefore run zero times. A useful loop must eventually change relevant state, receive new input, return, raise an exception, or execute `break`. Otherwise it can continue indefinitely.

```python
ratings = [10, 9.5, 8, 5, 10]
index = 0

while index < len(ratings) and ratings[index] >= 6:
    print(ratings[index])
    index += 1
```

The bounds check comes first because `and` short-circuits. Once `index` reaches the list's length, Python does not evaluate the unsafe subscript.

`break` exits the innermost enclosing loop immediately. `continue` skips the rest of the current iteration and proceeds to the next one. Both can clarify an early exit or filter, although a loop with many scattered control transfers can become difficult to follow.

```python
for number in range(1, 16):
    if number > 12:
        break
    if number % 3 == 0:
        continue
    print(number)
```

The order of the tests is significant. Placing `continue` first would still terminate here because 13 is not divisible by 3, but a different stopping value could be skipped before the `break` test. Loop control should therefore be arranged around the intended priority of conditions.

Changing a collection while iterating over it requires care. Deleting list items can shift later indices, and adding dictionary entries can invalidate iteration. A program can instead iterate over a copy, construct a new collection, or use a comprehension when that form remains clear.

Accumulation and search are common loop patterns. An accumulator is initialised before the loop and updated for each relevant item. A search may stop with `break` as soon as a match is found. A `for` loop is usually the natural choice when processing an iterable. A `while` loop fits repetition governed by changing state, such as accepting input until it passes validation. The distinction concerns the source of continuation, not whether the final iteration count can be calculated in advance.

An index-based `while` loop needs both a bounds condition and a state condition when it reads a sequence. The bounds condition should be evaluated first. An assumption that a sentinel value will always appear can otherwise lead to `IndexError` if the data ends before the sentinel.
### Functions
A function packages a computation or action behind a name. A function definition begins with `def`, followed by the function name, a parameter list, a colon, and an indented body. The optional string literal at the start of the body is its docstring.

```python
def safe_divide(numerator, denominator):
    """Returns a quotient, or None when the denominator is zero."""
    if denominator == 0:
        return None
    return numerator / denominator
```

Parameters are the names in a definition. Arguments are the objects supplied by a call. In `safe_divide(12, 3)`, `numerator` and `denominator` are parameters, while `12` and `3` are arguments. Calling the function creates a new local scope, binds the arguments to its parameters, and executes the body.

Arguments can be supplied by position or by keyword when the function signature permits it. `safe_divide(denominator=3, numerator=12)` binds by name and returns the same result. A parameter cannot receive more than one value, and an unknown keyword raises `TypeError` unless the definition accepts additional keywords.

`return` is a statement, not a function. It ends the current function call and supplies a value to the caller. A bare `return`, or reaching the end without any `return`, yields the singleton `None`. Printing and returning are separate operations. `print()` writes a representation for display, while `return` makes a result available for assignment, composition, or testing.

Functions can reduce duplication, give operations meaningful names, isolate responsibilities, and provide reusable interfaces. They can also produce side effects, such as writing a file or mutating a supplied list, without returning a useful value. A concise function is not automatically a good abstraction. Its name, contract, inputs, outputs, side effects, and failure modes must remain clear.

Functions are objects. A name can refer to a function, a function can be stored in a collection, and one function can receive or return another. Calling and referencing are distinct. `operation` refers to a function object, while `operation()` calls it. A function definition executes when control reaches it and binds the function object to its name.

Python operators are selected by operand types. A function written as `return a + b` may add numbers, concatenate strings, or concatenate compatible sequences. Likewise, multiplying a string by an integer repeats the string. This flexibility can support generic code, but it can also allow an unintended type to travel farther through a program before failing. Input validation, type annotations, and tests can clarify the intended domain without changing Python's runtime rules.

A syntactically required suite cannot be empty. The `pass` statement performs no action and can serve as a temporary body for a function, class, branch, or loop. It does not supply an implementation, and a function containing only `pass` still returns `None`.
#### Built-in functions and methods
Built-in functions are available without an import. `len()` returns the number of items in a supported object. `sum()` adds a starting value and the items of an iterable from left to right. The call `sum([1, 2])` returns `3`, whereas `sum(1, 2)` raises `TypeError` because the first argument must be iterable. `min()` and `max()` select extrema, and `print()` writes values to an output stream.

`sorted(iterable)` always returns a new list. In contrast, `some_list.sort()` rearranges that list in place and returns `None`. The distinction illustrates a broader point. A function or method may create a result, mutate an existing object, or do both, so its documented contract is more reliable than a general assumption about functions and methods.

Small built-ins can be composed. `len(records)` measures a collection, `sum(ratings)` aggregates numeric items, and `sorted(records, key=...)` can order items by an extracted key. `help(function_name)` displays documentation derived in part from the object's docstring and signature. Built-ins accept specific protocols rather than a short closed list of concrete types. For instance, `sum()` accepts an iterable, not only a list, tuple, or set.
#### Defaults and flexible argument lists
A parameter can have a default value, allowing the caller to omit that argument:

```python
def is_good_rating(rating=4, threshold=7):
    return rating >= threshold
```

Defaults are evaluated once, when the definition executes. A mutable default such as `items=[]` is therefore shared across calls. A common pattern uses `None` and creates a fresh list inside the function when needed.

An `*args` parameter collects excess positional arguments into a tuple. A `**kwargs` parameter collects excess keyword arguments into a dictionary. These forms support flexible interfaces, but explicit parameters are easier to document and validate when the accepted inputs are known.

```python
def describe(*items, **labels):
    return {
        "items": items,
        "labels": labels,
    }
```
#### Scope and name binding
An assignment inside a function normally binds a local name. Name lookup proceeds through the local scope, any enclosing function scopes, the module's global scope, and the built-in namespace. A local name ceases to be directly accessible after the call ends, although an object created during the call can survive if another reference to it remains.

A function may read a global name when no local or enclosing binding shadows it. Rebinding a module-level name from inside a function requires a preceding `global` declaration. Rebinding a name in the nearest enclosing function scope requires `nonlocal`. Routine dependence on mutable global state can obscure inputs and make testing harder, so arguments and return values are generally clearer channels.

An assignment anywhere in a function normally makes that name local throughout the function body. Reading it before the assignment then raises `UnboundLocalError`, even if a global name with the same spelling exists. This rule is why an intended update of a global binding needs `global` and why using a distinct local result is often simpler.

Python passes arguments by assigning object references to parameter names. Rebinding a parameter changes only that local name. Mutating an object through the parameter can be visible to the caller when both names still refer to the same mutable object.

```python
def add_labels(labels):
    labels.append("new")

values = ["old"]
add_labels(values)
# values is now ["old", "new"]
```

The function receives a reference to the same list and mutates that list. By contrast, `labels = ["replacement"]` inside the function would only rebind the local parameter. Immutable objects such as integers and strings cannot be altered in place.

A dictionary can count repeated tokens without repeatedly scanning the whole list:

```python
def word_frequencies(text):
    frequencies = {}
    for word in text.split():
        key = word.casefold().strip(".,!?\"")
        if key:
            frequencies[key] = frequencies.get(key, 0) + 1
    return frequencies
```

This simple tokenisation treats whitespace and selected punctuation only. Natural-language analysis requires more sophisticated rules for apostrophes, hyphens, scripts, and Unicode normalisation.
### Objects and classes
A class creates a new type and groups data with behaviour. An object created from a class is an instance of that class. Instance attributes record state, while methods define operations associated with the type. Classes can model concrete entities such as vehicles or geometric shapes, as well as abstract concepts such as accounts, events, and parsers.

In Python 3, a class with no explicit base class already inherits from `object`, so `class Circle:` and `class Circle(object):` have the same base. Calling a class normally creates an instance. The special method `__new__()` performs instance creation, and `__init__()` then initialises the created instance. For ordinary classes, only `__init__()` usually needs to be defined.

```python
class Circle:
    default_colour = "blue"

    def __init__(self, radius=3, colour=None):
        if radius < 0:
            raise ValueError("radius cannot be negative")
        self.radius = radius
        self.colour = colour or self.default_colour

    def add_radius(self, amount):
        new_radius = self.radius + amount
        if new_radius < 0:
            raise ValueError("radius cannot be negative")
        self.radius = new_radius
        return self.radius

    def area(self):
        return 3.141592653589793 * self.radius * self.radius
```

`self` is the conventional name for the first parameter of an instance method. It refers to the instance on which the method operates. The call `circle.area()` obtains a bound method and supplies `circle` as that first argument. It is equivalent in effect to `Circle.area(circle)`.

`default_colour` is a class attribute shared through the class. `radius` and `colour` are instance attributes created separately for each instance. Reading `circle.default_colour` can find the class attribute, but assigning `circle.default_colour = "red"` normally creates or changes an attribute on that instance rather than changing the class attribute. Mutable class attributes require particular care because one shared list or dictionary can otherwise collect changes from every instance.

Dot notation accesses attributes and methods. Public attributes can be read or changed directly unless a descriptor, such as a property, controls access. Methods can protect invariants by validating changes, as `add_radius()` does. Python relies heavily on conventions rather than absolute access restrictions, so a well-designed class documents which attributes form its public interface.

Two instances of the same class can hold different instance state while sharing method definitions:

```python
red_circle = Circle(10, "red")
blue_circle = Circle(radius=4)

red_circle.add_radius(2)
print(red_circle.radius)   # 12
print(blue_circle.radius)  # 4
```

Changing `red_circle.radius` does not change `blue_circle.radius`. Both objects obtain `area()` and `add_radius()` from `Circle`. A bound method can also be saved and called later, as in `grow = red_circle.add_radius` followed by `grow(1)`.

Class attributes and instance attributes represent different ownership. A vehicle class might use a class attribute for a default colour shared conceptually by every vehicle, while maximum speed, mileage, and seating capacity belong to each vehicle instance. A value that varies independently should normally be initialised on `self`.

`dir(obj)` attempts to return a useful alphabetical list of attribute names drawn from the object, its class, and its base classes. The result includes more than methods and is not guaranteed to be complete for objects with customised attribute access. Names surrounded by double underscores often support Python's data model. They are not simply disposable internals.

Classes are useful when several values and operations form a coherent stateful abstraction. A small calculation that has no persistent state may remain clearer as a function. Inheritance is also optional. Composition, in which one object holds and uses another, often keeps responsibilities easier to see.

An instance can gain a new writable attribute through assignment unless the class restricts that behaviour. This dynamism is useful, but accidental spelling differences can silently create the wrong attribute. Initialisation, properties, data classes, tests, and static analysis can make an object's intended shape clearer.
### Exceptions and reliable failure handling
An exception is an object that interrupts normal control flow when it is raised. Python raises exceptions for detected problems, and application code can raise them deliberately. If no matching handler is found, the exception propagates through calling functions. An unhandled exception normally ends the program's current execution and produces a traceback.

The everyday term "error" does not identify a separate Python category defined by severity or origin. `SyntaxError`, `NameError`, `ValueError`, and `ZeroDivisionError` are all exception classes. Every built-in exception derives from `BaseException`. Most application-level failures derive from `Exception`, while `SystemExit`, `KeyboardInterrupt`, and `GeneratorExit` sit outside that branch so broad application handlers do not normally intercept them.

A syntax problem is usually detected before the affected code can execute, while other exceptions arise during execution. The distinction concerns when detection occurs, not whether one is an "error" and the other an exception. Compilation itself can raise `SyntaxError`, which remains part of the exception hierarchy.

Common exceptions include:

| Exception | Typical cause |
| --- | --- |
| `ZeroDivisionError` | division or modulo by numeric zero |
| `ValueError` | a supported type carries an inappropriate value |
| `TypeError` | an operation receives an incompatible type or call signature |
| `NameError` | no binding can be found for a name |
| `IndexError` | a sequence index lies outside its valid range |
| `KeyError` | a requested mapping key is absent |
| `AttributeError` | an attribute reference or assignment fails |
| `FileNotFoundError` | a requested file does not exist |
| `ImportError` | an import cannot load the requested module or name |

`IOError` remains as a compatibility alias of `OSError` in modern Python. Code normally catches `OSError` or a more specific subclass such as `FileNotFoundError`.

Exception names describe categories, but the precise operation still governs the outcome. `int("abc")` raises `ValueError` because the type of the argument is accepted but its content cannot be parsed as an integer. `1 + "2"` raises `TypeError` because those operands do not support that addition. `math.sqrt(-1.0)` raises `ValueError` in the real-valued `math` module, while complex square roots require `cmath`.

A `try` statement protects the operations that may raise expected exceptions. Python executes the `try` suite first. If no exception occurs, it skips every `except` clause. If an exception occurs, it abandons the rest of the `try` suite and selects the first compatible handler. An unmatched exception continues to propagate.

```python
def divide_text(numerator_text, denominator_text):
    try:
        numerator = float(numerator_text)
        denominator = float(denominator_text)
        result = numerator / denominator
    except ValueError:
        return "Both inputs must be numbers"
    except ZeroDivisionError:
        return "The denominator must not be zero"
    else:
        return f"Result: {result}"
```

Handlers should usually name the narrowest exception types that the code can resolve. A bare `except:` catches even system-exiting exceptions. `except Exception:` is narrower but can still hide programming defects if it converts every unexpected failure into a vague message. When a broad handler is needed at an application boundary, it should normally preserve diagnostic information through logging and may re-raise the exception.

Several exception types can share one handler through a tuple, as in `except (TypeError, ValueError):`. Separate handlers are preferable when recovery differs. `except Exception as exc:` binds the exception instance, whose message and attributes can provide detail. Programs should not depend on exact built-in exception message text because it can change between Python versions.

Handler order follows the exception class hierarchy. A handler for a base class also matches its subclasses, so specific handlers must precede broad ones. At most one ordinary `except` clause in a `try` statement runs for a raised exception. A handler protects failures raised directly in the `try` suite and failures propagated from functions called there.

The optional `else` suite runs only when the `try` suite raises no exception. It keeps successful follow-up work outside the protected region, reducing the chance that a handler will catch a failure it was not intended to catch. The optional `finally` suite runs as the `try` statement completes whether an exception occurred or not, including before a pending `return`, `break`, or `continue` takes effect. It is suited to cleanup, although control-flow statements inside `finally` can suppress other outcomes and should be avoided.

Files and similar resources often support a context manager, which is safer and clearer than manual cleanup:

```python
def first_line(path):
    try:
        with open(path, encoding="utf-8") as source:
            return source.readline()
    except FileNotFoundError:
        return None
```

The `with` statement closes the file whether reading succeeds or raises an exception. A `finally` block remains appropriate when no context manager is available.

Application code can reject invalid state with `raise`, as the `Circle` class does for a negative radius. Raising a specific exception with a useful message lets a caller decide whether to recover, translate the failure, report it, or allow it to propagate. Returning `None` can be suitable when absence is an ordinary outcome, but an exception is usually clearer when a valid result cannot be produced because a contract was violated.

The square-root task illustrates the difference. A function documented only for real, non-negative inputs can validate `number < 0` and raise `ValueError`, or it can allow `math.sqrt()` to raise that exception. Catching every exception and returning `None` would also hide unrelated defects, such as a misspelled name. A handler should translate only the failures that belong to the function's public contract.

Exception handling should surround operations whose failures are understood and recoverable. It cannot repair a failed operation in place. Recovery requires an alternative action, a new attempt, or continuation at an outer level. Specific validation, limited `try` suites, accurate exception types, and preserved tracebacks make failures easier to diagnose without disguising defects.
### How the elements work together
Control flow chooses and repeats operations. Functions give those operations names and local scopes. Classes attach operations to stateful objects. Exceptions move control to a handler when an operation cannot fulfil its contract. These mechanisms compose naturally. A function can iterate over objects, call their methods, branch on returned values, and handle only the failures for which it has a recovery strategy.

Clear Python code tends to prefer direct iteration, small and explicit interfaces, local state, validated class invariants, and specific exception handling. Each construct has a distinct role, but all depend on the same foundations: names bound to objects, types defining behaviour, and indentation defining the suites that execute together.
## Working with Data in Python
Python's built-in file interface, pandas, and NumPy cover three related layers of data work. File objects move text or bytes between a program and storage. pandas represents labelled, tabular data and provides tools for loading, selecting, filtering, combining, and exporting it. NumPy supplies compact, multidimensional arrays and numerical operations that pandas and many scientific libraries build upon.

Libraries are reusable packages of classes, functions, and other objects. After a package has been installed, an `import` statement makes its public features available. Conventional aliases keep common operations concise:

```python
import numpy as np
import pandas as pd
```

The three layers often form one workflow. Python may first acquire or create a file, pandas may convert tabular records into a DataFrame, and NumPy may perform numerical calculations on the underlying values. Each layer has different rules for indexing, data types, copying, and persistence, so choosing the appropriate abstraction prevents subtle errors.
### Text files and file objects
Python's built-in `open()` function accepts a path and a mode, then returns a file object. A relative path is interpreted from the process's current working directory. An absolute path identifies a location from the filesystem root. Code that assumes the wrong working directory can therefore open the wrong file or raise `FileNotFoundError`.

Text mode reads and writes `str` objects. Binary mode reads and writes `bytes` without decoding, encoding, or translating newlines. Text code should normally state the expected encoding, because the default encoding depends on the platform. UTF-8 is a sound choice when the file is known to use it.

The `with` statement is the standard way to manage a file:

```python
path = "example.txt"

with open(path, "r", encoding="utf-8") as file:
    text = file.read()

print(text)
```

The context manager closes the file when the block ends, including when an exception leaves the block. The string assigned to `text` remains available afterwards because it is a separate object. Further reads from the closed file object fail.
#### File modes
The mode controls whether a file must already exist, whether existing content is retained, and whether operations use text or bytes.

| Mode | Effect |
| --- | --- |
| `r` | Opens an existing file for text reading. This is the default. |
| `w` | Opens for text writing, creates the file if needed, and truncates an existing file immediately. |
| `a` | Opens for text appending, creates the file if needed, and directs writes to the end. |
| `x` | Creates a new text file and fails if the path already exists. |
| `r+` | Opens an existing file for reading and writing without automatic truncation. |
| `w+` | Opens for reading and writing, creating or truncating the file. |
| `a+` | Opens for reading and appending, creating the file if needed. Writes go to the end. |
| `b` | Added to another mode, selects binary I/O, as in `rb` or `wb`. |
| `t` | Added to another mode, explicitly selects text I/O. It is normally omitted because text is the default. |

Opening a file in `w` or `w+` is destructive even if no subsequent call to `write()` succeeds. Exclusive creation with `x` is safer when overwriting would be an error. Updating through `r+` or `a+` requires careful control of the stream position and, for complex changes, a temporary file may be safer than an in-place rewrite.
#### Reading text
A file object maintains a current stream position. Reading advances it, so consecutive calls continue rather than restarting automatically.

- `read()` returns all remaining content. `read(n)` returns at most `n` characters in text mode or `n` bytes in binary mode.
- `readline()` returns one line, retaining its ending newline when one is present. An optional size limits the result, but the method does not cross more than one line.
- `readlines()` returns the remaining lines as a list. Its optional argument is a total-size hint, not an exact number of characters or lines.
- Iterating over the file yields one line at a time and avoids storing the entire file in a list.

```python
with open("example.txt", "r", encoding="utf-8") as file:
    first_four = file.read(4)
    next_line_fragment = file.readline()

with open("example.txt", "r", encoding="utf-8") as file:
    for line_number, line in enumerate(file, start=1):
        print(line_number, line.rstrip("\n"))
```

The escape sequence `\n` represents a newline in a Python string. It is a backslash followed by `n`, not `/n`. In ordinary text mode, Python can translate the platform's line endings while reading and writing.

Reading a whole file is convenient for small inputs, but its memory use grows with the file. Iteration or fixed-size chunks suit larger inputs. End of file is signalled by an empty string in text mode or empty bytes in binary mode.
#### Positions, seeking, and truncation
`tell()` reports the current stream position, and `seek()` changes it. Their interpretation differs between binary and text streams. In binary mode, positions are byte offsets and seeking can use the beginning, current position, or end as a reference. In text mode, `tell()` returns an opaque position value that accounts for decoding. Portable text-mode seeking is limited to the start, the end through `seek(0, 2)`, or a value previously returned by `tell()`.

```python
with open("data.bin", "rb") as file:
    file.seek(5)
    sixth_byte = file.read(1)
```

`truncate()` resizes a writable file to a supplied size or, when no size is supplied, to the current position. It is useful after an in-place rewrite in `r+` mode because shorter replacement content otherwise leaves old trailing bytes or characters. Truncation should follow a confirmed write, since discarded content is not recoverable from the file itself.
#### Writing, appending, and copying
`write()` accepts a string in text mode and returns the number of characters accepted. It adds no separator or newline. Multiple calls continue at the current position, except that append mode directs each write to the end under the platform's append semantics.

```python
lines = ["This is line A\n", "This is line B\n"]

with open("example2.txt", "w", encoding="utf-8") as file:
    for line in lines:
        file.write(line)

with open("example2.txt", "a", encoding="utf-8") as file:
    file.write("This is line C\n")
```

The `writelines()` method can also consume an iterable of strings, but it does not insert line endings. Each string must contain any required newline.

A text file can be copied line by line while both file objects are managed by one `with` statement:

```python
with open("source.txt", "r", encoding="utf-8") as source, open(
    "destination.txt", "w", encoding="utf-8"
) as destination:
    for line in source:
        destination.write(line)
```

This pattern copies decoded text, not arbitrary binary content or filesystem metadata. General file copying is better handled by filesystem utilities. A data-cleaning task also needs to parse fields rather than search for a substring such as `"no"` anywhere in a line. Exact comparison with a status field avoids misclassifying names or other values that happen to contain the same letters.

When a text file acts as a small register, an update usually has four stages. The program reads and validates the header, parses each record, separates retained records from removed records, and writes the intended outputs. The header belongs once in each complete table and should not be treated as a data row. Records should retain their field order and line endings unless the format is deliberately changed.

Rewriting the original file in place can expose partially updated content if validation or writing fails. A safer pattern writes the complete replacement to a temporary file in the same destination directory, closes it successfully, and then replaces the original through an operating-system file operation. The exact durability and atomicity guarantees depend on the platform and filesystem, but the approach narrows the period in which incomplete output is visible. Appending removed records to a second file needs separate error handling because two files cannot generally be committed as one indivisible transaction.

Closing a file flushes Python's buffered data to the underlying stream, although storage hardware and operating systems may apply further buffering. Resource management, error handling, explicit encodings, and cautious mode selection are therefore part of correct file processing, not optional decoration.
### Labelled tables with pandas
pandas is designed for labelled and often heterogeneous data. A `Series` is a one-dimensional labelled array. A `DataFrame` is a two-dimensional labelled table whose columns may hold different data types. A DataFrame can be viewed as an ordered collection of aligned Series objects sharing an index.

A dictionary of equal-length lists offers a direct construction pattern. The dictionary keys become column labels, and each list supplies one column:

```python
records = {
    "Name": ["Rose", "John", "Jane", "Mary"],
    "ID": [1, 2, 3, 4],
    "Department": ["Architecture", "Software", "Design", "Infrastructure"],
    "Salary": [100000, 80000, 50000, 60000],
}

staff = pd.DataFrame(records)
```

The lists must have compatible lengths unless pandas can align supplied labelled objects by their indexes. The resulting index defaults to integer labels starting at zero, but another column or an explicit sequence can provide meaningful labels.
#### Loading and inspecting data
`pd.read_csv()` parses comma-separated or otherwise delimited text into a DataFrame. `pd.read_excel()` reads supported spreadsheet formats and may require an appropriate Excel engine. Both accept several kinds of paths and file-like objects, and both provide parameters for headers, selected columns, missing-value markers, dates, and data types.

```python
sales = pd.read_csv("product_sales.csv")
spreadsheet = pd.read_excel("product_sales.xlsx", sheet_name=0)
```

Automatic type inference is convenient but should be checked. Identifiers with leading zeroes, ambiguous dates, mixed numeric and text values, and non-standard missing markers often need explicit options. `head()` returns the first five rows by default, while `tail()` returns the last five. Useful structural checks include:

| Expression | Information returned |
| --- | --- |
| `df.shape` | A tuple containing row and column counts. |
| `df.size` | The total number of values, equal to rows multiplied by columns. |
| `df.index` | The row labels. |
| `df.columns` | The column labels. |
| `df.dtypes` | The data type recorded for each column. |
| `df.info()` | A concise summary including dtypes and non-null counts. |
| `df.describe()` | Descriptive statistics for supported columns. |

These checks reveal schema problems before calculations propagate them.
#### Selecting rows, columns, and values
Bracket selection has an important type distinction. A single column label normally returns a Series. A list of labels, even a one-item list, returns a DataFrame:

```python
products = sales["Product"]
quantities = sales[["Quantity"]]
summary = sales[["Product", "Category", "Quantity"]]
```

`.iloc[...]` selects by zero-based integer position. `.loc[...]` selects by label, even when the label itself is an integer. Both indexers accept a row selector followed by an optional column selector.

```python
first_value = sales.iloc[0, 0]
first_rows_and_columns = sales.iloc[0:2, 0:3]
named_value = sales.loc[0, "Product"]
named_block = sales.loc[0:2, "OrderID":"Category"]
```

The positional slice `0:2` excludes position 2. The label slice `0:2` includes both endpoint labels when they are present, so the second block can contain labels 0, 1, and 2. This difference is a frequent source of off-by-one errors. Replacing the index with labels such as `a`, `b`, and `c` does not change `.iloc` positions, but it changes the labels expected by `.loc`.
#### Filtering and analysing columns
Comparisons on a Series produce a Boolean Series aligned with its index. Supplying that mask to a DataFrame selects rows where the condition is true:

```python
recent = sales[sales["OrderDate"] >= "2022-04-01"]
electronics = sales[sales["Category"] == "Electronics"]
```

Date comparisons are reliable only after the column has been parsed as a datetime type or stored in an order-preserving standard format. Multiple conditions use `&` for and or `|` for or, with each comparison enclosed in parentheses.

`Series.unique()` returns distinct values in their order of appearance. It does not sort them. `Series.nunique()` returns the number of distinct non-missing values by default. This distinguishes retrieving categories from counting them:

```python
categories = sales["Category"].unique()
category_count = sales["Category"].nunique()
```

Common operations include `sort_values()` for ordering, `groupby()` for split-apply-combine analysis, `merge()` and `join()` for combining tables, and `fillna()` or `dropna()` for missing data. Reductions such as `mean()`, `sum()`, `min()`, and `max()` depend on column dtype and chosen axis. `DataFrame.apply()` passes each column by default or each row with `axis=1`. Element-by-element transformation is a different operation, provided by `DataFrame.map()` in current pandas.
#### Alignment, missing data, and combination
Labels do more than identify values. pandas aligns many operations by index and column label before calculating. Adding two Series with different index orders matches equal labels rather than equal physical positions. A label that appears on only one side normally produces a missing result at that location. This behaviour is valuable when records arrive in different orders, but it can conceal a misspelt or unintended label. Inspecting indexes before arithmetic or joins is therefore essential.

Missing values require a decision based on the data's meaning. `isna()` identifies them, `notna()` identifies present values, `dropna()` removes selected rows or columns, and `fillna()` supplies replacements. Filling every missing numerical value with zero can change the interpretation of a data set, because unknown, not applicable, and observed zero are distinct states. Summary methods also differ in how they treat missing values, so their defaults and parameters need checking.

`groupby()` partitions rows by one or more keys and then supports aggregation, transformation, or filtering. For example, total sales by category can be calculated by grouping on `Category` and summing `Total`. `merge()` combines tables through specified key columns in a database-style operation, while `join()` often combines through indexes. Inner, left, right, and outer joins retain different sets of unmatched keys. Duplicate keys can multiply rows, so key uniqueness should be tested when a one-to-one result is expected.
#### Exporting results
`to_csv()` writes a DataFrame as delimited text. A `.csv` suffix is conventional but not enforced by the method. The index is written by default, so `index=False` is appropriate when row labels should not become an extra column on the next import.

```python
electronics.to_csv("electronics_orders.csv", index=False)
```

pandas also supports Excel, SQL, JSON, and other formats, subject to format-specific dependencies and options. Round-trip accuracy should be checked when data types, time zones, missing values, formulas, or formatting carry meaning that a simpler format cannot preserve.
### Numerical arrays with NumPy
NumPy's `ndarray` is an N-dimensional, rectangular array. Its elements are typically homogeneous, and a `dtype` records their representation. Once an array exists, its total element count is fixed, although its shape can sometimes be changed without changing the data. This regular structure enables compact storage and vectorised numerical operations.

```python
vector = np.array([0, 1, 2, 3, 4])
matrix = np.array([[11, 12, 13], [21, 22, 23], [31, 32, 33]])
```

The core attributes describe an array precisely:

| Attribute | Meaning |
| --- | --- |
| `ndim` | Number of axes. This is not matrix rank in linear algebra. |
| `shape` | Length of each axis, such as `(3, 3)`. |
| `size` | Total number of elements, equal to the product of the shape. |
| `dtype` | Element representation, such as an integer or floating-point type. |

A one-dimensional array with shape `(n,)` has no separate row or column orientation. A row-shaped array needs shape `(1, n)`, and a column-shaped array needs shape `(n, 1)`. Adding an axis makes the distinction explicit:

```python
row = vector[np.newaxis, :]
column = vector[:, np.newaxis]
```
#### Creating and reshaping arrays
`np.array()` converts a regular Python sequence into an array and infers a common dtype unless one is supplied. Mixed numerical values may be promoted to a type that can represent them, while incompatible or irregular nested sequences require explicit handling. Other constructors express intent directly. `np.zeros()` and `np.ones()` initialise known values, `np.arange()` creates values from a start, stop, and step, and `np.linspace()` creates a requested number of evenly spaced samples.

Reshaping changes the arrangement of axes without changing the element count. An array of six values can have shapes `(6,)`, `(2, 3)`, or `(3, 2)`, but it cannot be reshaped to `(4, 2)` without adding or removing data. `reshape()` returns a view when possible and a copy when required by the memory layout. `flatten()` always returns a flattened copy, while `ravel()` returns a view where possible. Code that later mutates either object should make the sharing decision explicit rather than infer it from appearance.
#### Indexing, slicing, and assignment
Indexes are zero based. In a two-dimensional array, the first index selects a row position and the second selects a column position:

```python
value = matrix[1, 2]
first_row_prefix = matrix[0, 0:2]
first_two_rows_last_column = matrix[0:2, 2]
```

Slice stops are excluded, as in ordinary Python sequence slicing. Values can be replaced through an index or slice, subject to conversion into the array's dtype:

```python
vector[0] = 100
vector[3:5] = [300, 400]
```

Basic slicing usually returns a view that shares the original data buffer. Changing the view can therefore change the source array. Advanced indexing with integer lists or Boolean arrays returns a copy. An explicit `.copy()` is appropriate when independent data is required.

Boolean indexing selects values by their properties rather than by an assumed position pattern:

```python
values = np.array([1, 2, 3, 4, 5, 6])
even_values = values[values % 2 == 0]
```

This works for any ordering, unlike a slice that finds even values only when they happen to alternate at known positions.
#### Elementwise operations and broadcasting
Arithmetic operators generally act element by element. Equal shapes work directly, while some unequal shapes work through broadcasting.

| Expression | Operation |
| --- | --- |
| `a + b` | Elementwise addition. |
| `a - b` | Elementwise subtraction. |
| `a * b` | Elementwise multiplication, also called the Hadamard product for equal-shaped arrays. |
| `a / b` | Elementwise division. |
| `a * scalar` | Scalar multiplication through broadcasting. |
| `a @ b` | Matrix-style product under NumPy's dimensional rules. |

Broadcasting compares shapes from the right. Two dimensions are compatible when they are equal or one has length 1. A scalar is compatible with every array shape, so adding 1 to an array adds 1 to every element without constructing a full array of ones.

```python
a = np.array([[1, 2, 3], [4, 5, 6]])
offset = np.array([10, 20, 30])
shifted = a + offset
```

Here, the shape `(3,)` aligns with the last axis of shape `(2, 3)`, and the offset is applied to each row. Incompatible shapes raise `ValueError`. Broadcasting avoids many explicit Python loops, but a broadcast that creates a very large intermediate result can still consume substantial memory.
#### Universal functions and summaries
Universal functions, or ufuncs, apply compiled elementwise operations while observing dtype and broadcasting rules. Examples include `np.sin()`, `np.sqrt()`, `np.add()`, and `np.multiply()`. The last two correspond to elementwise `+` and `*`, not to matrix multiplication.

Aggregations such as `sum()`, `mean()`, `min()`, `max()`, and `std()` can summarise the entire array or a selected axis. On a two-dimensional array, `axis=0` reduces down rows and returns one result per column, while `axis=1` reduces across columns and returns one result per row.

`np.linspace(start, stop, num)` creates a requested number of evenly spaced samples. The stop value is included by default:

```python
x = np.linspace(0, 2 * np.pi, num=100)
y = np.sin(x)
```

The arrays can then be plotted or used in further calculations. `endpoint=False` excludes the stop value when a half-open interval is needed.
#### Vectors and matrix multiplication
For real one-dimensional arrays of equal length, `np.dot(u, v)` returns the inner product, the sum of elementwise products. It depends on both vector magnitudes and the angle between them. It is therefore related to directional similarity but is not a normalised similarity measure. Non-zero perpendicular real vectors have an inner product of zero.

Scalar multiplication scales every component. For a non-zero vector, multiplication by a positive scalar preserves direction and scales magnitude by the scalar's absolute value. A negative scalar reverses direction.

For two-dimensional arrays, `A @ B` or `np.matmul(A, B)` performs conventional matrix multiplication. If `A` has shape `(m, n)` and `B` has shape `(n, p)`, the result has shape `(m, p)`. Each output value is the inner product of one row of `A` and one column of `B`.

```python
A = np.array([[0, 1, 1], [1, 0, 1]])
B = np.array([[1, 1], [1, 1], [-1, 1]])
C = A @ B
```

The expression `A * B` is different. It requests elementwise multiplication and succeeds only when the shapes are broadcast-compatible. `np.dot(A, B)` also performs matrix multiplication when both inputs are exactly two-dimensional, but `@` states that intention more clearly.

The transpose `A.T` reverses an array's axes. For a two-dimensional array, rows become columns. Transposing a one-dimensional array leaves its shape unchanged because there is only one axis. A row or column representation requires adding an axis explicitly.
#### Performance and appropriate use
NumPy often outperforms loops over Python numbers when an operation covers large homogeneous numerical arrays. Vectorised operations move looping into compiled code, and views can avoid copying buffers. The advantage is conditional rather than universal. Small arrays, object dtypes, repeated allocations, unsuitable memory layouts, and oversized broadcast results can reduce or reverse it.

Direct iteration remains available:

```python
for value in vector:
    print(value)
```

Iteration is sometimes clearer for control-heavy tasks, while vectorised expressions are usually preferable for regular numerical transformations. pandas adds labels, mixed column types, missing-data conventions, and table operations on top of this numerical foundation. Python file objects remain the lower-level choice when exact control over text, bytes, encodings, and stream positions is required.
### Choosing the appropriate layer
The choice follows the data's structure. Raw text, byte streams, unusual record layouts, and precise persistence rules favour file objects. Labelled rows and columns, heterogeneous fields, joins, and missing values favour pandas. Dense homogeneous numbers, multidimensional shapes, broadcasting, and linear algebra favour NumPy. Conversions between layers are common, but each conversion can alter labels, dtypes, missing-value representations, or encodings. Checking those boundaries keeps a compact workflow accurate as well as convenient.
## APIs and Data Collectiion
Application programming interfaces, or APIs, define how software can request functionality or data from another component. An API may be local, such as the methods exposed by a pandas `DataFrame`, or remote, such as a web service reached over a network. In both cases, the caller relies on a documented interface: accepted inputs, available operations, returned values, and possible errors. The implementation behind that interface can change without requiring callers to understand its internal design.

APIs support reuse and automation. A program can use an established library for tabular analysis, obtain current data from a service, or connect several systems without rebuilding every capability. These benefits do not remove operational risk. Remote APIs can change, impose quotas, become unavailable, return malformed data, or expose security weaknesses. Reliable integrations therefore validate inputs and outputs, authenticate appropriately, protect secrets, limit resource use, and handle failures explicitly.
### Local APIs and web APIs
Pandas illustrates a local API. Constructing a `DataFrame` creates an object whose methods and attributes expose operations over its data. `head()` returns the first rows, `mean()` calculates column means where applicable, and `plot()` delegates visualisation work to a plotting backend. The caller uses these documented operations without needing to know which parts of pandas are implemented in Python, Cython, or compiled extensions.

A web API crosses a process or network boundary. The calling program acts as a client and sends a request to an endpoint. The server processes the request and returns a response. An endpoint is a URI associated with an operation or resource. In REST, a resource is an abstraction that can be identified, such as a customer, a team, a collection of observations, or a current price series. The server sends a representation of that resource, which might use JSON, HTML, XML, an image format, or another media type.

REST is an architectural style rather than a synonym for every HTTP API. Its constraints include client-server separation, stateless interactions, cacheability, a uniform interface, a layered system, and optional downloadable code. Many services described as REST APIs follow some of these constraints without implementing the complete style.
### HTTP requests and responses
HTTP is an application-level protocol for transferring representations and metadata. HTTPS applies HTTP over a connection protected by TLS and should normally be used for network APIs.

A URI can contain a scheme, authority, path, query, and fragment. In the example `https://api.example.com/items?category=fruit`, `https` is the scheme, `api.example.com` is the host within the authority, `/items` is the path, and `category=fruit` is the query. A URL is a URI that also provides a way to locate a resource. The term route is common in web frameworks, but path is the standard URI component name.

An HTTP request includes a method, a target, header fields, and sometimes content. A response includes a status code, header fields, and sometimes content. Headers carry metadata such as accepted formats, authentication credentials, caching directives, content type, and content length. JSON is common in APIs, but HTTP does not require it. A GET request normally carries parameters in its target URI. Content in a GET request has no generally defined semantics and can be rejected by implementations.

Common methods have distinct intended meanings:

| Method | Principal purpose |
| --- | --- |
| `GET` | Retrieve a current representation of the target resource |
| `POST` | Ask the target resource to process enclosed content according to its own semantics |
| `PUT` | Create or replace the state of a known target resource |
| `PATCH` | Apply a partial modification under the semantics of the selected patch format |
| `DELETE` | Request removal of the association between a URI and its current functionality |

The first digit of a three-digit status code identifies its class:

| Class | Meaning | Examples |
| --- | --- | --- |
| `1xx` | Interim information | `100 Continue` |
| `2xx` | Successful handling | `200 OK`, `201 Created`, and `204 No Content` |
| `3xx` | Redirection or another action | `301 Moved Permanently` and `304 Not Modified` |
| `4xx` | A problem associated with the request | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, and `404 Not Found` |
| `5xx` | The server failed to fulfil an apparently valid request | `500 Internal Server Error` and `503 Service Unavailable` |

The reason phrase can be misleading if read without the specification. `401 Unauthorized` normally means that valid authentication credentials are absent. `403 Forbidden` means that the server understood the request but refuses to fulfil it. A parsed JSON error response is still an error if its status code indicates failure.
### HTTP with Python Requests
The Requests library provides a compact Python interface to HTTP. A response object exposes the final URL, status code, headers, encoding, request details, and response content. `response.text` decodes content as text, while `response.content` returns bytes. `response.json()` decodes JSON but does not prove that the request succeeded, so status and media type still require checking.

Query parameters should be passed through `params` so that Requests performs the required encoding. Production code should set a timeout, catch request exceptions at an appropriate boundary, and reject unexpected response formats.

```python
import requests

url = "https://api.example.com/items"
params = {"category": "fruit", "limit": 20}

response = requests.get(url, params=params, timeout=10)
response.raise_for_status()

content_type = response.headers.get("Content-Type", "").lower()
if not content_type.startswith("application/json"):
    raise ValueError("Expected a JSON response")

data = response.json()
```

`raise_for_status()` raises an exception for unsuccessful HTTP status codes. A timeout limits how long Requests waits without receiving data, rather than imposing a fixed limit on the entire download. Larger downloads should be streamed in chunks instead of loaded wholly into memory.

For `POST`, the `data` argument encodes form data when given a dictionary. The `json` argument serialises a Python object as JSON and sets the corresponding content type. These forms are not interchangeable, because the receiving endpoint decides which representation it accepts.

```python
payload = {"name": "Cherry", "family": "Rosaceae"}
response = requests.post(url, json=payload, timeout=10)
response.raise_for_status()
```

Public demonstration APIs can return generated profiles, fruit records, jokes, sports results, or cryptocurrency time series. They are useful for learning request construction and response parsing, but their availability, schemas, access rules, and update intervals can change. A robust application pins supported API versions where possible and validates required fields rather than assuming that a previous example remains current.
### Converting API data into tables
JSON objects commonly decode to Python dictionaries, while JSON arrays decode to lists. Records can often be passed directly to `pd.DataFrame()`. Nested objects require deliberate flattening, for which `pd.json_normalize()` is useful.

```python
import pandas as pd

records = data["results"]
frame = pd.json_normalize(records)

selected = frame.loc[
    frame["name"] == "Cherry",
    ["name", "family", "genus"],
]
```

The code should first verify that `results` exists and has the expected type. Normalisation can produce dotted column names for nested fields. A table also needs semantic checks, including units, time zones, identifier uniqueness, allowed ranges, and the meaning of missing values.

Time-series responses often contain pairs such as a Unix timestamp and a value. `pd.to_datetime()` can convert timestamps when the correct unit and time zone are known. Daily open, high, low, and close values can be derived by grouping observations by date and selecting the first, maximum, minimum, and last value in chronological order. The result is only as reliable as the sampling frequency and ordering of the underlying observations.
### HTML structure and web scraping
HTML describes a document through elements such as `html`, `head`, `body`, headings, paragraphs, links, images, and tables. Most elements have a start tag, content, and an end tag. Attributes add information, such as an `id`, a CSS class, or an `href` on a link. The parsed document forms a tree. An element can have children, a parent, descendants, and siblings.

A table normally uses `table` for the container, `tr` for rows, `th` for header cells, and `td` for data cells. Real pages may contain malformed markup, nested tables, generated content, or layouts that only resemble tables visually. CSS and JavaScript can also determine what appears in a browser, so the downloaded HTML may differ from the rendered page.

Beautiful Soup parses HTML or XML through a selected parser and exposes objects for navigating and searching the resulting tree. The package installed from Python's package index is `beautifulsoup4`, although it is imported from `bs4`. A `Tag` represents an element, a `NavigableString` represents text within the tree, and the `BeautifulSoup` object represents the parsed document as a whole. It supports many `Tag` operations but is not an HTML tag itself.

```python
from bs4 import BeautifulSoup
import requests

response = requests.get("https://www.example.com", timeout=10)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

page_title = soup.title.get_text(strip=True) if soup.title else None
links = [tag.get("href") for tag in soup.find_all("a", href=True)]
images = [tag.get("src") for tag in soup.find_all("img", src=True)]
```

`find()` returns the first match or `None`. `find_all()` returns all descendants that match filters based on tag name, attributes, strings, regular expressions, or functions. Attributes can be accessed like dictionary entries or through `get()`, which avoids a `KeyError` when an attribute is absent. The keyword `class_` is used to filter the HTML `class` attribute because `class` is reserved in Python.

Tree navigation needs care. Whitespace and punctuation can be represented as string nodes, so `next_sibling` does not always return the next tag. Search methods or explicit checks for `Tag` objects are often safer than assuming a fixed sequence of siblings.

For a well-formed HTML table, pandas can reduce the amount of parsing code:

```python
tables = pd.read_html("page.html")
frame = tables[0]
```

`read_html()` searches actual HTML table elements and returns a list of DataFrames. It does not extract arbitrary page layouts, and the result can retain link text, repeated headers, merged-cell artefacts, and unrelated tables. Selection and cleaning remain necessary. Beautiful Soup offers finer control over non-tabular content. A browser automation tool may be required when authorised data only appears after JavaScript execution, although an official API is usually more stable when one is available.

Scraping should respect applicable law, privacy, copyright, contractual terms, and site capacity. A scraper should identify itself where appropriate, limit request rates, cache responses, avoid collecting unnecessary personal data, and stop when access is refused. `robots.txt` communicates crawler preferences, but it is neither access permission nor a security control. Authentication barriers and technical restrictions should not be bypassed without explicit authorisation.
### Data engineering and file formats
Data engineering commonly organises work as extract, transform, and load. Extraction collects data from files, APIs, databases, or web pages. Transformation validates, cleans, reshapes, combines, and standardises it. Loading writes the prepared data to a destination such as a database, analytical store, or file. In practice, these stages can overlap or run in a different order, but the model usefully separates acquisition from quality work and storage.

A file format defines how bytes represent information. A filename extension is a useful hint, not proof of the format. Reliable software also considers file signatures, declared media types, encodings, and parser results. Text formats still consist of bytes and require a character encoding. Binary formats are not inferior or unreadable by definition. They use structures intended for software and can offer compression, richer types, or faster access.

| Format | Structure | Common Python approach | Important qualification |
| --- | --- | --- | --- |
| CSV | Plain-text records and delimited fields | `pd.read_csv()` and `DataFrame.to_csv()` | Dialect, quoting, encoding, delimiter, and header assumptions must be known |
| JSON | Text values built from objects, arrays, strings, numbers, booleans, and null | `json.load()`, `json.loads()`, `json.dump()`, `json.dumps()`, and pandas JSON functions | Nested data does not map automatically to a simple table |
| XLSX | A packaged Office Open XML workbook containing sheets, cells, styles, and related parts | `pd.read_excel()` and `DataFrame.to_excel()` | A workbook can contain formulas, multiple sheets, merged cells, and formatting not preserved by a DataFrame |
| XML | A hierarchical markup document containing elements, attributes, and text | `xml.etree.ElementTree` or `pd.read_xml()` | Namespaces and deep or irregular structures require explicit handling |
| Image files | Encoded pixel data plus format-specific metadata | Pillow's `Image.open()` and save methods | Decoding untrusted files requires size limits and current libraries |

CSV usually stores one record per line, with fields separated by commas, although real-world dialects vary. Quoting permits commas, quotation marks, or line breaks inside fields. A header row is optional. If a headerless file is read with pandas' default inference, the first record can be mistaken for column names. Passing `header=None` preserves it as data, and `names=[...]` can assign labels during import.

JSON is a text-based, language-independent interchange format derived from JavaScript syntax. An object contains name-value pairs, and an array contains an ordered sequence of values. In Python, `json.dump(object, file)` serialises to a writable file-like object, while `json.dumps(object)` returns a string. `json.load(file)` deserialises from a readable file-like object, while `json.loads(text)` parses a string, bytes object, or byte array. Untrusted JSON should be size-limited because deeply nested or very large input can consume substantial resources.

XML represents a tree and can preserve distinctions that a rectangular DataFrame cannot. `xml.etree.ElementTree` can create elements, write trees, parse files, and traverse nodes. `pd.read_xml()` is convenient for shallow, repeated records and accepts an XPath expression, but namespaces or complex documents may require `ElementTree`, `lxml`, or an explicit transformation.

Pillow is the maintained imaging library commonly imported as `from PIL import Image`. Opening an image decodes a binary file according to its format. Displaying, resizing, converting, and saving are separate operations. File type, dimensions, decompression limits, colour mode, and metadata deserve validation before an image enters an analytical pipeline.
### Inspecting, transforming, and validating data
A newly loaded DataFrame should be inspected before analysis. `head()` and `tail()` reveal sample rows. `shape` reports row and column counts. `info()` summarises the index, columns, data types, non-null counts, and memory use. `describe()` returns descriptive statistics appropriate to the selected columns. `dtypes` is an attribute that reports each column's data type, while `astype()` converts data when the values support the requested type.

`loc` selects by labels, and `iloc` selects by integer position. A column can be selected with `frame["name"]`, several columns with a list of labels, and rows with conditions. Label and positional indexing should not be mixed implicitly because an integer label is not necessarily the same as an integer position.

Missing-data checks require both technical and domain knowledge. `isna()` and `notna()` identify recognised sentinels such as `NaN`, `NaT`, `None`, and `pd.NA` where applicable. They cannot detect a numeric code that the source uses to mean unknown, nor can they identify an impossible value. A zero recorded for a measurement may be valid, invalid, or a missing-value marker depending on the data dictionary. Declaring a dataset complete solely because `isna()` returns no matches is therefore unsafe.

`DataFrame.transform()` applies a function while producing an object with the same axis shape. It suits element-wise or column-wise transformations such as adding a constant or applying a square root where values permit it. Aggregations such as means serve a different purpose because they reduce data. Transformations should preserve units, document assumptions, and avoid silently overwriting raw values.

Visualisation can reveal distributions, imbalance, outliers, and suspicious values, but a chart does not establish causation or data quality. Labels, units, denominators, and population definitions should accompany percentages. Medical or demographic datasets require particular care because missingness, selection criteria, and historical labels can affect both interpretation and fairness.

A dependable pipeline follows a short sequence:
1. It records the source, schema, licence, collection time, and expected update frequency.
2. It retrieves data with authentication, timeouts, bounded retries, and status checks.
3. It validates media type, structure, required fields, units, ranges, and identifiers.
4. It retains raw data or a reproducible snapshot before transformation.
5. It cleans and reshapes data with explicit, testable rules.
6. It checks row counts, missingness, duplicates, data types, and summary statistics after each major change.
7. It saves the result in a format suited to later use and records enough provenance to reproduce it.

APIs, HTTP clients, HTML parsers, and file readers are complementary parts of this pipeline. Their convenience is most valuable when paired with protocol-aware error handling, schema validation, responsible collection, and disciplined data-quality checks.
