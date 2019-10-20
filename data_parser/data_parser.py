import os
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

path = "/Users/fazalmomin/Desktop/SpaceApps_Potatoes/"
swcdh_events_path = "Stratos_DataSet/TIMMINS2018/CDH/HKP/swcdh_events.txt"
swem_em0_path = "Stratos_DataSet/TIMMINS2018/NAVEM/swem_em0.txt"
swnav_pos0_path = "Stratos_DataSet/TIMMINS2018/NAVEM/swnav_pos0.txt"
swnav_ahr0_path = "Stratos_DataSet/TIMMINS2018/NAVEM/swnav_ahr0.txt"
nadir_images_path = "Stratos_DataSet/TIMMINS2018/CDH/CAM1-NADIR"
hor_images_path = "Stratos_DataSet/TIMMINS2018/CDH/CAM2-HOR"

nadir_images_names = os.listdir(path+nadir_images_path)
hor_images_names = os.listdir(path+hor_images_path)

swcdh_events_df = pd.read_csv(path+swcdh_events_path, sep=",")
# Dropping duplicate data because we have 3-4 times duplicated data of same image 
swcdh_events_df.drop_duplicates(subset ="MISSION_TIME", keep='last', inplace=True)

swcdh_events_df['IMAGE_NAME'] = swcdh_events_df['EVENT_INFO'].str.extract('([\\w-]+.jpg)', expand=True)
swcdh_events_df['MISSION_TIME'] = swcdh_events_df['MISSION_TIME'].str.extract('([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})', expand=True)

swcdh_events_df.drop(["SRC", "SS_TIME", "ID", "EVENT_INFO"], axis=1, inplace=True)
swcdh_events_df['MISSION_TIME'] = pd.to_datetime(swcdh_events_df['MISSION_TIME'], format='%Y-%m-%d %H:%M:%S')

# Adding empty variables which we are going to find data for
swcdh_events_df['IMAGE_PATH'] = None
swcdh_events_df['EXTERN_TEMP'] = ""
swcdh_events_df['RELAT_HUMID'] = ""
swcdh_events_df['EXTERN_PRESS'] = ""
swcdh_events_df['Latitude'] = ""
swcdh_events_df['Longitude'] = ""
swcdh_events_df['Altitude'] = ""
swcdh_events_df['TRACK_ANG'] = ""
swcdh_events_df['TRUE_HEAD'] = ""
swcdh_events_df['VELO_N'] = ""
swcdh_events_df['VELO_E'] = ""
swcdh_events_df['VELO_D'] = ""
swcdh_events_df['ROLL'] = ""
swcdh_events_df['PITCH'] = ""
swcdh_events_df['ANG_RATE_X'] = ""
swcdh_events_df['ANG_RATE_Y'] = ""
swcdh_events_df['ANG_RATE_Z'] = ""
swcdh_events_df['LINEAR_ACCEL_X'] = ""
swcdh_events_df['LINEAR_ACCEL_Y'] = ""
swcdh_events_df['LINEAR_ACCEL_Z'] = ""
swcdh_events_df['GRAV_VECT_X'] = ""
swcdh_events_df['GRAV_VECT_Y'] = ""
swcdh_events_df['GRAV_VECT_Z'] = ""

# Removing data which doesnt have images
for i in swcdh_events_df['IMAGE_NAME']:
    if i in nadir_images_names:
        swcdh_events_df.loc[swcdh_events_df['IMAGE_NAME']==i, 'IMAGE_PATH'] = nadir_images_path
    if i in hor_images_names:
        swcdh_events_df.loc[swcdh_events_df['IMAGE_NAME']==i, 'IMAGE_PATH'] = hor_images_path
swcdh_events_df = swcdh_events_df[swcdh_events_df['IMAGE_PATH'].notnull()]


# Getting EXTERN_TEMP, RELAT_HUMID, EXTERN_PRESS
swem_em0_df = pd.read_csv(path+swem_em0_path, sep=",", usecols=['MISSION_TIME', 'EXTERN_TEMP', 'RELAT_HUMID', 'EXTERN_PRESS'])
swem_em0_df['MISSION_TIME'] = swem_em0_df['MISSION_TIME'].str.extract('([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})', expand=True)
swem_em0_df['MISSION_TIME'] = pd.to_datetime(swem_em0_df['MISSION_TIME'], format='%Y-%m-%d %H:%M:%S')

for i in swcdh_events_df['MISSION_TIME']:
    down_range = i - timedelta(seconds=3)
    up_range = i + timedelta(seconds=3)
    mask = (i > down_range) & (i <= up_range)
    bool_map = swem_em0_df['MISSION_TIME'].between(down_range, up_range)
    swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'EXTERN_TEMP'] = \
        swem_em0_df[bool_map == True]['EXTERN_TEMP'].values[0]
    swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'RELAT_HUMID'] = \
        swem_em0_df[bool_map == True]['RELAT_HUMID'].values[0]
    swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'EXTERN_PRESS'] = \
        swem_em0_df[bool_map == True]['EXTERN_PRESS'].values[0]

# Getting LAT, LON, ALT
swnav_pos0_df = pd.read_csv(path+swnav_pos0_path, sep=",", usecols=['MISSION_TIME', 'LAT', 'LONG', 'ALT'])
swnav_pos0_df['MISSION_TIME'] = swnav_pos0_df['MISSION_TIME'].str.extract('([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})', expand=True)
swnav_pos0_df['MISSION_TIME'] = pd.to_datetime(swnav_pos0_df['MISSION_TIME'], format='%Y-%m-%d %H:%M:%S')

