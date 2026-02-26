from django.contrib import admin
from .models import TicketBooking, Hotel, HotelReview

class HotelAdmin(admin.ModelAdmin):
    # This ensures both image fields are visible in the editor
    fields = ('name', 'description', 'image_main', 'image_room', 'map_3d_url', 'rating')
    list_display = ('name', 'rating')

admin.site.register(Hotel, HotelAdmin) # Register with the custom class
admin.site.register(TicketBooking)
admin.site.register(HotelReview)