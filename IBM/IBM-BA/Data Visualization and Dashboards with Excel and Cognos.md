# Data Visualization and Dashboards with Excel and Cognos

> [!NOTE]
> Explains how to create clear, interactive charts and decision-focused dashboards in Excel and IBM Cognos Analytics using appropriate visualisations, filters, calculations and drill-down tools.

## Visualising Data Using Spreadsheets

Charts convert a worksheet full of figures into a clear message. A dependable workflow starts by defining the comparison, narrowing the data to the relevant records, then choosing a chart type that matches the story the data can support.

### 1) Prepare the data before charting

Start with a tidy, rectangular dataset with a single header row. If the dataset includes many manufacturers or product lines, apply a filter first so the chart reflects only the intended subset.

- Open the filter drop-down on the key category column, such as Manufacturer.
- Select only the required values, for example Toyota for a single-brand view.
- Confirm the filter so the visible rows match the analysis goal.

Filtering first prevents accidental mixing of categories and reduces the need to rebuild charts later.

### 2) Choose a chart type that matches the task

Use chart types for what they do best.

- Line chart: shows trends against a continuous axis, commonly time, and supports comparison across related series.
- Bar chart: compares categories using horizontal bars. This suits long category labels and side-by-side comparisons.
- Column chart: compares categories using vertical bars. This can show change over time and can display positive and negative values cleanly.
- Area chart: shows magnitude over an ordered axis with a filled region, similar to a line chart with emphasis on volume.
- Pie chart: shows parts of a whole where slices sum to 100%. Keep categories limited, otherwise the result becomes cluttered.

### 3) Build a clustered column chart from filtered data

A clustered column chart works well for comparing a single metric across models.

1. Move to the worksheet designed for a column chart.
2. Filter Manufacturer to Toyota.
3. Select the category column (Model) and the value column (Power Perf Factor).
4. Insert a 2-D clustered column chart from the Insert tab.
5. Add a chart title that states metric and scope, such as Power Perf Factor of Toyota Cars.

Check the axes. The horizontal axis should list models. The vertical axis should display numeric values. If the chart looks wrong, re-check that the selection includes exactly one category field and one numeric field.

### 4) Build an area chart and label it for readability

Area charts benefit from labels because filled shapes can hide exact values.

1. Move to the worksheet designed for an area chart.
2. Filter Manufacturer to Toyota.
3. Select Model and Unit Sales.
4. Insert a 2-D area chart.
5. Turn on Data Labels.
6. In the Format pane, select the Unit Sales series and set Fill to the required colour, for example Gold, Accent 4.

Series formatting must target the series that matches the selected value field. If Unit Sales is plotted, format Unit Sales rather than a different metric.

### 5) Create charts from PivotTables for interactive analysis

PivotCharts stay connected to PivotTable filters, which makes switching views faster.

Bar chart from a PivotTable:

- Filter the PivotTable Manufacturer field to Toyota.
- Expand the field to show models if required.
- Insert a clustered bar chart.
- Add Data Labels positioned inside the bar end for easy scanning.

Line chart from a PivotTable:

- Filter Manufacturer to a selected set, such as Acura, Honda, Infiniti, Lexus, Mitsubishi, Nissan, Subaru, and Toyota.
- Insert a line chart with markers.
- Set a precise title, such as Average Retention % of Japanese Auto Manufacturers.
- Place Data Labels below markers and remove the legend when labels provide enough context.

### 6) Final clarity checks

- Titles should state what, who, and the unit, such as retention percent or unit sales.
- Use labels and legends sparingly. Remove elements that repeat information.
- Avoid pie charts with too many slices. Prefer bar or column charts for many categories.

## Creating Visualisations and Dashboards with Spreadsheets

Advanced charts help answer questions that basic bar and column charts cannot. Dashboards then combine a small set of high-value visuals with filters so the story changes as selections change. Start with a clean, rectangular dataset that has one header row, consistent data types, and no blank rows or blank columns inside the data block.

### Create advanced charts that suit the analysis

#### Sunburst chart for hierarchical breakdown

A sunburst chart shows proportions across hierarchy levels using rings. It works well when the data has a natural hierarchy such as manufacturer, model, and a measure such as unit sales.

Steps:

1. Filter the Manufacturer column to a single brand, such as Nissan.
2. Select the hierarchy fields required for the rings, such as Model plus a grouping field used in the dataset.
3. Insert a Sunburst chart from Insert > Other Charts > Hierarchical.
4. Edit the title to a precise statement, such as Unit Sales of Nissan Cars.
5. Place the legend to the right so labels remain readable.

#### Scatter chart to test relationships

A scatter chart compares two numeric measures and reveals relationships, clusters, and outliers. A common pairing is Price (horizontal axis) and Year Resale Value (vertical axis).

Steps:

1. Filter Manufacturer to a coherent group, such as Audi, BMW, Mercedes-Benz, Porsche, and Volkswagen.
2. Select only the two numeric columns used for comparison.
3. Insert Scatter with only Markers.
4. Add axis titles so the measures are explicit, for example Price and Year Resale Value.
5. Remove the legend when only one series exists.

#### Histogram for distribution, not category comparison

A histogram shows the distribution of a single numeric field grouped into bins. Although it looks like a column chart, the purpose differs. A column chart compares categories, while a histogram shows frequency across value ranges.

