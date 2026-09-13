# Introduction to Software Testing

Software testing evaluates whether components and systems behave as required. It exposes defects, supports maintenance, and provides evidence for release decisions. Passing tests increases confidence in the cases examined, but cannot prove correctness in every situation. Exhaustive testing is generally infeasible, so test selection reflects requirements, likely failures, and the consequences of error.

### Evidence for change and reuse

Running an existing test suite before modifying a project establishes a baseline. Later failures can then be compared with that starting point. Tests also illustrate how interfaces are used and what results callers should expect.

Regression tests check whether changes disrupt existing behaviour. They support refactoring, new features, and dependency upgrades. Effective tests can reduce debugging and rework, although they require maintenance and cannot detect every defect.

Compatibility testing helps assess security updates, but urgent vulnerabilities may require accelerated patching or temporary mitigation. In the 2017 Equifax breach, attackers exploited an unpatched Apache Struts vulnerability, exposing personal information belonging to approximately 147 million people. Failures in patch verification, vulnerability scanning, and network protection allowed attackers to operate undetected for months.

Reusable packages similarly benefit from clear contracts and tests for supported uses and invalid inputs.

### Testing at different scopes

Testing examines individual parts, their interactions, and the complete product.

| Scope | Purpose |
| --- | --- |
| Unit testing | Checks a component in isolation, commonly a function or class. |
| Integration testing | Checks interfaces between components, systems, or external services. |
| System testing | Evaluates the complete integrated product against its requirements. |
| Acceptance testing | Assesses whether the product meets business and user needs and is ready for delivery. |

Some frameworks separate component integration from system integration. User acceptance testing is one form of acceptance testing and commonly involves intended users or their representatives.

Unit tests can draw on both the public contract and knowledge of the implementation. Useful cases cover normal behaviour, boundaries, alternative branches, and error handling. Covering every branch still cannot establish correctness for every input.

Development, build, test, staging, and production environments support different checks, but their arrangement varies. Build processes create deployable artefacts. Staging often resembles production. Integration, acceptance, and some performance checks can also begin during development.

Automated checks support continuous integration as changes enter a shared codebase. Continuous delivery keeps software ready for release on demand. Continuous deployment automatically releases changes that pass the required checks. Exploratory testing and production monitoring provide additional evidence.

### Development guided by behaviour

Test-driven development, or TDD, proceeds through small cycles. A developer writes a test for required behaviour and confirms that it fails because that behaviour is missing. The developer then implements enough code to pass it, refactors the code's structure, and reruns the tests. TDD commonly uses unit tests without requiring dependence on private implementation details.

Behaviour-driven development, or BDD, brings developers, testers, and domain specialists together to clarify useful behaviour through shared examples. Given, When, and Then commonly express the starting context, an action, and the expected outcome. For a shopping cart, an example could specify that an added product appears in the cart.

BDD often informs integration and acceptance tests, but can also describe component behaviour. BDD and TDD can complement each other. Neither is a testing level or a guarantee of a correct product.

### Small calculations, explicit contracts

A triangle's area is half its base multiplied by its perpendicular height, using consistent units. A Python implementation using base 3.5 and height 8.5 returns 14.875. That correct result does not validate every possible input.

Negative lengths fall outside a non-negative length contract. Zero represents a degenerate case, whose acceptance must be specified. Python treats `True` as 1 in arithmetic because `bool` is a subclass of `int`, so Booleans need explicit exclusion if the contract rejects them. A string used as the base causes a `TypeError` during division.

Docstrings and type hints communicate expectations but do not enforce ordinary Python annotations at runtime. Validation can distinguish unsupported types, reported with `TypeError`, from invalid values, reported with `ValueError`. Finite dimensions also require rejection of infinity and `NaN`, meaning 'not a number'.

Automated tests compare actual results with expected outcomes, including specified exceptions. Printing answers alone leaves their assessment to a person. When feasible, a test reproducing a defect is retained after the fix to detect recurrence.

### Recovery under real conditions

Margaret Hamilton led the MIT Instrumentation Laboratory's Software Engineering Division during Apollo's flight software development. Apollo combined suitable programming abstractions, priority scheduling, recovery points, hardware fault detection, and telemetry.

Most flight code was resident in read-only memory, and astronauts selected operations through the DSKY display and keyboard. The computer scheduled jobs according to priority using limited temporary storage.

During Apollo 11's 1969 lunar descent, a rendezvous radar interface problem consumed processing time and contributed to the 1201 and 1202 overload alarms. Buzz Aldrin's altitude display request added work during the early alarms, but further alarms occurred without it.

Spurious counter updates consumed roughly 13% of its processing time, allowing unfinished work to accumulate until temporary job storage was exhausted.

Tested restart protection restored essential computations at designated recovery points. Some non-essential work was discarded during recovery. Controllers assessed continued guidance performance and the trajectory before approving continuation. Recovery mechanisms complement testing by preserving critical functions during faults. Complex interactions can escape test coverage, while operational observations help teams investigate failures and improve subsequent designs.

## Test Driven Development

Test-driven development, or TDD, uses automated tests to guide software implementation. Each test describes an expected result, state change, or error response. Writing that expectation first encourages attention to how the code will be used and what its caller can reasonably supply.

Reliable testing combines meaningful expectations with controlled starting conditions. A test runner executes cases, assertions check their outcomes, fixtures prepare and clean up the environment, and coverage tools measure which code was reached. These functions support one another, but none independently establishes correctness.

### The TDD cycle

TDD proceeds through three recurring stages:

1. Red: a new test describes required behaviour and fails because the implementation does not yet provide it.
2. Green: the developer adds enough implementation to satisfy the test, then checks the existing suite.
3. Refactor: the developer improves the code's structure while preserving its observable behaviour.

The initial failure needs inspection. A broken import or an invalid assertion does not demonstrate that the intended requirement is being tested. Likewise, removing a placeholder exception without adding a meaningful check produces little evidence.

A fixed return value may satisfy an early example. If another required input exposes that shortcut, a new failing test should drive the more general implementation. Refactoring can then improve the working code without changing its behaviour.

Tests can serve as executable design examples. They can expose awkward interfaces, such as an operation requiring information its caller cannot access. They do not capture every requirement or architectural decision.

As tests accumulate, they can detect regressions in previously checked behaviour. They can reduce repeated manual checking and shorten feedback cycles, although productivity benefits depend on context and maintenance. Passing tests support confidence in the cases examined, without guaranteeing that every defect will be found.

Automated testing is a central capability for effective continuous integration and continuous delivery. Pipelines can run checks as code changes, while exploratory, usability, and other suitable testing can still involve people. Red and green are conventional outcome labels, not a requirement for coloured output.

A suite written after implementation can still provide valuable regression checks. TDD specifically uses a new test to guide the next change. The distinction concerns the development sequence, rather than whether the chosen framework supports automation.

### Python frameworks and reporting tools

Python's standard-library `unittest` module, historically called PyUnit, provides test classes, assertions, fixtures, discovery, and runners. It belongs to the xUnit tradition, alongside frameworks such as JUnit for Java and NUnit for .NET. These frameworks share concepts rather than identical syntax.

Other Python tools serve related purposes:

| Tool | Role |
| --- | --- |
| pytest | Runs tests and provides fixtures with function, class, module, package, and session scopes |
| doctest | Checks interactive Python examples in docstrings or selected text files |
| Nose | Extends unittest with a legacy runner and plugin system |
| Pinocchio | Adds specification-style reporting and optional colour to compatible Nose environments |
| Coverage.py | Measures execution of configured Python source |

Fixture dependencies can simplify preparation, but poorly organised dependencies can obscure a test's starting state. Framework selection depends on compatibility, project needs, and maintainability. RSpec itself is a Ruby framework, although separate Python projects have adopted similar styles.

Nose's documentation describes it as being in maintenance mode and suggests alternatives for new projects. Historical instructions using Nose with Python 3.8 require particular compatibility arrangements. Python 3.8 reached end of life in October 2024 and is unsuitable as a supported default for new development.

