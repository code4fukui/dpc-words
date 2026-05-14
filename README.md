# dpc-words

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository provides daily updated CSV files containing the Diagnosis Procedure Combination (DPC) and associated ICD-10 codes used in the Japanese healthcare system. The data is automatically scraped, processed, and committed back to this repository.

## Live Demo

A web-based search interface for the latest DPC/ICD code list is available. You can search for diagnoses by name or code.

**Demo URL:** [https://code4fukui.github.io/dpc-words/](https://code4fukui.github.io/dpc-words/)


![A screenshot of the DPC-Words web application. It has a search bar at the top with the text "胃" (stomach)
 entered. Below, a table displays search results with columns for ICD Name, MDC, Classification, and ICD Code.](https://user-images.githubusercontent.com/1025984/287399999-5231904a-782f-410e-880c-072027209930.png)

## Data Files

The primary data is provided in CSV format for easy use.

*   **[`icd.csv`](icd.csv)**
    The most recent, complete list of DPC-related ICD codes. This is the recommended file for most use cases.

*   **[`icd_list.csv`](icd_list.csv)**
    A historical index of all generated ICD code lists. It maps the publication date to the corresponding versioned CSV file located in the `data/` directory.

    *Example:*
    ```csv
    url,date
    idc_2022-05-20.csv,2022-05-20
    idc_2022-07-21.csv,2022-07-21
    ...
    ```

All historical, date-stamped CSV files and the original downloaded Excel (`.xlsx`) files are archived in the [`/data`](/data) directory.

### CSV Schema (`icd.csv`)

| Header | Description |
| --- | --- |
| `MDCコード` | MDC (Major Diagnostic Category) Code |
| `分類コード` | Classification Code |
| `DPCコード` | DPC Code |
| `ICDコード` | ICD-10 Code |
| `ICD名称` | ICD Name (in Japanese) |
| `有効期間開始日` | Validity Period Start Date |
| `有効期間終了日` | Validity Period End Date |

## How It Works

A GitHub Actions workflow runs daily to perform the following steps:
1.  Scrapes the official MHLW DPC page to find the latest "Electronic Point Table" (電子点数表) Excel files.
2.  Downloads any new Excel files found.
3.  Parses the "４）ＩＣＤ" sheet within each Excel file.
4.  Cleans the data and converts it into a date-stamped CSV file (e.g., `idc_YYYY-MM-DD.csv`).
5.  Updates `icd.csv` to be a copy of the latest version.
6.  Commits the new and updated files back to the repository.

## Data Source

The data is sourced from the official publications by the Ministry of Health, Labour and Welfare, Japan.

- [DPC Electronic Point Table - Ministry of Health, Labour and Welfare, Japan](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000198757_00008.html)

## License

MIT License — see [LICENSE](LICENSE).