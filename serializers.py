from rest_framework import serializers
from .models import Hotel, TicketBooking, HotelReview

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        # Using '__all__' ensures price, location, and hotel_type are included
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketBooking
        fields = '__all__'