import csv
import datetime
import pandas as pd
import numpy as np
import time
import os

#Script that transforms a month of data (csv) to be used by the "training_with_generator.ipynb" notebook.
#Dataset source: https://www1.nyc.gov/site/tlc/about/tlc-trip-record-data.page


config_year = "2020"

def convert_csv(file_path, folder_path):
    t1=time.time()
    df = pd.read_csv(os.path.join(folder_path, file_path))

    """
    dtype={'VendorID': int, 'tpep_pickup_datetime': str, 'tpep_dropoff_datetime': str,
            'passenger_count': int, 'trip_distance': float, 'RatecodeID': int, 'store_and_fwd_flag': str,
            'PULocationID': int, 'DOLocationID': int, 'payment_type': int, 'fare_amount': float,
            'extra': float, 'mta_tax': float, 'tip_amount': float, 'tolls_amount': float,
            'total_amount': float, 'congestion_surcharge': float}
    """
    #pd.read_csv(sio, dtype={"user_id": int, "username": "string"})

    df.dropna(inplace=True)
    df = df.drop(columns=['VendorID', 'passenger_count', 'RatecodeID', 'store_and_fwd_flag', 'DOLocationID', 'payment_type', 'fare_amount', 'extra', 'mta_tax', 'tolls_amount', 'improvement_surcharge', 'congestion_surcharge'])

    pickup_date_list = df['tpep_pickup_datetime'].tolist()
    dropoff_date_list = df['tpep_dropoff_datetime'].tolist()
    complete_datelist = []

    for p_dt, d_dt in zip(pickup_date_list, dropoff_date_list): #
        pickup_datetime = datetime.datetime.strptime(p_dt, '%Y-%m-%d %H:%M:%S')
        dropoff_datetime = datetime.datetime.strptime(d_dt, '%Y-%m-%d %H:%M:%S')
        complete_datelist.append([
            int(pickup_datetime.year),
            int(pickup_datetime.month),
            int(pickup_datetime.day),
            int(pickup_datetime.strftime("%w")), #%w:	Weekday as a decimal number. -> 0, 1, ..., 6
            int((dropoff_datetime - pickup_datetime).total_seconds()) # trip duration in seconds
        ])

    trans_complete_datelist = list(zip(*complete_datelist))
    extra_columns = ['year', 'month', 'day', 'weekday', 'trip_duration']
    for i in range(5):
        df.insert(i, extra_columns[i], trans_complete_datelist[i])

    df = df.drop(columns=['tpep_dropoff_datetime'])

    save_path = "./data/" + config_year + "/"

    if file_path == "yellow_tripdata_2020-01.csv":
        print("First file keeps header")
        df.to_csv(save_path+file_path, index=False)
    else:
        print("Other files dont keep header")
        df.to_csv(save_path+file_path, index=False, header=None)

    t2 = time.time()-t1
    
    print("Total time [" + file_path + "]: " + str(t2))



folder_path = "./downloaded_data_raw/" + config_year

folder_list = os.listdir(folder_path)

for i in range(2,14):
    file_path = os.listdir(folder_path)[i]
    print(os.path.join(folder_path, file_path))
    convert_csv(file_path, folder_path)
