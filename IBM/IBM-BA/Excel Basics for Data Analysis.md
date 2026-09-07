# Excel Basics for Data Analysis

>[!TIP]
>These notes do not reflect full course content and are abridged to omit prior author knowledge

> [!NOTE]
> Explains how analysts can use Excel to navigate, format, clean, transform and analyse data with formulas, lookups, filters, charts and PivotTables.

## Introduction to Data Analysis Using Spreadsheets

### Navigating and selecting efficiently

The ribbon organises commands into tabs and groups; some groups expose extra options via a small dialog launcher. Frequently used commands can be added to the Quick Access Toolbar.
Navigation shortcuts include Ctrl+Home (A1), Ctrl+End (last used cell on the worksheet), and Ctrl+Arrow (jump to the edge of a contiguous data region). Selection scales from single cells to whole columns/rows, non-adjacent selections using Ctrl, and selecting only the used data with Ctrl+A.
> [!TIP]
> Ctrl+A selects the current region (or the entire table if the active cell is inside a table). Pressing Ctrl+A again selects the entire sheet.

### Strengths and limitations for analysts

Spreadsheets excel at transparent, table-based work: fast calculations, sorting/filtering, PivotTables, and clear charts for stakeholders. They also support common cleaning tasks (removing duplicates, trimming whitespace, and splitting fields with Text to Columns). However, they can become fragile with complex formulas, struggle with very large datasets, and make it difficult to reproduce every transformation step consistently without careful documentation.

---

### Lab: Spreadsheet Basics

#### Understand the interface

Use the ribbon tabs, such as Home, Insert, Formulas, Data, Review, and View, to locate tools. Double-click a ribbon tab to hide or show the ribbon for more working space.

#### Navigate and select data

Move around a worksheet with arrow keys. Use Page Down and Page Up to travel faster through large datasets. For quick jumps, press:

- Ctrl+End to reach the last used cell in the sheet
- Ctrl+Home to return to cell A1
- Ctrl+Up Arrow or Ctrl+Down Arrow to jump within a column

#### Select efficiently

- Click a column letter or row number to select an entire column or row
- Use Shift plus arrow keys to extend a selection
- Hold Ctrl to select non-adjacent columns or rows
- Press Ctrl+A to select the current region, then repeat to expand the selection

---

## Getting Started with Using Excel Spreadsheets

### Viewing, moving, and transforming data

Keep key labels visible with Freeze Panes. Freeze Top Row pins row 1. For a custom freeze, select a cell in the first row of data, then choose Freeze Panes to lock the header rows above. To freeze both headings and identifier columns, select the cell that is one row below and one column to the right of the area to keep visible, then apply Freeze Panes.

Build a clear header row across the top. Use Tab to move across headings during entry, rather than dropping down a row after each label. Tidy crowded headings by resizing columns manually via the divider, or auto-fitting by double-clicking the divider. To auto-fit several columns at once, select the full set first, then double-click any divider.

Move a block of cells by dragging the selection border once the move pointer appears. Copy the same block by holding Ctrl while dragging, or by using Ctrl+C then Ctrl+V.

When copying between worksheets, pasted data often adopts the destination column widths. If the original layout must be preserved, use the paste option Keep Source Column Widths.

AutoFill reduces repetitive entry when data follows a pattern. Months and weekdays fill from abbreviations, such as Jan or Mon. For altered patterns, define the rule with enough starting values, such as Mon followed by Wed to indicate every other day. For numbers, a single starting value copies down, while two starting values establish an increment.

### Format deliberately and fix import mistakes at the source

Separate formatting into two decisions:

- Cell formatting, which controls appearance such as styles, borders, and emphasis
- Number formatting, which controls how values are interpreted and displayed, such as Text, decimals, dates, or currency

Imported CSV data can be misclassified. A model number like 9-5 or 9-3 may be interpreted as a date. Correct this by setting the affected cells to Text first, then re-entering the model values so Excel stores them correctly.

