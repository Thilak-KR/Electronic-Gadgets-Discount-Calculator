from pydantic import BaseModel

class Gadget(BaseModel):
    gadget: str
    price: float
    discount: float
