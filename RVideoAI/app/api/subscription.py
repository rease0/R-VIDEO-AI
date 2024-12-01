from fastapi import FastAPI, Depends
from .auth import get_current_user, User
import stripe

app = FastAPI()

stripe.api_key = "your-stripe-secret-key"

subscription_limits = {
    "free": {"daily_minutes": 10, "monthly_minutes": 300, "has_ads": True, "has_watermark": True},
    "plus": {"daily_minutes": 30, "monthly_minutes": 900, "has_ads": False, "has_watermark": False},
    "premium": {"daily_minutes": 60, "monthly_minutes": 1800, "has_ads": False, "has_watermark": False},
}

@app.get("/subscription-limits")
async def get_subscription_limits(user: User = Depends(get_current_user)):
    return subscription_limits[user.subscription_tier]

@app.post("/create-subscription")
async def create_subscription(plan: str, user: User = Depends(get_current_user)):
    customer = stripe.Customer.create(
        email=user.email,
        metadata={"user_id": user.id},
    )

    subscription = stripe.Subscription.create(
        customer=customer.id,
        items=[{"price": f"price_{plan}"}],
    )

    return {"subscription_id": subscription.id}

@app.post("/cancel-subscription")
async def cancel_subscription(subscription_id: str):
    stripe.Subscription.delete(subscription_id)
    return {"status": "cancelled"}

@app.post("/update-subscription")
async def update_subscription(subscription_id: str, plan: str):
    stripe.Subscription.modify(
        subscription_id,
        items=[{"price": f"price_{plan}"}],
    )
    return {"status": "updated"}

