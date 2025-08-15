# Web3Forms Setup for SOCH Checkout Page

## Overview
The checkout page has been integrated with Web3Forms to automatically send order details to the store owner's email when customers place orders.

## What Web3Forms Does
- **Automated Email Notifications**: Sends detailed order information to your email
- **No Backend Required**: Works entirely through the frontend
- **Spam Protection**: Built-in spam filtering and protection
- **Free Tier**: 250 submissions per month on the free plan

## Setup Instructions

### Step 1: Get Your Web3Forms Access Key

1. **Visit Web3Forms**: Go to [https://web3forms.com/](https://web3forms.com/)
2. **Sign Up**: Create a free account or sign in
3. **Generate Access Key**: 
   - Click "Get Access Key"
   - Copy the generated key (it looks like: `12345678-1234-1234-1234-123456789012`)

### Step 2: Update the Checkout Component

1. **Open the file**: `src/components/Checkout.js`
2. **Find this line** (around line 30):
   ```javascript
   const web3FormsKey = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Replace with your actual key
   ```
3. **Replace the placeholder** with your actual access key:
   ```javascript
   const web3FormsKey = '12345678-1234-1234-1234-123456789012';
   ```

### Step 3: Test the Integration

1. **Add products to cart** on your website
2. **Go to checkout** and fill out the form
3. **Click "Place Order"**
4. **Check your email** for the order notification

## What Gets Sent in the Email

### Customer Information
- Full Name
- Email Address
- Phone Number
- Complete Shipping Address

### Order Details
- Product Names
- Sizes and Colors
- Quantities
- Individual Prices
- Order Totals (Subtotal, Shipping, Tax, Total)

### Order Metadata
- Payment Method
- Order Date and Time
- Order ID (based on timestamp)

## Email Format Example

```
Subject: New Order from John Doe

Name: John Doe
Email: john@example.com
Phone: +1-555-0123
Address: 123 Main St, New York, NY 10001, United States
Payment Method: Cash on Delivery

Order Details:
- Product: Classic Cotton T-Shirt
  Size: M | Color: Black | Qty: 2 | Price: $29.99 | Total: $59.98
- Product: Premium Denim Jeans
  Size: 32 | Color: Blue | Qty: 1 | Price: $89.99 | Total: $89.99

Subtotal: $149.97
Shipping: Free
Tax: $12.00
Total: $161.97

Order Date: 12/15/2024, 2:30:45 PM
```

## Customization Options

### Change Email Subject
Modify this line in the checkout component:
```javascript
subject: `New Order from ${formData.firstName} ${formData.lastName}`,
```

### Add More Fields
To include additional information, add them to the `orderData` object:
```javascript
const orderData = {
  // ... existing fields
  customField: 'Custom Value',
  // ... more fields
};
```

### Modify Email Template
You can customize the email format by changing how the data is structured in the `orderData` object.

## Troubleshooting

### Common Issues

1. **"Failed to submit order" error**
   - Check if your access key is correct
   - Verify you haven't exceeded the monthly limit
   - Check browser console for detailed error messages

2. **No emails received**
   - Check your spam/junk folder
   - Verify the access key is correct
   - Check Web3Forms dashboard for submission status

3. **Form validation errors**
   - Ensure all required fields are filled
   - Check email format is valid
   - Verify phone number format

### Getting Help

- **Web3Forms Documentation**: [https://docs.web3forms.com/](https://docs.web3forms.com/)
- **Web3Forms Support**: Available through their website
- **Check Console**: Browser developer tools for error messages

## Security Notes

- **Access Key**: Keep your access key private and don't commit it to public repositories
- **Rate Limiting**: Web3Forms has built-in rate limiting to prevent abuse
- **Data Privacy**: Customer data is only sent to your email and not stored by Web3Forms

## Next Steps

After setup:
1. **Test thoroughly** with sample orders
2. **Monitor your email** for order notifications
3. **Set up email filters** to organize order emails
4. **Consider upgrading** to paid plan if you exceed 250 orders/month

## Support

If you need help with the integration:
1. Check this documentation first
2. Review the Web3Forms documentation
3. Check browser console for errors
4. Contact Web3Forms support if needed
