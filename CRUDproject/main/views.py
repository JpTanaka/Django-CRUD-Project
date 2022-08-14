
from django.shortcuts import render
from rest_framework import viewsets, status, generics, permissions
from .models import Address
from .serializers import AddressSerializer, AddAddressSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class AddressView(generics.ListAPIView):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

class AddAddressView(viewsets.ViewSet):
    serializer_class = AddAddressSerializer
    permission_classes = (permissions.AllowAny,)

    def list(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            CEP = serializer.data.get('CEP')
            name = serializer.data.get('name')
            district = serializer.data.get('district')
            region = serializer.data.get('region')
            address = Address(CEP = CEP, name = name, district = district, region = region)
            address.save()
            return Response(AddressSerializer(address).data, status = status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def addresses_list(request):
    """
    List all addresses, or put a new address on the list.
    """
    if request.method == 'GET':
        snippets = Address.objects.all()
        serializer = AddressSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def addresses_detail(request, pk, format=None):
    """
    Retrieve, update or delete an address.
    """
    try:
        address = Address.objects.get(pk=pk)
    except Address.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AddressSerializer(address)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
