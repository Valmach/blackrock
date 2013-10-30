from blackrock.mammals.grid_math import *
from django.test import TestCase
from django.contrib.gis.db import models
from math import cos, sin, sqrt, atan2, pi

'''
testing remaining untested gridmath methods
test:
    to_lat_long_point - couldn't figure out
    - degrees_to_radians
    - positive_radians
    - hypotenuse
    radians_to_degrees
    rotate_points
'''
class TestGridMath(TestCase):

    def test_degrees_to_radians(self):
        self.degrees_to_radians = degrees_to_radians(180)
        self.assertEquals(self.degrees_to_radians, 180 * pi / 180.0)

    def test_degrees_to_hypotenuse(self):
        self.hypotenuse = hypotenuse(3, 4)
        self.assertEquals(self.hypotenuse, sqrt(3 ** 2 + 4 ** 2))

    def test_positive_radians(self):
        self.positive_radians = positive_radians(19)
        self.assertEquals(self.positive_radians, 19)

    def test_neg_positive_radians(self):
        self.positive_radians = positive_radians(-19)
        self.assertEquals(self.positive_radians, -19 + 2 * pi)

    def test_convert_trig_pos(self):
        self.convert = convert_from_heading_to_trig_radians(25)
        self.assertEquals(self.convert, 1.1344640137963142)

    def test_convert_trig_neg(self):
        self.convert = convert_from_heading_to_trig_radians(118)
        self.assertEquals(self.convert, 5.794493116621174)

    def test_radians_to_degrees(self):
        self.radians = radians_to_degrees(80)
        self.assertEquals(self.radians, 80 * 180.0 / pi)

    def test_radians_to_degrees_neg(self):
        self.radians = radians_to_degrees(-35)
        self.assertEquals(self.radians, -1645.3522829578812)

