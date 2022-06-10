from django.db import models

# Create your models here.
# blank=False by default -> everything is required
class Exercise(models.Model): 
  name = models.CharField(max_length=100, default=None)
  groups = models.ManyToManyField(
    'groups.Group', # model that this field is related to
    related_name='exercises'
  )
  description = models.TextField(max_length=3000, default=None)
  how_to_do = models.TextField(max_length=3000, default=None)
  sets = models.PositiveBigIntegerField(default=None)
  image = models.CharField(max_length=3000, default=None)
  video = models.CharField(max_length=300)
  expert_opinions = models.TextField(max_length=3000, default=None)

  def __str__(self):
    return f'{self.name}'