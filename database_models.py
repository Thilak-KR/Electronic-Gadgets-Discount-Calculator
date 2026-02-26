from sqlalchemy import Column, Integer, String, Float
from database import Base

class GadgetModel(Base):
    __tablename__ = "gadgets"

    id = Column(Integer, primary_key=True, index=True)
    gadget = Column(String)
    price = Column(Float)
    discount = Column(Float)
    final_price = Column(Float)