Pinocchio uses `--with-spec` for specification-style output and `--spec-color` for colour. Descriptive names and docstrings help readers understand test results. Python 3.14 also added colour output to unittest, so this presentation is no longer exclusive to Nose plugins.

### Running and interpreting tests

Running an existing suite before changing code establishes a baseline. It can reveal existing failures, missing dependencies, or discovery problems. The interpreter, working directory, and project layout need to match the application's imports and data paths.

A cloud development environment does not determine test behaviour by itself. Theia supports desktop and cloud use, while a particular host determines workspace persistence. A temporary training workspace may require work to be saved before the session ends. Dependencies and file locations still need to match the project configuration.

An explicit unittest discovery command is:

```bash
python -m unittest discover -s tests -v
```

This searches the `tests` directory and requests verbose output. Individual modules, classes, or methods can also be selected. The shorter `python -m unittest` invokes default discovery behaviour.

In a typical compact report, a dot indicates success, `F` indicates an assertion failure, and `E` indicates an unexpected exception. The summary includes the number of tests and elapsed time. A quick demonstration is not a general performance benchmark.

The normal unittest loader sorts test method names alphabetically. Its default method prefix is `test`, with `test_` a common convention. Other methods can provide helpers without being separately discovered.

Ordering does not make tests independent. Each case must establish its own preconditions and avoid relying on records or state left by another case. Shared mutable data can create dependencies even when tests occupy separate methods.

The legacy `nosetests --stop` command stops at the first error or failure. This can focus investigation, but a complete run is needed to reveal remaining failures. A result showing zero discovered tests does not establish that the intended behaviour or class fixtures ran.

Failure messages need interpretation alongside the test's purpose. A mismatched expected value can indicate an implementation defect or an incorrect expectation. An unexpected exception can arise during preparation as well as during the operation under examination. The reported test count also helps reveal cases that were accidentally omitted.

### Assertions that express behaviour

An assertion compares observed behaviour with an expectation. Python's `assert` is a statement, not a function. It normally raises `AssertionError` when its condition is false, but Python's `-O` optimisation option can remove plain assert statements.

The assertion methods supplied by `unittest.TestCase` remain active under optimisation and provide specialised failure messages. Most return `None` on success rather than a Boolean result.

| Assertion | Expected condition |
| --- | --- |
| `assertEqual(a, b)` | The values are equal |
| `assertNotEqual(a, b)` | The values differ |
| `assertIn(a, b)` | The collection contains the value |
| `assertNotIn(a, b)` | The collection does not contain the value |
| `assertTrue(value)` and `assertFalse(value)` | The value is truthy or falsy |
| `assertIs(a, b)` | Both expressions identify the same object |
| `assertIsInstance(value, Type)` | The value belongs to the type or a subclass |
| `assertRaises(ExceptionType)` | The checked operation raises the expected exception or a subclass |

Truthiness differs from identity with `True` or `False`. Likewise, an instance check does not require an exact type match. Python's `bool` is a subclass of `int`, so an interface that rejects Boolean inputs needs an explicit rule.

`assertRaises` can receive a callable and its arguments or act as a context manager around a `with` block. No exception produces a failure, while a different exception normally produces an error. An expected exception is therefore a successful test outcome. This checks the operation's visible error response, rather than every internal error handler.

A triangle-area function illustrates ordinary and invalid-input cases. Its area is half the base multiplied by the perpendicular height. A base of 2 and height of 5 give area 5. A base of 3.4556 and height of 8.3567 give 14.43870626 in exact decimal arithmetic.

Many decimal fractions have no exact binary floating point representation. `assertAlmostEqual` normally checks whether the difference between two values rounds to zero at seven decimal places. This is not a seven-significant-figure comparison. A different number of places or an absolute `delta` can be specified, but not both. The tolerance needs to suit the calculation.

The function's contract can reject negative dimensions with `ValueError` and unsuitable types with `TypeError`. Tests should check each parameter position, including Boolean or string inputs when excluded. Permitting zero dimensions and returning zero area represents a deliberate allowance for a degenerate case.

Ordinary cases are often called happy paths, while invalid-input cases are called sad paths. Both require precise expectations. A passing error test confirms the specified response to that input, without demonstrating complete error handling.

A custom addition function can accept 2 and 3 as separate arguments and return 5. Python's built-in `sum` has a different interface, taking an iterable such as `sum([2, 3])`. Tests need to describe the actual interface, rather than assume that similarly named operations accept the same inputs.

### Testing a stack

A stack follows last-in, first-out behaviour. `push` adds an item at the top, `pop` removes and returns the top item, `peek` returns it without removal, and `is_empty` reports whether items remain.

A `TestCase` subclass can group related stack tests. Its `setUp` method can create a fresh stack before each case. The normal unittest runner also creates a fresh test-class instance for each test method.

An empty-state assertion alone would accept a faulty implementation that always reports true. Checking the state after insertion exposes that defect. The same reasoning applies throughout a suite: a useful example needs observations that distinguish the required behaviour from plausible mistakes, rather than simply follow a successful execution.

One item provides a weak ordering test because the top and bottom coincide. Distinct values reveal whether an operation uses the correct end and preserves earlier items.

| Behaviour | Useful observations |
| --- | --- |
| Empty state | A new stack is empty, becomes non-empty after a push, and becomes empty after its last item is removed |
| Push | After pushing 3 and then 5, both values remain available in reverse insertion order |
| Peek | Repeated peeks return 5, and subsequent pops still retrieve 5 and then 3 |
| Pop | The first pop returns 5, the remaining top is 3, and the next pop returns 3 |
| Empty operations | Pop and peek produce the response specified by the interface |

Peeking after each push checks only the latest visible item. An incorrect implementation that replaces the entire stack could pass those checks. Retrieving the earlier item establishes that pushing preserved existing contents.

Similarly, checking only the value returned by `pop` cannot establish removal. Inspecting or removing the next item distinguishes a true pop from an operation that only reports the top value.

Tests may use several public operations to observe one behaviour. A push test can use pop to inspect stored values, although a failure may involve either operation. Clear names and focused expectations help investigation.

Setting a stack attribute to `None` releases that reference, but does not guarantee immediate object destruction. For an ordinary in-memory stack, fresh construction is usually the key isolation step. External resources require more deliberate cleanup.

### What coverage reveals

Statement coverage measures the proportion of executable statements reached within the configured source scope. Comments and blank lines are not executable statements. Branch coverage additionally measures alternatives in control flow, such as both outcomes of a conditional.

A missing-line report identifies executable lines not reached during measurement. These locations can guide investigation of absent input cases or untested error paths. The report cannot identify every missing behavioural test or supply its correct expectation.

Removing tests for negative dimensions or invalid types may leave the corresponding validation code unexecuted. Restoring suitable cases can increase measured coverage. The useful result is evidence that the intended condition was exercised and checked, rather than a percentage increase by itself.

Coverage.py can measure a unittest run and display missing lines:

```bash
python -m coverage run --source=triangle -m unittest discover -s tests
python -m coverage report -m
```

Here, `triangle` names the example module being measured. A different project needs its own source scope. Comparing percentages requires consistent scope and measurement settings.

Full statement coverage does not prove correctness. A test may execute a line without checking its effect, overlook an important combination of inputs, or fail to notice required behaviour that has not been implemented.

The legacy Nose coverage plugin uses `--with-coverage` and can load earlier measurements unless `--cover-erase` is enabled. By contrast, a direct `coverage run` starts fresh by default, with `--append` explicitly requesting accumulation.

Repeated reporting options can be stored in configuration. A legacy `setup.cfg` can contain Nose verbosity, Pinocchio options, coverage settings, and the selected package. Configuration improves consistency, but must match the installed tools. Colour, readable descriptions, and high coverage percentages each describe different aspects of a test run.

