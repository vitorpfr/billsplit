# Contains all the functions to help the split bill process


class Person:
    def __init__(self, name):
        self.name = name
        self.spend = []

    def addspend(self, product, quantity, value, fraction):
        if value < 0:
            raise Exception("Valor tem que ser positivo!")
        self.spend.append({"product": product, "quantity": quantity, "value": value, "fraction": fraction})

    def totalspend(self):
        return sum([x["value"] * x["fraction"] * x["quantity"] for x in self.spend])


def brl(value):
    """Format value as BRL."""
    return f"R${value:,.2f}"
