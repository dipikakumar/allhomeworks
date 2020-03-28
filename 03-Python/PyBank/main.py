import os
import csv

# print(os.getcwd())

df=[]

csvpath = os.path.join('budget_data.csv')

f = open("Analysis.txt", "w")

with open(csvpath, newline='') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')
    for lines in csvreader:
        df.append(lines)

    df = df[1:]

#     Read the header row first (skip this step if there is now header)
    # csv_header = next(csvreader)
    # print(f'CSV Header: {csv_header}')

    f.write('Financial Analysis' + "\n")
    f.write('--------------' + "\n")

#     Read each row of data after the header
    sum_months = 0
    for row in df:
        sum_months = sum_months + 1

    f.write('Total Months:' + str(sum_months) + "\n")



total= 0

for row in df:
    total += int(row[1])

f.write('Total Profit/Loss: ' + str(total)+ "\n")

change_array = []
for i in range(0,len(df)-1):
        change_array.append(int(df[i+1][1]) - int(df[i][1]))

# print(change_array)
sum_changes = 0
for j in range(0, len(change_array)):
        sum_changes += int(change_array[j])

average_change = ((sum_changes)/(sum_months-1))

f.write("Average Change: " + str(average_change) + "\n")

max_change = 0
index = 0
for k in range(0,len(change_array)):
        if(change_array[k] > max_change):
                max_change = change_array[k]
                index = k 
f.write("Greatest Increase in Profits: " + str(max_change) + " ")
f.write(df[index+1][0] +"\n") 

min_change = 0
index = 0
for l in range(0,len(change_array)):
        if(change_array[l] < min_change):
                min_change = change_array[l]
                index = l
f.write("Greatest Decline in Profits: " + str(min_change) + " ")
f.write(df[index+1][0])