Within a legacy `nosetests` configuration section, `with-spec` and `spec-color` control Pinocchio, while `with-coverage` and `cover-erase` control measurement. `cover-package` selects the package. A `coverage:report` section can enable `show_missing`. Recording these choices helps another developer reproduce the reporting setup instead of relying on remembered command options.

### Fixtures and resource lifetimes

Fixtures establish a known starting environment and arrange cleanup. They can create objects, prepare files, load sample data, initialise database infrastructure, or provide controlled test doubles. Repeatability also depends on controlling shared state and other external influences.

unittest provides setup and teardown hooks at three scopes:

| Scope | Setup | Teardown |
| --- | --- | --- |
| Module | `setUpModule` | `tearDownModule` |
| Class | `setUpClass` | `tearDownClass` |
| Individual test | `setUp` | `tearDown` |

Class hooks use `@classmethod`. In normal execution, module setup precedes class setup, followed by individual setup and the test. Individual teardown follows each test, class teardown follows the class's tests, and module teardown follows the module's tests.

This sequence depends on setup and skip outcomes. If individual setup fails, the test body and `tearDown` do not run. If setup succeeds and the test fails, teardown still runs. Registered cleanups can release resources acquired before a later setup failure.

Broader fixture scopes can reduce repeated preparation, but shared mutable objects can leak changes between tests. Loading common data once is suitable when cases treat it as read-only or receive independent copies. Fakes and mocks can control dependencies, but do not establish the behaviour of the real external system.

A directory named `fixtures` is a useful convention, not an automatic loader in unittest. Test code must explicitly open its data files and resolve their paths consistently.

### Database state and fixture data

Database tests need to distinguish schema preparation, record cleanup, and session cleanup. In Flask-SQLAlchemy, `db.create_all()` creates missing tables for known models. It does not clear existing records or migrate an existing schema. Current database operations also require an active Flask application context.

Creating tables once at class scope does not keep exactly one physical database connection open. Sessions obtain connections as needed, while the engine's pool manages reuse.

`Session.close()` releases session resources and normally returns checked-out connections to the pool. A pooled connection may remain open. `scoped_session.remove()` closes and discards the current session. Neither operation deletes committed records.

An isolated test database can start each case with an empty account table. The legacy expression `db.session.query(Account).delete()`, followed by a commit, deletes rows while preserving the table. It issues `DELETE`, not SQL `TRUNCATE`. The Query API is legacy in SQLAlchemy 2.x.

Dropping and recreating tables is another reset strategy. Transaction rollback can also isolate cases when transaction boundaries contain the test's changes. Record reset and session cleanup serve different purposes and need to be designed together.

A JSON array of account objects becomes a Python list of dictionaries through `json.load`. Each dictionary supplies one account's fields. `Account(**data)` unpacks that dictionary into keyword arguments and initialises an in-memory object. Persistence requires database session operations, supplied in this example by an application-defined `create` method.

Likewise, `Account.all()` is an application-defined query method. After creating one account in an empty table, a test can check that `len(Account.all())` equals 1. Comparing the collection itself with 1 would check the wrong condition. Retrieved field values also need examination to establish that the intended data was saved.

Unexpected counts that increase across repeated runs can indicate residual records. Closing a session alone does not address that problem.

A multiple-account test can iterate over the fixture dictionaries, persist each account, and compare the retrieved count with `len(ACCOUNT_DATA)`. Deriving the expected count from the input collection accommodates changes in fixture size. It should not replace checks of individual records or repeat potentially faulty application logic when calculating expectations.

Fixture data can be stored on the test class. A module-global alternative requires a `global` declaration when the name is rebound inside a function, but not simply when an existing collection is mutated. Shared data needs protection from changes that affect later cases.

A `with open` block closes the data file when the block exits. Its header uses a colon, and the module name is `json`. File names must match the actual path, including case where the filesystem distinguishes it. Loading a collection once should not turn it into an uncontrolled shared workspace.

Fixed examples support reproducible regression testing. Random selection can explore different records, but may choose the same record repeatedly. Generated failures need recorded inputs or another reliable replay mechanism. Tools such as Hypothesis can replay failures, while explicit examples preserve important cases.

Occasional unexplained failures are not a testing objective. A generated case that reveals a defect needs enough recorded information for investigation and repeat execution. Once understood, an important failing input can become a permanent regression example. Fixed cases and controlled variation then provide complementary evidence.

A useful suite combines ordinary operations, boundary cases, invalid inputs, and reproducible variation where appropriate. Its confidence comes from meaningful assertions and controlled conditions, supported by readable reports and coverage information.

## Advanced Methods for Test Driven Development

Software tests compare a program's observed behaviour with an expected result. Their value depends on the behaviours they examine, the inputs they use, and the assertions they make. A passing test establishes that its checks succeeded under its particular conditions. It does not establish that the program will behave correctly for every input or in every environment.

Test-driven development, coverage measurement, test fixtures, generated data, and mock objects support different parts of this work. Test-driven development uses tests to guide implementation. Coverage identifies executable code that did not run. Fixtures establish initial conditions. Factories construct objects with sample data. Mocks replace dependencies with objects whose behaviour a test controls.

These techniques can be used together. An account model might need tests for creation, dictionary conversion, updating, and deletion. Its inputs could come from a saved data file or a factory. A movie-information client might need a replacement for a remote web service. A counter's application programming interface (API) might be built incrementally from tests that define how named counters behave.

### Test-driven development

Test-driven development, usually called TDD, begins with a small test for a behaviour that the application needs. The test describes the result expected from code that may not yet exist. Once that requirement is expressed, the developer implements enough code to satisfy it and then improves the structure of the code.

The cycle is commonly called red, green, and refactor.

1. Red: a new test fails because the required behaviour is absent or incorrect.
2. Green: a small implementation change makes the new test pass while preserving the existing tests.
3. Refactor: the internal structure improves while the observable behaviour remains unchanged.

The cycle repeats as more behaviours are specified. A test might first describe the successful creation of a counter. Another might describe rejection of a duplicate name. Further tests can describe retrieval, incrementing, deletion, and responses to unknown names.

A new test should fail for the intended reason. Missing modules or application objects can prevent a test from reaching its assertion. Those setup errors need resolution before the test can meaningfully examine the required behaviour.

Tests written before implementation can clarify interface choices. They require decisions about input names, return values, errors, and state changes. Once those decisions are explicit, implementation can proceed against a concrete behavioural contract. However, writing tests first does not guarantee higher quality or faster delivery. Outcomes depend on the quality of the tests, the development process, and the problem being solved.

Refactoring preserves observable behaviour while improving internal structure. Extracting repeated setup into a helper can be a refactoring. Adding an error response changes behaviour and needs a corresponding test. Existing tests help detect regressions, but only within the behaviours they check.

### Test structure and initial conditions

Python's standard unittest framework provides a `TestCase` base class and assertion methods. Test methods conventionally begin with `test_`, while the default loader recognises the prefix test. Descriptive method names identify the intended behaviour, and short docstrings can explain the purpose of a test.

A test usually establishes its starting conditions, performs an operation, and checks the result. For example, an update test creates an account, changes a field, saves the change, and checks the stored value. A deletion test first establishes that a record exists, deletes it, and checks that it is absent.

Assertions should correspond to the requirement. An equality assertion can check a returned value or status code. An assertion that an identifier is present can check a creation result. An expected-exception assertion checks that invalid input produces the intended exception. Tests that only check that execution did not crash provide less information than tests that also inspect the required output and state change.

In unittest, `setUp` prepares conditions before each test, and `tearDown` performs cleanup after a test whose setup succeeded. Class-level setup can create shared infrastructure or load fixed data once. Shared infrastructure and shared mutable state require different treatment. A table definition may be reused, but records created by one test should not alter the starting conditions of another.

Database examples can use isolated tables, transaction rollback, or explicit cleanup to establish the intended state. The choice depends on how the application commits changes and how its database sessions work. Flask-SQLAlchemy operations also require an appropriate application context. The extension supplies access to model definitions and database sessions, while SQLAlchemy performs the underlying object-relational mapping. Tests using a real database also examine integration with that database.

