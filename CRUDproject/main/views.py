
from django.shortcuts import render
from rest_framework import status, generics
from .models import Address
from .serializers import AddressSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class AddressView(generics.ListAPIView):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

@api_view(['GET', 'POST'])
def addresses_list(request):
    """
    List all addresses, or put a new address on the list, using api_view decorators.
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
    Retrieve, update or delete an address, using api_view decorators.
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
