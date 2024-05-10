# [2 Masters website](https://2masters.com.au)

## Stripe

### Listen to events locally

```
stripe listen --events payment_intent.succeeded --forward-to localhost:3000/webhooks/stripe
```

### Trigger an event

```
stripe trigger payment_intent.succeeded
```
