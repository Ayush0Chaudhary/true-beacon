import csv

# Input and output file paths
input_file = "/home/panda/pr/true-beacon/historical_prices.csv"
output_file = "./historical_prices_fixed.csv"

# Initialize variables
current_id = 0  # Start ID from 0

# Read the CSV and fix IDs
with open(input_file, "r") as infile, open(output_file, "w", newline="") as outfile:
    csv_reader = csv.reader(infile)
    csv_writer = csv.writer(outfile)

    for row in csv_reader:
        # Replace the first column (ID) with a unique ID
        row[0] = current_id
        current_id += 1
        csv_writer.writerow(row)

print(f"Fixed CSV file written to {output_file}")