For monetary figures, open More Number Formats, choose Currency, then select the required symbol and decimal places. Check headings like “Price in thousands” so the chosen format matches reporting intent.

### Build formulas that copy cleanly and handle errors

A formula starts with `=` and combines functions, references, operators, and constants. Use `SUM` with a range written as `E2:E13` rather than listing each cell. Copy formulas using the fill handle, or double-click the fill handle to fill down a long column.

Understand references before copying across a table:

- Relative references adjust based on position
- Absolute references stay fixed using `$`, such as `$A$1`
- Mixed references lock only a row or column, such as `A$1` or `$A3`

If `#####` appears, widen the column or check for negative date or time results. If `#NAME?` appears, check for misspelt function names or invalid operators, then use the error indicator to review help or calculation steps.

## Cleaning and Wrangling Data Using Spreadsheet

### Importing text data into Excel

Start with the source file. Plain text files often use either comma-separated values (CSV) or tab-separated values (TSV), where a single character separates each field. Confirm the first row contains headings and that each record has the same number of fields as the headings, otherwise the import will misalign columns.

Open the file in Excel via File > Open. The import process will detect whether the file is delimited.

1. Confirm the file type is delimited.
2. Ensure the option indicating headers is selected so the first row becomes column headings rather than data.
3. Choose the correct delimiter, commonly Comma for CSV and Tab for TSV.
4. Review the preview for shifted columns, unexpected blanks, or merged fields.
5. Set column data types only where needed. For example, force IDs that look like numbers into Text to prevent loss of leading zeroes.

After import, hash symbols in cells usually indicate the column is too narrow for the displayed value. Fix this quickly by selecting the entire sheet or a block of columns, then auto-fit the width. Apply the same approach to row heights when text is clipped.

### Formatting the worksheet

Remove fields that are not required for the analysis. Deleting unused columns reduces clutter and lowers the risk of accidental exposure of sensitive data. Insert new columns beside the target location, then add clear headers immediately to avoid ambiguous blank columns.

Rows can be added or removed in the same way. When removing rows, confirm they are genuinely unwanted records, not filtered views or partially hidden ranges.

To preserve the imported data for ongoing work, save as an Excel workbook format such as .xlsx rather than leaving the file as a text-based source.

### Data quality checks that prevent downstream errors

Treat cleaning as part of analysis rather than a cosmetic step. Poor quality data causes formula errors, unreliable sorting and filtering, and misleading charts.

Use the following routine:

- Spell-check text fields that feed grouping or filtering, such as countries, product lines, and deal sizes.
- Remove empty rows, since they split a dataset into disconnected blocks and break keyboard navigation and summary calculations. A reliable approach is filtering for blanks in a key column, deleting the visible blank rows, then clearing the filter.
- Detect duplicates using a column that should be unique or near-unique, such as an order ID or a transaction identifier. Conditional formatting provides a safe preview before deletion. The Remove Duplicates tool is faster, but provides less opportunity to review what will be removed.
- Repair repeated typos with Find and Replace, especially when a customer or supplier reports an incorrect name.

### Standardising text, dates, and whitespace

Case inconsistencies reduce match rates in lookups and PivotTables. Excel functions support systematic fixes:

- PROPER for title case
- UPPER for uppercase
- LOWER for lowercase

Use helper rows or helper columns, then copy and paste values back into the original field to remove formulas cleanly.

For dates, confirm both locale and display format. Mixed regional formats can appear correct while sorting incorrectly. Apply a consistent date format across the entire column once values are confirmed as real dates rather than text.

Whitespace issues include double spaces and hidden leading or trailing spaces. Replace double spaces with single spaces using Find and Replace. For leading and trailing spaces, apply TRIM in a helper column, then paste values back. TRIM also reduces multiple internal spaces to single spaces (it does not remove non-breaking spaces without additional steps).

### Splitting and combining fields

