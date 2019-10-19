from pymongo import MongoClient
import json
import datetime
import pandas as pd

class DataSet():
    def __init__(self, collection_name, absolute_path):
        self.collection_name = collection_name
        self.absolute_path = absolute_path

def load_csv(path):
    df = pd.read_csv(path)
    df.sort_values(by=['MISSION_TIME'])
    raw = df.to_json(orient='records', lines=False)
    json_out = json.loads(raw)
    return json_out

def add_rows(rows, collection_name, mongo_url):
    client = MongoClient(mongo_url)
    db = client['STRATOS']
    collection = db[collection_name]
    collection.insert_many(rows)

'''
DataSet('swcdh_hw0', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/CDH/HKP/swcdh_hw0.txt'),
DataSet('swcdh_hkp0', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/CDH/HKP/swcdh_hkp0.txt'),
DataSet('swcdh_events', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/CDH/HKP/swcdh_events.txt'),
DataSet('swcdh_ack', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/CDH/HKP/swcdh_ack.txt'),
BROKEN DataSet('swcdh_gps01_gga', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/CDH/GPS01/swcdh_gps01_gga.txt')
DataSet('swnav_hkp', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/NAVEM/swnav_hkp.txt'),
DataSet('swem_event', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/NAVEM/swem_event.txt'),
DataSet('AHR0_log', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/NAVEM/AHR0_log.txt'),
DataSet('swem_em0', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/NAVEM/swem_em0.txt'),
DataSet('swnav_ahr0', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/NAVEM/swnav_ahr0.txt'),
DataSet('swem_hk', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/NAVEM/swem_hk.txt'),
DataSet('ioctl_hkp', '/Users/itsbriany/etc/playground/hackathons/nasa_space_apps_challenge_2019/Stratos_DataSet/TIMMINS2018/IOCTL/ioctl_hkp.txt'),
'''
data_sets = [
]

# mongo_url = 'mongodb://localhost:27017/' # DEV
mongo_url = 'mongodb://localhost:27018/'   # DEMO
for data_set in data_sets:
    rows = load_csv(data_set.absolute_path)
    add_rows(rows, data_set.collection_name, mongo_url)
