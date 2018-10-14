# CS50x Final Project
# Vitor Pacheco de Freitas
# August 2018

from tempfile import mkdtemp

from flask import Flask, session, render_template, request, g, redirect
from flask_babel import Babel
from flask_babel import gettext
from flask_session import Session

# Import class created to handle spend and format function
from helpers import Person
from helpers import brl

# Configure application
languages = {'en': "English", 'pt': "Portuguese"}
app = Flask(__name__)
babel = Babel(app)
app.jinja_env.globals.update(_=gettext, g=g, languages=languages)


@app.before_request
def before_request():
    g.language = get_locale()


# Ensure responses aren't cached

@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Get user's language


@babel.localeselector
def get_locale():
    language = session.get('language', None)
    if language is not None:
        return language
    for lang in request.accept_languages.values():
        if lang[:2] in languages.keys():
            language = lang[:2]
            break

    return language


@app.route("/language/<lang>")
def set_language(lang):
    session['language'] = lang
    if hasattr(request, 'referrer'):
        return redirect(request.referrer)
    return redirect('/')

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


# Index page - user inputs people who will pay the bill


@app.route("/")
def index():
    """User inputs people details"""
    return render_template("index.html")


# About page
@app.route("/about")
def about():
    return render_template("about.html")


# Split page - user insert item(s) to be split between people
@app.route("/split", methods=["POST"])
def split():
    """User inputs bill details"""

    # Get list of people from the forms
    session['people'] = request.form.getlist('fields[]')
    return render_template("split.html", people=session['people'])


# Result page - where the calculation logic happens and the values are presented to the user
@app.route("/result", methods=["POST"])
def result():
    """program calculates result and shows to user"""

    # Get values from user input form (products, quantities, price, people)
    products = request.form.getlist('products[]')
    quantities = request.form.getlist('quantities[]')
    values = request.form.getlist('values[]')

    # Get value from user tip, if any
    if request.form.get('tipswitch') == 'on':
        tip = (int(request.form.get('tipvalue')) + 100) / 100
    else:
        tip = 1

    people = session['people']

    # Get which person consumed each product (binary) and write on the 'consumed' matrix
    consumed = []
    for i, item in enumerate(people):  # iterate through each person
        temp1 = []
        for j, item in enumerate(products):  # iterate through each product
            temp2 = request.form.get('consumed' + str(i) + '_' + str(j))
            if (temp2 == 'on'):
                temp2 = 1
            else:
                temp2 = 0
            temp1.append(temp2)
        consumed.append(temp1)

    # Normalize results from 'consumed' matrix -> calculate the fraction each one consumed
    for column in range(len(consumed[0])):  # for each column
        sumofcolumn = sum(row[column]
                          for row in consumed)  # get sum of the column

        for row in consumed:  # for each number in the matrix
            # divide the original value by the total sum of column (normalize column)
            row[column] = row[column] / sumofcolumn

    # Validation
    # print(people)
    # print(products)
    # print(quantities)
    # print(values)
    # print(consumed)

    # Create people objects and add all products spent
    spend = {}
    billvalue = 0

    for i, name in enumerate(people):  # iterate through people

        p = Person(name)  # Create Person object

        for j, item in enumerate(products):  # iterate through products
            # addspend(product, quantity, value, fraction consumed)
            p.addspend(item,
                       int(quantities[j]),
                       float(values[j]),
                       float(consumed[i][j]))

        # register this person's total value
        spend[name] = brl(p.totalspend() * tip)
        billvalue += p.totalspend() * tip  # add this person's part to total value

    # Final validation
    # print(spend)
    # print(billvalue)

    return render_template("result.html", people=session['people'], spend=spend, bill=brl(billvalue))


if __name__ == "__main__":
    app.run(debug=True)
