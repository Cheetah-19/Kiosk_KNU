from django.shortcuts import render
from api.models import *
# Create your views here.

def hello(request):
    user = User.objects.get(id=20)
    user_name = user.user_name
    user_allergy = user.user_allergy.all()
    context = {'username':user_name, 'user_allergy':user_allergy}
    return render(request,'test.html',context=context)