Flash Fill can combine separate name fields into a single contact name column or rewrite an existing naming convention based on a pattern. For splitting a single text field into multiple columns, Text to Columns is effective when a delimiter such as Space is consistent.

Where wizard tools are unavailable or insufficient, use formulas based on the position of delimiters rather than fixed character counts. For example, extract text before or after the first space using functions that locate the delimiter, which handles variable-length names more reliably.

### Five traits to keep in view

Aim for accuracy, completeness, reliability, relevance, and timeliness. These traits guide what to fix, what to exclude, and whether the dataset can support the decision at hand.

## Analysing Data Using Spreadsheets

A typical analysis flow in Excel moves from inspecting raw records, to adding calculated flags, to summarising patterns. Filtering and sorting control what appears on screen. IF-style functions classify records. COUNTIF and SUMIF provide single-criterion summaries. COUNTIFS and SUMIFS extend that approach to multiple criteria. Lookup functions connect a fact table to reference lists. PivotTables then aggregate large datasets quickly, with interactive controls such as slicers and timelines.

### Filtering and sorting to inspect records

Filtering limits the visible rows without deleting anything. This is useful for quality checks, spot analysis, and quick validation.

Steps for a standard filter workflow:

- Select any cell in the dataset.
- On the Data tab, enable Filter.
- Open the drop-down on a target column and tick only the required values.
- Clear a filter from the same menu, or use Clear on the Data tab to remove all filters.

Custom filters help locate top values or apply numeric rules:

- Open the drop-down on a numeric column.
- Choose Number Filters, then Top 10.
- Change the count to a larger number such as 50 to view the top 50 records.
- Clear the filter to return to the full set.

Sorting changes row order to reveal patterns. A robust approach uses multi-level sorting:

- Open Custom Sort from the Data tab.
- Set the primary sort column (for example, ship date) and choose ascending.
- Add a second level (for example, order value) and choose descending.
- Apply the sort to group by time, then rank by size within each time period.

### Classifying data with IF and IFS

IF returns one result when a condition is true and another when it is false. It is ideal for simple flags such as completion status.

Example pattern:

```excel
=IF(AE2="Complete","Yes","No")
```

This converts a status text value into a consistent Yes or No indicator that can be filtered, counted, or summarised later.

Nested IF applies multiple conditions by placing an IF inside the false branch of another IF. A common use is size banding by numeric thresholds. When building nested IF, include a final fallback to avoid returning FALSE for unexpected values.

Improved size banding pattern:

```excel
=IF(AD2>300,"Large",IF(AD2>100,"Medium",IF(AD2>0,"Small","None")))
```

The added `"None"` handles zeros or blanks more cleanly than leaving the last IF without a false result.

IFS is often cleaner than nested IF because it lists conditions and results in pairs. It is suited to the same size banding problem, with the same need for a fallback.

Example with a default result:

```excel
=IFS(AD2>300,"Large",AD2>100,"Medium",AD2>0,"Small",TRUE,"None")
```

The final `TRUE,"None"` acts as a catch-all.

### Counting and summing with a single criterion

COUNTIF counts how many cells meet one condition.

Syntax:

```excel
=COUNTIF(range,criteria)
```

Example pattern:

```excel
=COUNTIF(N2:N195,"VISA")
```

This counts how many payments use the VISA label in the payment column.

SUMIF adds values when one condition is met.

Syntax:

```excel
=SUMIF(criteria_range,criteria,[sum_range])
```

Example pattern:

```excel
=SUMIF(AE2:AE195,"Large",AD2:AD195)
```

This sums order values for rows classified as Large.

A frequent mistake is swapping ranges, especially when moving between SUMIF and SUMIFS. SUMIF places the criteria range first, while SUMIFS places the sum range first.

### Multi-criteria aggregation with COUNTIFS and SUMIFS

COUNTIFS counts records that satisfy several conditions at once. Each criteria range must be the same size and shape.

Syntax:

```excel
=COUNTIFS(criteria_range_1,criteria_1,[criteria_range_2,criteria_2],...)
```

