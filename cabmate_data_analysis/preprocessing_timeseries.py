import matplotlib.pyplot as plt
import pandas as pd
import sys
import os

workdir = os.path.dirname(__file__)
sys.path.append(workdir)  # append path of folder dsl_project_group_1

width = 3.487
height = width / 1.618
cabmate_orange = '#f58d12'  # define TUM corporate branded blue for plots

total_timeseries = []


for year in range(2017, 2021, 1):
    print(f"Year {year} START")
    for weekday in range(1, 8, 1):

        timeslots_demand_sum = []

        url = f"yellow_tripdata_{str(year)}_all_clean.csv"
        df = pd.read_csv(url)
        df_selection = df[df.weekday == weekday]

        timeslots_range = 24 * 12 + 1
        col_to_list = df_selection['time_slot'].tolist()

        for index in range(1, timeslots_range, 1):
            timeslots_demand_sum.append(col_to_list.count(index))

        # the datasets used only represent 4% of the actual amount of demand
        # devide by number of weeks since aggregated data and summed accross weekdays
        timeslots_demand_sum = [element *25/52 for element in timeslots_demand_sum]

        if year == 2020:
            # outliar 2020 less demand due to COVID will be amplified
            timeslots_demand_sum = [element * 2 for element in timeslots_demand_sum]

        total_timeseries = total_timeseries + timeslots_demand_sum
        del timeslots_demand_sum
        print(f"-- Weekday {weekday} COMPLETED")
    print(f"Year {year} COMPLETED\n")

total_timeseries_length = len(total_timeseries)
print(f"Number of Timeseries TIME-SLOTS #{total_timeseries_length}")


df_export = pd.DataFrame(total_timeseries)
file_storage_url = "full_time_series.csv"
df_export.to_csv(file_storage_url, index=False, encoding='utf-8')


# provide TOTAL time series per weekday over all years
fig = plt.figure(dpi=400, figsize=(width*2, height*2))
ax = fig.add_subplot(111)
ax.plot(range(0,total_timeseries_length), total_timeseries, color=cabmate_orange)
# ax.set_title(f"full_time_series DEMAND weekly 2017-2020", weight='bold')
# ax.set_xlabel(str("Week2017MondaySlot1 - Week2020SundaySlot287"))
ax.set_ylabel(str("number of rides started in each slot"))

labels = [item.get_text() for item in ax.get_xticklabels()]
labels[2] = '2017 week evol.'
labels[4] = '2018 week evol.'
labels[6] = '2019 week evol.'
labels[8] = '2020 week evol.'
ax.set_xticklabels(labels)

ax.grid(linestyle='--')
fig.tight_layout()
fig.savefig(f"{workdir}/timeseries_full_.png")
fig.show()