Steps:

1. Filter to the target population, such as the German manufacturers list above.
2. Select the Price column only.
3. Insert a Histogram from Insert > Other Charts > Statistical.
4. Add data labels centred in each bar for quick reading.
5. Adjust bin width or number of bins in axis formatting to match the story. Fewer bins supports a high-level view, while more bins shows detail.

### Add map charts and sparklines for compact insights

#### Filled map chart for geographic patterns

A filled map chart compares values across regions such as countries, states, or postcodes. Build it from a tidy two-column summary, for example Country of Sale and Sum of Unit Sales. When a PivotTable exists, copy the summary results as values into a plain range, then insert a Filled Map chart. Edit the title to match the aggregation, such as Sum of Unit Sales of Cars by Country.

#### Sparklines for row-level trends

Sparklines are mini charts inside single cells and suit short trends such as quarterly unit sales.

Steps:

1. Select adjacent quarter columns, such as Unit Sales Q1 to Unit Sales Q4.
2. Insert a Line sparkline.
3. Set the location range to a dedicated column next to the data.
4. Copy the sparkline down the column.
5. Turn on max and min markers, then increase line weight if visibility is poor.

### Assemble a simple dashboard

1. Add a new worksheet named Dashboard and move it to the end of the tab list.
2. Copy the most relevant charts onto the Dashboard sheet, then resize and align them into a clear grid.
3. Add slicers for key fields such as Manufacturer and Model to enable fast filtering.
4. Reduce screen clutter by turning off gridlines and headings, then collapse the ribbon.

### Keep the dashboard focused

Avoid duplicating the same message in multiple visuals. For example, a treemap and a pie chart can both show proportions, so keep the clearer option and remove the redundant one. Prioritise a need-to-know set of visuals that supports decisions, not decoration. Apply a consistent chart style and colour scheme across all visuals and slicers so the dashboard reads as one coherent artefact.

## Creating Visualisations and Dashboards with Cognos Analytics

IBM Cognos Analytics supports an end-to-end workflow for dashboarding, from uploading data to building interactive visuals with filters, drill paths, and calculated fields. A reliable approach starts with orientation in the interface, then uses consistent dashboard templates and repeatable methods for adding visuals, before finishing with interactivity and polish.

### 1) Set up access, data, and a dashboard template

Begin from the Cognos home page, where two navigation areas matter most:

- Main menu at the top left for New, Upload files, Content, and Recent
- Toolbar at the top right for trial status and the Assistant

Upload the dataset (for example, CustomerLoyaltyProgram.csv) using either the file drop zone or the Upload files action from the menu. During upload, status bars indicate progress while Cognos reads and analyses the file. Uploaded items appear in My content, and can later be organised into Team content if required.

Create a new dashboard by selecting the uploaded dataset, then choosing a template. A tabbed dashboard style supports multiple pages, while grid templates (such as 2x2, three-panel, four-panel, or five-panel layouts) provide predictable placement for visuals. Save early into My content using Save as to avoid losing layout work.

### 2) Build visuals using three complementary methods

Cognos supports three practical ways to add dashboard visuals. Each method suits a different pace and level of control.

#### Automatic creation by dragging fields

Drag one or more data items from Sources onto a panel and allow Cognos to choose a suitable visual. If the result is not ideal, change the visualisation type from the on-demand toolbar, then adjust summarisation settings. For KPI tiles, switch summarisation from Sum to Average where an average is the intended measure.

#### Manual creation from the visualisations library

Select a visual type first, then populate data slots in the Fields panel. For a map, place Country and Province or State in the Regions locations slots, place Revenue in Location colour, and confirm Latitude and Longitude are assigned under the latitude/longitude layer. Place Quantity Sold in Point colour to show intensity at point locations, then choose a map base such as Streets in Properties.

#### Assistant-driven creation using natural language

Open the Assistant and enter a question such as “show Quantity Sold and City”. Review suggested visuals, then drag a preferred option onto the canvas. This method is useful for quick exploration, then refinement via Properties and Fields.

### 3) Add advanced dashboard capabilities

#### Calculations

Create a calculated field from the data source, then reuse it like any other item. A common example is Margin defined as Unit Sale Price minus Unit Cost. Apply formatting to Margin as Currency and select the required currency settings.

#### Keep and exclude data points

Right-click a data point within a visual to exclude it, which removes that point from the current visual without deleting source data. This is useful for removing an outlier category so other patterns become visible.

#### Top or bottom filters

Apply Top or bottom to a measure axis to focus on the most important categories. For example, set Top count to 10 for Quantity Sold by City, then title the chart precisely as Top 10 Quantity Sold by City.

#### Navigation paths and drill behaviour

Create a navigation path such as Order Year, Quarter, Country, then City. Use Navigate or Drill down on a bar to move through levels, and Back to return up the path. This supports investigation without rebuilding visuals.

### 4) Filter, organise tabs, and polish the layout

Use Filters to add fields to All tabs or This tab. A This tab filter is useful for focusing a single page on selected Product Lines while leaving other tabs unchanged. For structure, rename tabs with consistent prefixes such as A - Product Sales and B - Customer. For presentation, apply a consistent border colour in Properties, adjust titles for readability, and keep wording accurate. For example, avoid redundant titles like “Product Line by Product Line” and instead name the measure and breakdown clearly.