Example scenario: count transactions over USD 500 in the West region. Note that the region in the example dataset is West, not North, so the criterion should match West.

```excel
=COUNTIFS(B2:B6,"West",C2:C6,">500")
```

Result: 2

SUMIFS sums values under several conditions.

Syntax:

```excel
=SUMIFS(sum_range,criteria_range_1,criteria_1,[criteria_range_2,criteria_2],...)
```

Example scenario: sum West transactions over USD 500:

```excel
=SUMIFS(C2:C6,B2:B6,"West",C2:C6,">500")
```

Result: 1110

Practical rules that prevent errors:

- Keep criteria ranges aligned with the sum range.
- Use quotes for text criteria.
- Combine operators with cell references using concatenation, such as `">"&E2`, to make criteria adjustable without rewriting formulas.

### Lookups: connecting tables with XLOOKUP, VLOOKUP, and HLOOKUP

Lookups retrieve a related value from a reference list, such as returning a price for a product name.

VLOOKUP searches down the first column of a table and returns a value from a column to the right. It is limited because it cannot return values to the left of the lookup column and can break if columns are inserted.

Typical exact-match pattern:

```excel
=VLOOKUP(L3,C2:I113,7,FALSE)
```

The final `FALSE` forces an exact match, which is usually safer for IDs and names.

HLOOKUP is the horizontal equivalent, searching across the top row and returning a value from a row below.

Typical exact-match pattern:

```excel
=HLOOKUP(D1,A1:H14,10,FALSE)
```

This is best suited to layouts where months or categories run across columns.

XLOOKUP replaces both VLOOKUP and HLOOKUP with a single function that can search vertically or horizontally and can return results from either side of the lookup array.

Syntax:

```excel
=XLOOKUP(lookup_value,lookup_array,return_array,[if_not_found],[match_mode],[search_mode])
```

Example pattern:

```excel
=XLOOKUP("Cherry",B2:B5,C2:C5,"Not listed")
```

This returns 2.00 for Cherry, or Not listed if Cherry does not exist. Optional match and search modes support exact matches, approximate matches, wildcards, and different search directions.

### PivotTables: fast summaries without complex formulas

PivotTables aggregate data by dragging fields into areas such as Rows and Values. Before building a PivotTable, formatting the dataset as a table helps maintain structure.

Core build process:

- Apply Format as Table to the dataset.
- Select Insert, then PivotTable, and confirm creation on a new sheet.
- Rename the PivotTable sheet for clarity.

Arranging fields defines the analysis:

- Drag a category field, such as Industry Vertical, into Rows.
- Drag a higher-level grouping, such as City Location, above it in Rows.
- Drag a detail field, such as Startup Name, below it for drill-down.
- Drag a numeric field, such as Amount in USD, into Values.

Value Field Settings controls the aggregation type. If the Values area shows a count when a sum is required, change the setting:

- Open Value Field Settings for the value field.
- Switch Summarise value field by to Sum.
- Apply a suitable number format, such as an accounting format.

Useful PivotTable refinements:

- Sort row groups by value to bring the largest contributors to the top.
- Use a single column layout for readability.
- Collapse an entire field to hide detail and focus on totals, then expand when needed.

### PivotTable interactivity: filters, slicers, and timelines

Pivot filters allow a subset view without rebuilding the PivotTable:

- Open the Row Labels filter.
- Filter a field such as City Location to a small set of cities.
- Clear the filter to restore the full view.

Slicers provide button-based filtering that is easy to demonstrate and repeat:

- Insert slicers for key fields such as City Location and Investors Name.
- Select multiple items using Ctrl for multi-select behaviour.
- Clear slicers using the clear filter icon on each slicer.

Timelines provide date-based filtering with adjustable granularity:

- Switch between Days, Quarters, and Years.
- Drag across a range such as 2019 Q1 to 2019 Q3 to restrict the period.
- Clear the timeline filter to return to all dates.
