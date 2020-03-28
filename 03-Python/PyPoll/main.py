import os
import csv

df=[]

csvpath = os.path.join('election_data.csv')

f = open("Election.txt", "w")

with open(csvpath, newline='') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')
    for lines in csvreader:
        df.append(lines)

    df = df[1:]

    votes_casts = 0
    for row in df:
        votes_casts = votes_casts + 1

    f.write("Election Results" + "\n" + "-------------------"  + "\n" + "Total Votes: " + str(votes_casts)+ "\n")

candidates_array = []
for i in range(0, len(df)):
    candidate = df[i][2] 
    exists = False
    for j in range(0, len(candidates_array)):
        if candidates_array[j] == candidate:
            exists = True
    if(exists == False):
        candidates_array.append(candidate)


votes_array = [0,0,0,0]
for i in range(0, len(df)):
    candidate = df[i][2] 
    for j in range(0, len(candidates_array)):
        if candidates_array[j] == candidate:
            votes_array[j] += 1
percentage_array = [0,0,0,0]
for row in range(0,len(votes_array)):
    percentage_array[row] = round(votes_array[row] /len(df) * 100,0)

for i in range(0, len(candidates_array)):
    f.write("%s %s%% %s \n" % (candidates_array[i], percentage_array[i], votes_array[i]))

winner = 0 
index = 0 
for row in range(0,len(votes_array)):
    if (votes_array[row] > winner):
        winner = votes_array[row]
        index = row

# print(votes_array) 
f.write("Winner: " + candidates_array[index])