Running the existing suite before editing establishes a baseline. Rerunning it after each small change narrows the possible causes of new failures. A runner can stop at the first failure during diagnosis, followed by a full run to check the remaining tests.

Tests should not rely on their order in a source file. The standard unittest loader sorts test method names. A different execution order does not demonstrate that tests were randomly shuffled or that they are independent. Independence comes from controlled initial conditions and cleanup.

Shared helpers can prepare test objects without making one test depend on another. Calling one test method from another can introduce hidden dependencies between their assertions and assumptions.

### Coverage and its limits

Line coverage measures the proportion of executable lines that run during a measured execution. The calculation is the number of executed executable lines divided by the total number of executable lines, multiplied by 100. Blank lines and comments do not count as executable statements.

Coverage tools monitor execution and compare the recorded activity with the source code. They can report which lines ran and which did not. This allows tests to be extended towards code that was previously unexamined by the measured run.

Coverage.py reports execution through these fields.

| Field | Meaning |
| --- | --- |
| `Name` | Source filename |
| `Stmts` | Executable statements |
| `Miss` | Statements not executed |
| `Cover` | Coverage percentage |
| `Missing` | Line numbers not executed |

The command `coverage report -m` displays missing lines. An HTML report places results beside the source code.

With 81 executable statements and five missed, 76 statements have executed. Coverage is 76 divided by 81, or about 94%. Executing one more statement raises it to about 95%. The denominator excludes non-executable lines.

Coverage depends on the configured files and exclusions. It may include application code, tests, and imported modules. Narrowing that scope can increase the reported percentage without improving behaviour.

Import and setup code can contribute coverage before any behavioural assertion runs. Coverage records execution, so its percentage does not measure assertion quality.

Coverage guides investigation. A missed line might be the body of a representation method, a dictionary conversion, a database operation, or an exception handler. The next step is to understand the behaviour of that code and construct an input that reaches it. An assertion then checks the required outcome. Calling a function only to increase a percentage leaves its result insufficiently examined.

A test can reach a method-not-allowed handler by sending an unsupported method to an existing endpoint. It can then check the expected 405 status and error representation. Flask's route listing identifies supported methods. A missing route commonly produces 404 instead.

Successful operations do not necessarily execute failure handling. An account update with a valid identifier can save successfully while leaving an invalid-identifier exception unexecuted. A separate test can create an account without an identifier and assert that update raises the intended validation exception.

Failure paths are not synonymous with else clauses. Either branch of a condition can represent success or failure. Exceptions, empty collections, unavailable dependencies, invalid input, and missing records can also produce distinct behaviours that need tests.

Branch coverage complements line coverage. It examines possible transitions between executable lines, such as the alternatives following a condition. Every executable line can run while an alternative branch remains unvisited. Branch coverage can reveal that difference. Neither measure exhaustively examines every combination of inputs, paths, timing, and state.

Reaching 100% line coverage establishes that all measured executable lines ran at least once. It does not establish that the inputs were valid, that the outputs were checked, or that the code is correct. A faulty assertion, a missing requirement, or a boundary case can remain undetected. Tests continue to be useful after full coverage when they examine new requirements or previously untested conditions.

### Testing an account model

An account model can represent a database record with an identifier, name, email address, phone number, disabled flag, and joining date. The schema determines the field types and which values may be absent. A phone number is normally treated as text in this model, preserving prefixes, punctuation, and extensions. A joining field may be a date or a timestamp, depending on the schema.

Python calls `__repr__` through `repr(account)`. If the class has no custom `__str__`, `str(account)` can also use that representation. A test can check the required debugging description, including the class name and account name.

The `to_dict` method collects model fields into a dictionary. Tests can check its complete key set and expected values, including optional fields. The required representation also determines whether internal fields should be excluded.

The `from_dict` method performs the reverse operation by assigning fields from a dictionary to an account instance. A test begins with known values and checks the resulting attributes. A simple loop using `setattr` performs assignment, but does not itself validate the input or restrict which fields may be changed. A production contract can specify permitted fields, required values, and responses to invalid data.

Creation tests can check that an account is stored and receives an identifier. A multiple-creation test can create ten accounts and verify the expected records. That count requires an isolated starting state.

An update test changes a field to a different value, saves it, and checks persistence. Checking the edited in-memory object is insufficient. SQLAlchemy's session identity map can also return the same object on another lookup. An independent session or appropriately refreshed read provides stronger evidence of storage.

An update guard written as `if not self.id` rejects values that are false in a Boolean context. Those include `None`, zero, and other false-valued objects. A guard written as `self.id is None` expresses a narrower condition. The test should follow the identifier rules required by the application, rather than treating those two checks as interchangeable.

`assertRaises` checks that an invalid update raises the required exception. Its callable form receives the exception type and the method without calling it immediately. Its context-manager form places the operation inside a controlled block.

A deletion test establishes that a record exists, deletes it, and checks its absence. Checking the particular identifier connects the assertion directly to the deleted record.

Generated defaults, including a joining date, remain testable behaviour. They may need different assertions from manually supplied fields, such as checking a type, an allowed range, or a controlled time source. A default generated by the database is not automatically outside the test's responsibility.

### Fixtures and data factories

A test fixture establishes the environment or state in which a test runs. The term can include setup code, database records, and saved files. A fixture in JSON (JavaScript Object Notation) can store inputs or response examples. It is useful for a specific, reproducible scenario or a complex structure that is easier to preserve than to reconstruct.

A list of account records can provide names, email addresses, phone numbers, and disabled flags. Tests can iterate over the list or select a record. Varied telephone formats and absent optional values can expose assumptions that a single example would miss. However, selecting records randomly does not guarantee that every useful format appears during a run.

Factories provide another way to construct test inputs. Factory Boy is imported through the `factory` package. A factory class specifies the model it will create through `Meta.model` and declares how field values are supplied. Calling the factory evaluates the declarations and returns an instance of that model.

If `AccountFactory` specifies `Account` as its model, its result is an `Account` instance containing generated values. The result has the account's real methods. The factory class does not acquire all account methods simply because it refers to the model. Synthetic data and a substitute implementation are different concepts.

An ordinary factory can construct a model without saving it. Persistence depends on the factory's base class, strategy, and backend. Factories designed for object-relational mappers can integrate with database sessions. With a plain `factory.Factory` subclass, the returned account's own `create` method can handle persistence separately.

`factory.Faker` connects field declarations to the Faker library. Providers generate values such as names, email addresses, phone numbers, companies, jobs, addresses, and other sample data. Providers can vary by locale. Community providers can extend the available formats. Plausible formatting does not by itself establish that a generated value meets every application constraint.

`factory.Sequence` generates values from an increasing counter, which starts at zero by default. Its distinct values do not guarantee uniqueness across processes, resets, or independent factories. Database-generated identifiers may be left for the database to assign.

Faker includes a Boolean provider. A disabled flag can therefore use `factory.Faker("boolean")`. `FuzzyChoice([True, False])` also selects a Boolean value. More generally, `FuzzyChoice` selects from supplied options and can represent categories that have no dedicated Faker provider.

Fuzzy declarations generate text, numbers, dates, and date-times. `FuzzyDate` uses inclusive bounds. If the upper bound is omitted, it uses the current date when the declaration is constructed. Fixed bounds make the intended date range stable.

`LazyFunction` evaluates a supplied zero-argument callable while generating each object. It can call a clock function to populate a timestamp. Evaluation for each object does not guarantee that successive objects receive distinct timestamps. Clock resolution and the speed of object creation can produce equal values. Tests that require a particular time can supply one explicitly.

Factories do not need to reproduce every model attribute mechanically. Required fields need suitable values, while model defaults and explicitly supplied overrides can provide others. Related factories can create associated objects, and declarations can build nested structures. Complexity can make a saved fixture convenient, but does not make factory generation impossible.

