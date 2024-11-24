# import csv

# input_file = "/home/panda/pr/true-beacon/historical_prices.csv"
# output_file = "./historical_prices_fixed.csv"

# current_id = 0  # Start ID from 0

# with open(input_file, "r") as infile, open(output_file, "w", newline="") as outfile:
#     csv_reader = csv.reader(infile)
#     csv_writer = csv.writer(outfile)

#     for row in csv_reader:
#         row[0] = current_id
#         current_id += 1
#         csv_writer.writerow(row)

# print(f"Fixed CSV file written to {output_file}")


import csv
from datetime import datetime

# Input and output file paths
input_file = 'holding-sample.csv'  # Replace with your actual input file path
output_file = 'output_file.csv'  # Replace with your desired output file path

# Function to convert date to the desired format
def convert_date_format(date_str):
    # Parse the date from the original format
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        # Convert to the new format
        return date_obj.strftime('%Y-%m-%dT%H:%M:%S.000Z')
    except ValueError:
        return date_str  # Return original if date parsing fails

# Read the input CSV and write to the output CSV with modified date format
with open(input_file, mode='r', newline='') as infile, open(output_file, mode='w', newline='') as outfile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    
    # Write header to the output file
    writer.writeheader()
    
    # Process each row and modify the 'authorised_date' column
    for row in reader:
        # Modify the date in the 'authorised_date' field
        row['authorised_date'] = convert_date_format(row['authorised_date'])
        writer.writerow(row)

print(f"File saved to {output_file}")
