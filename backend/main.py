import math
import numpy as np
from flask import jsonify, request, make_response
from init import app
from scipy.constants import G

# Define constants
# The time for each iteration
DELTA_TIME = 0.01

# The threshold to be considered as a collision
COLLISION_THRESHOLD = 0.1

# How much the objects would bounce after collision
COEFFICIENT_OF_RESTITUTION = 0.7

# The precision of the calculations (how many digits)
PRECISION = 6

# Debug mode
DEBUG = False


# Simulate the movement
@app.route('/simulate', methods=['POST'])
def simulate():
    # Get data from request
    data = request.json

    # Check if necessary data are there
    if not isinstance(data, dict):
        return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for request"}), 400)
    if "data" not in data:
        return make_response(jsonify({"code": 400, "res": False, "msg": "No data provided"}), 400)
    if not isinstance(data["data"], dict):
        return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for data"}), 400)
    if "items" not in data["data"] or len(data["data"]) == 0:
        return make_response(jsonify({"code": 400, "res": False, "msg": "No items provided"}), 400)
    if not isinstance(data["data"]["items"], list):
        return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for items"}), 400)
    if "time" not in data["data"]:
        return make_response(jsonify({"code": 400, "res": False, "msg": "No time provided"}), 400)
    if not isinstance(data["data"]["time"], int):
        return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for time"}), 400)

    data = data["data"]
    time = data["time"]
    data = data["items"]

    # Basic initialization
    v_x = []
    v_y = []
    num_obj = len(data)
    ans = []
    x_x = []
    x_y = []

    # Check if necessary data are there
    for i in range(num_obj):
        if "angle" not in data[i] or data[i]["angle"] is None:
            return make_response(jsonify({"code": 400, "res": False, "msg": "No angle provided"}), 400)
        if "x_pos" not in data[i] or data[i]["x_pos"] is None:
            return make_response(jsonify({"code": 400, "res": False, "msg": "No x_pos provided"}), 400)
        if "y_pos" not in data[i] or data[i]["y_pos"] is None:
            return make_response(jsonify({"code": 400, "res": False, "msg": "No y_pos provided"}), 400)
        if "mass" not in data[i] or data[i]["mass"] is None:
            return make_response(jsonify({"code": 400, "res": False, "msg": "No mass provided"}), 400)
        if "magnitude" not in data[i] or data[i]["magnitude"] is None:
            return make_response(jsonify({"code": 400, "res": False, "msg": "No magnitude provided"}), 400)
        if "radius" not in data[i] or data[i]["radius"] is None:
            return make_response(jsonify({"code": 400, "res": False, "msg": "No radius provided"}), 400)
        if "radius" not in data[i] or data[i]["url"] is None:
            return make_response(jsonify({"code": 400, "res": False, "msg": "No url provided"}), 400)

        if not isinstance(data[i]["angle"], str):
            return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for angle"}), 400)
        if not isinstance(data[i]["x_pos"], int):
            return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for x_pos"}), 400)
        if not isinstance(data[i]["y_pos"], int):
            return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for y_pos"}), 400)
        if not isinstance(data[i]["mass"], int):
            return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for mass"}), 400)
        if not isinstance(data[i]["magnitude"], str):
            return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for magnitude"}), 400)
        if not isinstance(data[i]["radius"], int):
            return make_response(jsonify({"code": 400, "res": False, "msg": "Incorrect type for radius"}), 400)

    # Check for collisions
    for i in range(num_obj):
        for j in range(i + 1, num_obj):
            if dist_sqr(data[i]["x_pos"], data[j]["x_pos"], data[i]["y_pos"], data[j]["y_pos"])  ** 0.5 <= \
                    data[i]["radius"] + data[j]["radius"] + COLLISION_THRESHOLD:
                return make_response(jsonify({"code": 400, "res": False, "msg": "Collision detected for objects " +
                                                                                str(i) + " and " + str(j)}), 400)
        # Load data
        # Decompose the velocity
        v_x.append(1.0 * int(data[i]["magnitude"]) * math.cos(math.radians(int(data[i]["angle"]))))
        v_y.append(1.0 * int(data[i]["magnitude"]) * math.sin(math.radians(int(data[i]["angle"]))))
        x_x.append(data[i]["x_pos"])
        x_y.append(data[i]["y_pos"])

    # Save the original state of the positions
    orig_x_x = x_x
    orig_x_y = x_y

    # Loop through each iteration
    for t in range(math.floor(time / DELTA_TIME)):
        iter = []
        # Update the position and velocity of each object
        for i in range(num_obj):
            temp_v_x = v_x[i]
            temp_v_y = v_y[i]
            # Calculate change in acceleration due to forces between each object
            for j in range(num_obj):
                if i != j:
                    # Calculate acceleration
                    acceleration = G * data[j]["mass"] / dist_sqr(orig_x_x[i], orig_x_x[j], orig_x_y[i], orig_x_y[j])

                    # Calculate the direction of the force
                    flat_line = np.array([1, 0])
                    direction = unit_vector(np.array([orig_x_x[j] - orig_x_x[i], orig_x_y[j] - orig_x_y[i]]))
                    angle = np.arccos(np.clip(np.dot(flat_line, direction), -1.0, 1.0))
                    if orig_x_y[j] - orig_x_y[i] < 0:
                        angle = 2 * math.pi - angle

                    # Decompose the acceleration and add to current velocity
                    v_x[i] = v_x[i] + DELTA_TIME * acceleration * math.cos(angle)

                    # Top-up is (0, 0) for browsers, flip sign
                    v_y[i] = v_y[i] - DELTA_TIME * acceleration * math.sin(angle)

                    if DEBUG:
                        print("Acceleration: " + str(acceleration))
                        print("Angle: " + str(angle))
                        print("v_x[i]: " + str(v_x[i]))
                        print("v_y[i]: " + str(v_y[i]))

            # Calculate new position
            x_x[i] = x_x[i] + DELTA_TIME * (v_x[i] + temp_v_x) * 1.0 / 2

            # Top-up is (0, 0) for browsers, flip sign
            x_y[i] = x_y[i] - DELTA_TIME * (v_y[i] + temp_v_y) * 1.0 / 2

            if DEBUG:
                print("x_x[i]: " + str(x_x[i]))
                print("x_y[i]: " + str(x_y[i]))

        # Check for collisions
        for i in range(num_obj):
            for j in range(i + 1, num_obj):
                if DEBUG:
                    print("Distance: " + str(dist_sqr(x_x[i], x_x[j], x_y[i], x_y[j])))
                    print("Boundaries: " + str(data[i]["radius"] + data[j]["radius"] + COLLISION_THRESHOLD))
                if dist_sqr(x_x[i], x_x[j], x_y[i], x_y[j]) ** 0.5 <= \
                        data[i]["radius"] + data[j]["radius"] + COLLISION_THRESHOLD:
                    # There is a collision, flip the direction of the velocity
                    v_x[i] = -1 * COEFFICIENT_OF_RESTITUTION * v_x[i]
                    v_y[i] = -1 * COEFFICIENT_OF_RESTITUTION * v_y[i]
                    v_x[j] = -1 * COEFFICIENT_OF_RESTITUTION * v_x[j]
                    v_y[j] = -1 * COEFFICIENT_OF_RESTITUTION * v_y[j]

            # Initialize return element
            element = {}
            element["x_pos"] = round(x_x[i], PRECISION)
            element["y_pos"] = round(x_y[i], PRECISION)
            element["x_velocity"] = round(v_x[i], PRECISION)
            element["y_velocity"] = round(v_y[i], PRECISION)
            element["url"] = data[i]["url"]

            # Add to current iteration
            iter.append(element)

        # Add iteration to return data
        ans.append(iter)

    # Return the data
    return jsonify({"code": 200, "data": ans, "msg": "Success"})


def unit_vector(vector):
    """ Returns the unit vector of the vector.  """
    return vector / np.linalg.norm(vector)


def dist_sqr(x_pos1, x_pos2, y_pos1, y_pos2):
    """Calculates the distance between two points"""
    return (x_pos1 - x_pos2) ** 2 + (y_pos1 - y_pos2) ** 2


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
