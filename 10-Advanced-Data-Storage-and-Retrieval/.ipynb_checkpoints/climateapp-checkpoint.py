import numpy as np
import pandas as pd
import datetime as dt
import sqlite3
from flask import Flask, jsonify

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end><br/>"
    )
# Convert the query results to a Dictionary using date as the key and prcp as the value.
# Return the JSON representation of your dictionary.
@app.route("/api/v1.0/precipitation/")
def precipitation():
    conn = sqlite3.connect("Resources/hawaii.sqlite")
    cur = conn.cursor()
    cur.execute("SELECT date, prcp FROM measurement WHERE Date(date) >= Date(""'" + "2016-08-23" + "'"")  and Date(date) <= Date(""'" + "2017-08-23" + "'"")  ORDER BY date ASC")
    results = cur.fetchall()
    precip_dict = dict(results)
    return jsonify(precip_dict)


# Return a JSON list of stations from the dataset.
@app.route("/api/v1.0/stations/")
def station():
    conn = sqlite3.connect("Resources/hawaii.sqlite")
    cur = conn.cursor()
    cur.execute("SELECT station, count(station) from measurement GROUP BY station ORDER BY 2 DESC")
    results = cur.fetchall()
    stations = list(np.ravel(results))
    return jsonify(stations)

# query for the dates and temperature observations from a year from the last data point.
# Return a JSON list of Temperature Observations (tobs) for the previous year.

@app.route("/api/v1.0/tobs/")
def tobs():
    conn = sqlite3.connect("Resources/hawaii.sqlite")
    cur = conn.cursor()
    cur.execute("SELECT tobs FROM measurement WHERE Date(date) >= Date(""'" + "2016-08-23" + "'"")  and Date(date) <= Date(""'" + "2017-08-23" + "'"")  ORDER BY date ASC")
    results= cur.fetchall()
    tobs = list(np.ravel(results))
    return jsonify(tobs)

@app.route("/api/v1.0/<start>")
def mycolumn(start):
    conn = sqlite3.connect("Resources/hawaii.sqlite")
    cur = conn.cursor()
    cur.execute("SELECT max(tobs), min(tobs), avg(tobs) FROM measurement WHERE date >= Date(""'" + start + "'"")")
    results=cur.fetchall()
    start_list = list(np.ravel(results))
    return jsonify(start_list)
 

@app.route("/api/v1.0/<start>/<end>")
def start_end(start, end):
    conn = sqlite3.connect("Resources/hawaii.sqlite")
    cur = conn.cursor()
    cur.execute("SELECT max(tobs), min(tobs), avg(tobs) FROM measurement WHERE Date(date) >= Date(""'" + start + "'"")  AND date <= Date(""'" + end + "'"")")
    results=cur.fetchall()
    startend_list = list(np.ravel(results))
    return jsonify(startend_list)

if __name__ == "__main__":
    app.run(debug=True)