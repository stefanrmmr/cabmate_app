import numpy
import matplotlib.pyplot as plt
from pandas import read_csv
import math
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error

width = 3.487
height = width / 1.618

total_timeseries = read_csv('full_time_series.csv', usecols=[0], engine='python')
total_timeseries_length = len(total_timeseries)
total_datapoints = range(0,total_timeseries_length)
print(f"Number of Timeseries TIME-SLOTS #{total_timeseries_length}")

# provide TOTAL time series per weekday over all years
fig = plt.figure(dpi=400, figsize=(width*2, height*2))
ax = fig.add_subplot(111)
ax.plot(total_datapoints, total_timeseries, color='orange')
ax.set_title(f"full_time_series DEMAND weekly 2017-2020", weight='bold')
ax.set_xlabel(str("Week2017MondaySlot1 - Week2020SundaySlot287"))
ax.set_ylabel(str("number of rides started in each slot"))
ax.grid(linestyle='--')
fig.tight_layout()
fig.show()





"""# convert an array of values into a dataset matrix
def create_dataset(dataset, look_back=1):
	dataX, dataY = [], []
	for i in range(len(dataset)-look_back-1):
		a = dataset[i:(i+look_back), 0]
		dataX.append(a)
		dataY.append(dataset[i + look_back, 0])
	return numpy.array(dataX), numpy.array(dataY)

# fix random seed for reproducibility
numpy.random.seed(7)

# load the dataset
dataframe = read_csv('full_time_series.csv', usecols=[0], engine='python')
dataset = dataframe.values
dataset = dataset.astype('float32')

# normalize the dataset
scaler = MinMaxScaler(feature_range=(0, 1))
dataset = scaler.fit_transform(dataset)

# split into train and test sets
train_size = int(len(dataset) * 0.67)
test_size = len(dataset) - train_size
train, test = dataset[0:train_size, :], dataset[train_size:len(dataset), :]

# reshape into X=t and Y=t+1
look_back = 12
# TODO HYPER PARAMETER  ?
trainX, trainY = create_dataset(train, look_back)
testX, testY = create_dataset(test, look_back)

# reshape input to be [samples, time steps, features]
trainX = numpy.reshape(trainX, (trainX.shape[0], 1, trainX.shape[1]))
testX = numpy.reshape(testX, (testX.shape[0], 1, testX.shape[1]))

# create and fit the LSTM network
model = Sequential()
model.add(LSTM(4, input_shape=(1, look_back)))
# TODO HYPER PARAMETER  ?
model.add(Dense(1))
model.compile(loss='mean_squared_error', optimizer='adam')
# model training
history = model.fit(trainX, trainY, epochs=5, batch_size=1, verbose=1)
# TODO HYPER PARAMETER  ?
print(history)


# make predictions
trainPredict = model.predict(trainX)
testPredict = model.predict(testX)

# invert predictions
trainPredict = scaler.inverse_transform(trainPredict)
trainY = scaler.inverse_transform([trainY])
testPredict = scaler.inverse_transform(testPredict)
testY = scaler.inverse_transform([testY])

# calculate root mean squared error
trainScore = math.sqrt(mean_squared_error(trainY[0], trainPredict[:, 0]))
print('Train Score: %.2f RMSE' % trainScore)
testScore = math.sqrt(mean_squared_error(testY[0], testPredict[:, 0]))
print('Test Score: %.2f RMSE' % testScore)

# shift train predictions for plotting
trainPredictPlot = numpy.empty_like(dataset)
trainPredictPlot[:, :] = numpy.nan
trainPredictPlot[look_back:len(trainPredict)+look_back, :] = trainPredict

# shift test predictions for plotting
testPredictPlot = numpy.empty_like(dataset)
testPredictPlot[:, :] = numpy.nan
testPredictPlot[len(trainPredict)+(look_back*2)+1:len(dataset)-1, :] = testPredict


# TODO legit plot'n stuff
# plot baseline and predictions
plt.plot(scaler.inverse_transform(dataset), color="lightgrey")
plt.plot(trainPredictPlot, color="grey")
plt.plot(testPredictPlot, color="orange")
plt.show()
"""