from django.contrib import admin
from .models import Address

# Register your models here.

class AddressesAdmin(admin.ModelAdmin):
    list_display = ('CEP', 'name', 'district', 'region')

admin.site.register(Address, AddressesAdmin)
