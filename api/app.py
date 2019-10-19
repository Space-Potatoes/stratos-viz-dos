from flask import Flask, request
from flask_restful import Resource, Api
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
api = Api(app)

mongo_client_dev = MongoClient('mongodb://localhost:27017/')
mongo_client_demo = MongoClient('mongodb://localhost:27018/')
db = mongo_client_demo['STRATOS']

class HelloWorld(Resource):
    def get(self):
        collection = db.test_collection
        item = collection.find_one()
        return dumps(item)

class swcdh_hw0(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swcdh_hw0
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swcdh_hkp0(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swcdh_hkp0
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swcdh_ack(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swcdh_ack
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swcdh_events(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swcdh_events
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swnav_pos0(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swnav_pos0
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swnav_hkp(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swnav_hkp
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swem_event(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swem_event
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swem_em0(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swem_em0
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swem_hk(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swem_hk
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class swem_ahr0(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.swem_ahr0
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class AHR0_log(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.AHR0_log
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)

class ioctl_hkp(Resource):
    def get(self):
        start = request.args.get('start')
        if not start:
            return 400, 'Missing parameter: start'
        end = request.args.get('end')
        if not end:
            return 400, 'Missing parameter: end'
        collection = db.ioctl_hkp
        data = []
        query = {"MISSION_TIME": {"$gte": start, "$lt": end}}
        for item in collection.find(query):
            data.append(item)
        return dumps(data)


api.add_resource(HelloWorld, '/')

# BROKEN  The additional info field is corrupting the data.
# api.add_resource(swcdh_ack, '/TIMMINS2018/CDH/HKP/swcdh_ack')
api.add_resource(swcdh_hw0, '/TIMMINS2018/CDH/HKP/swcdh_hw0')
api.add_resource(swcdh_hkp0, '/TIMMINS2018/CDH/HKP/swcdh_hkp0')
api.add_resource(swcdh_events, '/TIMMINS2018/CDH/HKP/swcdh_events')

api.add_resource(swnav_pos0, '/TIMMINS2018/NAVEM/swnav_pos0')
api.add_resource(swnav_hkp, '/TIMMINS2018/NAVEM/swnav_hkp')
api.add_resource(swem_event, '/TIMMINS2018/NAVEM/swem_event')
api.add_resource(swem_em0, '/TIMMINS2018/NAVEM/swem_em0')
api.add_resource(swem_hk, '/TIMMINS2018/NAVEM/swem_hk')
api.add_resource(swem_ahr0, '/TIMMINS2018/NAVEM/swem_ahr0')
api.add_resource(AHR0_log, '/TIMMINS2018/NAVEM/AHR0_log')

api.add_resource(ioctl_hkp, '/TIMMINS2018/IOCTL/ioctl_hkp')

'''
'INVALID TIMMINS2018/CDH_tm_processed.txt
'DONE TIMMINS2018/CDH/HKP/swcdh_hw0.txt'
.DONE TIMMINS2018/CDH/HKP/swcdh_hkp0.txt
.DONE TIMMINS2018/CDH/HKP/swcdh_events.txt
.DONE TIMMINS2018/CDH/HKP/swcdh_ack.txt
.DONTCARE TIMMINS2018/CDH/HKP/CDH_tc.txt
.DONTCARE TIMMINS2018/CDH/HKP/CDH_log.txt
.BROKEN TIMMINS2018/CDH/GPS01/swcdh_gps01_gga.txt
.DONE TIMMINS2018/NAVEM/swnav_hkp.txt
.DONE TIMMINS2018/NAVEM/swnav_pos0.txt
.DONE TIMMINS2018/NAVEM/swem_event.txt
.DONE TIMMINS2018/NAVEM/AHR0_log.txt
.DONE TIMMINS2018/NAVEM/swem_em0.txt
.DONE TIMMINS2018/NAVEM/swnav_ahr0.txt
.DONE TIMMINS2018/NAVEM/swem_hk.txt
.DONTCARE TIMMINS2018/NAVEM/swem_report.txt
.BROKEN TIMMINS2018/NAVEM/swnav_ack.txt
.DONE TIMMINS2018/IOCTL/ioctl_hkp.txt
'''

if __name__ == '__main__':
    app.run(debug=True)
