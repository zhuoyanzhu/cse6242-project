import slurpy
import os

def sum(a,b):

    slurpy.javascript.js_sum(1, 2, callback=on_js_sum_response)
    return a + b



s = slurpy.Slurpy()

s.register(os)
s.register(sum)

s.start()