Standalone Faker usage differs from a factory declaration. A Faker generator is created from the `faker` package, after which provider methods such as `name()`, `company()`, and `job()` generate values. `factory.Faker` declarations are evaluated by Factory Boy as part of object construction. They are not interchangeable with a standalone generator.

Factory-generated account data can replace a static account list in tests. A creation test obtains an account from the factory and saves it. A bulk test creates ten accounts. A dictionary-conversion test compares generated attributes with the result. An invalid-update test overrides the identifier with `None`. The assertions still express the required behaviour.

Generated values should supplement fixed examples and explicit boundaries. A regression test for a previously discovered failure benefits from retaining the exact failing input. Tests for empty fields, length limits, optional values, and category-specific rules should deliberately construct those conditions. Random generation may never encounter a rare case during ordinary runs.

Reproducibility requires control of randomness. Factory Boy can seed the random engines used by Faker and fuzzy declarations. The seed or random state can be recorded when failures occur. The same seed is useful under the same package versions and call sequence, but does not freeze time or guarantee identical output across changing provider datasets.

Generated values can repeat, uniqueness helpers can exhaust finite domains, and large datasets consume resources. Factories reduce manual preparation without guaranteeing comprehensive input coverage.

### Mock objects and controlled dependencies

A test double replaces a dependency for a particular test. A mock is a configurable double that can record how it was used. Python's `unittest.mock` module provides `Mock`, `MagicMock`, `patch`, and related facilities. These tools allow a test to substitute responses and examine interactions without invoking the real dependency.

A remote service can be slow, unavailable, expensive, or constrained by request limits. Its live data can change. Replacing it in a focused test removes those conditions from the immediate experiment and allows the application to receive carefully chosen responses.

Mocks can also replace local components outside a test's scope. The relevant boundary is the responsibility being tested, rather than whether a dependency is remote.

Mocking does not prove that the real dependency follows the simulated contract. Focused tests need appropriate integration checks when compatibility is part of the requirement. Excessive replacement can leave a suite checking its own assumptions while bypassing the behaviour it was meant to evaluate.

Patching and mock objects perform complementary roles. Patching temporarily changes the object associated with a name or attribute. A mock object supplies the replacement behaviour. A patched function can return a simple value, a real constructed object, or a configured mock.

`patch` can operate as a decorator or a context manager. The replacement applies during the decorated call or the with block, and the original binding is restored when that scope exits. When a decorator creates a mock, it supplies that mock to the decorated function as an additional argument. An explicit replacement can change those calling details.

`return_value` specifies a result returned when a mock is called. It is useful when every call should receive the same value or response object. `side_effect` can supply a callable that computes results from arguments, an exception that is raised, or an iterable of results for successive calls. These options are ways of configuring a mock, rather than the only possible forms of patching.

A callable side effect receives the mock's arguments and can vary the response accordingly. It can substitute another computation or simulate an unavailable service. An iterable side effect can represent an initial failure followed by success.

### Selecting the patch target

The effective patch target is the name that the code under test looks up. It is not necessarily the original definition of the dependency. Importing an object creates another reference to it. It does not remove the object from its original module or relocate its implementation.

If a module named `models.imdb` imports `requests` and calls `requests.get`, a patch can target `models.imdb.requests.get`. If it imports `get` directly, the target needs to match that name in the module. Import style and the lookup expression determine the appropriate location.

References can also point to the same underlying object. Replacing an attribute on a shared class through one module can affect other references to that class. A rule that patches must always target the test module would therefore be misleading. The intended lookup and the scope of the changed object need to be understood.

Patching a whole search method bypasses its implementation. Calling the patched method and comparing its result with the preset result provides no evidence that the original search code works. To examine the search code, a test can patch its HTTP dependency and allow the surrounding logic to run.

### Configuring mock interfaces

An unrestricted `Mock` creates many ordinary attributes and child mocks as they are accessed. A method call such as `mock.foo()` can be recorded even when no real foo method exists. Attributes such as `status_code` can be assigned before or after construction. The test can later examine whether a call occurred and which arguments it received.

That flexibility also creates a risk. A misspelt method name can be accepted by a permissive mock. A replacement that accepts every imagined interface can hide an incompatibility with the real dependency.

The `spec` option limits attribute lookup using a real class, instance, or list of attribute names. An attribute absent from the specification raises `AttributeError` on lookup. `spec_set` is stricter and also limits assignments. Autospeccing adds constraints based on callable signatures.

A specification constrains the interface. It does not implement the real object's behaviour. A mock specified from a response class will not automatically decode JSON or reproduce all response semantics. Methods and values used by the test need appropriate configuration.

Class-level specifications can also differ from instances. Some attributes are created during initialisation rather than defined on the class. The chosen specification must reflect the interface the code will use. A `spec` is optional, although it can catch mistakes that a permissive mock would accept.

`MagicMock` extends `Mock` with defaults for most supported Python special methods. Those methods include behaviours used for iteration, item access, and context management. It does not implement every possible double-underscore method, and some supported methods still require configuration. `Mock` can be sufficient when the dependency only needs ordinary attributes and callable methods.

Interaction assertions can complement checks of returned data. A test can verify that the HTTP function was called once with the expected endpoint and arguments. This detects cases in which the caller receives the expected preset response even though it formed the request incorrectly. It still does not demonstrate what a real server would do with that request.

### Simulating HTTP responses

An HTTP client such as Requests returns a response object with a status code and methods for reading the body. A dictionary alone cannot replace it when the application expects `status_code` or `json()`. The double needs the interface actually used by the caller.

A simple movie-data client might return the decoded body when `status_code` is 200 and return an empty dictionary for other statuses. That is an application-specific contract. HTTP does not require every unsuccessful request to become an empty dictionary, and not every unsuccessful movie search must use 404.

A non-200 test can return a mock with `status_code` set to 404. The client then takes its non-success path. A successful response test needs both `status_code` set to 200 and a configured `json()` method that returns the chosen data.

The `json()` method returns decoded Python values. A JSON object becomes a dictionary, and other JSON structures become their corresponding Python types. Successful decoding does not establish that the HTTP request succeeded. Conversely, a successful HTTP status does not guarantee valid JSON or a successful application-specific operation.

A fixture can combine status 200 with an application error message to test that combination. Its correspondence to real behaviour depends on the service's contract. Services can use different statuses and error formats for invalid credentials.

Movie-information fixtures can represent searches, empty results, reviews, ratings, and errors. Recorded or modified responses provide controlled inputs, rather than evidence of current live data. Fixtures need to reflect the contract expected by the client.

A search test can check the result structure and identifier. A ratings test can check required fields or transformations. A failure test can check the defined error response. Patching the whole method would bypass the processing these tests need to examine.

Other conditions can require their own doubles and assertions. A timeout can be raised through `side_effect`. Invalid JSON can be represented by a decoding exception. Unexpected fields, missing values, and malformed responses can test validation logic. Scenarios should follow the client's requirements.

### Developing a counter API

A counter service maintains named integer values. One possible contract creates a named counter at zero, rejects duplicate names, returns the current value, increments it, and deletes it. These requirements define the behaviour before the route functions exist.

HTTP method and status semantics constrain the contract, but do not completely determine it. REST is not synonymous with a single create-read-update-delete table or a requirement to use JSON. The application still needs explicit choices about representations, identifiers, error responses, and supported operations.

One possible API contract is:

| Operation | Method and path | Successful response |
| --- | --- | --- |
| Create | `POST /counters/{name}` | 201 Created, with the initial zero value |
| Read | `GET /counters/{name}` | 200 OK, with the current value |
| Increment | `POST /counters/{name}/increment` | 200 OK, with the new value |
| Set a value | `PUT /counters/{name}` | 200 OK, with the supplied value stored |
| Delete | `DELETE /counters/{name}` | 204 No Content, with no body |

A duplicate-name creation can return 409 Conflict and preserve the existing counter. Status 429 means Too Many Requests and applies to rate limiting. Other application contracts can use different valid responses, so tests need to follow the specified contract.

