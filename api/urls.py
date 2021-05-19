from django.urls import path
from .views import apiOverview, todoDelete, todoList, todoSingle, todoCreate, todoUpdate, registerPage, loginPage, logoutUser


urlpatterns = [
    path('', apiOverview, name="api-overview"),

    path('todo-list/', todoList, name="todo-list"),
    path('todo-single/<str:id>/', todoSingle, name="todo-single"),
    path('todo-create/', todoCreate, name="todo-create"),
    path('todo-update/<str:id>/', todoUpdate, name="todo-update"),
    path('todo-delete/<str:id>/', todoDelete, name="todo-delete"),

    path('register/', registerPage, name="register"),
    path('login/', loginPage, name="login"),
    path('logout/', logoutUser, name="logout")
]