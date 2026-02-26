from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Hotel, TicketBooking
from .serializers import HotelSerializer, TicketSerializer

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = TicketBooking.objects.all()
    serializer_class = TicketSerializer

    # Override the create method to handle bookings without Twilio
    def create(self, request, *args, **kwargs):
        # 1. Standard Django Rest Framework creation logic
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # 2. Save to MySQL (This still generates your OTP code in the database)
        booking = serializer.save() 

        # 3. Print OTP to Terminal for testing (Optional)
        # This allows you to see the OTP in your CMD/VS Code terminal without Twilio
        print(f"--- DEBUG OTP: {booking.otp_code} for {booking.phone_number} ---")

        # 4. Return success response
        return Response({
            "message": "Booking successful! Your trip is confirmed.",
            "booking_id": booking.id,
            "otp_code": booking.otp_code  # Including this for your testing convenience
        }, status=status.HTTP_201_CREATED)



            # XRY7JCLHBVLE77CND8H4H3JJ