PUT is idempotent: repeating an identical request has the same intended effect as making it once. Setting an explicit value satisfies that requirement. Incrementing on every call changes the value again, so an increment operation uses POST in this contract. Clients also need to distinguish those operations when deciding whether a failed request can be retried.

A creation test uses Flask's test client to send the request, checks for 201, and checks that the named counter begins at zero. Flask's test client invokes the application without starting a live HTTP server. A separate runner executes the test methods.

A duplicate-name test first creates the counter, then repeats the creation request and expects 409. A stronger version first changes the value and verifies that the rejected request did not reset it. The behavioural requirement is preservation of the existing counter as well as rejection of the duplicate.

An increment test creates a counter, reads a baseline, performs the increment, and checks that the new value is one greater. A subsequent GET can check the stored result. A read test can verify the initial zero value and later values. A deletion test can verify both the 204 response and the counter's absence afterwards.

Unknown counters need explicit handling. Directly reading, incrementing, or deleting a missing dictionary entry raises `KeyError`. Tests can require 404 responses for unknown names and implementations can check existence before accessing the entry. Error representations and repeated deletion need consistent rules.

A global dictionary can hold counters in a small example. Changing an entry mutates the dictionary and needs no `global` declaration. Rebinding its name inside a function does. Uppercase names conventionally denote constants, rather than all global variables.

An in-memory dictionary has practical limits. It loses its contents when the process ends and does not automatically share values among independent workers. A production service needs storage and coordination appropriate to its requirements. Tests of a local dictionary example do not establish durability or correctness under concurrent requests.

Different test names can reduce accidental collisions, but do not replace state isolation. Resetting the counter state before each test makes its assumptions explicit. Tests should also check that operations on one name leave other counters unchanged.

### Keeping tests useful

Nose is an unmaintained test runner, and Python 3.8 reached end of life in October 2024. Current projects need supported Python versions and compatible dependencies. Python's `unittest` remains in the standard library, and Coverage.py can run it while collecting coverage.

Testing can run locally or in a hosted environment. Theia supports desktop and cloud use, while file retention depends on the host. The testing principles do not require a particular editor.

Reliable testing combines explicit requirements, informative assertions, controlled state, and appropriate dependency boundaries. Coverage can expose missing execution. Factories can broaden sample data. Fixtures can preserve exact scenarios. Mocks can control difficult conditions. Further tests are useful when they examine behaviours and risks that the existing suite does not yet address.

## Behaviour Driven Development

Behaviour-driven development (BDD) connects business needs with concrete examples of how software should behave. Domain experts, developers, testers, and other stakeholders explore a problem, agree on useful outcomes, and describe situations that illustrate them. Automated checks can then compare those examples with the software's behaviour.

This approach encourages development from the outside in. A shopping-cart requirement concerns whether adding a product places it in the cart and whether removing it leaves the expected contents. The business example need not describe the internal calls that produce those results. Shared domain language helps participants discuss the intended behaviour without requiring everyone to understand its implementation.

Test-driven development (TDD) guides implementation through a cycle of writing a failing test, making it pass, and refactoring to improve code structure while preserving behaviour. It often uses unit tests, but it can also address behaviour at other scales. BDD and TDD can work together, with business examples guiding development and smaller tests supporting the components that implement them.

BDD is a development approach rather than a testing level. Its examples can support component, integration, system, and acceptance testing. These examine individual components, interactions between components or systems, whole-system behaviour, and readiness to meet stakeholder needs, respectively.

### From discussion to executable examples

BDD begins with collaborative exploration. Concrete examples expose assumptions that broad requirements can leave unresolved. The team records agreed examples, connects them to automation, and develops the application until the intended checks pass.

A runner such as Behave identifies undefined steps that need implementations. An implemented step may fail because the application lacks the behaviour, the setup is wrong, or the test is defective. The team investigates the cause and improves the code while preserving the agreed requirement.

Specifications and automation can be kept together under version control. Regular execution can make the examples living documentation, while reports communicate their results. Their usefulness depends on maintained scenarios, correct implementations, and continued review of business needs. Passing examples provide evidence about the situations tested, rather than proof of complete correctness or coverage.

The specification records the behaviour expressed in its examples. It does not automatically become complete technical or user documentation. A readable scenario can still omit an important case, and a passing implementation can still check something different from the behaviour that stakeholders intended.

### Features and scenarios in Gherkin

Gherkin is a structured notation for readable examples. It is widely used with BDD, although BDD does not require a particular syntax. A `.feature` file contains one `Feature`, which groups related scenarios. Additional features use separate files.

`Feature:` introduces a title and may be followed by explanatory prose. A user story can identify a role, a capability, and a benefit, but that format is optional. The description supports understanding and reporting. It does not execute as a test.

`Scenario:` introduces a concrete example containing steps. The principal keywords distinguish starting conditions, actions, and outcomes.

| Keyword | Purpose |
| --- | --- |
| `Given` | Establishes the relevant starting state. |
| `When` | Describes an action or event. |
| `Then` | Describes an observable result to check. |
| `And` | Continues the preceding step type. |
| `But` | Continues that step type while expressing a contrast. |

In Behave, an `And` after a `Given` becomes another Given step. After a `Then`, it becomes another outcome check. `But` follows the same principle and does not automatically negate an assertion. The implementation must perform the intended check.

Gherkin does not require every scenario to contain all three of Given, When, and Then, or impose a minimum of three steps. The structure helps express the behaviour clearly, rather than prescribing a fixed scenario length.

```gherkin
Feature: Shopping cart contents

  Scenario: Removing one of two products
    Given a cart contains a book and a pen
    When the customer removes the book
    Then the cart contains the pen
    And the cart contains one product
```

The starting state makes the expected outcome explicit. Checking the remaining product and checking the count examine distinct aspects of the same behaviour.

For example, a retailer might return resalable goods to stock. With three black jumpers initially available, returning one produces four. An exchange needs two checks. Starting with two blue shirts and three black shirts, exchanging a previously purchased blue shirt for a black shirt increases blue stock to three and reduces black stock to two. Those expectations depend on the stated stock rule and starting quantities.

### Tools and step implementations

Automation tools differ in their languages and specification formats.

| Tool | Approach |
| --- | --- |
| Cucumber | Gherkin specifications with implementations including Ruby, Java, and JavaScript. |
| Behave | Gherkin features with Python steps, hooks, and fixtures. |
| JBehave | A separate Java framework supporting text-based stories, including Gherkin. |
| Concordion | Markdown or HTML examples connected to Java fixtures. |

Selection depends on team skills, specification preferences, application interfaces, and maintenance needs. The automation language can differ from the application's language when tests communicate through a browser or an application programming interface (API).

Behave conventionally uses a `features` directory containing `.feature` files, a `steps` subdirectory containing Python definitions, and an optional `environment.py` for environment hooks. Explicit feature paths are also supported. Feature files and step files do not need a one-to-one relationship. Several features can reuse the same definitions.

A step definition connects a scenario statement to Python through decorators, which register functions for patterns. These include `@given`, `@when`, and `@then`. Behave matches the step type and its registered pattern. The generic `@step` decorator can match different types. Parameters in a pattern supply changing values to the function.

The function receives a context object as its first argument. Its name can be descriptive or use the conventional `step_impl`. Matching depends on the decorator rather than that name. Consistent wording helps reuse, but multiple decorators can share one implementation, so alternative phrases do not necessarily require duplicated code.

The configured matcher determines how parameters are recognised, including placeholders or regular expressions. Literal wording must agree with the registered pattern. Behave's matching by step type should not be generalised to every runner. Cucumber does not use Given, When, or Then keywords when matching definitions.

Steps execute in scenario order. Setup and action steps need not contain assertions. Outcome steps typically check results, and the scenario forms the overall example. Implementing every step enables execution but does not guarantee that the tests or application are correct.

### Configuration and resource lifetimes

Python dependencies need a supported interpreter compatible with the project. Python 3.8 reached end of life in October 2024. Development work can use a local or hosted editor. Theia supports both arrangements, while workspace retention depends on the hosting service.

