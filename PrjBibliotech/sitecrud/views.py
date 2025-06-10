from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Livro

def index(request):
    return render(request, 'sitecrud/index.html')

def sistema_restrito_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            next_url = request.GET.get('next', 'sistema-restrito-crud')
            return redirect(next_url)
        else:
            return render(request, 'sitecrud/index.html', {'erro': 'Usuário ou senha inválidos'})

    return render(request, 'sitecrud/index.html')

@login_required(login_url="/sistema-restrito-login/")
def sistema_restrito_crud(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        ano = request.POST.get('ano_de_publicacao')

        if titulo and ano:
            Livro.objects.create(titulo=titulo, ano_de_publicacao=ano)
            return redirect('sistema-restrito-crud')

    livros = Livro.objects.all()
    return render(request, "sitecrud/sistema-restrito-crud.html", {"livros": livros})


@login_required(login_url="/sistema-restrito-login/")
def delete_livro(request, pk):
    if request.method == 'POST':
        livro = get_object_or_404(Livro, pk=pk)
        livro.delete()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Método não permitido.'})


@login_required(login_url="/sistema-restrito-login/")
def update_livro(request, pk):
    if request.method == 'POST':
        livro = get_object_or_404(Livro, pk=pk)
        livro.titulo = request.POST.get('titulo', livro.titulo)
        livro.ano_de_publicacao = request.POST.get('ano_de_publicacao', livro.ano_de_publicacao)
        livro.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Método não permitido.'})
