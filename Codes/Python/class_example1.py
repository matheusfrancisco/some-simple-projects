'''
class Animal():
    noise = "Grunt"
    size = "Large"
    color = "Browm"
    hair = 'Covers body'

    def get_color(self):
        return self.color

    def make_noise(self):
        return self.noise

dog = Animal()
dog.make_noise()



class Dog():
    name = 'Jon'
    color = 'brown'
    def get_color(self):
        print(self.name)
        return self.color

    

obj = Dog()
obj.color = 'white'
obj.get_color()


print(dog)

'''


class Animal():
    noise = "Grunt"
    size = "Large"
    color = "Browm"
    hair = 'Covers body'

    def get_color(self):
        return self.color

    def make_noise(self):
        return self.noise


dog = Animal()
dog.make_noise()
dog.size  ='small'
dog.color = 'black'
dog.hair = 'hairless'

class Dog(Animal):
    name = 'Jon'

jon= Dog()
#jon.color = 'white'
jon.name = 'Jon Snow'

print(jon.color)
