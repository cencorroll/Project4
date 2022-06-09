from django.db import models

# Create your models here.

class ExpertOpinion(models.Model):
  name = models.CharField(max_length=50)
  text = models.TextField(max_length=3000)

  def __str__(self):
    return f'{self.name}'
