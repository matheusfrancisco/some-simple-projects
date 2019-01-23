import datetime

class MassegeUser():
    user_details = []
    messages = []
    base_message = """Hi {name}!

    Thank you for the purchase on {date}.
    We hope you are exicted about using it. Just as a
    reminder the purcase total was ${total}
    Have a great one!

    Team XICAO

    """
    def add_user(self, name, amount, email=None):
        name = name[0].upper() + name[1:].lower()
        amount = "%.2f" %(amount)
        detail ={
            "name":name,
            "amount": amount,
        }
        today = datetime.date.today()
        date_text = '{today.month}/{today.day}/{today.year}'.format(today=today)
        detail['date'] = datetime.date.today()
        if email is not None:
            detail["email"] = email
        self.user_details.append(detail)
            

    def get_details(self):
        return self.user_details

    def make_messages(self):
        if(len(self.user_details)>0):
            for detail in self.get_details():
                name= detail["name"]
                amount = detail["amount"]
                date = detail["date"]
                message = self.base_message
                new_msg = message.format(
                    name=name,
                    date=date,
                    total=amount    
                )
                self.messages.append(new_msg)
            return self.messages
        return []


obj = MassegeUser()
obj.add_user('Justin',123.333, email="tests@gtest.com")
obj.add_user('Jtin', 123.333)
obj.add_user('Jusn', 12.323)
obj.add_user('Juasdsn', 12.323)
obj.add_user('Jasdsn', 1231.323)
print(obj.get_details())


print(obj.make_messages())
