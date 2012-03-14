from math import cos, sin, sqrt, atan2, pi
from portal.grid_math import *

# http://en.wikipedia.org/wiki/World_Geodetic_System
# http://home.online.no/~sigurdhu/Grid_1deg.htm
# according to WGS 84:
# Latitude	   minute of latitude   minute of longitude
# 41 deg       1850.90              1402.25	

one_lat_degree  = 111054.0
one_long_degree = 84135.0

def meters_to_degrees_lat (y):
    return y / one_lat_degree
    
def meters_to_degrees_long (x):
    return x / one_long_degree

def degrees_lat_to_meters (dly):
    return dly * one_lat_degree
    
def degrees_long_to_meters(dlx):
    return dlx * one_long_degree

def to_lat_long (y, x):
    return meters_to_degrees_lat (y), meters_to_degrees_long  (x)

def to_meters  (y, x):
    return degrees_lat_to_meters (y), degrees_long_to_meters  (x)

def degrees_to_radians(angle):
    return angle * pi / 180.0 
    
def rotate_points( points, center, angle):
    result = []
    for point in points:
        result.append (rotate_about_a_point(point, center, angle))
    return result
    
def rotate_about_a_point(point, center, angle_to_rotate):
    a = degrees_to_radians (angle_to_rotate)
    y, x = point
    center_y, center_x = center
    if x == center_x and y == center_y:
        return (y, x)
    if a == 0:
        return (y, x)
        
    delta_y = center_y - y
    delta_x = center_x - x
    r = sqrt( delta_y ** 2 + delta_x ** 2 )
    new_angle = atan2 (delta_x , delta_y) + a
    return center_y + cos(new_angle) * r, center_x + sin(new_angle) * r
    
def set_up_block (bottom_left, height, width):
    """
    Return a quincunx of lat/long points arranged as follows:
    
    1       2
    
        4        
    
    0       3
    
    """   
    box = [list()] * 5
    for i in range(len(box)):
        box[i] = list(bottom_left)
    #move the y for 1 and 2 right by one block width:
    box[1][0] += height
    box[2][0] += height
    # move the x for 2 and 3 right by one block width:
    box[2][1] += width
    box[3][1] += width
    #move the center up and right half a width:
    box[4][0] += height /  2
    box[4][1] += width  /  2
    return box


