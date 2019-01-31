import os
import collections


'''
Find the missing number in array
'''
def findMissingNumber(arr1, arr2):

    arr1.sort()
    arr2.sort()

    for num1, num2 in zip(arr1, arr2):
        if num1 != num2:
            return num1
    return arr



'''
Linear time
'''

def finder(arr1, arr2):
    d = collections.defaultdict(int)

    for num in arr2:
        d[num] +=1

    for num in arr1:
        if(d[num==0]):
            return num
        else:
            d[num] -= 1


def finder3(arr1, arr2):

    result = 0
    for num in arr1+arr2:
        result^=num
        print(result)

    return result
