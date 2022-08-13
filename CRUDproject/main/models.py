from django.db import models

# Create your models here.

class Address(models.Model):
    CEP = models.CharField(max_length=15)
    name = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    region = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.CEP
