from datetime import datetime
from enum import unique

from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine


Base = declarative_base()


class Station(Base):
    __tablename__ = 'station'
    code = Column(String, primary_key=True)
    id = Column(Integer, nullable=False)
    title = Column(String(250), nullable=False)
    lat = Column(String(250), nullable=False)
    long = Column(String(250), nullable=False)
    sequence = Column(Integer, nullable = False)
    lane_id = Column(Integer, ForeignKey('lane.id'))



class Lane(Base):
    __tablename__ = 'lane'

    id = Column(Integer, primary_key=True)
    title = Column(String(250), nullable=False)
    color = Column(String(10), nullable= False)




engine = create_engine('sqlite:///metroProject.db')


Base.metadata.create_all(engine)