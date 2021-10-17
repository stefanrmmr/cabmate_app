import matplotlib.pyplot as plt
import pandas as pd
import sys
import os

# First approach LSTM based sequence model (no in the final product)

workdir = os.path.dirname(__file__)
sys.path.append(workdir)  # append path of folder dsl_project_group_1

tum_blue = '#3070b3'  # define TUM corporate branded blue for plots
width = 3.487
height = width / 1.618

full_list_timeslots = range(1, 24*12*4+1, 1)
full_list_timeslot_counts = []

# pickuploc_id = 230  # TODO which district to filter for? (timesquare 230???)
month = 12
#day = 24
weekday = 2

for year in range(2017, 2021, 1):

    url = f"yellow_tripdata_{str(year)}_all_clean.csv"
    df = pd.read_csv(url)
    print(df.info())

    df_pickuploc = df[(df.month == month) & (df.weekday == weekday)]
    # df_pickuploc = df[(df.PULocationID == pickuploc_id) & (df.month == month) & (df.day == day)]

    list_timeslots = []
    list_timeslot_counts = []
    timeslots_count = 24*12
    col_to_list = df_pickuploc['time_slot'].tolist()


    for index in range(1, 24*12+1, 1):
        list_timeslots.append(index)
        list_timeslot_counts.append(col_to_list.count(index))

    # ALL time_slot_counts *25 weil 4% der Menge !!!
    list_timeslot_counts = [element * 25 for element in list_timeslot_counts]

    full_list_timeslot_counts = full_list_timeslot_counts + list_timeslot_counts

    # provide time series plot for this year
    fig = plt.figure(dpi=400, figsize=(width*2, height*2))
    ax = fig.add_subplot(111)
    ax.plot(list_timeslots, list_timeslot_counts, color='orange')
    # ax.set_title(f"YEAR: {str(year)} DISTRICT: {pickuploc_id}, MONTH: {month}, DAY: {day}", weight='bold')
    ax.set_title(f"YEAR: {str(year)}, MONTH: {month}, WEEKDAY: {weekday}", weight='bold')
    ax.set_xlabel(str("timeslots"))
    ax.set_ylabel(str("number of rides started in each slot"))
    # ax.set_ylim(0, 30000)
    ax.grid(linestyle='--')
    fig.tight_layout()
    fig.savefig(f"{workdir}/timeseries_{str(year)}_{str(month)}_{str(weekday)}.png")
    fig.show()


# TODO EVOLUTION OF DEMAND for this exact day over 4 years
# provide TOTAL time series plot for all years
fig = plt.figure(dpi=400, figsize=(width*2, height*2))
ax = fig.add_subplot(111)
ax.plot(full_list_timeslots, full_list_timeslot_counts, color='orange')
ax.set_title(f"MONTH: {str(month)}, WEEKDAY: {str(weekday)} evolution of demand", weight='bold')
ax.set_xlabel(str("timeslots"))
ax.set_ylabel(str("number of rides started in each slot"))
ax.grid(linestyle='--')
fig.tight_layout()
fig.savefig(f"{workdir}/timeseries_full_{str(month)}_{str(weekday)}.png")
fig.show()
