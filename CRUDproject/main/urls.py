from django.urls import path
from .views import AddressView, AddAddressView, addresses_list, addresses_detail

urlpatterns = [
path('', AddressView.as_view()),
path('list', addresses_list, name= 'addresses-list'),
path('detail', addresses_detail, name='addresses-detail'),
# path('add-address/', AddAddressView.as_view())
]