Environment variables allow configuration to change without rewriting every step. Python's `os.getenv` returns an existing variable's value as text, a supplied default when it is absent, or `None` when no default is supplied. A value such as `WAIT_SECONDS` needs numerical conversion and validation before use as a duration.

For example, `int(os.getenv('WAIT_SECONDS', '60'))` supplies an integer default of 60 when the variable is absent. Invalid numerical text raises an error. The chosen value needs to suit the particular operation, rather than assuming that one duration governs every interaction.

`BASE_URL` identifies the target application, including its scheme, host, and any required port or path prefix. It is more than a hostname. Values can be stored as `context.base_url` and `context.wait_seconds` for step definitions to use. Storing a duration does not itself configure browser waits or HTTP timeouts.

Environment hooks run at specified points. Common pairs include the following.

| Scope | Before hook | After hook |
| --- | --- | --- |
| Whole run | `before_all` | `after_all` |
| Feature | `before_feature` | `after_feature` |
| Scenario | `before_scenario` | `after_scenario` |
| Step | `before_step` | `after_step` |
| Tagged section | `before_tag` | `after_tag` |

Resource lifetime determines the appropriate scope. A browser can be created for the whole run or separately for each scenario. Values assigned in `before_all` remain available throughout the run, while values created within feature or scenario scopes have shorter lifetimes.

Each hook executes at its own point. Feature, scenario, and step hooks receive the corresponding object along with the context. This allows setup to respond to the current example without treating all state as permanent global storage.

Behave also provides fixtures that pair setup with cleanup at a chosen scope. These complement hooks and help release resources consistently. Running `behave` with zero executable scenarios does not demonstrate working application behaviour or complete validation of the hooks.

### Backgrounds and test data

A `Background` contains shared steps that Behave runs before each scenario, after the applicable scenario setup hook. It makes relevant starting conditions visible without repeating them throughout a feature. The implementations perform the work of establishing those conditions.

A fictional catalogue can illustrate category searching with three records.

| Name | Category | Available |
| --- | --- | --- |
| Fido | dog | True |
| Kitty | cat | True |
| Leo | lion | False |

A customer starts on the home page, enters `dog` in Category, and activates Search. Once the search completes, the results include Fido and exclude Kitty and Leo. These checks establish the specified category filtering. They do not independently test availability filtering, because the excluded records also have different categories.

Feature wording can express domain behaviour without reproducing every click. When the interface itself is under test, visible labels such as Customer ID help stakeholders understand the interaction. Internal identifiers such as `customer_id` belong in the implementation that locates the control.

A Gherkin table follows the step that consumes it, with vertical bars delimiting its cells. Behave uses the first row as headings and exposes the table as `context.table` during that step. Iteration yields Behave `Row` objects, with text cells accessible by heading, such as `row['name']`. These rows are not Python dictionaries.

A loader constructs a separate dictionary for each API payload and converts values to the service's required types. A service may require fields such as gender and birthday in addition to the values needed to explain the search rule. The payload must satisfy that schema.

Availability requires explicit conversion from text. A check accepting `True`, `true`, and `1` as true otherwise treats every value, including misspellings, as false. A validated converter recognises the permitted true and false values and rejects invalid input. Dates and other required fields also need suitable validation.

Using `bool('False')` would not perform that conversion correctly. A non-empty Python string has a true truth value, regardless of whether its text says False.

### Establishing state through an API

A Background table does not populate a database automatically. Its step definition can use an API to create the required records. If a scenario deletes a record, later scenarios receive the original starting state only when their setup restores it.

An illustrative catalogue API can support this sequence.

| Operation | Request | Expected successful result |
| --- | --- | --- |
| List existing test records | `GET /pets` | Status 200 and a complete JSON list. |
| Delete a test record | `DELETE /pets/{id}` | Status 204 with no response content. |
| Create a specified record | `POST /pets` | Status 201 indicating creation. |

The loader checks the listing response, obtains record identifiers, removes the existing test records, and creates the table's records. Deleting everything assumes a dedicated, disposable test instance. Shared or concurrent tests need isolation so that one scenario does not alter another's state.

These paths, response shapes, and expected codes describe an application contract. HTTP defines status-code meanings but does not prescribe these endpoint names or require identical responses from every service. A paginated listing also needs handling appropriate to its contract.

Python's Requests library performs the HTTP calls. Its `json=payload` argument serialises a dictionary into JSON. Successful JSON decoding does not establish HTTP success, so status and content need separate checks. A 204 response has no content to decode.

Requests calls need suitable timeouts because none is imposed by default. These timeouts govern periods of waiting rather than guaranteeing a total duration for the complete operation. A response stored in a local variable remains local to the function. Assigning it to `context.response` allows later steps in the scenario to inspect it.

### Browser interaction and waiting

Selenium automates browsers to navigate pages, locate elements, enter values, and activate controls. Browser automation can exercise several components together, but it does not reproduce every aspect of human use. The browser and a compatible driver can run locally or remotely. Selenium Manager can obtain suitable drivers when needed. Headless operation runs the browser without displaying its normal window. Normal browser testing keeps Chrome's sandbox enabled.

In Python, `driver.get(context.base_url)` navigates to the application and returns `None`. WebDriver controls the browser rather than providing Requests-style methods for application HTTP calls. `driver.title` exposes the page title, while located elements provide access to page content.

Current Python code locates an element with a strategy from `By`, for example `driver.find_element(By.ID, 'customer_id')`. Other strategies include CSS selectors, XPath, names, and link text. `find_elements` obtains multiple matches. Stable identifiers can reduce dependence on page layout, but their spelling and case must match the application.

For an input, `clear()` removes existing text and `send_keys()` enters a value. `click()` activates a control. The current input value can be read with `get_property('value')`, while `.text` reads rendered text. An assertion must inspect the relevant content. The absence of `404 Not Found` alone does not establish a successful HTTP status or a working application.

Dynamic updates can continue after navigation completes. Explicit waits, commonly implemented through `WebDriverWait`, wait up to a limit for a defined condition, such as visible results or changed text. An implicit wait applies to element searches. Combining implicit and explicit waits can produce unexpected waiting times.

Fixed pauses can be too short when the application responds slowly and waste time when it responds quickly. Page-load limits, waits for elements or content, and HTTP request timeouts serve different purposes. The condition being awaited should match what the next assertion actually needs.

A Success message can signal completion when it belongs to the current operation. A stale message is insufficient, and a test can instead wait for the expected result. Assertions then examine the relevant result area. Cleanup calls `driver.quit()` to end the browser session at the appropriate scope.

## Running Behave for Behaviour Driven Development

Behave connects readable examples of software behaviour with Python functions that perform actions and check outcomes. It supports behaviour-driven development (BDD), in which business specialists, developers, testers, and other stakeholders agree on concrete examples before implementing the required behaviour.

The automation work has three connected parts: generating definitions for missing steps, implementing their actions and checks, and replacing unnecessary repetition with parameterised patterns. A shared context carries information between steps during execution.

Within a scenario, Given establishes the relevant starting conditions, When describes an action or event, and Then describes an observable outcome. This separation keeps the business expectation visible while the Python implementation handles the operations needed to exercise it.

### From undefined steps to working checks

Behave conventionally reads `.feature` files under `features` and Python definitions under `features/steps`. A file such as `web_steps.py` can hold browser interactions shared across scenarios. Explicit paths and configuration can change discovery. An optional `features/environment.py` configures resources and execution hooks.

The development environment needs the project code and compatible dependencies. A Git checkout can supply the code, while a dependency file specifies Python packages. Commands and paths used to prepare one hosted environment are not universal Behave requirements. Theia supports desktop and cloud workspaces, with file retention determined by the hosting provider.

Running `behave` finds statements without matching definitions and can print suggested code snippets. Each snippet supplies a decorator, a matching pattern, and a function receiving context. Snippets are starting points. They neither implement the behaviour nor establish coverage of every requirement.

