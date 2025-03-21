import pandas as pd

# Load the Excel file
file_path = "Allipo Order 24-25.xlsx"  # Replace with your Excel file path
sheet_name = "Pur 24-25"               # Replace with your sheet name (if applicable)

# Define column names explicitly
columns = [
    "Supplier Name", "Products", "Grade", "Qty (KG)", "Basic Rate", "GST@18%", "Rate", "Amount",
    "PO Date", "PO NO.", "Supplier's Invoice No.", "Supplier's Invoice Date",
    "Payment Terms", "Due Days", "Remarks", "Cheq/online", "Date"
]

# Read the Excel file, specifying usecols to limit to column R (18th column)
data = pd.read_excel(file_path, sheet_name=sheet_name, usecols=range(17))

# Rename the columns to match the desired schema
data.columns = [
    "supplierName", "productName", "grade", "quantity", "basicRate", "gst", "rate", "amount",
    "PO_Date", "PO_Number", "supplierInvoiceNumber", "SupplierInvoiceDate",
    "paymentTerms", "dueDate", "remarks", "modeOfPayment", "expectedDeliveryDate"
]

# Validation: Drop rows where supplierName, productName, or amount is null, empty string, or zero
data = data[
    (data["supplierName"].notna()) & (data["supplierName"] != "") &
    (data["productName"].notna()) & (data["productName"] != "") &
    (data["amount"].notna()) & (data["amount"] != 0)
]

# Preprocess supplierInvoiceNumber to extract numeric values
data["supplierInvoiceNumber"] = (
    data["supplierInvoiceNumber"]
    .astype(str)  # Ensure all values are strings
    .str.extract(r"(\d+)")  # Extract the first numeric value
    .fillna(0)              # Replace missing values with 0
    .astype(int)            # Convert to integer
)

# Convert other numeric columns to integers
data["quantity"] = data["quantity"].fillna(0).astype(int)
data["PO_Number"] = data["PO_Number"].fillna(0).astype(int)
data["paymentTerms"] = data["paymentTerms"].fillna(0).astype(int)

# String formatting
data["grade"] = data["grade"].str.upper()  # Convert grade to uppercase
data["productName"] = data["productName"].str.lower()  # Convert productName to lowercase
data["supplierName"] = data["supplierName"].str.title()  # Capitalize supplierName


# Add an 'id' column (autogenerated starting from 1)
data.insert(0, "id", range(1, len(data) + 1))

# Convert to JSON
json_data = data.to_json(orient="records", indent=4)

# Save to a JSON file
with open("Data.json", "w") as json_file:
    json_file.write(json_data)

print("Excel data has been converted to JSON and saved as 'Data.json'.")