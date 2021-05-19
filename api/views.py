from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib import messages

from .serializers import TodoSerializer
from .models import Todo
from .forms import CreateUserForm

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List':'/todo-list',
        'Single View':'/todo-list/<str:pk>/',
        'Create':'/todo-create/',
        'Update':'/todo-update/<str:pk>/',
        'Delete':'/todo-delete/<str:pk>/',
        'Create User': '/user-create/'
    }
    return Response(api_urls)

# Todo Views using Django Rest
@api_view(['GET'])
def todoList(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def todoSingle(request, id):
    todos = Todo.objects.get(id=id)
    serializer = TodoSerializer(todos, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def todoCreate(request):
    serializer = TodoSerializer(data=request.data)
    print(request.user)
    print(request.user.id)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def todoUpdate(request, id):
    todo = Todo.objects.get(id=id)
    serializer = TodoSerializer(instance=todo, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def todoDelete(request, id):
    todo = Todo.objects.get(id=id)
    todo.delete()

    return Response('Task deleted')

# User Views using Django's default Views
def registerPage(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()

            return redirect('login')

    context = {'form':form}
    return render(request, 'register.html', context)

def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
        else:
            messages.info(request, 'Username OR password is incorrect')

    context = {}
    return render(request, 'login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('login')