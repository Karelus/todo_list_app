from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('todos', index),
    path('home', index),
    path('update/<str:id>', index)
]