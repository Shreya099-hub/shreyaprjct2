from database import SessionLocal, engine
import models
import random

models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    if db.query(models.Property).count() > 0:
        print("Database already seeded.")
        return

    properties = []
    
    # Bangalore properties
    for i in range(10):
        prop_type = random.choice(["Rent", "Buy"])
        price = random.randint(15000, 50000) if prop_type == "Rent" else random.randint(5000000, 20000000)
        properties.append(models.Property(
            title=f"Beautiful Apartment in Bangalore {i+1}",
            description="A spacious apartment with modern amenities in a prime location.",
            city="Bangalore",
            property_type=prop_type,
            price=price,
            bedrooms=random.randint(1, 4),
            bathrooms=random.randint(1, 3),
            image_url="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=60"
        ))
        
    # Mumbai properties
    for i in range(10):
        prop_type = random.choice(["Rent", "Buy"])
        price = random.randint(25000, 80000) if prop_type == "Rent" else random.randint(10000000, 50000000)
        properties.append(models.Property(
            title=f"Sea View Flat in Mumbai {i+1}",
            description="Luxurious flat with a stunning sea view and premium facilities.",
            city="Mumbai",
            property_type=prop_type,
            price=price,
            bedrooms=random.randint(1, 4),
            bathrooms=random.randint(1, 3),
            image_url="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=60"
        ))

    db.add_all(properties)
    db.commit()
    db.close()
    print("Database seeded successfully with 20 properties.")

if __name__ == "__main__":
    seed_db()