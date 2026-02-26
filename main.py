from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import database_models
import models
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

database_models.Base.metadata.create_all(bind=engine)

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/calculate")
def calculate_price(gadget: models.Gadget, db: Session = Depends(get_db)):

    final_price = gadget.price - (gadget.price * gadget.discount / 100)

    new_gadget = database_models.GadgetModel(
        gadget=gadget.gadget,
        price=gadget.price,
        discount=gadget.discount,
        final_price=final_price
    )

    db.add(new_gadget)
    db.commit()
    db.refresh(new_gadget)

    return {"final_price": final_price}
