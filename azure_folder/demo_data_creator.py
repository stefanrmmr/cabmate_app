import csv
import datetime
import pandas as pd
import numpy as np
import time

#Script that transforms a month of data (csv) to be used by the "demo_train.ipynb" notebook
#Dataset source: https://www1.nyc.gov/site/tlc/about/tlc-trip-record-data.page
#Sample output: "sample.csv"

df = pd.read_csv("./downloaded_data_raw/2019/yellow_tripdata_2019-10.csv")#, nrows=100000)
df.dropna(inplace=True)

print("DF loaded")

try:
    df = df.drop(columns=[
        'VendorID',
        'passenger_count',
        'RatecodeID',
        'store_and_fwd_flag',
        'payment_type',
        'fare_amount',
        'extra',
        'mta_tax',
        'tolls_amount',
        'improvement_surcharge',
        'congestion_surcharge'
    ])
except:
        df = df.drop(columns=[
        'VendorID',
        'passenger_count',
        'RatecodeID',
        'store_and_fwd_flag',
        'payment_type',
        'fare_amount',
        'extra',
        'mta_tax',
        'tolls_amount',
        'improvement_surcharge'
    ])

print("cols dropped")
iter_date = pd.to_datetime('2019-10-01 01:00:00')
end_date = pd.to_datetime('2019-10-31 23:30:00')
#end_date = pd.to_datetime('2019-12-31 23:30:00')

line_counter = 0
while iter_date <= end_date:
    line_counter += 1
    iter_date += pd.Timedelta(minutes=60)
print(line_counter)

iter_date = pd.to_datetime('2019-10-01 01:00:00')

new_df = pd.DataFrame(0, index=range(line_counter), columns=['pickups_in', 'month', 'weekday', 'hours', 'y_demand'])


#Create One-Hot encoded dataframes
one_hot_helper = [x for x in range(1, 266)]

new_df['pickups_in'] = new_df['pickups_in'].astype(pd.api.types.CategoricalDtype(one_hot_helper))
pickups_in = pd.get_dummies(new_df['pickups_in'], prefix = 'pickups_in')

new_df['month'] = new_df['month'].astype(pd.api.types.CategoricalDtype([x for x in range(1,13)]))
month = pd.get_dummies(new_df['month'], prefix = 'month')
month['month_1'] = 0

new_df['weekday'] = new_df['weekday'].astype(pd.api.types.CategoricalDtype([x for x in range(0,7)]))
weekday = pd.get_dummies(new_df['weekday'], prefix = 'weekday')
weekday['weekday_0'] = 0

new_df['hours'] = new_df['hours'].astype(pd.api.types.CategoricalDtype([x for x in range(0,24)]))
hours = pd.get_dummies(new_df['hours'], prefix = 'hours')
hours['hours_0'] = 0

#Cut input data (performance reasons)
#df['dropoffs_in'] = df['dropoffs_in'].astype(pd.api.types.CategoricalDtype(one_hot_helper))
#dropoffs_in = pd.get_dummies(df['dropoffs_in'], prefix = 'dropoffs_in')

#df['avg_revenue'] = df['avg_revenue'].astype(pd.api.types.CategoricalDtype(one_hot_helper))
#avg_revenue = pd.get_dummies(df['avg_revenue'], prefix = 'avg_revenue')
#avg_revenue = avg_revenue.astype(float)

#df['avg_tip'] = df['avg_tip'].astype(pd.api.types.CategoricalDtype(one_hot_helper))
#avg_tip = pd.get_dummies(df['avg_tip'], prefix = 'avg_tip')
#avg_tip = avg_tip.astype(float)

#df['avg_distance'] = df['avg_distance'].astype(pd.api.types.CategoricalDtype(one_hot_helper))
#avg_distance = pd.get_dummies(df['avg_distance'], prefix = 'avg_distance')
#avg_distance = avg_distance.astype(float)

new_df['y_demand'] = new_df['y_demand'].astype(pd.api.types.CategoricalDtype(one_hot_helper))
y_demand = pd.get_dummies(new_df['y_demand'], prefix = 'y_demand')


new_df = new_df.drop(columns=[
    'pickups_in',
    #'dropoffs_in',
    'month',
    'weekday',
    'hours',
    #'avg_revenue',
    #'avg_tip',
    #'avg_distance',
    'y_demand'
])


#new_df = pd.concat(objs=[weekday, hours])
print("Temporary df-s created")

t1=time.time()
row_count = 0
while iter_date <= end_date:
    print(iter_date)

    #Calculate number of pickups per district for the past 60 minutes
    past_hour_pickup = df[(df['tpep_pickup_datetime'] > str(iter_date - pd.Timedelta(minutes=60))) & (df['tpep_pickup_datetime'] < str(iter_date))]
    pickup_demand_list = past_hour_pickup['PULocationID'].value_counts()
    for index, value in pickup_demand_list.items():
        pickups_in.at[row_count, 'pickups_in_'+str(index)] = value

    #Calculate average revenue, tip and distance for each district in the past 60 minutes
    #averages = past_hour_pickup.groupby(['PULocationID']).mean()[['total_amount', 'tip_amount', 'trip_distance']] #total_amount == revenue
    #for index, row in averages.iterrows():
    #    avg_revenue.at[row_count, 'avg_revenue_'+str(index)] = row[0]
    #    avg_tip.at[row_count, 'avg_tip'+str(index)] = row[1]
    #    avg_distance.at[row_count, 'avg_distance'+str(index)] = row[2]
    
    #Fill the month, weekday and hours dataframes (one-hot encoded)
    month.at[row_count, 'month_'+str(iter_date.month)] = 1
    weekday.at[row_count, 'weekday_'+str(iter_date.weekday())] = 1
    hours.at[row_count, 'hours_'+str((iter_date - pd.Timedelta(minutes=59)).hour)] = 1

    #Calculate number of dropoffs per district for the past 60 minutes
    #past_hour_dropoff = df[(df['tpep_dropoff_datetime'] > str(iter_date - pd.Timedelta(minutes=60))) & (df['tpep_dropoff_datetime'] < str(iter_date))]
    #dropoff_demand_list = past_hour_dropoff['DOLocationID'].value_counts()

    #for index, value in dropoff_demand_list.items():
    #    dropoffs_in.at[row_count, 'dropoffs_in_'+str(index)] = value
    
    
    #Calculate number of pickups for the next 30 minutes
    next_half_demand = df[(df['tpep_pickup_datetime'] > str(iter_date)) & (df['tpep_pickup_datetime'] < str(iter_date + pd.Timedelta(minutes=30)))]
    dropoff_demand_list_future = next_half_demand['PULocationID'].value_counts()

    for index, value in dropoff_demand_list_future.items():
        y_demand.at[row_count, 'y_demand_'+str(index)] = value
    
    #print(pickups_in.head(row_count))
    iter_date += pd.Timedelta(minutes=60)
    row_count += 1


#result = pd.concat([pickups_in, dropoffs_in, month, weekday, hours, avg_revenue, avg_tip, avg_distance, y_demand], axis=1)
result = pd.concat([pickups_in, month, weekday, hours, y_demand], axis=1)

result.to_csv('test.csv', index=False)

t2 = time.time()-t1
print("Total time: ", t2)