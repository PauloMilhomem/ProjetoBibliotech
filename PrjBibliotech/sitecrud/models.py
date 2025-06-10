from django.db import models

from django.db import models

class Livro(models.Model):
    titulo = models.CharField(max_length=100)
    ano_de_publicacao = models.IntegerField()

    def __str__(self):
        return self.titulo
