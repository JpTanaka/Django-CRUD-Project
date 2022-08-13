from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'CEP', 'name', 'district', 'region')

class AddAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('CEP', 'name', 'district', 'region')

