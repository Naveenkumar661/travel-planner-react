import random  # Added this to fix the TicketBooking save method
import os
from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    
    # Images
    image_main = models.ImageField(upload_to='hotels/', null=True, blank=True, help_text="Main hotel image")
    image_room = models.ImageField(upload_to='hotels/rooms/', null=True, blank=True, help_text="Room view image")
    
    # Map & Rating
    map_3d_url = models.URLField(max_length=500, help_text="Google Maps 3D Embed Link")
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)

    # --- NEW FIELDS FOR REACT INTEGRATION ---
    price = models.IntegerField(default=5000, help_text="Price per night in ₹")
    location = models.CharField(max_length=255, default="India")
    
    TYPE_CHOICES = [
        ('leisure', 'Leisure'),
        ('business', 'Business'),
        ('honeymoon', 'Honeymoon'),
        ('family', 'Family'),
    ]
    hotel_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='leisure')

    def __str__(self):
        return self.name

class TicketBooking(models.Model):
    travel_mode = models.CharField(max_length=50, default="airplane") 
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    travel_date = models.DateField()
    passengers = models.IntegerField()
    total_price = models.CharField(max_length=50, blank=True, null=True)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    otp_code = models.CharField(max_length=6, blank=True, null=True)
    is_otp_verified = models.BooleanField(default=False)
    
    PAYMENT_CHOICES = [
        ('UPI', 'UPI/Paytm'),
        ('CARD', 'Credit/Debit Card'),
        ('BANK', 'Net Banking'),
    ]
    payment_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES, blank=True)
    is_paid = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.otp_code:
            self.otp_code = str(random.randint(1000, 9999))
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.travel_mode} to {self.destination}"

class HotelReview(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='reviews')
    user_name = models.CharField(max_length=100)
    comment = models.TextField()
    stars = models.IntegerField(default=5)

    def __str__(self):
        return f"Review for {self.hotel.name} by {self.user_name}"