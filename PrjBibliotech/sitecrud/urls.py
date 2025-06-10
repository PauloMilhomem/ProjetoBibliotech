from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("sistema-restrito-crud/", views.sistema_restrito_crud, name="sistema-restrito-crud"),
    path("sistema-restrito-login/", views.sistema_restrito_login, name="sistema-restrito-login"),
]