Python step files need the imports required by their implementations. The decorators come from Behave, while browser operations use Selenium. Definitions can be organised by responsibility, such as navigation, field entry, or result checking, and reused across several feature files.

A placeholder such as `raise NotImplementedError(...)` prevents an unimplemented function from succeeding during normal execution. Registering that function changes the problem from a missing definition to code that still needs implementation.

| Condition | Meaning |
| --- | --- |
| Undefined | No matching step definition was found. |
| Unimplemented | A definition exists, but its placeholder still needs replacement. |
| Assertion failure or error | A check failed or execution encountered a problem. |
| Skipped | The step was not executed. |
| Passed | The step completed successfully under the run's rules. |

Exact status names and colours depend on the version and formatter. Source locations and exception details help identify which function ran and why it did not succeed. After an unsuccessful step, the remaining steps in that scenario are normally skipped. Other selected scenarios usually continue, unless settings such as `--stop` or an abort prevent them.

Report totals describe the selected run and may include shared Background steps. A skipped step has provided no evidence about whether its action or assertion would work. A matching definition and a successful execution are separate stages of progress.

`behave --dry-run --snippets` can inspect matching without executing step bodies. Imports and discovery must still succeed. A dry run does not verify the application's behaviour.

Implementation proceeds incrementally. A developer replaces one placeholder with its intended operation, runs the scenario, and investigates the next unsuccessful step. Setup and action steps need not contain assertions. Later outcome steps check the results, and the scenario forms the overall example.

Removing an exception without performing the stated operation can produce a misleading pass. Useful implementation preserves the connection between the scenario's words, the action actually performed, and the result that the test observes.

### Browser actions and observations

A fictional catalogue illustrates category searching. Its starting data includes Fido as a dog, Kitty as a cat, and Leo as a lion. The customer opens the home page, enters `dog` in Category, and activates Search. After completion, the results should contain Fido and exclude Kitty and Leo.

These checks address category filtering. They do not independently establish an availability rule, because the excluded records also have different categories.

The application can use a consistent mapping between visible controls and HTML identifiers.

| Control or region | Illustrative identifier |
| --- | --- |
| Category field | `pet_category` |
| Search button | `search-btn` |
| Create button | `create-btn` |
| Message region | `flash_message` |
| Results region | `search_results` |

These identifiers belong to the application. Selenium does not automatically derive them from labels. A shared naming convention makes implementation simpler only while the page follows it.

`context.driver.get(context.base_url)` navigates the browser to the application. In Python, this call returns `None`. Assigning it to `context.response` does not capture an HTTP response. Subsequent browser checks use the driver and its elements.

Current Selenium Python locates an element with `find_element(By.ID, element_id)`, using `By` from `selenium.webdriver.common.by`. The older `find_element_by_id` form is obsolete. For a compatible editable field, `clear()` removes existing text and `send_keys()` enters the required value. `click()` activates a control.

Messages and results can be inspected through an element's `.text`. An input's current value is available through `get_property('value')`. Those are different observations, so the implementation needs the one appropriate to the control.

A completed click or an existing results element does not establish that an asynchronous search has finished. An explicit wait can wait for a current message or the expected results. An implicit wait applies to element searches, and combining the two mechanisms can produce unexpected waiting times.

A Success message must belong to the current operation. Assertions then examine the relevant result area. Text containment checks test substrings, so finding Fido somewhere in that area does not necessarily verify an exact record name or the complete set of results. The check needs to reflect the intended requirement.

### Passing values through context

Behave supplies context as the first argument to step functions. User-defined attributes can hold a browser, a test client, a response, or copied text. Their lifetimes depend on where they are first assigned.

| First assignment | Usual lifetime |
| --- | --- |
| `before_all` | The test run. |
| `before_feature` | The current feature. |
| `before_scenario` or a step | The current scenario. |

A value first stored in a step normally remains available to later steps in that scenario. It is not automatically available throughout every feature or future scenario. An attribute such as `context.clipboard` must be created by the implementation.

Flask's test client illustrates response sharing. A step can store `app.test_client()` as `context.client`, and another can store the result of `context.client.get('/')` as `context.response`. These requests run against the application without starting a live server. They return response objects, unlike Selenium navigation.

Flask's `response.data` contains bytes. A text assertion can use `response.get_data(as_text=True)` or `response.text`. Direct comparison with `.data` instead requires a bytes value.

A simple transfer between fields can read an input value into `context.clipboard`, then clear a compatible destination and send it the stored text. The copy must occur before the value is used. This transfers data through Python rather than exercising the system clipboard. Selenium can also perform keyboard copy-and-paste actions in suitable browser environments when that is the behaviour being tested.

### Reusing steps with parameters

Statements often differ only in a field name, a button label, or an expected value. Behave's default parse matcher supports named placeholders in braces, such as `{element_name}` and `{text_string}`. Captured values are passed to function parameters with corresponding names. Context remains the first argument.

Quotation marks can delimit values and make them easier to recognise. The literal wording and delimiters still need to match the pattern. Parameter names must be valid Python identifiers. Other matchers use different syntax, so brace substitution is not a universal rule for every Behave configuration.

Parameterisation can proceed in small changes. Category can first become `element_name` while the input remains fixed as `dog`. The input can then become `text_string`. Rerunning the original scenario after each change checks the effect of that edit before additional values are introduced.

For ready text fields following the catalogue's naming convention, one definition can handle several labels and values.

```python
from behave import when
from selenium.webdriver.common.by import By

@when('the customer sets "{element_name}" to "{text_string}"')
def set_text_field(context, element_name, text_string):
    element_id = 'pet_' + element_name.lower().replace(' ', '_')
    element = context.driver.find_element(By.ID, element_id)
    element.clear()
    element.send_keys(text_string)
```

The mapping converts Category to `pet_category`. Lowercasing and replacing spaces implement an application convention. They do not guarantee that an ID exists or is unique. HTML IDs must be non-empty, unique within their tree, and free of ASCII whitespace. Lowercase spelling is not mandatory.

An explicit label-to-locator mapping can represent interfaces that do not follow the naming convention. This keeps the scenario's user-facing vocabulary separate from the internal identifiers needed by browser automation.

The same typing function is not suitable for every control. Checkboxes, select lists, and specialised date controls need appropriate interactions. Capturing a value does not establish that the application accepts it.

Button definitions can capture a label and derive an ID such as `search-btn` or `create-btn`. Message definitions can capture the expected message, while result definitions capture the text to check. Positive and negative result assertions retain their different logic.

Behave matches decorators and patterns rather than Python function names, so `step_impl` is conventional rather than compulsory. `And` and `But` inherit the preceding Given, When, or Then step type. A negative assertion still needs explicit negative checking in its implementation.

### Refactoring and extending scenarios

A parameterised negative-result definition can check both Kitty and Leo. The separate literal Leo definition then becomes redundant. Overlapping registrations need review so that each statement resolves to its intended implementation. This example reduces seven browser definitions to six while retaining both negative checks in the scenario.

Broadening a pattern changes which statements it can match. Removing a redundant definition therefore requires checking the other statements that previously used it, rather than assuming that fewer functions always means equivalent behaviour.

Rerunning existing scenarios after each change provides evidence that their behaviour remains intact. It does not guarantee detection of every regression or validate every possible parameter value. Representative scenarios need to exercise the fields, values, and controls intended for reuse.

A creation scenario can reuse navigation, field entry, button clicks, message checks, and result checks. It enters Happy as the name, Hippo as the category, and 2022-06-16 as the birthday, then activates Create. After checking completion, it clears the form, searches again, and expects Happy in the results.

That example assumes Happy is initially absent, the supplied data is accepted, and other required fields have valid values or defaults. A Background loader can establish the starting records before each scenario. The table itself does not reset the service, and clearing the form does not erase the database.

Reusable definitions remain useful when their assumptions are clear and their parameters describe meaningful variations. Compatible locators and controls allow shared code, while specific assertions preserve the behaviour that the scenario is intended to verify.
