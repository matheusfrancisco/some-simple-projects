'''
Problem 
Give two strings check to see if they are anagram.

An anagram is when two strings can be written using the exact same letters
(so you can just reamange the letters to get a different phrase or word)
'''




def anagram(s1, s2):

    s1 = s1.replace(' ', '').lower()
    s2 = s2.replace(' ', '').lower()

    #Edge case check
    if(len(s1) != len(s2)):
        return False
    count = {}

    for letter in s1:
        if(letter in count):
            count[letter] += 1
        else:
            count[letter] = 1

    for letter in s2:
        if(letter in count):
            count[letter] -= 1
        else:
            count[letter] = 1
        
    for k in count:
        if(count[k]) !=0:
            return False

    return True


if __name__ == '__main__':
    isAnagram = anagram('clint eastwood', 'olsd west action')
    print(isAnagram)
    