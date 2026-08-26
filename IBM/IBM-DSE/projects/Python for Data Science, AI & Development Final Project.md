# Python for Data Science, AI & Development Final Project
An international firm that is looking to expand its business in different countries across the world has recruited you. You have been hired as a junior Data Engineer and are tasked with creating a script that can extract the list of the top 10 largest economies of the world in descending order of their GDPs in Billion USD (rounded to 2 decimal places), as logged by the International Monetary Fund (IMF).

The required data is available [here](https://web.archive.org/web/20230902185326/https://en.wikipedia.org/wiki/List_of_countries_by_GDP_%28nominal%29).
## Excercise 1
Extract the required GDP data from the given URL using Web Scraping. You can use Pandas library to extract the required table directly as a DataFrame. Note that the required table is the third one on the website, as shown in the image below.
## Exercise 2
Modify the GDP column of the DataFrame, converting the value available in Million USD to Billion USD. Use the `round()` method of Numpy library to round the value to 2 decimal places. Modify the header of the DataFrame to `GDP (Billion USD)`.
## Exercise 3
Modify the GDP column of the DataFrame, converting the value available in Million USD to Billion USD. Use the `round()` method of Numpy library to round the value to 2 decimal 
places. Modify the header of the DataFrame to `GDP (Billion USD)`.
### Solution
> [!NOTE]
> This times out often if you have high latency with the Internet Archive. Multiple attempts might be required.
```python
from io import StringIO
import numpy as np
import pandas as pd
import requests

URL = "https://web.archive.org/web/20230902185326/https://en.wikipedia.org/wiki/List_of_countries_by_GDP_%28nominal%29"

response = requests.get(
    URL,
    headers={"User-Agent": "Mozilla/5.0"},
    timeout=30,
)
response.raise_for_status()

tables = pd.read_html(StringIO(response.text))

gdp_table = next(
    (
        table
        for table in tables
        if table.shape[1] >= 3
        and {"World", "United States", "China"}.issubset(
            set(table.iloc[:, 0].astype(str).str.strip())
        )
    ),
    None,
)

if gdp_table is None:
    raise RuntimeError("The GDP table could not be found.")

df = (
    gdp_table.iloc[1:11, [0, 2]]
    .copy()
    .set_axis(
        ["Country", "GDP (Million USD)"],
        axis="columns",
    )
)

df["GDP (Million USD)"] = pd.to_numeric(
    df["GDP (Million USD)"]
)

df["GDP (Million USD)"] = np.round(
    df["GDP (Million USD)"] / 1000,
    2,
)

df.rename(
    columns={"GDP (Million USD)": "GDP (Billion USD)"},
    inplace=True,
)

print(df.to_string(index=False))

df.to_csv("Largest_economies.csv", index=False)
```