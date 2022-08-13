from django.shortcuts import render
from rest_framework import viewsets
from .models import Address
from .serializers import AddressSerializer

# Create your views here.

class AddressView(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    


