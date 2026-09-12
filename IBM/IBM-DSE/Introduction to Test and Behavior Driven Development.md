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