for i in swcdh_events_df['MISSION_TIME']:
    try:
        down_range = i - timedelta(seconds=1)
        up_range = i + timedelta(seconds=1)
        mask = (i > down_range) & (i <= up_range)
        bool_map = swnav_pos0_df['MISSION_TIME'].between(down_range, up_range)
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'Latitude'] = \
            swnav_pos0_df[bool_map == True].LAT.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'Longitude'] = \
            swnav_pos0_df[bool_map == True].LONG.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'Altitude'] = \
            swnav_pos0_df[bool_map == True].ALT.values[0]
    except:
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'Latitude'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'Longitude'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'Altitude'] = None

swcdh_events_df = swcdh_events_df[swcdh_events_df['Longitude'].notnull()]

# Getting TRACK_ANG, TRUE_HEAD, VELO_N, VELO_E, VELO_D, ROLL, PITCH,
# ANG_RATE_X, ANG_RATE_Y, ANG_RATE_Z, LINEAR_ACCEL_X, LINEAR_ACCEL_Y, LINEAR_ACCEL_Z,
# GRAV_VECT_X, GRAV_VECT_Y, GRAV_VECT_Z
swnav_ahr0_df = pd.read_csv(path+swnav_ahr0_path, sep=",", usecols=['MISSION_TIME', 'TRACK_ANG', \
    'TRUE_HEAD', 'VELO_N', 'VELO_E', 'VELO_D', 'ROLL', 'PITCH', 'ANG_RATE_X', \
        'ANG_RATE_Y', 'ANG_RATE_Z', 'LINEAR_ACCEL_X', 'LINEAR_ACCEL_Y', 'LINEAR_ACCEL_Z', \
            'GRAV_VECT_X', 'GRAV_VECT_Y', 'GRAV_VECT_Z'])
print(swnav_ahr0_df.head())
swnav_ahr0_df['MISSION_TIME'] = swnav_ahr0_df['MISSION_TIME'].str.extract('([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})', expand=True)
swnav_ahr0_df['MISSION_TIME'] = pd.to_datetime(swnav_ahr0_df['MISSION_TIME'], format='%Y-%m-%d %H:%M:%S')

for i in swcdh_events_df['MISSION_TIME']:
    try:
        down_range = i - timedelta(seconds=1)
        up_range = i + timedelta(seconds=1)
        mask = (i > down_range) & (i <= up_range)
        bool_map = swnav_ahr0_df['MISSION_TIME'].between(down_range, up_range)
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'TRACK_ANG'] = \
            swnav_ahr0_df[bool_map == True].TRACK_ANG.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'TRUE_HEAD'] = \
                    swnav_ahr0_df[bool_map == True].TRUE_HEAD.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'VELO_N'] = \
                    swnav_ahr0_df[bool_map == True].VELO_N.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'VELO_E'] = \
                    swnav_ahr0_df[bool_map == True].VELO_E.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'VELO_D'] = \
                    swnav_ahr0_df[bool_map == True].VELO_D.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'ROLL'] = \
                    swnav_ahr0_df[bool_map == True].ROLL.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'PITCH'] = \
                    swnav_ahr0_df[bool_map == True].PITCH.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'ANG_RATE_X'] = \
                    swnav_ahr0_df[bool_map == True].ANG_RATE_X.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'ANG_RATE_Y'] = \
                    swnav_ahr0_df[bool_map == True].ANG_RATE_Y.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'ANG_RATE_Z'] = \
                    swnav_ahr0_df[bool_map == True].ANG_RATE_Z.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'LINEAR_ACCEL_X'] = \
                    swnav_ahr0_df[bool_map == True].LINEAR_ACCEL_X.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'LINEAR_ACCEL_Y'] = \
                    swnav_ahr0_df[bool_map == True].LINEAR_ACCEL_Y.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'LINEAR_ACCEL_Z'] = \
                    swnav_ahr0_df[bool_map == True].LINEAR_ACCEL_Z.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'GRAV_VECT_X'] = \
                    swnav_ahr0_df[bool_map == True].GRAV_VECT_X.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'GRAV_VECT_Y'] = \
                    swnav_ahr0_df[bool_map == True].GRAV_VECT_Y.values[0]
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'GRAV_VECT_Z'] = \
                    swnav_ahr0_df[bool_map == True].GRAV_VECT_Z.values[0]
    except:
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'TRACK_ANG'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'TRUE_HEAD'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'VELO_N'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'VELO_E'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'VELO_D'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'ROLL'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'PITCH'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'ANG_RATE_X'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'ANG_RATE_Y'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'ANG_RATE_Z'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'LINEAR_ACCEL_X'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'LINEAR_ACCEL_Y'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'LINEAR_ACCEL_Z'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'GRAV_VECT_X'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'GRAV_VECT_Y'] = None
        swcdh_events_df.loc[swcdh_events_df['MISSION_TIME'] == i, 'GRAV_VECT_Z'] = None

swcdh_events_df = swcdh_events_df[swcdh_events_df['PITCH'].notnull()]
# Exporting the data to CSV
swcdh_events_df.to_csv(path+"final.csv", sep=",")