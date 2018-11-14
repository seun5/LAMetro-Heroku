from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from model import Base,Lane, Station
import requests


engine = create_engine('sqlite:///metroProject.db')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = scoped_session(DBSession)


url = 'http://api.metro.net/agencies/lametro-rail/routes/'
r = requests.get(url).json()
metros = r['items']

for metro in metros:
    id = metro["id"]
    info_url = url + id + "/info"
    color = requests.get(info_url).json()['bg_color']
    metro["color"] = color
    lane = Lane(id=id, title=metro["display_name"], color=color)

    station_url = 'http://api.metro.net/agencies/lametro-rail/routes/'+id+'/sequence/'
    station_r = requests.get(station_url).json()['items']
    for i, s in enumerate(station_r):
        code = str(lane.title) +"-"+ str(i)
        station = Station(code=code,id=s["id"], title=s['display_name'], long= s['longitude'], lat= s['latitude'], sequence = i, lane_id = id)
        session.add(station)
        session.commit()
    session.add(lane)
    session.commit()
r = requests.get(url).json()
metros = r['items']



# # Create dummy user
#
#
#
#
# User1 = User(name="Robo Barista", email="tinnyTim@udacity.com",
#              picture='https://pbs.twimg.com/profile_images/2671170543/18debd694829ed78203a5a36dd364160_400x400.png')
# session.add(User1)
# session.commit()
#
# # Menu for UrbanBurger
# restaurant1 = Restaurant(user_id=1, name="Urban Burger")
#
# session.add(restaurant1)
# session.commit()
#
# menuItem2 = MenuItem(user_id=1, name="Veggie Burger", description="Juicy grilled veggie patty with tomato mayo and lettuce",
#                      price="$7.50", course="Entree", restaurant=restaurant1)
#
# session.add(menuItem2)
# session.commit()
#
#
# menuItem1 = MenuItem(user_id=1, name="French Fries", description="with garlic and parmesan",
#                      price="$2.99", course="Appetizer", restaurant=restaurant1)
#
