from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("sistema-restrito-crud/", views.sistema_restrito_crud, name="sistema-restrito-crud"),
    path("sistema-restrito-login/", views.sistema_restrito_login, name="sistema-restrito-login"),
    path('sistema-restrito-crud/delete/<int:pk>/', views.delete_livro, name='delete_livro'),
    path('sistema-restrito-crud/update/<int:pk>/', views.update_livro, name='update_livro'),
]