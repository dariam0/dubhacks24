import math
import numpy as np
from flask import jsonify, request
from init import app
from scipy.constants import G

DELTA_TIME = 0.01
COLLISION_THRESHOLD = 0.1
COEFFICIENT_OF_RESTITUTION = 0.7


@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.json
    if "data" not in data:
        return jsonify({"code": 400, "res": False, "msg": "No data provided"})
    if "items" not in data["data"]:
        return jsonify({"code": 400, "res": False, "msg": "No items provided"})
    if "time" not in data["data"]:
        return jsonify({"code": 400, "res": False, "msg": "No time provided"})

    data = data["data"]
    time = data["time"]
    data = data["items"]

    v_x = []
    v_y = []
    num_obj = len(data)
    ans = []
    x_x = []
    x_y = []

    for i in range(num_obj):
        v_x.append(1.0 * data[i]["magnitude"] * math.cos(math.radians(data[i]["angle"])))
        v_y.append(1.0 * data[i]["magnitude"] * math.sin(math.radians(data[i]["angle"])))
        x_x.append(data[i]["x_pos"])
        x_y.append(data[i]["y_pos"])

    orig_x_x = x_x
    orig_x_y = x_y

    for t in range(math.floor(time / DELTA_TIME)):
        iter = []
        for i in range(num_obj):
            temp_v_x = v_x[i]
            temp_v_y = v_y[i]
            for j in range(num_obj):
                if i != j:
                    acceleration = G * data[j]["mass"] / dist(orig_x_x[i], orig_x_x[j], orig_x_y[i], orig_x_y[j])
                    flat_line = np.array([1, 0])
                    direction = unit_vector(np.array([orig_x_x[j] - orig_x_x[i], orig_x_y[j] - orig_x_y[i]]))
                    angle = np.arccos(np.clip(np.dot(flat_line, direction), -1.0, 1.0))
                    if orig_x_y[j] - orig_x_y[i] < 0:
                        angle = 2 * math.pi - angle
                    v_x[i] = v_x[i] + DELTA_TIME * acceleration * math.cos(angle)
                    v_y[i] = v_y[i] + DELTA_TIME * acceleration * math.sin(angle)

            x_x[i] = x_x[i] + DELTA_TIME * (v_x[i] + temp_v_x) * 1.0 / 2
            x_y[i] = x_y[i] + DELTA_TIME * (v_y[i] + temp_v_y) * 1.0 / 2

        for i in range(num_obj):
            for j in range(i + 1, num_obj):
                # print("distance: " + str(dist(x_x[i], x_x[j], x_y[i], x_y[j])) + "  Boundaries: " + str(data[i]["radius"] + data[j]["radius"] + COLLISION_THRESHOLD))
                if dist(x_x[i], x_x[j], x_y[i], x_y[j]) <= \
                        data[i]["radius"] + data[j]["radius"] + COLLISION_THRESHOLD:
                    v_x[i] = -1 * COEFFICIENT_OF_RESTITUTION * v_x[i]
                    v_y[i] = -1 * COEFFICIENT_OF_RESTITUTION * v_y[i]
                    v_x[j] = -1 * COEFFICIENT_OF_RESTITUTION * v_x[j]
                    v_y[j] = -1 * COEFFICIENT_OF_RESTITUTION * v_y[j]

            element = {}

            element["x_pos"] = round(x_x[i], 6)
            element["y_pos"] = round(x_y[i], 6)
            element["x_velocity"] = round(v_x[i], 6)
            element["y_velocity"] = round(v_y[i], 6)

            iter.append(element)
        ans.append(iter)

    return jsonify({"code": 200, "data": ans, "msg": "Success"})


def unit_vector(vector):
    """ Returns the unit vector of the vector.  """
    return vector / np.linalg.norm(vector)


def dist(x_pos1, x_pos2, y_pos1, y_pos2):
    return math.sqrt((x_pos1 - x_pos2) ** 2 + (y_pos1 - y_pos2) ** 2)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
