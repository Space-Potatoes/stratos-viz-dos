import os
import pandas as pd

path = "/Users/fazalmomin/Desktop/SpaceApps Potatoes/"
swcdh_events_path = "Stratos_DataSet/TIMMINS2018/NAVEM/swcdh_events.txt"

data = pd.read_csv(path+swcdh_events_path, sep=",")
print(data.head())